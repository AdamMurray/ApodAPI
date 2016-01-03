
// applicationEventService.js

/*
 * Service for creating and handling application events
 */

// Setup
// =============================================================================
var applicationEventCtrl = require('../controllers/applicationEvent.server.controller');

// Application event service
// =============================================================================
var ApplicationEventService = {};

// ApplicationEventType
// =============================================================================
var ApplicationEventType = {
  apodImage: 'apod_image'
};

// APOD image application event
ApplicationEventService.createApodImageDownloadEvent = function (isError, details) {
  ApplicationEventService.createApplicationEvent(ApplicationEventType.apodImage, isError, details);
};

// Generic application event
ApplicationEventService.createApplicationEvent = function (type, isError, details) {
  applicationEventCtrl.create(type, isError, details);
};

// Exports
// =============================================================================
module.exports = ApplicationEventService;
