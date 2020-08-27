'use strict';

// Control Play area.
class PlayArea extends GameDisplay{
  constructor(){
    super();
    // Only on instance of PlayArea
    if (PlayArea._instance) throw new Error('PlayArea is already has an instance.');

    const elements = this._load_html_elements_by_id('game_section', 'history_section', 'history_template', 'guess_button', 'surrender_button', 'game_form', "new_game_in_game_section");
    this._GAME_HTML_BODY = elements[0];
    this._HSTY_HTML_BODY = elements[1];
    this._TMLP_HTML_BODY = elements[2];
    this.GUESS_BUTTON = elements[3];
    this.SURRENDER_BUTN = elements[4];
    this.FORM_HTML_BODY = elements[5];
    this.NEW_GAME_BUTTN = elements[6]
    this._current_hint = this._GAME_HTML_BODY.querySelector('#item-hint');

    // Mark class as ready
    PlayArea._instance = this;
  }
  clear(){
    this._make_hidden(this._GAME_HTML_BODY, this._HSTY_HTML_BODY, this.NEW_GAME_BUTTN);
    this._current_hint.innerText = '{hint}';
    this.FORM_HTML_BODY.querySelector("input").disabled = false;
    this.FORM_HTML_BODY.reset();
    this._wipe_history();
  }
  show(game){
    super.show(game)
    this.FORM_HTML_BODY.reset();
    this._make_visible(this._GAME_HTML_BODY, this._HSTY_HTML_BODY);
    this._current_hint.innerText = game.current_hint;
    this.FORM_HTML_BODY.querySelector("input").disabled = !game.active;
    if (!game.active) {
      this._make_visible(this.NEW_GAME_BUTTN);
      this._make_hidden(this.SURRENDER_BUTN, this.GUESS_BUTTON);
    } else {
      this._make_visible(this.SURRENDER_BUTN, this.GUESS_BUTTON);
      this._make_hidden(this.NEW_GAME_BUTTN);
    }
    this._wipe_history();
    game.history.forEach(element => this._add_history(element));
  }
  _add_history(entry){
    if (!('guess' in entry) && ('hint' in entry) && ('correct' in entry)) throw new Error('Incorrect entry format');
    // Deep clone
    const element = this._TMLP_HTML_BODY.cloneNode(true);
    let correct;
    if (entry.correct) {
      correct = "Yes";
    } else {
      correct = "No";
    }
    element.removeAttribute('id');
    element.querySelectorAll("p")[0].querySelector('span').innerText = entry.guess;
    element.querySelectorAll("p")[1].querySelector('span').innerText = entry.hint;
    element.querySelectorAll("p")[2].querySelector('span').innerText = correct;
    this._HSTY_HTML_BODY.querySelector(".columns").append(element);
  }
  _wipe_history(){
    this._HSTY_HTML_BODY.querySelector(".columns").innerHTML = '';
  }
}
