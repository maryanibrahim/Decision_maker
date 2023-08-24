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
  submissionID: async (submission_link) => {
    try {
      //query to insert into polls table
      const query = `
        SELECT *
        FROM polls
        WHERE submission_link = $1;
      `;
      // values to be inserted into the query
      const values = [submission_link];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], //Returning the newly created poll object
      };
    } catch (error) {
      throw error;
    }
  },

  getVotesForPoll: async (pollId) => {
    try {
      const query = `
        SELECT choice_id, voter_name, rank
        FROM votes
        WHERE poll_id = $1;
      `;
      const values = [pollId];

      const { rows } = await db.query(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  }

};

module.exports = Poll;
