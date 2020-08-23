'use strict'

// Controlls flash massage on page.
class Flasher {
  constructor(){
    // Only on instance of flash
    if (Flasher._instance) throw new Error('Flasher is already has an instance.');
    // Fail if it cannot find flash html body
    this._HTML_BODY = document.getElementById('flash');
    if (this._HTML_BODY === null ) throw new Error('Cannot find flash html body');

    this.quitButton = this._HTML_BODY.getElementsByTagName("button")[0]
    // Clear flash message and quit
    this.quitButton.addEventListener("click", () => this.clear());

    // Mark class as ready
    Flasher._instance = this;
  }
  success(message){
    this._show("notification is-success", "Success:", message);
  }
  warning(message){
    this._show("notification is-warning", "Warning:", message);
  }
  error(message){
    this._show("notification is-danger", "Error:", message);
  }
  clear(){
    this._show("notification is-hidden", "Status:", "Message Body.");
  }

  _show(className ,preMessage, message) {
    this._HTML_BODY.getElementsByTagName("strong")[0].innerText = preMessage;
    this._HTML_BODY.getElementsByTagName("span")[0].innerText = message;
    this._HTML_BODY.className = className;
  }
}
