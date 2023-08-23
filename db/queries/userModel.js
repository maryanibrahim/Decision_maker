const db = require('../connection');

const User = {
  // the create method is used to create a new poll
  create: async (email, name) => {
    try {
      //query to insert into polls table
      const query = `
        INSERT INTO users (id, email, name)
        VALUES (DEFAULT, $1, $2)
        RETURNING *;
      `;
      // values to be inserted into the query
      const values = [email, name];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], //Returning the newly created poll object
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;
