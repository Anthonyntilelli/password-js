'use strict';

const game = new Game();

// **** Sections ***
const FLASH = new Flasher();
const START_SECTION = new StartArea();
const INFO_SECTION = new InfoBanner();
const GAME_SECTION = new PlayArea();
const END_SECTION = new EndBanner();
const NEW_PASSWD_SECTION = new PasswordArea();

// *** Functions ***
const resetPage = () => {
  START_SECTION.show();
  NEW_PASSWD_SECTION.clear();
  INFO_SECTION.clear();
  GAME_SECTION.clear();
  END_SECTION.clear();
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

const refreshGame = (id, lives, hint, history, game_state, password) => {
  game.update(id, lives, hint, history, game_state, password);
  START_SECTION.clear();
  INFO_SECTION.show(game);
  GAME_SECTION.show(game);
  if(game.active){
    END_SECTION.clear();
  } else {
    END_SECTION.show(game);
  }
}

// *** Event Listeners ***

// Determine is RESUME_GAME_BUTTON should be visible on initial load
document.addEventListener("DOMContentLoaded", () => {
  START_SECTION.show();
});

// Enable add new password Section
START_SECTION.NEW_PASSWORD_BUTTON.addEventListener("click", () => {
  resetPage();
  START_SECTION.clear();
  NEW_PASSWD_SECTION.show();
});

//Cancel add new password Section
document.getElementById("new_password_cancel_button").addEventListener("click", resetPage);

// Submit new password and hints
NEW_PASSWD_SECTION.HTML_BODY.addEventListener("submit",  (event) => {
  const SUBMIT_BUTTON = NEW_PASSWD_SECTION.SUBMIT_BUTTON;
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
  try {
    const gp = new GamePassword(NEW_PASSWD_SECTION.passwordValue, NEW_PASSWD_SECTION.hints);
    console.info("GamePassword created successfully.");
    toggleloadingButton(SUBMIT_BUTTON);
    SubmitAction.post("/passwords", {passwords: gp }, OkButtonAndFlash, NotButtonAndFlash, errorAction);
  } catch (error) {
     console.error(error.message);
     FLASH.error(error.message);
  }
});

// Start a new Game
START_SECTION.NEW_GAME_BUTTON.addEventListener("click", (event) => {
  const start_new_game = (response) => {
    refreshGame(response.game_id, response.lives_left, response.current_hint, response.history, response.game_state, response.password);
    toggleloadingButton(START_SECTION.NEW_GAME_BUTTON);
  }
  const NotButtonAndFlash = (response) => {
    toggleloadingButton(START_SECTION.NEW_GAME_BUTTON)
    FLASH.error(response.status);
    resetPage();
  }

  event.preventDefault();
  toggleloadingButton(START_SECTION.NEW_GAME_BUTTON);
  SubmitAction.post('/games', { games: { action: 'new' }}, start_new_game, NotButtonAndFlash, errorAction);
});

// Make a guess
GAME_SECTION.FORM_HTML_BODY.addEventListener('submit', (event) => {
  const updateGame = (response) => {
    refreshGame(response.game_id, response.lives_left, response.current_hint, response.history, response.game_state, response.password);
    toggleloadingButton(GAME_SECTION.GUESS_BUTTON)
    toggleloadingButton(GAME_SECTION.SURRENDER_BUTN);
  }
  const NotButtonAndFlash = (response) => {
    toggleloadingButton(GAME_SECTION.GUESS_BUTTON);
    toggleloadingButton(GAME_SECTION.SURRENDER_BUTN);
    FLASH.warning(response.status);
  }
  event.preventDefault();
  if (game.active){
    toggleloadingButton(GAME_SECTION.GUESS_BUTTON);
    toggleloadingButton(GAME_SECTION.SURRENDER_BUTN);
    let guess = GAME_SECTION.FORM_HTML_BODY.querySelector("input").value;
    SubmitAction.put(`/games/${game.id}`, {games:{guess: guess}}, updateGame, NotButtonAndFlash, errorAction)
  } else {
    console.warn('Game not active event skipped.')
  }
});

//Surrender a game
GAME_SECTION.SURRENDER_BUTN.addEventListener('click', () => {
  const surrenderGame = (response) => {
    refreshGame(response.game_id, response.lives_left, response.current_hint, response.history, response.game_state, response.password);
    toggleloadingButton(GAME_SECTION.GUESS_BUTTON);
    toggleloadingButton(GAME_SECTION.SURRENDER_BUTN);
  }
  const NotButtonAndFlash = (response) => {
    toggleloadingButton(GAME_SECTION.GUESS_BUTTON);
    toggleloadingButton(GAME_SECTION.SURRENDER_BUTN);
    FLASH.warning(response.status);
  }
  if (game.active){
    toggleloadingButton(GAME_SECTION.GUESS_BUTTON);
    toggleloadingButton(GAME_SECTION.SURRENDER_BUTN);
    SubmitAction.delete(`/games/${game.id}`, {games:{ action: 'surrender' }}, surrenderGame, NotButtonAndFlash, errorAction)
  } else {
    console.warn('Game not active event skipped.')
  }
});

//start new game in game section
GAME_SECTION.NEW_GAME_BUTTN.addEventListener("click", () => {
  const start_new_game = (response) => {
    refreshGame(response.game_id, response.lives_left, response.current_hint, response.history, response.game_state, response.password);
    toggleloadingButton(GAME_SECTION.NEW_GAME_BUTTN);
  }
  const NotButtonAndFlash = (response) => {
    toggleloadingButton(GAME_SECTION.NEW_GAME_BUTTN);
    FLASH.error(response.status);
    resetPage();
  }

  event.preventDefault();
  toggleloadingButton(GAME_SECTION.NEW_GAME_BUTTN);
  SubmitAction.post('/games', { games: { action: 'new' }}, start_new_game, NotButtonAndFlash, errorAction);
});

// Resume Game
START_SECTION.RESUME_GAME_BUTTON.addEventListener("click", () => {
  const playgame = (response) => {
    toggleloadingButton(START_SECTION.RESUME_GAME_BUTTON);
    refreshGame(response.game_id, response.lives_left, response.current_hint, response.history, response.game_state, response.password);
  }
  const NotButtonAndFlash = (response) => {
    toggleloadingButton(START_SECTION.RESUME_GAME_BUTTON);
    FLASH.error(response.status);
    resetPage();
  }
  toggleloadingButton(START_SECTION.RESUME_GAME_BUTTON);
  SubmitAction.get(`/games/${localStorage.id}`, playgame, NotButtonAndFlash, errorAction);
});
