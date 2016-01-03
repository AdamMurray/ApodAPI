
// api.js

// Controllers
// =============================================================================
var apodCtrl = require('../controllers/apod.server.controller'),
    searchCtrl = require('../controllers/search.server.controller'),
    appEventCtrl = require('../controllers/applicationEvent.server.controller.js'),
    express = require('express'),
    config = require('../config/config'),
    colors = require('colors'),
    util = require('util'),
    CronJob = require('cron').CronJob;

// API
// =============================================================================
module.exports = function (app) {
  
  var router = express.Router();
  
  // Middleware to use for all routes
  router.use(function(req, res, next) {
    console.log(' Request made to: %s%s '.bgCyan.black, req.baseUrl, req.path);
    next();
  });
  
  // Root path
  router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the APOD API' });
  });

  // Images Routes
  // ---------------------------------------------------------------------------
  router.route('/images')
  
    // Get images (accessed at GET http://[domain]/api/images):
    //  > if query contains a search string, return search results
    //  > if query contains no search string, return results based on offset and number to get
    //  > otherwise, return all images
    .get(function(req, res) {
      
      var searchString = req.query.search_string;
      var offset = req.query.offset;
      var numberToGet = req.query.number_to_get;

      // Get results of search
      if (searchString && offset && numberToGet) {
        apodCtrl.getImagesWithTitleText(searchString, offset, numberToGet, function(results) {
          console.log(('Downloading images containing ' + searchString).bgMagenta);
          res.json(results);
        });
      }
      // Get specified number of images using offset
      else if (offset && numberToGet) {
        apodCtrl.getImages(offset, numberToGet, function(results) {
          var message = ('Downloading ' + numberToGet + ' images').bgMagenta;
          console.log(message);
          res.json(results);
        });
      }
      // Get all images
      else {
        console.log('Downloading all images'.bgMagenta);
        apodCtrl.getAllImages(function(results) {
          res.json(results);
        })
      }

    });

  // Search Suggestions Routes
  // ---------------------------------------------------------------------------
  router.route('/search-suggestions')
  
    // Get search suggestions (accessed at GET http://[domain]/api/search-suggestions)
    .get(function(req, res) {
      searchCtrl.getSearchSuggestions(function(results) {
        res.json(results);
      });
    })
    
    // Create new search suggestion (accessed at POST http://[domain]/api/search-suggestions)
    .post(function(req, res) {
      searchCtrl.create(req.body.searchText);
    });
  
  // Application Events Routes
  // ---------------------------------------------------------------------------
  router.route('/application-events')
  
    // Get application events (accessed at GET http://[domain]/api/application-events)
    .get(function(req, res) {
      appEventCtrl.getApplicationEvents(function(results) {
        res.json(results);
      });
    });
  
  // Register API routes
  // ---------------------------------------------------------------------------
  app.set('json spaces', 2);
  app.use('/api', router);

};
