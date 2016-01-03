
// apiRequest.js

// Constructor
// =============================================================================

// Creates a new ApiRequest object using a specfied
// baseUrl, apiKey, and an array of additional parameters
var ApiRequest = function (baseUrl, apiKey, additionalParameters) {
  this._baseUrl = baseUrl;
  this._apiKey = apiKey;
  this._additionalParameters = additionalParameters;
};

// Prototypes
// =============================================================================

ApiRequest.prototype.getRequestUrl = function () {
  return this._baseUrl +
          "api_key=" + this._apiKey +
          "&" + this._additionalParameters.join('&');
};

// Export
// =============================================================================
module.exports = ApiRequest;
