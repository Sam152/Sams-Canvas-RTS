
/**
 * Represents an encounter between a group of players.
 */
var Game = TickableState.extend(function(settings) {
  this.settings = _.extend({
  }, this.settings, settings);
});


Game.methods({

  'setupInitialState' : function() {
    var self = this;

    // Create a grid to play the game on.
    self.grid = new Grid({'context' : self.getCanvas().getContext() });

    // Create terrain to paint over the world.
    this.terrain = new Terrain({
      'grid' : self.grid,
      'context' : self.getCanvas().getContext()
    });

    var state = new MapState({
      'terrain' : self.terrain,
      'grid' : self.grid
    });

    this.terrain.loadPaints();

    // Load our test map.
    state.loadMap('test.map');

  },

  'tick' : function() {
    this.terrain.tick();
    this.grid.tick();
  }

});