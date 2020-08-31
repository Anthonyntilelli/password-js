'use strict';

// Control Start Area.
class StartArea extends BaseDisplay{
  constructor(){
    super();
    // Only on instance of StartArea
    if (StartArea._instance) throw new Error('StartArea is already has an instance.');

    const elements = this._load_html_elements_by_id('start_section', 'new_game_button', 'resume_game_button', 'new_password_button');
    this.HTML_BODY = elements[0];
    this.NEW_GAME_BUTTON = elements[1];
    this.RESUME_GAME_BUTTON = elements[2];
    this.NEW_PASSWORD_BUTTON = elements[3]
    // Enable RESUME_Game if web storage supported.
    if (typeof(Storage) !== "undefined") {
      this._storage_supported = true;
    } else {
      this._storage_supported = false;
      console.warn("WebStorage not supported: Game resume option disabled");
    }

    // Mark class as ready
    StartArea._instance = this;
  }

  clear(){ this._make_hidden(this.HTML_BODY, this.RESUME_GAME_BUTTON); }

  show(){
    if ((this._storage_supported) && (localStorage.id !== undefined)) {
      this._make_visible(this.RESUME_GAME_BUTTON)
    } else {
      this._make_hidden(this.RESUME_GAME_BUTTON)
    }
    this._make_visible(this.HTML_BODY)
  }
}
