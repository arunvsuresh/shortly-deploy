var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    createdAt: Date
});


userSchema.pre('save', function (next) {
  this.hashPassword(next);
});


userSchema.methods.hashPassword = function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
      next();
    });
}

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
}

var User = mongoose.model('User', userSchema)


// var user = new User({id: 1, username: 'andy', password: 'power', createdAt: new Date()})
// user.save();

module.exports = User;
