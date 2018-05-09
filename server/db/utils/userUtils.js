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
          { id: user._id, name: user.name } :
          false;
      }
      return false;
    });
};

module.exports.addToFriedns = function (currentUserId, target) {
  User.findById(currentUserId,(err,user)=>{
    if(err){ return(err) };
    user.friends = [...User.friends, target];
    user.save()
    return user
  })
};
