const mongoose = require('mongoose');

const User = require('../models/userSchema');

module.exports.createUser = function (data) {
  const user = new User({
    login: data.login,
    password: data.password,
    name: data.name,
  });

  return user.save();
};

module.exports.checkUserMatch = function (data) {
  return new Promise((resolve, reject) => {
    resolve(User.findOne({ login: data.login }));
  })
    .then((user) => {
      if (user) {
        return user.password === data.pass ?
          { id: user._id,
            name: user.name,
            login: user.login,
            friends: user.friends} :
          false;
      }
      return false;
    });
};

module.exports.addToFriedns = function (currentUserId, target) {
  return new Promise((resolve, reject) => {
    User.findById(currentUserId, (err, user) => {
      if (err) { reject(err) }
      user.friends = [...user.friends, target];
      user.save();
      resolve(user.friends);
    });
  })
};

module.exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) { reject(err) }
      resolve({
        name: user.name,
        id: user.id,
        friends: user.friends,
        login: user.login
      })
    })
  })
}
