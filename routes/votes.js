const express = require("express");
const router = express.Router();
const Poll = require("../db/queries/pollModel");

// GET route to display poll results using Borda Count method
router.get("/:pollId/votes", async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const submissionID = req.params.submissionID;
    const pollData = await Poll.findAdminID(pollId); // Get poll data
    if (!pollData) {
      throw new Error("Poll not found");
    }

    const choices = pollData.choices;
    const votes = await Poll.getVotesForPoll(pollId); // Get votes for the poll

    const results = calculateBordaCount(pollData.choices, submissionData.choices);

    res.render("voter.ejs", { pollData, submissionID, results });
  } catch (error) {
    console.error("Error rendering voter view:", error);
    res.status(500).send("An error occurred while rendering the voter view.");
  }
});

// Function to calculate Borda Count results

function calculateBordaCount(choices, userRankings) {
  // Initialize an object to store choice scores
  const choiceScores = {};

  // Initialize choice scores to zero
  choices.forEach((choice) => {
    choiceScores[choice.id] = 0;
  });

  // Iterate through user rankings and update choice scores based on Borda Count method
  userRankings.forEach((ranking, index) => {
    const choiceId = ranking.choice_id;
    const score = choices.length - index;
    choiceScores[choiceId] += score;
  });

  // Convert choice scores object to an array of { choice, score } objects
  const results = Object.keys(choiceScores).map((choiceId) => ({
    choice: choices.find((choice) => choice.id === parseInt(choiceId, 10)),
    score: choiceScores[choiceId],
  }));

  // Sort results in descending order of scores
  results.sort((a, b) => b.score - a.score);

  return results;
}

module.exports = router;
