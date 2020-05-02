const redis = require('redis');
const config = require('./config');

// For storing OTPs
const otpClient = redis
  .createClient({
    url: config.REDIS_OTP_URI,
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