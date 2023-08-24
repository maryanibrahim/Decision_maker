-- Drop and recreate Choices table
DROP TABLE IF EXISTS choices CASCADE;

CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id),
  
  option1 VARCHAR(255),
  option1_description TEXT,
  
  option2 VARCHAR(255),
  option2_description TEXT,
  
  option3 VARCHAR(255),
  option3_description TEXT,
  
  option4 VARCHAR(255),
  option4_description TEXT
);
