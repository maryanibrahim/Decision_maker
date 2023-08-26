<<<<<<< Updated upstream
const db = require('../connection');

const Choices = {
  // Method to create a new choice entry
  create: async (poll_id, option1, option1_description, option2, option2_description, option3, option3_description, option4, option4_description) => {
    try {
      const query = `
        INSERT INTO Choices (id, poll_id, option1, option1_description, option2, option2_description, option3, option3_description, option4, option4_description)
        VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8 ,$9)
        RETURNING *;
      `;

      const values = [poll_id, option1, option1_description, option2, option2_description, option3, option3_description, option4, option4_description];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], // Returning the newly created choice object
      };
    } catch (error) {
      throw error;
    }
  },

  // Method to retrieve choices by poll_id
  findByPollId: async (poll_id) => {
    try {
      const query = `
        SELECT *
        FROM choices
        WHERE poll_id = $1;
      `;
      const values = [poll_id];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], // Returning the choices object related to the poll_id
      };
    } catch (error) {
      throw error;
    }
  },
  // Method to retrieve choices by poll_id and format them as an array
  getChoicesForPoll: async (poll_id) => {
    try {
      const query = `
        SELECT *
        FROM choices
        WHERE poll_id = $1;
      `;
      const values = [poll_id];

      const { rows } = await db.query(query, values);
      return [
        rows[0].option1,
        rows[0].option2,
        rows[0].option3,
        rows[0].option4
      ];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Choices;
=======
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
>>>>>>> Stashed changes
