'use strict';

// Controls InfoBanner.
class EndBanner extends GameDisplay{
  constructor(){
    super();

    // Only on instance of InfoBanner
    if (EndBanner._instance) throw new Error('EndBanner is already has an instance.');

    const elements = this._load_html_elements_by_id('end_section', 'end_banner');
    this._HTML_BODY = elements[0];
    this._END_BANNER = elements[1];

    // Mark class as ready
    EndBanner._instance = this;
  }

  clear(){
    this._clean();
    this._make_hidden(this._HTML_BODY);
    this._END_BANNER.innerText = "{FILLER TEXT}";
  }

  // Make visible and set info
  show(game){
    super.show(game)
    let end_text;
    let color;
    // Should not show on active
    if(game.game_state === "active") throw new Error('Should not show on active games');

    if(game.game_state == 'won'){
      end_text = `Winner: Password was "${game.password}"`;
      color = ' is-success';
    } else if (game.game_state == 'lost'){
      end_text = `Game Over: Password was "${game.password}"`;
      color = ' is-danger';
    }
    this._clean();
    this._make_visible(this._HTML_BODY);
    this._END_BANNER.className = this._END_BANNER.className += color;
    this._END_BANNER.innerText = end_text;
  }
  _clean(){
    this._END_BANNER.className = this._END_BANNER.className.replace(" is-success", "");
    this._END_BANNER.className = this._END_BANNER.className.replace(" is-danger", "");
  }
}
