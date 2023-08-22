const db = require('../connection');

// Get all users
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => data.rows);
};

// Add choices for a poll
const addChoiceToPoll = (poll_id, title, description) => {
  return db.query(`
    INSERT INTO choices (poll_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [poll_id, title, description])
    .then(data => data.rows[0]);
};

// Submit a vote for a choice
const submitVote = (choice_id, rank) => {
  return db.query(`
    INSERT INTO votes (choice_id, rank)
    VALUES ($1, $2)
    RETURNING *;
  `, [choice_id, rank])
    .then(data => data.rows[0]);
};

module.exports = {
  getUsers,
  addChoiceToPoll,
  submitVote
};
