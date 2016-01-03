
// express.js

/*
 * Express server configuration
 */

// Base setup
// =============================================================================
var express     = require('express'),
    bodyParser  = require('body-parser');

// Configuration
// =============================================================================
module.exports = function (app, rootPath) {

  // Set up body parser middleware
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

};
