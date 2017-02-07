var mongoose = require('mongoose');

var mailSchema = new mongoose.Schema({
  book_id: String,
  book_name: String,
  to: String,
  to_id: String,
  from: String,
  from_id: String,
  content: String,
  state: String, // read or unread
  img_url: String,
  isreject: String, // true or false
  book_state: String
});
var Mail = mongoose.model('Mail', mailSchema);
module.exports = Mail
