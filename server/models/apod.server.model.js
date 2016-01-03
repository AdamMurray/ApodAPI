
// apod.server.models.js

/*
 * Astro pic of the day model
 */

// Setup
// =============================================================================
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

// Schema
// =============================================================================
var apodSchema = new Schema({
  url:          String,
  date:         Date,
  media_type:   String,
  explanation:  String,
  // concepts:     [String],
  title:        String
});

// Model
// =============================================================================
module.exports = mongoose.model('Apod', apodSchema);
