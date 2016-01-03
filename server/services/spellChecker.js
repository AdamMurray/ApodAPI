
// spellChecker.js

/*
 * Spell checker which uses the npm 'spellcheck' package
 */

// Setup
// =============================================================================
var SpellCheck  = require('spellcheck'),
    colors      = require('colors'),
    base        = __dirname + (process.platform === 'win32' ? '\\' : '/'),
    spell       = new SpellCheck(base + '../dictionaries/en_US.aff',
                                  base + '../dictionaries/en_US.dic');

// SpellChecker
var SpellChecker = {};

// Functions
// =============================================================================

// Save word if it is spelled correctly
// -----------------------------------------------------------------------------
SpellChecker.saveWordIfSpelledCorrectly = function (word, saveCallback) {

  // Remove leading and trailing whitespace from word
  var wordTrimmed = word.trim();

  // TODO: handle text with more than one word, e.g. 'milky way'

  // If word is spelled correctly, save it,
  // otherwise ignore
  spell.check(wordTrimmed, function (error, correct, suggestions) {
    if (error) {
      console.log('ERROR: spell checker not working!'.bgRed.black);
    }
    else if (correct) {
      console.log('%s is spelled correctly!'.bgGreen.black, wordTrimmed);
      console.log('Saving %s'.bgCyan.black, wordTrimmed);
      saveCallback(wordTrimmed);
    }
    else {
      console.log('Word not recognized. Suggestions: %s'.bgYellow.black, suggestions);
    }
  });

};


// Exports
// -----------------------------------------------------------------------------
module.exports = SpellChecker;
