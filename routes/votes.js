const express = require("express");
const router = express.Router();
const Poll = require("../db/queries/pollModel");
const calculateBordaCount = require('../bordaCount');
const User = require('../db/queries/userModel');
const Choices = require('../db/queries/choicesModel');
const { sendSubmissionEmail } = require('../email');


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
      // Fetch choices for the poll
      const pollChoices = await Choices.getChoicesForPoll(returnedPoll.id);
      const jsonData = pollChoices[0];
      const options = jsonData.slice(1, -1).replaceAll('"', '').split(",");

    // Pass both submissionLink and question title to the template
    const templateVars = {
      submissionID: poll.submission_link,
      question_title: poll.title,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3]
    };
    res.render("voter.ejs", templateVars);
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
    console.log(userRankings);

    // Insert user rankings into the votes table
    for (const ranking of userRankings) {
      await Poll.updateVoteForChoice(poll.id, ranking.choice_id, ranking.voter_name, ranking.rank);
    }
    // Fetch the poll creator's email
    const pollCreator = await User.findById(poll.user_id);
    const pollCreatorEmail = pollCreator.email;

    // Send email to poll creator
    sendEmail("Your Poll Has Received a Submission", submissionLink, pollCreatorEmail);
    // render a success message
  const responseMessage = `
      Your vote has been submitted. Click <a href="/">here</a> to go back to the homepage.
    `;

  // Send the response message with the embedded link
  res.send(responseMessage);
  } catch (error) {
    console.error("Error submitting votes:", error);
    res.status(500).send("An error occurred while submitting votes.");
  }
});

module.exports = router;
