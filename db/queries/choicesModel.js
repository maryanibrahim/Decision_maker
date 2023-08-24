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
};

module.exports = Choices;
