const dotenv = require('dotenv');

dotenv.config();

const OTP_DURATION = Number(process.env.OTP_DURATION) || 5 * 60;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_DURATION = process.env.JWT_SECRET;
const REDIS_OTP_URI = process.env.REDIS_OTP_URI;
const EMAIL_STRING = process.env.EMAIL_STRING;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

module.exports = {
  OTP_DURATION,
  JWT_SECRET,
  JWT_DURATION,
  REDIS_OTP_URI,
  EMAIL_STRING,
  EMAIL_PASSWORD
}