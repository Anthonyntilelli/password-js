'use strict'

class Game {
  constructor(id) {
    this._id = id;
    //{ guess: "word", hint "when ____ flies" }
    this._guessesWithHint = [];
    this.win = null; // False for lose, true for win, null for still Playing
  }
  get id() {
    return this.id;
  }

  makeGuess(hint, guess){
    this._guessesWittHint.push( {hint: hint, guess: guess} );
  }

  get guesses(){
    return this._guessesWithHint
  }
}
