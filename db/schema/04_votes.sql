-- Drop and recreate Votes table
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  choice_id INTEGER REFERENCES choices(id),
  rank INTEGER NOT NULL
);
