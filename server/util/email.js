const nodemailer  = require('nodemailer')
const otp = require('./otp')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'reiallenramos@gmail.com',
    pass: 'xjmwhactbztvfrbl',
  }
})

var mailOptions = {
  from: 'reiallenramos@gmail.com',
  to: '',
  subject: 'OTP',
  text: `Your OTP is ${otp.generate()}`
}

function sendOTP(recipientEmail) {
  mailOptions.to = recipientEmail;
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