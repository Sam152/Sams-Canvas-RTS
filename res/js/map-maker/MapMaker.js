
/**
 * Our main RTS application object.
 */
var MapMaker = TickableState.extend(function(settings) {
  this.settings = _.extend({
  }, this.settings, settings);
});


MapMaker.methods({

  /**
   * Setup the initial state of our RTS ready for ticking.
   */
  'setupInitialState' : function() {

    // Get the context from the canvas.
    var context = this.getCanvas().getContext();

    // Create a grid to play the game on.
    this.grid = new Grid({
      'context' : context,
      'grid_width' : 220,
      'grid_height' : 220
    });

    // Create terrain to paint over the world.
    this.terrain = new Terrain({
      'grid' : this.grid,
      'context' : context
    });

    // Load all of the required paints.
    this.terrain.loadPaints();

    // Create a new instance of a paint bucket.
    this.paint_bucket = new PaintBucket({
      'context' : context,
      'terrain' : this.terrain,
      'grid' : this.grid
    });

    this.paint_bucket.setupInitialState();

  },


  /**
   * Ticks the map maker. If things can happen asynchronously safely, their
   * own tickers can be created in the setup function.
   */
  'tick' : function() {
    this.terrain.tick();
    this.grid.tick();
    this.paint_bucket.tick();
  }

});

