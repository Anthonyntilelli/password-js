'use strict'

// Controls InfoBanner.
class InfoBanner {
  constructor(){
    // Only on instance of flash
    if (InfoBanner._instance) throw new Error('InfoBanner is already has an instance.');
    // Fail if it cannot find flash html body
    this._HTML_BODY =  document.getElementById("info_section");
    this._INFO_ID = document.getElementById("info_id");
    this._INFO_LIVES = document.getElementById("info_lives");
    if (this._HTML_BODY === null ) throw new Error('Cannot find InfoBanner html body');
    if (this._INFO_ID === null ) throw new Error('Cannot find id html body');
    if (this._INFO_LIVES === null ) throw new Error('Cannot find Lives in html body');

    // Mark class as ready
    InfoBanner._instance = this;
  }
  clear(){
    this._HTML_BODY.classList = "section is-hidden";
    this._INFO_ID.innerText = "#";
    this._INFO_LIVES.innerText = "#";
    this._INFO_ID.dataset.id = "#";
    this._INFO_LIVES.dataset.lives = "#";
  }
  // Make visible and set info
  set(id, lives){
    if (typeof id !== "number" ) throw new Error("id must be a number");
    if (typeof lives !== "number" ) throw new Error("lives must be a number");
    this._HTML_BODY.classList = "section";
    this._INFO_ID.innerText = id;
    this._INFO_LIVES.innerText = lives;
    this._INFO_ID.dataset.id = id;
    this._INFO_LIVES.dataset.lives = lives;
  }
  decrement_lives() {

    let life = this.lives;
    if (isNaN(life)) throw new Error("lives not set.");
    life--;
    if (life < 0 ) throw new Error("lives cannot be less then zero.");
    this._INFO_LIVES.dataset.lives = life;
    this._INFO_LIVES.innerText = life;
  }
  get lives() { return parseInt(this._INFO_LIVES.dataset.lives) }
  get id() { return parseInt(this._INFO_ID.dataset.id) }
}
