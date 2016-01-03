
// mongoose.js

/*
 * Mongoose configuration
 */

// Imports
var mongoose  = require('mongoose'),
    colors    = require('colors');

module.exports = function () {

  // Get username and password from config vars or
  // from a config file (if it exists)
  var username = process.env.NASA_MONGODB_USERNAME || require('./sensitiveCredentials').mongodbUsername;
  var password = process.env.NASA_MONGODB_PASSWORD || require('./sensitiveCredentials').mongodbPassword;

  // Connect to MongoDB
  var databaseUri = 'mongodb://ds047762.mongolab.com:47762/nasaapod';
  var connectionOptions = {
    user: username,
    pass: password
  };
  mongoose.connect(databaseUri, connectionOptions);

  // Log issues with DB connection
  var db = mongoose.connection;

  // Call on error
  db.on('error', function (err) {
    console.log('mongodb connection error: %s'.bgRed.black, err);
    // process.exit();
  });
  // Call once open
  db.once('open', function () {
    console.log('Successfully connected to mongodb'.bgGreen.black);
    // app.emit('dbopen');
  });

};
