var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  book_name: String,
  type: String,
  book_age: String,
  exchange_type: String,
  exchange_content: String,
  master: String,
  mastername: String,
  state: String,
  img_url: String,
  create_time: String,
  borrow_time: String,
  reader: String
});
var Book = mongoose.model('Book', bookSchema);
module.exports = Book
