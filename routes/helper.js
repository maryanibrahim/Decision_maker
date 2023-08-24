var nodemailer = require('nodemailer');


let sendEmail = function(subject, adminID, submissionID, email){
  var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'viktoria.lhl@myyahoo.com',
      pass: 'lhl.123123'
    }
  });

  var mailOptions = {
    from: 'viktoria.lhl@myyahoo.com',
    to: email,
    subject: subject,
    text: `Hey, \n` +
          `Here is your Poll links:\n` +
          `   Admin Link: http://localhost:8080/poll/${adminID}` +
          `   Submission Link: http://localhost:8080/votes/${submissionID}` +
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

module.exports = {
  sendEmail
}





