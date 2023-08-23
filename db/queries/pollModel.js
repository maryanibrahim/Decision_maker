const db = require('../connection');

const Poll = {
  // the create method is used to create a new poll
  create: async (user_id, title, admin_link, submission_link) => {
    try {
      //query to insert into polls table
      const query = `
        INSERT INTO polls (id, user_id, title, admin_link, submission_link)
        VALUES (DEFAULT, $1, $2, $3, $4)
        RETURNING *;
      `;
      // values to be inserted into the query
      const values = [user_id, title, admin_link, submission_link];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], //Returning the newly created poll object
      };
    } catch (error) {
      throw error;
    }
  },
  findAdminID: async (admin_link) => {
    try {
      //query to insert into polls table
      const query = `
        SELECT *
        FROM polls
        WHERE admin_link = $1;
      `;
      // values to be inserted into the query
      const values = [admin_link];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], //Returning the newly created poll object
      };
    } catch (error) {
      throw error;
    }
  },

  getAdminData: async (adminLink) => {
    try {
      // Query to retrieve admin data from the polls table
      const query = `
        SELECT * FROM polls
        WHERE admin_link = $1;
      `;
      const values = [adminLink];

      const { rows } = await db.query(query, values);

      if (rows.length === 0) {
        return null; // No matching admin data found
      }

      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  // Method to get submission data by submission link
  getSubmissionData: async (submissionLink) => {
    try {
      // Query to retrieve submission data from the polls table
      const query = `
      SELECT title, submission_link FROM polls
      WHERE submission_link = $1;
    `;
      const values = [submissionLink];

      const { rows } = await db.query(query, values);

      if (rows.length === 0) {
        return null; // No matching submission data found
      }

      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  // Method to update vote count for a choice in the votes table
  updateVoteForChoice: async (pollId, choiceId, voterName, rank) => {
    try {
      const query = `
        INSERT INTO votes (poll_id, choice_id, voter_name, rank)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (poll_id, choice_id, voter_name) DO UPDATE
        SET rank = EXCLUDED.rank;
      `;
      const values = [pollId, choiceId, voterName, rank];

      await db.query(query, values);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Poll;
