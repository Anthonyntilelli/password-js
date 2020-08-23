'use strict'

// Control Play area.
class PlayArea {
  constructor(){
    // Only on instance of PlayArea
    if (PlayArea._instance) throw new Error('PlayArea is already has an instance.');

    this._GAME_HTML_BODY = document.getElementById('game_section');
    this._HSTY_HTML_BODY = document.getElementById('history_section');
    this._TMLP_HTML_BODY = document.getElementById('history_template');
    this.current_hint = this._GAME_HTML_BODY.querySelector("#item-hint");

    if (this._GAME_HTML_BODY === null ) throw new Error('Cannot find PlayArea Game html body');
    if (this._HSTY_HTML_BODY === null ) throw new Error('Cannot find PlayArea history html body');
    if (this._TMLP_HTML_BODY === null ) throw new Error('Cannot find PlayArea Template html body');

    // Mark class as ready
    PlayArea._instance = this;
  }
  clear(){
    this._GAME_HTML_BODY.classList = "section is-hidden";
    this._HSTY_HTML_BODY.classList = "section is-hidden";
    this._TMLP_HTML_BODY.classList = "section is-hidden";
  }
  start(currentHint){
    this._GAME_HTML_BODY.classList = "section";
    this._HSTY_HTML_BODY.classList = "section";
    this._TMLP_HTML_BODY.classList = "section";
    this.current_hint.innerText = currentHint;
  }
}
