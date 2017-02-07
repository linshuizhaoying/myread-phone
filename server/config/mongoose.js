const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongooseDB = function () {
  // mongoose.connect('mongodb://23.88.229.24:27017/drift')
  mongoose.connect('mongodb://127.0.0.1:27017/drift')
  return mongoose.connection
}

module.exports = mongooseDB
