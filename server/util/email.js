const nodemailer  = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'reiallenramos@gmail.com',
    pass: 'xjmwhactbztvfrbl',
  }
})

const mailOptions = {
  from: 'reiallenramos@gmail.com',
  to: 'reiallenramos@gmail.com',
  subject: 'test',
  text: 'Hello world!'
}

function sendOTP() {
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