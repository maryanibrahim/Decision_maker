var nodemailer = require('nodemailer');


let sendEmail = function(subject, adminID, submissionID, email){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vika.lhl20@gmail.com',
      pass: 'rnnvcghsbbnqdxqg'
    }
  });

  var mailOptions = {
    from: 'vika.lhl20@gmail.com',
    to: email,
    subject: subject,
    text: `Hey, \n` +
          `Here is your Poll links:\n` +
          `   Admin Link: http://localhost:8080/poll/${adminID}` +
          `   Submission Link: http://localhost:8080/votes/${submissionID} \n`  +
          `Cheers`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Function to send submission email
let sendSubmissionEmail = function(submissionLink, pollCreatorEmail) {
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
    text: `Hey, \n` +
          `A submission has been received for your poll. Here is the submission link:\n` +
          `Submission Link: http://localhost:8080/poll/votes/${submissionLink} \n` +
          `Cheers`
  };

  transporter.sendMail(mailContent, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Submission Email sent: ' + info.response);
    }
  });
};



module.exports = {
  sendEmail,
  sendSubmissionEmail
};





