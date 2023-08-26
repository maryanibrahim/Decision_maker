const express = require("express");
const router = express.Router();
const Poll = require('../db/queries/pollModel');

router.get("/:adminID", (req, res) => {
  try {
    const adminID = req.params.adminID;

    // Retrieve poll information
    const returnedPoll = Poll.findAdminID(adminID);

    // Retrieve options with vote counts, ranked from best to worst
    const optionsWithCounts = Poll.getPollResults(adminID);

    const templateVars = {
      adminID: returnedPoll.admin_link,
      question_title: returnedPoll.title,
      options: optionsWithCounts
    };

    res.render("polls", templateVars);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
