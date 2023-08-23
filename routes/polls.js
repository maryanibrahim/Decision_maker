const express = require("express");
const router  = express.Router();
const db = require('../db/connection');
const Poll = require('../db/queries/pollModel')


router.get("/:id", (req, res) => {
  const pageID = req.params.id;

  // If given ID is admin
  if(pageID.startsWith('admin_')){
    Poll.findAdminID(pageID)
    .then((returnedPoll) => {
      const templateVars = {
        adminID: returnedPoll.admin_link,
        question_title: returnedPoll.title
      }
      // Render the admin page ejs file with templateVars
      res.render("polls", templateVars);
    })


  } else {

    Poll.submissionID(pageID)
    .then((databaseObject) => {
      const templateVars = {
        question_title: databaseObject[question-title],
        choices: databaseObject.choices
      }
          // Render the submission page ejs file with templateVars
      res.render("voter", templateVars);
    });
  }
})

router.post("/:id", (req,res) => {
  const pageID = req.params.id;
  if(pageID.startsWith('admin_')){
    Poll.findAdminID(pageID)
    .then((returnedPoll) => {
      const templateVars = {
        question_title: returnedPoll.title,
      }
      // Render the admin page ejs file with templateVars
      res.render("polls", templateVars);
    })
  } else {

  }



})

module.exports = router;
