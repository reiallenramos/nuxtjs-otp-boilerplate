const seeds = require('./seeds.json')
const models = require('../server/models')

const seedUsers = function(onSuccessCallback, onFailureCallback) {
  models.connectDb().then(async () => {
    await seeds.users.forEach(async user => {
      try {
        const u = new models.User(user);
        await u.save();
        onSuccessCallback();
      } catch(e) {
        onFailureCallback(e);
      }
    })
  });
}

const onSuccess = () => { console.log('Seed complete.') }
const onFailure = (e) => { console.log(e) }
const onDone = () => { models.closeDb(); }

new Promise(seedUsers)
  .then(onSuccess, onFailure).finally(onDone);