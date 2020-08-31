'use strict';

// Data container for game
class Game {
  constructor() {
    this._id = null;
    this._lives = null;
    this._current_hint = null;
    this._history = null;
  }

  get id() { return this._id; }

  get lives() { return this._lives; }

  get current_hint() { return this._current_hint; }

  get history() { return this._history; }

  get game_state() { return this._game_state; }

  get password() { return this._password; }

  get active() { return this._game_state === 'active'}

  update(id, lives, current_hint, history, game_state, password){
    let new_id = false;
    let game_over = false;
    if (id !== this._id) new_id = true;
    if ((this.active) && (game_state !== 'active')) game_over = true;
    if ((typeof id !== "number") || (id <= 0)) throw new Error("Id must be a positive number");
    if ((typeof lives !== "number") || (lives < -1) || lives > 6) {
       throw new Error(`Lives ${lives} invalid: must be number between 0 - 5 (0 if game completed)`); }
    if (!Array.isArray(history)) throw new Error("History must be an Array.");
    if ((game_state !== 'won') && (game_state !== 'active') && (game_state !== 'lost')) throw new Error(`game_state ${game_state} invalid: must be active, won or lost.`);
    if (password === undefined) throw new Error('password should not be undefined.');
    this._id = id;
    this._lives = lives;
    this._current_hint = current_hint;
    this._history = history;
    this._game_state = game_state;
    this._password = password;
    if (new_id){
      if (typeof(Storage) !== "undefined") {
        localStorage.id = this.id;
      } else {
        console.warn("WebStorageAPI not supported: Skipping game id store");
      }
    }

    if (game_over){
      if (typeof(Storage) !== "undefined") {
        delete localStorage.id
      } else {
        console.warn("WebStorageAPI not supported: Skipping game id store");
      }
    }
  }

  // Ends game and deletes saved id
  clear(){
    this._id = -1;
    this._lives = 0;
    this._current_hint = 'GAME ENDED';
    this._history = 'lost';

    if (typeof(Storage) !== "undefined") {
      delete localStorage.id
    } else {
      console.warn("WebStorageAPI not supported: Skipping game id store");
    }
  }
}
