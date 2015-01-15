var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');


var linkSchema = mongoose.Schema({
    id: Number,
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: Number,
    createdAt: Date
});

linkSchema.pre('save', function (next) {
  this.visits = 0;
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = mongoose.model('Link', linkSchema)


module.exports = Link;

