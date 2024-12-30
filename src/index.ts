import { ResultOf } from 'gql.tada';
import { gql, manualBreathing, queries } from './graphql';
import PartialPage from './partial-page';
import { GraphQLClient } from 'graphql-request';

type EmoteUpdate = {
    emoteSetId: string;
    emotes: string[];
    action: 'ADD' | 'REMOVE';
};

/**
 * This runs every minute via cron trigger
 */
async function scheduledTask(env: Env) {
    console.log('scheduled task invoked')
    // get the oldest batch from d1 if there's any,
    // make the big graphql request to 7tv and clear
    // that batch from d1

    let emote_batch: D1Result<{
        id: number;
        action: string;
        emote_set_id: string;
        emote_ids: string;
    }>;

    try {
        emote_batch = await env.DB.prepare(
            'SELECT id, action, emote_set_id, emote_ids FROM emote_batches ORDER BY id ASC LIMIT 1'
        ).run<{
            id: number;
            action: string;
            emote_set_id: string;
            emote_ids: string;
        }>();
    } catch (e) {
        console.error('await DB.run(...) failed', e);
        return;
    }

    if (!emote_batch.success) {
        console.error('DB.run() success=false', emote_batch.error);
        return;
    }
    if (emote_batch.results.length === 0) {
        console.log('nothing to do');
        return;
    }
    

    const [{ id, action, emote_set_id, emote_ids }] = emote_batch.results;
    const emotes = emote_ids.split(',');

    const msg = `Processing batch ${id}: set ${emote_set_id}, ${action} ${emotes.length} emotes`;
    console.log(msg);

    // 7tv doesn't handle batches of 100 mutations like at all, chokes around 10
    //
    // await gql(env).batchRequests(
    //     emotes.map((emote) => ({
    //         document: queries.ChangeEmote,
    //         variables: {
    //             action: action as 'ADD' | 'REMOVE',
    //             id: emote_set_id,
    //             emote_id: emote,
    //         },
    //     }))
    // );
    //

    // but it does handle one jumbo-mutation just fine
    let res: any;

    try {
        res = await manualBreathing(env, {
            action: action as 'ADD' | 'REMOVE',
            emoteSetId: emote_set_id,
            emotes,
        });
    } catch (e) {
        console.error('await manualBreathing(...) failed', e);
        return;
    }

    if (res.errors) {
        console.error('batch emote update error', ...res.errors);
        if (res.errors[0]?.extensions?.status == 429) {
            // on ratelimit errors we "retry next time" by not popping the queue
            return;
        }
    }

    
    try {
        await env.DB.exec(`DELETE FROM emote_batches WHERE id = ${id}`);
    } catch (e) {
        console.error('failed to delete emote batch', e);
    }

    console.log('scheduledTask completed');
}

/** This is called on `/emotes/twitch-callback` route */
async function twitchCallback(request: Request, env: Env, page: PartialPage) {
    const reqParams = new URL(request.url).searchParams;
    const code = reqParams.get('code');
    if (!code) {
        const msg =
            reqParams.get('error_description') ??
            reqParams.get('error') ??
            'No auth code param';
        await finish(page, 'fail', msg);
        return;
    }
    const state = reqParams.get('state');
    if (state != 'add' && state != 'remove') {
        await finish(page, 'fail', 'Bad state param');
        return;
    }

    const params = new URLSearchParams();
    params.set('client_id', env.TWITCH_CLIENT_ID);
    params.set('client_secret', env.TWITCH_CLIENT_SECRET);
    params.set('code', code);
    params.set('grant_type', 'authorization_code');
    params.set('redirect_uri', `${env.APP_HOST}/emotes/twitch-callback`);
    // ^ why do they need redirect_uri here?

    const res = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: params,
    }).then((res) => res.json<{ access_token?: string; message?: string }>());

    if (!res.access_token) {
        await finish(page, 'fail', `Twitch auth fail: ${res.message}`);
        return;
    }
    await page.log('Authorized on Twitch');

    const user = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Client-Id': env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${res.access_token}`,
        },
    }).then((res) =>
        res.json<{
            data?: [
                { id: string; display_name: string; profile_image_url: string },
            ];
            message?: string;
        }>()
    );

    if (!user.data) {
        const msg = `Failed to get your Twitch user: ${user.message}`;
        await finish(page, 'fail', msg);
        return;
    }
    const [{ id, display_name }] = user.data;
    await page.log(`Got Twitch user: ${display_name}`);

    const botInfo = await gql(env).request(queries.GetCurrentUser, {});
    await page.log('Got 7tv bot editor data');

    for (const { user } of botInfo.user.editor_of) {
        for (const conn of user.connections) {
            if (conn.platform == 'TWITCH' && conn.id == id) {
                await queueEmoteUpdates(
                    env,
                    display_name,
                    conn.emote_set_id,
                    state,
                    page
                );
                return;
            }
        }
    }

    await finish(page, 'fail', 'You did not add the bot as an editor, silly');
}

let ourEmotes: Set<string> | null = null;

type EmoteSet = ResultOf<typeof queries.GetEmoteSet>['emoteSet'];

const CRON_INTERVAL_MINUTES = 2; // change this if increasing the cron interval

async function queueEmoteUpdates(
    env: Env,
    userName: string,
    emoteSetId: string,
    state: 'add' | 'remove',
    page: PartialPage
) {
    const { batches, pos } = await queryStatus(env, emoteSetId);
    if (batches != 0) {
        const time = (x: number) => {
            const t = x * CRON_INTERVAL_MINUTES;
            return t == 1 ? '~1 minute' : `~${t} minutes`;
        };
        const msg =
            pos != 0
                ? `You're in the queue, the process will start in ${time(pos)} and take ${time(batches)}`
                : `You are still being processed, ${time(batches)} remaining`;
        await finish(page, 'fail', msg);
        return;
    }
    page.log('Checked if already queued');

    const g = gql(env);

    // lazily load the emotes we want to add once when worker starts
    if (ourEmotes == null) {
        const { emoteSet } = await g.request(queries.GetEmoteSet, {
            id: env.SPELLS_EMOTE_SET_ID,
        });
        ourEmotes = new Set(emoteSet.emotes.map(({ id }) => id));
    }
    await page.log('Loaded Noita emoteset into cache');

    const { emoteSet } = await g.request(queries.GetEmoteSet, {
        id: emoteSetId,
    });
    await page.log('Got list of user emotes');

    if (state == 'add') {
        await addMissingEmotes(env, g, page, emoteSet, userName);
    } else {
        await removePresentEmotes(env, g, page, emoteSet, userName);
    }
}

/** For given emote set, get the position and amount of batches in the queue. */
async function queryStatus(
    env: Env,
    emoteSetId: string
): Promise<{ batches: number; pos: number }> {
    const res = await env.DB.prepare(
        `SELECT id FROM emote_batches WHERE emote_set_id = ? ORDER BY id ASC`
    )
        .bind(emoteSetId)
        .run<{ id: number }>();

    // happy path, the emote was not yet queued
    const batches = res.results.length;
    if (batches == 0) {
        return { batches: 0, pos: 0 };
    }

    // lookup where are we in the queue by counting batches before our earliest batch
    const [{ id }] = res.results;
    const res2 = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM emote_batches WHERE emote_batches.id < ?`
    )
        .bind(id)
        .run<{ count: number }>();

    return { batches, pos: res2.results[0]?.count ?? 0 };
}

async function addMissingEmotes(
    env: Env,
    g: GraphQLClient,
    page: PartialPage,
    userEmoteSet: EmoteSet,
    userName: string
) {
    const missingEmotes: string[] = [];

    // calculate which of our emotes they don't have
    const theirSet = new Set(userEmoteSet.emotes.map(({ id }) => id));
    for (const id of ourEmotes) {
        if (!theirSet.has(id)) {
            missingEmotes.push(id);
        }
    }

    // calculate if they have enough slots
    const unallocated = 1000 - userEmoteSet.capacity;
    const space = userEmoteSet.capacity - userEmoteSet.emote_count;
    const over = ourEmotes.size - space;
    if (over > 0) {
        // fixup their cap (why would you ever have it below max?..)
        if (over <= unallocated) {
            const capacity = userEmoteSet.capacity + over;
            await g.request(queries.UpdateEmoteSetCapacity, {
                id: userEmoteSet.id,
                data: { capacity },
            });
            await page.log(`Updated your emote capacity to ${capacity}`);
        } else {
            const msg = `You don't have enough emote slots! We need ${ourEmotes.size}, you have ${space} free slots.`;
            await finish(page, 'fail', msg);
            return;
        }
    }

    if (missingEmotes.length == 0) {
        const msg = 'You already have all the emotes, silly';
        await finish(page, 'fail', msg);
        return;
    }

    await queueBatches(env, {
        emoteSetId: userEmoteSet.id,
        emotes: missingEmotes,
        action: 'ADD',
    });

    const msg = `Successfully queued adding ${missingEmotes.length} emotes to '${userName}'`;
    await finish(page, 'success', msg);
}

async function removePresentEmotes(
    env: Env,
    g: GraphQLClient,
    page: PartialPage,
    userEmoteSet: EmoteSet,
    userName: string
) {
    const userEmotes: string[] = [];

    for (const { id } of userEmoteSet.emotes) {
        if (ourEmotes.has(id)) {
            userEmotes.push(id);
        }
    }

    if (userEmotes.length == 0) {
        await finish(page, 'fail', 'You had no Noita emotes, silly');
        return;
    }

    await queueBatches(env, {
        emoteSetId: userEmoteSet.id,
        emotes: userEmotes,
        action: 'REMOVE',
    });

    const msg = `Successfully queued removing ${userEmotes.length} emotes from '${userName}'`;
    await finish(page, 'success', msg);
}

const BATCH_SIZE = 100;

/**
 * Split the emote update into batches of BATCH_SIZE and queue them into our
 * D1 table to be processed by the cron trigger.
 */
async function queueBatches(env: Env, update: EmoteUpdate) {
    const statements: D1PreparedStatement[] = [];
    for (let i = 0; i < update.emotes.length; i += BATCH_SIZE) {
        const chunk = update.emotes.slice(i, i + BATCH_SIZE);
        const stmt = env.DB.prepare(
            'INSERT INTO emote_batches (action, emote_set_id, emote_ids) VALUES (?, ?, ?)'
        ).bind(update.action, update.emoteSetId, chunk.join(','));
        statements.push(stmt);
    }
    // who batches the bactches
    await env.DB.batch(statements);
}

async function finish(
    page: PartialPage,
    status: 'success' | 'fail',
    message: string
) {
    const success = status === 'success';
    const data = JSON.stringify({
        target: 'runfast-twitch-login',
        data: { success, message },
    });
    await page.log((success ? 'Success: ' : 'Fail: ') + message);

    // let user marvel at our log, why did I spend so much time on this lol
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.run(`window.opener.postMessage(${data});`);
    await page.log(
        'You can close this window now, the emotes will be updated shortly'
    );
}

/**
 * We make the server function return immediately so that the popup is not
 * stuck in limbo for noticeable amount of time after twitch redirects to us.
 *
 * This happens because we do a few things like finishing twitch auth and some
 * 7tv gql queries during that request.
 *
 * Normally, the twitch redirect shows the text along the lines of
 * "If this page does not redirect, here's a link to do it" which we want the
 * user to avoid clicking because of our delay - which this partial response
 * fixes completely - we immediately start showing our page along with the
 * actual progress of things we do. If updating 7tv emotes didn't take up
 * 5 minutes we could've used this for the entire thing.
 */
async function partial(
    ctx: ExecutionContext,
    task: (page: PartialPage) => Promise<void>
): Promise<Response> {
    return PartialPage.respond(
        ctx,
        (page) => {
            page.append(`
              <!DOCTYPE html>
                <html>
                  <head>
                    <title>Noita Spell Emotes</title>
                    <style>
                      * { color: #f1f5f9; background-color: #111; font-family: mono; margin: 0.4rem; }
                      body { margin: 0; display: flex; flex-direction: column; justify-content: end; height: calc(100vh - 2rem); }
                    </style>
                  </head>
                <body>
                  <ul>
            `);
            return task(page);
        },
        (page, err) => finish(page, 'fail', err.message)
    );
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        // impeccable routing
        if (url.pathname === '/emotes/twitch-callback') {
            // "bad practice", but for our usecase it's fine
            const ip = request.headers.get('cf-connecting-ip') || '';
            const { success } = await env.CB_RATELIMIT.limit({ key: ip });
            if (!success) {
                return new Response('ratelimit', { status: 429 });
            }
            return partial(ctx, (writer) =>
                twitchCallback(request, env, writer)
            );
        }
        // else serve our static website
        // (if route matches a file in ./public this entire worker is never
        // called, so this line technically only ever returns 404s)
        return env.ASSETS.fetch(request);
    },
    scheduled: (_, env) => scheduledTask(env),
} satisfies ExportedHandler<Env, EmoteUpdate>;
