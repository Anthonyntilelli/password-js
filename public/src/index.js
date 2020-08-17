'use strict'

// *** Notable IDs ***
const START_SECTION = document.getElementById("start_section");
const NEW_PASSWD_SECTION = document.getElementById("new_password_section");
const RESUME_GAME_INPUT = document.getElementById("resume-id");
const NEW_PASSWD_FORM = document.getElementById("new_password_form");
const FLASH = new Flasher();

// *** Functions ***
const resetPageView = () => {
  START_SECTION.className = "section";
  NEW_PASSWD_SECTION.className = "section is-hidden";
  formClears();
};

const formClears = () => {
  NEW_PASSWD_FORM.reset();
  RESUME_GAME_INPUT.value = null;
};

const toggleloadingButton = (button) => {
  // If `data-loading` is not set button will be switched to loading
  if (button.dataset.loading === "yes") {
    button.className = button.className.replace(" is-loading", "");
    button.disabled = false;
    button.dataset.loading = "no"
  } else {
    button.className += " is-loading";
    button.disabled = true;
    button.dataset.loading = "yes";
  }
};

// *** Event Listeners ***

// Enable add new password Section
document.getElementById("new_password_button").addEventListener("click", () => {
  START_SECTION.className = "section is-hidden";
  NEW_PASSWD_SECTION.className = "section";
  formClears();
});

//Cancel add new password Section
document.getElementById("new_password_cancel_button").addEventListener("click", resetPageView);

// Submit new password and hints
NEW_PASSWD_SECTION.addEventListener("submit",  (event) => {
  const SUBMIT_BUTTON = NEW_PASSWD_FORM.getElementsByClassName("button is-primary")[0];
  const OkButtonAndFlash = (response) => {
    toggleloadingButton(SUBMIT_BUTTON)
    FLASH.success("Submit complete");
    resetPageView()
  }
  const NotButtonAndFlash = (response) => {
    toggleloadingButton(SUBMIT_BUTTON)
    FLASH.error(response);
    resetPageView()
  }

  event.preventDefault();
  const passwd = NEW_PASSWD_SECTION.getElementsByClassName("item-passwd")[0].value;
  let hints = [];
  for (let item of NEW_PASSWD_SECTION.getElementsByClassName("item-hint")) {hints.push(item.value)};
  try {
    const gp = new GamePassword(passwd, hints);
    console.info("GamePassword created successfully.");
    toggleloadingButton(SUBMIT_BUTTON);
    SubmitAction.post("/passwords", gp, OkButtonAndFlash, NotButtonAndFlash, console.error);
  } catch (error) {
     console.error(error.message);
     FLASH.error(error.message);
  }
});

// Clear flash message and quit
FLASH.quitButton.addEventListener("click", () => FLASH.clear());
