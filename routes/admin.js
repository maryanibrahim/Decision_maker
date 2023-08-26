const express = require("express");
const router = express.Router();
const Poll = require('../db/queries/pollModel');
const Choices = require("../db/queries/choicesModel");

router.get("/:adminID", (req, res) => {
  try {
    const adminID = req.params.adminID;
    if (!adminID) {
      return res.status(400).send('Admin link is missing');
    }

    // Retrieve poll information
    const returnedPoll = Poll.findAdminID(adminID);

    // Retrieve options with vote counts, ranked from best to worst
    const optionsWithCounts = Poll.getPollResults(adminID);

    const templateVars = {
      adminID: returnedPoll.admin_link,
      question_title: returnedPoll.title,
      options: optionsWithCounts
    };

    res.render("stats", templateVars);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});



// router.post('/stats/:adminID', (req, res) => {
//   try {
//     const adminLink = req.params.adminID;
//     const results =  Poll.getPollResults(Choices);

//   }
//   catch (error) {
//     console.error("Error ", error);
//     res.status(500).send("An error occurred.");
//   }
// })



module.exports = router;
