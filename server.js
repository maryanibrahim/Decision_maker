// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const Poll = require('./db/queries/pollModel');
const Choices = require('./db/queries/choicesModel');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const voterRoutes = require('./routes/votes');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/polls', pollsApiRoutes);
app.use('/users', usersRoutes);
app.use('/admin', adminRoutes);
app.use('/votes', voterRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/votes/:submissionID', (req, res) => {
  let submissionID = req.params.submissionID;

  Poll.findSubmissionLink(submissionID)
    .then(async (returnedPoll) => {

      // Fetch choices for the poll
      const pollChoices = await Choices.getChoicesForPoll(returnedPoll.id);
      const jsonData = pollChoices[0];
      const options = jsonData.slice(1, -1).replaceAll('"', '').split(",");

      const templateVars = {
        question_title: returnedPoll.title,
        submissionID: submissionID,
        option1: options[0],
        option2: options[1],
        option3: options[2],
        option4: options[3]
      }

      res.render("voter.ejs", templateVars)
    })
});

app.get('/polls', (req, res) => {
  res.render('polls');
})

app.get('/stats', (req, res) => {
  res.render('stats');
})
app.post('/votes/:submissionID', async (req, res) => {
  let submissionLink = req.params.submissionID;
  const responseMessage = `
      Your vote has been submitted. Click <a href="/">here</a> to go back to the homepage.
    `;

  // Send the response message with the embedded link
  res.send(responseMessage);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
