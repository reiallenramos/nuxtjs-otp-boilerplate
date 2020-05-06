const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
  }, {
    timestamps: true,
  }, {
    collections: 'users'
  }
);

userSchema.statics.findByEmail = async function (email) {
  let user = await this.findOne({
    email: email,
  });

  return user;
};

const User = mongoose.model('User', userSchema)

module.exports = {
  User,
}