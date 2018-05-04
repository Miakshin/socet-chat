var mongoose = require('mongoose');

var url = "mongodb://foo:bar@ds115420.mlab.com:15420/chat-db";

module.exports.setUpConnection =  function setUpConnection() {
  mongoose.connect(url);
  console.log("Succes connection");
}
