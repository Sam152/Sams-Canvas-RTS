
/**
 * Our main RTS application object.
 */
var MapMaker = RTS.extend(function(settings) {
  this.settings = _.extend({
  }, settings);
});


MapMaker.methods({

  /**
   * Setup the initial state of our RTS ready for ticking.
   */
  'setupInitialState' : function() {

    // Spool up our canvas instance.
    this.canvas = new Canvas();
    this.canvas.create(window.innerWidth, window.innerHeight);

    // Get the context from the canvas.
    var context = this.canvas.getContext();

    // Create a grid to play the game on.
    this.grid = new Grid({
      'context' : context,
      'grid_width' : 60,
      'grid_height' : 60
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

    // Ensure we are capturing input events.
    Input.startCapture();

  },


  /**
   * Called when game is ticking. Handle main gameplay logic.
   */
  'tick' : function() {
    this.terrain.tick();
    this.grid.tick();
    this.paint_bucket.tick();
  },

});

