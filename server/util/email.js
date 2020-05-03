const nodemailer  = require('nodemailer')
const config = require('../config')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_STRING,
    pass: config.EMAIL_PASSWORD,
  }
})

var mailOptions = {
  from: config.EMAIL_STRING,
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