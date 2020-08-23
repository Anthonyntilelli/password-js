'use strict'

const FLASH = new Flasher();
const INFO_SECTION = new InfoBanner();
const GAME_SECTION = new PlayArea();

// *** Notable IDs ***
const START_SECTION = document.getElementById("start_section");
const NEW_PASSWD_SECTION = document.getElementById("new_password_section");
const RESUME_GAME_INPUT = document.getElementById("resume-id");
const NEW_PASSWD_FORM = document.getElementById("new_password_form");
const GAME_FORM = document.getElementById("game_form");
const NEW_GAME_BUTTON = document.getElementById("new_game_button");

// *** Functions ***
const resetPage = () => {
  START_SECTION.className = "section";
  NEW_PASSWD_SECTION.className = "section is-hidden";
  INFO_SECTION.clear()
  GAME_SECTION.clear()
  formClears();
};

const formClears = () => {
  NEW_PASSWD_FORM.reset();
  GAME_FORM.reset();
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

const errorAction = (message) => {
  console.error(message);
  if (confirm("Unexpected Error.\nPress ok to reload page?")) {window.location.reload(true); }
}

const startGame = (id, lives, hint) => {
  formClears();
  START_SECTION.className = "section is-hidden";
  INFO_SECTION.set(id, lives);
  GAME_SECTION.start(hint)
  //TODO: POPULATE History
}

// *** Event Listeners ***

// Enable add new password Section
document.getElementById("new_password_button").addEventListener("click", () => {
  START_SECTION.className = "section is-hidden";
  NEW_PASSWD_SECTION.className = "section";
  formClears();
});

//Cancel add new password Section
document.getElementById("new_password_cancel_button").addEventListener("click", resetPage);

// Submit new password and hints
NEW_PASSWD_SECTION.addEventListener("submit",  (event) => {
  const SUBMIT_BUTTON = NEW_PASSWD_FORM.getElementsByClassName("button is-primary")[0];
  const OkButtonAndFlash = (response) => {
    toggleloadingButton(SUBMIT_BUTTON)
    FLASH.success("Submit complete");
    resetPage()
  }
  const NotButtonAndFlash = (response) => {
    toggleloadingButton(SUBMIT_BUTTON)
    FLASH.error(response.status);
    resetPage()
  }

  event.preventDefault();
  const passwd = NEW_PASSWD_SECTION.getElementsByClassName("item-passwd")[0].value;
  let hints = [];
  for (let item of NEW_PASSWD_SECTION.getElementsByClassName("item-hint")) {hints.push(item.value)};
  try {
    const gp = new GamePassword(passwd, hints);
    console.info("GamePassword created successfully.");
    toggleloadingButton(SUBMIT_BUTTON);
    SubmitAction.post("/passwords", {passwords: gp }, OkButtonAndFlash, NotButtonAndFlash, errorAction);
  } catch (error) {
     console.error(error.message);
     FLASH.error(error.message);
  }
});

// Start a new Game
NEW_GAME_BUTTON.addEventListener("click", () => {
  event.preventDefault();
  toggleloadingButton(NEW_GAME_BUTTON);
  const start_new_game = (response) => {
    toggleloadingButton(NEW_GAME_BUTTON);
    startGame(response.game_id, response.lives_left, response.current_hint);
  }
  const NotButtonAndFlash = (response) => {
    toggleloadingButton(NEW_GAME_BUTTON)
    FLASH.error(response.status);
    resetPage();
  }
  SubmitAction.post('/games', { games: { action: 'new' }}, start_new_game, NotButtonAndFlash, errorAction);
});
