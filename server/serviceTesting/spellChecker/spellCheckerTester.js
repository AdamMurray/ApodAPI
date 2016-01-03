
// spellCheckerTester.js

// Setup
// =============================================================================
var SpellChecker = require('../../services/spellChecker');

// Test spell checker
// =============================================================================
if (process.argv[2]) {
  var word = process.argv[2];
  SpellChecker.saveWordIfSpelledCorrectly(word, function () {
    // TODO
  });
}
else {
  console.log('A word must be specified');
}
