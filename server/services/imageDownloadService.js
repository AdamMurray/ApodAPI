
// imageDownloadService.js

/*
 * Service for handling NASA APOD API requests
 */

// Setup
// =============================================================================
var request     = require('request'),
    config      = require('../config/config'),
    ApiRequest  = require('../objects/apiRequest'),
    apodCtrl    = require('../controllers/apod.server.controller'),
    DatesProvider = require('./datesProvider');

// Create new ApiRequest object
var apiRequest = new ApiRequest(config.apiUrl, config.apiKey, config.apiParams);

// ImageDownloadService
var ImageDownloadService = {};

// Functions
// =============================================================================

// Download latest image (using today's date) from the API
// -----------------------------------------------------------------------------
ImageDownloadService.downloadLatestImageFromApodApi = function () {
  var date = DatesProvider.getDateString(new Date());
  var requestUrl = apiRequest.getRequestUrl() + "&date=" + date;

  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      apodCtrl.create(body, date);
    }
  });
};

// Download an image from the API using specified date
// -----------------------------------------------------------------------------
ImageDownloadService.downloadImageFromApodApi = function (date, count) {
  var requestUrl = apiRequest.getRequestUrl() + "&date=" + date;

  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      apodCtrl.create(body, date);
      count++;
    }
  });
};

// Download images from the API using an array of date strings
// -----------------------------------------------------------------------------
ImageDownloadService.downloadImagesFromApodApi = function (dateStrings, callback) {
  // TODO: refactor to get rid of the setInterval method

  // Get the number of dates
  var numberOfDates = dateStrings.length;

  // Download images to database
  var count = 0;
  for (var d in dateStrings) {
    this.downloadImageFromApodApi(dateStrings[d], count);
  }

  // Return results when all images downloaded
  var interval = setInterval(function () {
    if (count >= numberOfDates) {
      console.log("Downloads complete!");
      callback(results);
      clearInterval(interval);
    }
  }, 500);
};

// Exports
// =============================================================================
module.exports = ImageDownloadService;
