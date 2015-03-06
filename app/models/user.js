var Mongoose = require('mongoose');
var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

 var users = new Mongoose.Schema({
    username:  {type: String, unique: true},
    password: String
    // timestamp?
    // note: _id
  });


users.methods.comparePassword = function(attemptedPassword, callback) {
  console.log('password', this.password);
  console.log('attemptedPassword', attemptedPassword);
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

users.methods.hashPassword = function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
};

users.pre('save', function(next){
  users.methods.hashPassword.apply(this, arguments);
});

// users.pre('save', function(next){
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.password, null, null).bind(this)
//     .then(function(hash) {
//       this.password = hash;
//       next();
//     });

// });

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

var User = Mongoose.model('User', users);
module.exports = User;
