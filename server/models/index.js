const mongoose = require('mongoose')
const config = require('../config')
const { User } = require('./user')

// address deprecations
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const connectDb = () => {
  return mongoose.connect(config.MONGO_URI);
};

const closeDb = () => {
  console.log('Closing connection...')
  return mongoose.connection.close();
}

module.exports = {
  connectDb,
  closeDb,
  User,
}