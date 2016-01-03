
// apod.server.controller.js

/*
* APOD controller
*/

// Model
// =============================================================================
var Apod                    = require('../models/apod.server.model'),
    ApplicationEventService = require('../services/applicationEventService');

// Create methods
// =============================================================================

/*
 * Save new APOD
 */
exports.create = function (body, date) {

  var bodyJson = JSON.parse(body);

  /*
   * Save new entry in DB if doesn't already exist
   */
  Apod.find({})
    .where('url', bodyJson.url)
    .exec(function(err, results) {
    if (results && results.length === 0) {

      var apod = new Apod({
        url:          bodyJson.url,
        date:         new Date(date),
        media_type:   bodyJson.media_type,
        explanation:  bodyJson.explanation,
        // concepts:     bodyJson.concepts.split(','),
        title:        bodyJson.title
      });

      apod.save(function(error) {
        if (!error) {
          var details = 'APOD image for ' + date + ' SAVED';
          ApplicationEventService.createApodImageDownloadEvent(false, details);
          console.log(details);
        }
        else {
          var details = 'ERROR: APOD image for ' + date + ' NOT SAVED';
          ApplicationEventService.createApodImageDownloadEvent(true, details);
          console.log(details);
        }
      });
    }
    else {
      var details = 'APOD image for ' + date + ' ALREADY IN DB';
      ApplicationEventService.createApodImageDownloadEvent(false, details);
      console.log(details);
    }
  });
};

// Get methods
// =============================================================================

/*
 * Get all images
 */
exports.getAllImages = function (callback) {

  Apod.find({})
  .sort('-date')
  .exec(function(error, results) {
    if (!error) {
      callback(results);
    }
  });

};

/*
 * Get a specified number of images using an offset
 */
exports.getImages = function (offset, numberToGet, callback) {

  Apod.find({})
  .sort('-date')
  .skip(offset)
  .limit(numberToGet)
  .exec(function(error, results) {
    if (!error) {
      callback(results);
    }
  });

};

/*
 * Get images where title text contains specified string
 */
exports.getImagesWithTitleText = function (searchString, offset, numberToGet, callback) {

  console.log('You searched for: ' + searchString);

  Apod.find({
    "title": {
      "$regex": searchString,
      "$options": "i"
    }
  })
  .sort('-date')
  .skip(offset)
  .limit(numberToGet)
  .exec(function(error, results) {
    if (!error) {
      callback(results);
    }
  });

};

/*
 * Get images where explanation text contains specified string
 */
exports.getImagesWithExplanationText = function (searchString, callback) {

  console.log('You searched for: ' + searchString);

  Apod.find({
    "explanation": {
      "$regex": searchString,
      "$options": "i"
    }
  })
  .sort('-date')
  .exec(function(error, results) {
    if (!error) {
      callback(results);
    }
  });

};
