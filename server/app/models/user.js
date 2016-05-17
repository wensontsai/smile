var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  firstName : { type : String },
  lastName : { type : String },
  email : { type : String },
  password: { type : String },
  admin : { type : String }
}));