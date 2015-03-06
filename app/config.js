var Mongoose = require('mongoose');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

Mongoose.connect('mongodb://localhost/shortlyDB1');
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('yay!');
});
  // yay!
  // var Schema = Mongoose.Schema;

  // var urls = new Schema({
  //   url:  String,
  //   base_url: String,
  //   code:   String,
  //   title:  String,
  //   visits: Number
  //   // timestamp?
  //   // note: _id
  // });

  // var users = new Schema({
  //   username:  String,
  //   password: String
  //   // timestamp?
  //   // note: _id
  // });

  // users.on('init', function (model) {
  //   model.hashPassword();
  // });

  // users.methods.comparePassword = function(attemptedPassword, callback) {
  //   bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
  //     callback(isMatch);
  //   });

  // users.methods.hashPassword = function(){
  //     var cipher = Promise.promisify(bcrypt.hash);
  //     return cipher(this.password, null, null).bind(this)
  //       .then(function(hash) {
  //         this.password = hash;
  //       });
  //   };

  // var Users = Mongoose.model('Users', users);
  // var silence = new Users({ username: 'Silence', password: 'password' });
  // silence.save();

//   var Urls = db.model('Urls', urls);
//   var google = new Urls({
//     url: '',
//     base_url: 'www.google.com',
//     code: 'asdfg',
//     title: 'get lucky!',
//     visits: 0
//   });
//   google.save();

//   var googl = new Urls({
//     url: '',
//     base_url: 'www.googl.com',
//     code: 'asdfg',
//     title: 'get lucky!',
//     visits: 0
//   });
//   googl.save();

// });

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = db;
