const express = require("express");
const router  = express.Router();
const db = require('../db/connection');
const Poll = require('../db/queries/pollModel')


router.get("/:id", (req, res) => {
    Poll.findAdminID(pageID)
    .then((returnedPoll) => {

      // TO-DO: get all info ffrom DB for results

      const templateVars = {
        adminID: returnedPoll.admin_link,
        question_title: returnedPoll.title
      }
      // Render the admin page ejs file with templateVars
      res.render("polls", templateVars);
    })
});

module.exports = router;
