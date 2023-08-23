/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const Poll = require('../db/queries/pollModel');
const User = require('../db/queries/userModel');

function generateRandomString() {
  // found the solution on stackOverFlow
  return Array.from(Array(6), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

router.get('/', (req, res) => {
  res.render('users');
});


router.post("/", (req, res) => {
  const newUser = {
    email: req.body.email,
    name: req.body.name,
    question_title: req.body["question-title"],
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4
  }

  if (newUser.email === "" || newUser.name === "" || newUser.question_title === "") {
    return res.status(400).send("Please fill in all the fileds");
  } else {
    // Generate ID's for both admin page and normal page
    let newAdminID = generateRandomString();
    let newSubmissionID = generateRandomString();

    /*
    SEND EMAIL to newUser.email with the Admin and Submission Links
    */

    // Create the user data in Database
    User.create(newUser.email, newUser.name)
    .then((createdUser) => {
      // Wait until db object returns
      let userID = createdUser.id;

      // Create the new poll in Database using userID from previous call
      Poll.create(userID, newUser.question_title, newAdminID, newSubmissionID)
      .then((createdPoll) => {
        let pollID = createdPoll.id;
        // Create the new Choices entry in Database using
        Choices.create(pollID, /* no need title */ option1, option2, option3, option4 /*NO DESCRIPTION NEEDED*/)
        .then((createdChoices) => {
          res.status(500).send("Your Poll created succesfully! Please check your email for Admin Link and Submission Link.");
        })
        .catch((error) => {
          console.error('Error creating Choices:', error);
          res.status(500).send("An error occurred while creating the Choices.");
        })

      })
      .catch((error) => {
        console.error('Error creating poll:', error);
        res.status(500).send("An error occurred while creating the poll.");
      })
    })
    .catch((error) => {
      console.error('Error creating User:', error);
      res.status(500).send("An error occurred while creating the User.");
    })


  }
});

module.exports = router;


