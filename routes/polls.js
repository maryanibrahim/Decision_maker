const express = require("express");
const router  = express.Router();
const db = require('../db/connection');
const Poll = require('../pollModel')

// Function to generate a random user ID
function generateRandomUserId() {
  return Math.floor(Math.random() * 100000);
}

router.get('/', async (req, res) => {
  try {

    const title = req.body.title; // Get the title from the request body (assumes needs to change based on html)

    // Call the Poll's create method to create a new poll
    const newPoll = await Poll.create(title);

    res.render('index', { poll: newPoll });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).send('An error occurred while creating the poll.');
  }
});





module.exports = router;
