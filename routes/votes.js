const express = require("express");
const router = express.Router();
const Poll = require("../db/queries/pollModel");
const calculateBordaCount = require('../bordaCount');

// GET route to display the voting form from submission_link
router.get('/votes/:submissionID', async (req, res) => {

  try {
    const submissionLink = req.params.submissionID; // submission_link is passed as a query parameter
    if (!submissionLink) {
      return res.status(400).send('Submission link is missing');
    }
    // Fetch poll details using the submission ID
    const poll = await Poll.findSubmissionLink(submissionLink);

    if (!poll) {
      return res.status(404).send('Poll not found');
    }

    res.render("voter.ejs", { pollData: poll });
  } catch (error) {
    console.error("Error rendering voter form:", error);
    res.status(500).send("An error occurred while rendering the voter form.");
  }
});

// POST route to handle the submission of votes
router.post('/votes/:submissionID', async (req, res) => {
  try {
    const submissionLink = req.params.submissionID;
    const poll = await Poll.findSubmissionLink(submissionLink);

    if (!poll) {
      return res.status(404).send('Poll not found');
    }
    // Retrieve submissionLink from the hidden input field
    const submittedSubmissionLink = req.body.submissionID;
    const userRankings = calculateBordaCount(poll.choices, req.body); // Assuming req.body contains user's choices and rankings

    // Insert user rankings into the votes table
    for (const ranking of userRankings) {
      await Poll.updateVoteForChoice(poll.id, ranking.choice_id, ranking.voter_name, ranking.rank);
    }

    // render a success message
    res.render("stats.ejs", { message: 'Votes submitted successfully', pollData: poll });
  } catch (error) {
    console.error("Error submitting votes:", error);
    res.status(500).send("An error occurred while submitting votes.");
  }
});

module.exports = router;
