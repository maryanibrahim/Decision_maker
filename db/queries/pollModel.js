const db = require('../connection');

const Poll = {
  // the create method is used to create a new poll
  create: async (email, name, title, admin_link, submission_link) => {
    try {
      //query to insert into polls table
      const query = `
        INSERT INTO polls (user_id, title, admin_link, submission_link)
        VALUES (DEFAULT, $1, $2, $3)
        RETURNING *;
      `;
      // values to be inserted into the query
      const values = [title, admin_link, submission_link];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], //Returning the newly created poll object
        newAdminID: admin_link //Adds the newAdminID property
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Poll;
