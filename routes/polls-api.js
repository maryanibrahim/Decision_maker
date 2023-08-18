/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    // SQL query to fetch all polls from the database
    const query = `SELECT * FROM polls`;
    const { rows } = await db.query(query);

    // Send the retrieved poll data as a JSON response
    res.json(rows);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ error: 'An error occurred while fetching polls.' });
  }
});

module.exports = router;

module.exports = router;
