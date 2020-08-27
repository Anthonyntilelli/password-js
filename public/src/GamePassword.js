'use strict';

// Password and hints to be passed to backend.
class GamePassword {
  constructor(word, hints) {
    this.word = word;
    // Remove blanks or empty lines
    this.hints = hints.map(x => x.trim()).filter(x => !!x);
    if (this.hints.length < 5) throw new Error('You must provide 5 or more valid hints');
    // hints that contain the word
    const brokenHints = this.hints.map(x => x.toLowerCase()).filter(x =>  x.search(this.word) !== -1);
    if (brokenHints.length != 0) throw new Error('One or more hint includes password in message');
  }
}
