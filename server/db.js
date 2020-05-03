const MongoClient = require('mongodb').MongoClient
const config = require('./config')
const url = `mongodb://${config.MONGO_INITDB_ROOT_USERNAME}:${config.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`;

function dbInit() {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err

    var db = client.db('users_directory')

    db.collection('users').find().toArray(function (err, result) {
      if (err) throw err

      console.log('MongoDB initialized!')
      client.close();
    })
  })
}

const findDocuments = function(db, callback) {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err

    const collection = client.db(db).collection('users');
    collection.find({}).toArray(function(err, docs) {
      client.close();
      callback(docs);
    });
  });
}

function addUser(email) {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    var db = client.db('users_directory');
    var newUser = { email: email };
    db.collection('users').insertOne(newUser, (err, res) => {
      if (err) throw err;
      console.log(`1 document inserted: ${email}`);
      client.close();
    })
  })
}

module.exports = {
  dbInit,
  findDocuments,
  addUser,
}