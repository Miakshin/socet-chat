var mongoose = require('mongoose');

var User = require('../models/userSchema');

module.exports.createUser = function (data) {

  var user = new User({
    login: data.login,
    password: data.password,
    name: data.name,
  });

    return user.save();
}
