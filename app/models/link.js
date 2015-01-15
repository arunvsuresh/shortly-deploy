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

linkSchema.on('init', function (model) {
  console.log(model.url);
   model.visits = 0;
   var shasum = crypto.createHash('sha1');
   shasum.update(model.url);
   model.code = shasum.digest('hex').slice(0, 5);
});

var Link = mongoose.model('Link', linkSchema)




// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

var link = new Link({id: 1, url:'google.com', base_url: 'www.google.com', title: 'Google', createdAt: 'January'});
link.save(function (err, link) {
  if (!err) console.log('saved!')
});


module.exports = Link;

