declare interface Env {
    APP_HOST: string;
    SPELLS_EMOTE_SET_ID: string;

    SEVENTV_JWT: string;
    TWITCH_CLIENT_ID: string;
    TWITCH_CLIENT_SECRET: string;

    ASSETS: Fetcher;
    DB: D1Database;
    CB_RATELIMIT: RateLimit;
}
