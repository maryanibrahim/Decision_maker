/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/queries/users.js');
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
    /*
    db.createPoll(newUser.email, newUser.name, newAdminID, newSubmissionID)
    .then((result)=>{
      console.log("we are in the promise back after creating the poll ",result


      res.redirect(`/polls/${newAdminID}`);
    });
    */
    res.redirect(`/polls/${newAdminID}`);

  }
});



