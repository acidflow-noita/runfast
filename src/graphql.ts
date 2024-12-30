import { initGraphQLTada, VariablesOf } from 'gql.tada';
import type { introspection } from './graphql-env';
import { GraphQLClient } from 'graphql-request';

const graphql = initGraphQLTada<{
    introspection: introspection;
    scalars: {
        ObjectID: string;
        UserEditorModelPermission: number;
        ConnectionPlatform: 'TWITCH' | 'YOUTUBE' | 'DISCORD' | 'KICK';
    };
}>();

export namespace queries {
    export const GetCurrentUser = graphql(`
        query GetCurrentUser {
            user: actor {
                editor_of {
                    permissions
                    user {
                        id
                        connections {
                            id
                            platform
                            emote_set_id
                        }
                    }
                }
            }
        }
    `);

    export const GetEmoteSet = graphql(`
        query GetEmoteSet($id: ObjectID!) {
            emoteSet(id: $id) {
                id
                capacity
                emote_count
                emotes {
                    id
                }
            }
        }
    `);

    export const UpdateEmoteSetCapacity = graphql(`
        mutation UpdateEmoteSetCapacity(
            $id: ObjectID!
            $data: UpdateEmoteSetInput!
        ) {
            emoteSet(id: $id) {
                update(data: $data) {
                    capacity
                }
            }
        }
    `);

    export const ChangeEmote = graphql(`
        mutation ChangeEmote(
            $id: ObjectID!
            $action: ListItemAction!
            $emote_id: ObjectID!
        ) {
            emoteSet(id: $id) {
                emotes(id: $emote_id, action: $action) {
                    __typename
                }
            }
        }
    `);
}

export function gql(env: Env): GraphQLClient {
    return new GraphQLClient('https://7tv.io/v3/gql', {
        errorPolicy: 'none', // make it throw on errors
        headers: {
            Authorization: `Bearer ${env.SEVENTV_JWT}`,
        },
    });
}

type ChangeEmoteVars = VariablesOf<typeof queries.ChangeEmote>;
type EmoteUpdate = {
    action: ChangeEmoteVars['action'];
    emoteSetId: ChangeEmoteVars['id'];
    emotes: ChangeEmoteVars['emote_id'][];
};

// 7tv doesn't like batches of like >10 mutations at once, so we make one ugly jumbo mutation lolol
export async function manualBreathing(
    env: Env,
    update: EmoteUpdate
): Promise<any> {
    const variables = {
        id: update.emoteSetId,
        action: update.action,
    };
    let query =
        'mutation BulkChangeEmote($id: ObjectID!, $action: ListItemAction!';
    for (let i = 0; i < update.emotes.length; i++) {
        variables[`e${i}`] = update.emotes[i];
        query += `, $e${i}: ObjectID!`;
    }
    query += ') { emoteSet(id: $id) {';
    for (let i = 0; i < update.emotes.length; i++) {
        query += ` e${i}: emotes(id: \$e${i}, action: \$action) { __typename }`;
    }
    query += '} }';

    return fetch('https://7tv.io/v3/gql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.SEVENTV_JWT}`,
        },
        body: JSON.stringify({ query, variables }),
    }).then((res) => res.json<any>());
}
