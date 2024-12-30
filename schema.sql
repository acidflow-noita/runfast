-- to seed the db run
-- `npx wrangler d1 execute noita-emotes-db --remote --file=schema.sql`
-- (drop the --remote to init local dev db instead)
--
-- Some useful queries:
-- wrangler d1 execute noita-emotes-db --local --command 'SELECT id, action, emote_set_id FROM emote_batches;' # show the queue
-- wrangler d1 execute noita-emotes-db --local --command 'DELETE FROM emote_batches;' # cleanup
-- wrangler d1 execute noita-emotes-db --local --command 'DROP TABLE emote_batches;' # on schema changes

CREATE TABLE IF NOT EXISTS emote_batches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    emote_set_id TEXT NOT NULL,
    emote_ids TEXT NOT NULL
);

-- we dont expect this to ever contain like >100 records, ever,
-- so I'm not sure the overhead of an index is worth it lol
CREATE INDEX IF NOT EXISTS idx_emote_batches_emote_set_id ON emote_batches (emote_set_id);
