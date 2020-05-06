const mongoose = require('mongoose')
const config = require('../config')
const { User } = require('./user')

const connectDb = () => {
  return mongoose.connect(config.MONGO_URI);
};

module.exports = {
  connectDb,
  User,
}