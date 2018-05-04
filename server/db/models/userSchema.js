var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  login: String,
  password: String,
  name: String,
  friends:
    [
      { id: String }
    ]
  });

module.exports = mongoose.model('User', UsersSchema);
