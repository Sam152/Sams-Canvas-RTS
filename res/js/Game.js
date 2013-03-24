
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

    // Create terrain to paint over the world.
    this.terrain = new Terrain({
      'grid' : this.grid,
      'context' : this.settings.context
    });

    this.terrain.loadPaints();

  },

  'tick' : function() {
    this.terrain.tick();
    this.grid.tick();
  }

});