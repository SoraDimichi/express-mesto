const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /^https?:\/\/(www\.)?[a-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/i
          .test(link);
      },
    },
  },
}, { versionKey: false });

const user = mongoose.model('user', userSchema);
module.exports = user;
