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
          `   Admin Link: http://localhost:8080/admin/${adminID}` +
          `   Submission Link: http://localhost:8080/votes/${submissionID} \n` +
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





