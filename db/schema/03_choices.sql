-- Drop and recreate Choices table
DROP TABLE IF EXISTS choices CASCADE;

CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id),

  option1 VARCHAR(255),


  option2 VARCHAR(255),


  option3 VARCHAR(255),


  option4 VARCHAR(255),

);
