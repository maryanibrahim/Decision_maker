const express = require("express");
const router  = express.Router();
const db = require('../db/connection');
const Poll = require('../db/queries/pollModel')


router.get("/:id", (req, res) => {
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
    // res.render("adminPoll.ejs", templateVars);
  } else {
    /*
    Poll.findAdminID(admin_id)
    .then((databaseObjet) => {
      res.render("poll.ejs", templateVars);
    });
    */

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
