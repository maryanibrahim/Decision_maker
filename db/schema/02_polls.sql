-- Drop and recreate Polls table
DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  admin_link VARCHAR(255) UNIQUE NOT NULL,
  submission_link VARCHAR(255) UNIQUE NOT NULL
);
