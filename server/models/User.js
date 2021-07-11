const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const profileSchema = require('./Profile');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'username is not unique'],
      required: [true, 'username is required'],
      trim: true
    },
    email: {
      type: String,
      unique: [true, 'email is not unique'],
      required: [true, 'email is required'],
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: [5, "Password must atleast be 5 characters long"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    profile: [profileSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
