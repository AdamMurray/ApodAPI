
// logger.js

// Require winston
var winston = require('winston');

// Create new logger
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: false,
      timestamp: true
    }),
    new winston.transports.File({
      filename: __dirname + '/../logs/debug.log',
      json: false
    })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({
      json: false,
      timestamp: true
    }),
    new winston.transports.File({
      filename: __dirname + '/../logs/exceptions.log',
      json: false
    })
  ],
  exitOnError: false
});

// Exports
module.exports = logger;
