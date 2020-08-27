'use strict';

class BaseDisplay {
  // clears setting and sets element to default state
  clear(){
    throw new Error('Abstract Method');
  }

  show(){
    throw new Error('Abstract Method');
  }

  // Fail if it cannot find flash html body
  _load_html_elements_by_id(...ids){
    const html_elements = [];
    for (const id of ids){
      if (typeof id !== "string") throw new Error('ids must be a string');
      const element = document.getElementById(id);
      if (element === null ) throw new Error(`Cannot find html element with id ${id}`);
      html_elements.push(element);
    }
    return html_elements;
  }

  // Add bulma.css hidden class
  _make_hidden(...html_elements) {
    for (const element of html_elements) {
      if (element.className.search("is-hidden") == -1) element.className += " is-hidden";
    }
  }

  // Remove bulma.css hidden class
  _make_visible(...html_elements) {
    for (const element of html_elements) {
      element.className = element.className.replace(" is-hidden", "");
    }
  }
}
