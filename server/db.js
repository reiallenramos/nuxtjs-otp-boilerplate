const MongoClient = require('mongodb').MongoClient
const config = require('./config')

function dbInit() {
  MongoClient.connect(`mongodb://${config.MONGO_INITDB_ROOT_USERNAME}:${config.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`, function (err, client) {
    if (err) throw err

    var db = client.db('users_directory')

    db.collection('users').find().toArray(function (err, result) {
      if (err) throw err

      console.log('MongoDB initialized!')
    })
  })
}

module.exports = {
  dbInit
}