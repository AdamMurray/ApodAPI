
// config.js

/*
 * Server configuration
 */

module.exports = {
  appName: "NASA Astronomy Pictures of the Day",
  developmentPort: process.env.PORT || 3000,
  env: process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  apiUrl: "https://api.data.gov/nasa/planetary/apod?",
  apiKey: "h9qAmNwiKlwWKgzjKXD5kzZQcRRL8nGqqv2qUdoD", // TOOD: remove from version control
  apiParams: [
    "concept_tags=True",
    "hd=True"
  ],
  imageDownloadCronString: '00 00 */4 * * 0-6',
  imageDataUpdateCronString: '00 10 */4 * * 0-6',
};
