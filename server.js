
// server.js

// Base setup
// =============================================================================
var express = require('express'),
    config  = require('./server/config/config'),
    CronJob = require('cron').CronJob,
    ImageDownloadService = require('./server/services/imageDownloadService');

// Create express server
var app = express();
var appName = config.appName;
var env = config.env;
var port = config.developmentPort;

// Express setup
require('./server/config/express')(app, __dirname);

// Connect to MongoDB
require('./server/config/mongoose')();

// API
require('./server/api/api')(app);

// Run task manager
require('./server/services/taskManager').runTasks();

// Start the server
app.listen(port);
console.log(appName + ' is running on port: ' + port + '...');
