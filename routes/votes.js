const express = require("express");
const router = express.Router();
const db = require('../db/connection');
const Poll = require('../db/queries/pollModel');

router.post("votes/:pollId", async (req, res) => {
  try {
    const pollId = req.params.pollId;

    // Initialize an array to hold the rankings
    const rankings = []; //rank 4 = column 4 = best

    // Loop through the form data to extract user rankings
    for (let i = 1; i <= 4; i++) {
      const selectedChoiceId = parseInt(req.body[`option${i}`], 10); // Get the selected choice ID
      rankings.push({ choice_id: selectedChoiceId, rank: i });
    }

    // Update vote counts based on user rankings
    for (const ranking of rankings) {
      const { choice_id, rank } = ranking;
      await Poll.updateVoteForChoice(pollId, choice_id, rank);
    }

    res.redirect(`/polls/stat-view${pollId}`); // **Assuming it redirect to the stat-view page
  } catch (error) {
    console.error('Error submitting votes:', error);
    res.status(500).send('An error occurred while submitting votes.');
  }
});

module.exports = router;
