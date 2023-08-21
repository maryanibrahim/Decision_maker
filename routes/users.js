/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/queries/users');
const router  = express.Router();

function generateRandomString() {
  // found the solution on stackOverFlow
  return Array.from(Array(6), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

router.get('/', (req, res) => {
  res.render('users');
});

router.get("/", (req, res) => {
  const templateVars = {
    user: users[req.session.user_id]
  };
  res.render("users", templateVars);
});

router.post("/", (req, res) => {
  const newUser = {
    email:req.body.email,
    name:req.body.name,
    question_title:req.body.question_title
  }
  console.log("email:" + newUser.email);
  if (newUser.email === "" || newUser.name === "" || newUser.question_title === "") {
    return res.status(400).send("Please fill in all the fileds");
  } else {
    // Generate ID's for both admin page and normal page
    let newAdminID = 'admin_' + generateRandomString();
    let newSubmissionID = generateRandomString();

    // Create an entry in the Database
    // need ask maryan to add name parameter
    createPoll(newUser.email, newUser.name, newAdminID, newSubmissionID);

    res.redirect(`/polls/${newAdminID}`);
  }
});


// VIKA ADJUSTMENT
router.get("/polls/:id", (req, res) => {
  const pageID = req.params.id;

  // If given ID is admin
  if(pageID.startsWith('admin_')){
    //check database if adminID exist
    // if it exist put it in a variable
    let databaseObject;

    const templateVars = {
      email: databaseObject.email,
      name: databaseObject.name,
      question_title: databaseObject.question_title,
      choices: databaseObject.choices
    }
    // Render the admin page ejs file with templateVars
    res.render("admin.ejs", templateVars);
  } else {  // Given id is submissionID
    //check database if submissionID exist
    // if it exist put it in a variable
    let databaseObject;

    const templateVars = {
      question_title: databaseObject.question_title,
      choices: databaseObject.choices
    }
    // Render the submission page ejs file with templateVars
    res.render("voter.ejs", templateVars);
  }
});














module.exports = router;
