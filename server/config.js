const dotenv = require('dotenv');

dotenv.config();

const OTP_DURATION = Number(process.env.OTP_DURATION) || 5 * 60;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_DURATION = process.env.JWT_SECRET;
const REDIS_OTP_URI = process.env.REDIS_OTP_URI;
const EMAIL_STRING = process.env.EMAIL_STRING;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const SERVER_HOST = process.env.SERVER_HOST;

module.exports = {
  OTP_DURATION,
  JWT_SECRET,
  JWT_DURATION,
  REDIS_OTP_URI,
  EMAIL_STRING,
  EMAIL_PASSWORD,
  MONGO_URI,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  SERVER_HOST,
}