'use strict';

// Controls InfoBanner.
class InfoBanner extends GameDisplay{
  constructor(){
    super();

    // Only on instance of InfoBanner
    if (InfoBanner._instance) throw new Error('InfoBanner is already has an instance.');

    const elements = this._load_html_elements_by_id('info_section', 'info_id', 'info_lives');
    this._HTML_BODY = elements[0];
    this._INFO_ID = elements[1];
    this._INFO_LIVES = elements[2];

    // Mark class as ready
    InfoBanner._instance = this;
  }

  clear(){
    this._make_hidden(this._HTML_BODY);
    this._INFO_ID.innerText = "#";
    this._INFO_LIVES.innerText = "#";
  }

  // Make visible and set info
  show(game){
    super.show(game)
    // go away when not active
    if(game.game_state !== "active"){
      this.clear();
      return
    }
    this._INFO_ID.innerText = game.id;
    if (game.active)
      this._INFO_LIVES.innerText = game.lives;
    else
      this._INFO_LIVES.innerText = game.game_state;
    this._make_visible(this._HTML_BODY)
  }
}
