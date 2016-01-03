
// search.server.controller.js

/*
 * Searches controller
 */

// Model
// =============================================================================
var Search        = require('../models/search.server.model'),
    // SpellChecker  = require('../services/spellChecker'),
    colors        = require('colors');

// Create methods
// =============================================================================

/*
 * Save new Search
 */
exports.create = function (searchText) {

  // Save search text if it is spelled correctly
  // SpellChecker.saveWordIfSpelledCorrectly(searchText, saveSearch);
  
  saveSearch(searchText);

  // Save new search
  function saveSearch(text) {
    // Create new Search object
    var search = new Search({
      searchText: text,
      date:       new Date()
    });

    // Save new Search object
    search.save(function(error) {
      if (!error) {
        console.log('Search saved. Search text: %s'.bgGreen.black, text);
      }
      else {
        console.log('ERROR: Search not saved successfully'.bgRed.black);
      }
    });
  }

};

// Get methods
// =============================================================================

/*
 * Get search suggestions
 */
exports.getSearchSuggestions = function (callback) {

  // Get distinct search suggestions
  Search.find({})
    .distinct('searchText')
    .exec(function(error, results) {
      if (!error) {
        callback(results);
      }
      else {
        console.log('ERROR: could not get search suggestions')
      }
    });

};
