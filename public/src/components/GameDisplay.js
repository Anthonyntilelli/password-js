'use strict';

class GameDisplay extends BaseDisplay{
  // show element and update based on game info
  show(game){
    if (!(game instanceof Game)) throw new Error('Not a Game object');
  }
}
