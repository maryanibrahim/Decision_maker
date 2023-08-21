const express = require("express");
const router  = express.Router();
const db = require('../db/connection');
const Poll = require('../db/queries/pollModel')

// Function to generate a random user ID
function generateRandomUserId() {
  return Math.floor(Math.random() * 100000);
}
router.get('/', (req, res) => {
  res.render('index') // Polls to create on index page
})
router.post('/', async (req, res) => {
  try {

    const {email, name, question_title} = req.body; // Get the title from the request body

    // Call the Poll's create method to create a new poll
    const newPoll = await Poll.create(title);

    res.redirect('/polls', { poll: newPoll });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).send('An error occurred while creating the poll.');
  }
});

module.exports = router;

module.exports = router;
