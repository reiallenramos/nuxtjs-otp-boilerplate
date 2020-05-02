const nodemailer  = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_STRING,
    pass: process.env.EMAIL_PASSWORD,
  }
})

var mailOptions = {
  from: process.env.EMAIL_STRING,
  to: '',
  subject: 'OTP',
  text: ''
}

function sendOTP(recipientEmail, otp) {
  mailOptions.to = recipientEmail;
  mailOptions.text = `Your OTP is ${otp}`
  transporter.sendMail(mailOptions, function(err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  })
}

module.exports = {
  sendOTP
}