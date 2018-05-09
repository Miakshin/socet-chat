const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  login: String,
  password: String,
  name: String,
  friends:
    [
      {
        id: String,
        name: String,
      },
    ],
});

module.exports = mongoose.model('User', UsersSchema);
