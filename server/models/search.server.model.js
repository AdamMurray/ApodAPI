
// search.server.model.js

/*
 * Search entity model
 */

// Setup
// =============================================================================
var mongoose  = require('mongoose'),
    // random    = require('mongoose-random'),
    Schema    = mongoose.Schema;

// Schema
// =============================================================================
var searchSchema = new Schema({
  searchText: String,
  date:       { type: Date, default: new Date() }
});

// Bind random plugin to search schema
// searchSchema.plugin(random, { path: 'r' });

// Model
// =============================================================================
module.exports = mongoose.model('Search', searchSchema);
