
/**
 * Represents an encounter between a group of players.
 */
var Game = klass(function(settings) {

  this.settings = _.extend({
    'context' : false
  }, settings);

});


Game.methods({

  'setupGame' : function() {
    // Create a grid to play the game on.
    this.grid = new Grid({'context' : this.settings.context});
  },

  'tick' : function() {
    this.grid.tick();
  }

});