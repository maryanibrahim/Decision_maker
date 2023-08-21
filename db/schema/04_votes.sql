-- Drop and recreate Votes table
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
<<<<<<< HEAD
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id),
=======
  poll_id SERIAL PRIMARY KEY NOT NULL,
>>>>>>> 409f49a4a026b1ada0798cb1b4597de4c9a86b83
  choice_id INTEGER REFERENCES choices(id),
  voter_name VARCHAR(255) NOT NULL,
  rank INTEGER NOT NULL
);
