const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config()

// For storing OTPs
const otpClient = redis
  .createClient({
    url: process.env.REDIS_OTP_URI,
  })
  .on('connect', () => {
    console.log('otpClient connected')
  })
  .on('error', (error) => {
    console.log(`otpClient error:${error}`)
  })

module.exports = {
  otpClient
}