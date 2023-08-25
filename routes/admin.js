const express = require("express");
const router = express.Router();
const Poll = require('../db/queries/pollModel');

router.get("/:id", async (req, res) => {
  try {
    const pageID = req.params.id;
    
    // Retrieve poll information
    const returnedPoll = await Poll.findAdminID(pageID);
    
    // Retrieve options with vote counts, ranked from best to worst
    const optionsWithCounts = await Poll.getPollResults(pageID);

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