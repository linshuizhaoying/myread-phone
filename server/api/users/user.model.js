var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  nickname: String,
  password: String,
  address: String,
  avatar: String
});
var User = mongoose.model('User', userSchema);
module.exports = User
