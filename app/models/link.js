var Mongoose = require('mongoose');
var db = require('../config');
var crypto = require('crypto');
var Promise = require('bluebird');


var links = new Mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0}
});

links.methods.createSha = function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
};

links.pre('save', function(next){
  links.methods.createSha.apply(this, arguments);
});

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

var Link = Mongoose.model("Link", links);
module.exports = Link;

