
// taskManager.js

// Setup
// =============================================================================
var CronJob     = require('cron').CronJob,
    config      = require('../config/config'),
    ImageDownloadService = require('./imageDownloadService');

// Task manager
// =============================================================================

// Runs all tasks
var runTasks = function () {

  // Download new image every day
  new CronJob(config.imageDownloadCronString, function () {

      ImageDownloadService.downloadLatestImageFromApodApi();

    },
    null,
    true, // start the job straight away
    'Europe/London'
  );

};

// Exports
// =============================================================================
module.exports.runTasks = runTasks;
