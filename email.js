var nodemailer = require('nodemailer');

const sendSubmissionEmail = function(submissionLink, pollCreatorEmail) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vika.lhl20@gmail.com',
      pass: 'rnnvcghsbbnqdxqg'
    }
  });

  var mailContent = {
    from: 'vika.lhl20@gmail.com',
    to: pollCreatorEmail,
    subject: 'Poll Submission Received',
    text: `Hey,\n` +
          `A submission has been received for your poll. Here is the submission link:\n` +
          `Submission Link: http://localhost:8080/poll/votes/${submissionLink}\n` +
          `Cheers`
  };

  transporter.sendMail(mailContent, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  sendSubmissionEmail
};






