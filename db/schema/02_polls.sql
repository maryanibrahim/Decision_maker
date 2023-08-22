-- Drop and recreate Polls table
DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  admin_link VARCHAR(255) UNIQUE NOT NULL,
  submission_link VARCHAR(255) UNIQUE NOT NULL
);
