'use strict';

// Control area to add new passwords.
class PasswordArea extends BaseDisplay{
  constructor(){
    super();
    // Only on instance of PasswordArea
    if (PasswordArea._instance) throw new Error('PasswordArea is already has an instance.');

    const elements = this._load_html_elements_by_id('new_password_section', 'new_password_form');
    this.HTML_BODY = elements[0];
    this._FORM = elements[1];
    this.SUBMIT_BUTTON = this._FORM.getElementsByClassName("button is-primary")[0]

    // Mark class as ready
    PasswordArea._instance = this;
  }

  clear(){
    this._make_hidden(this.HTML_BODY);
    this._FORM.reset();
  }

  show(){
    this._make_visible(this.HTML_BODY);
    this._FORM.reset();
  }

  // throws error if value is not valid
  get passwordValue(){
    const passwd = this.HTML_BODY.getElementsByClassName('item-passwd')[0];
    if (passwd.checkValidity()){ return passwd.value;}
    throw new Error('Input is not valid');
  }

  // returns array of hints, thows error if input is not valid
  get hints(){
    const hints = [];
    const hintEntries =  this.HTML_BODY.getElementsByClassName("item-hint");
    for (const item of hintEntries){
      if (!item.checkValidity()) {throw new Error(`${item.value} is not valid`);}
      hints.push(item.value)
    }
    return hints;
  }
}
