
// applicationEvent.server.controller.js

/*
 * Application Event controller
 */

// Model
// =============================================================================
var ApplicationEvent = require('../models/applicationEvent.server.model');

// Create methods
// =============================================================================

/*
 * Save new ApplicationEvent
 */
exports.create = function (type, isError, details) {
  
  var applicationEvent = new ApplicationEvent({
    time_stamp: new Date(),
    type:       type,
    is_error:   isError,
    details:    details
  });

  applicationEvent.save(function(error) {
    if (!error) {
        console.log('Application Event saved'.bgGreen.black);
      }
      else {
        console.log('ERROR: Application Event not saved successfully'.bgRed.black);
      }
  });
  
};

// Get methods
// =============================================================================

/*
 * Get Application Events
 */
exports.getApplicationEvents = function (callback) {
  
  ApplicationEvent.find({})
    .sort('-time_stamp')
    .exec(function(error, results) {
      if (!error) {
        callback(results);
      }
    });
  
};