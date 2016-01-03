
// applicationEvent.server.model.js

/*
 * Application event schema
 */

// Setup
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

// Schema
var applicationEventSchema = new Schema({
  time_stamp: Date,
  type:       String,
  is_error:   Boolean,
  details:    String
});

// Model
module.exports = mongoose.model('ApplicationEvent', applicationEventSchema);
