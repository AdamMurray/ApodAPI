
// databasePopulator.js

/*
 * Populates the database with APOD image data
 */

// Setup
// =============================================================================
var DatesProvider         = require('../../services/datesProvider'),
    ImageDownloadService  = require('../../services/imageDownloadService');

// Mongoose db
// =============================================================================
var mongoose  = require('mongoose');

// Get MongoDB credentials
var username = process.env.NASA_MONGODB_USERNAME || require('../../config/sensitiveCredentials').mongodbUsername;
var password = process.env.NASA_MONGODB_PASSWORD || require('../../config/sensitiveCredentials').mongodbPassword;

// Connect to MongoDB
var databaseUri = 'mongodb://ds047762.mongolab.com:47762/nasaapod';
var connectionOptions = {
  user: username,
  pass: password
};
mongoose.connect(databaseUri, connectionOptions);

// Download images
// =============================================================================

if (process.argv[2].indexOf('all') != -1) {
  // Get all APOD images
  var dateOfFirstApodImage = 'June 16 1995';
  var dates = DatesProvider.getDatesFromTodayUntilDate(dateOfFirstApodImage);
  var dateStrings = DatesProvider.getDateStrings(dates);

  ImageDownloadService.downloadImagesFromApodApi(dateStrings, function (results) {
    // TODO: add logging
  });
}
else if (process.argv[2].indexOf('month') != 1) {
  // Get last months's APOD images
  var dates = DatesProvider.getDatesBetweenTodayAndLastMonth();
  var dateStrings = DatesProvider.getDateStrings(dates);

  ImageDownloadService.downloadImagesFromApodApi(dateStrings, function (results) {
    // TODO: add logging
  });
}
else {
  console.log('You need to specify "all" or "month"');
}
