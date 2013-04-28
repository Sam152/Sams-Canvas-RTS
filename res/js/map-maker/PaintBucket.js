/**
 * Represents an encounter between a group of players.
 */
var PaintBucket = klass(function(settings) {

  this.settings = _.extend({
    'context' : false,
    'terrain' : false,
    'grid' : false
  }, settings);

});


PaintBucket.methods({

  /**
   * Tick the paint bucket.
   */
  'tick' : function() {
    this.highlightMouseMovement();
  },

  /**
   * Setup its state.
   */
  'setupInitialState' : function() {
    var self = this;
  },

  /**
   * Track all the mouse movement on the screen.
   */
  'highlightMouseMovement' : function(e) {

    // Get our grid and mouse position.
    var mouse = Input.getMouseState();
    var grid = this.settings.grid;

    // Get the coords of the mouse position translated into isometric terms.
    var grid_coords = grid.realToGrid(mouse.offsetX, mouse.offsetY);

    // Get the corresponding tile.
    var tile = grid.getTileByGridCoordinates(grid_coords.x, grid_coords.y);

    // Highlight that tile.
    grid.highlightWireGrid(tile.x, tile.y);

  }

});