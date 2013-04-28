
/**
 * A grid that represents a the play board.
 *
 * @todo, give the camera it's own class.
 */
var Grid = klass(function(settings){

  var default_tile_width = 64;
  var default_tile_height = 64;

  var default_play_space = 30;

  this.settings = _.extend({
    'tile_width' : default_tile_width,
    'tile_height' : default_tile_height,
    'grid_width' : default_play_space,
    'grid_height' : default_play_space,
    'context' : false,
    'camera_x' : 0,
    'camera_y' : 0,
    'screen_scroll_gutter' : 10,
    'pan_speed' : 10,
    'tilt_ratio' : 0.5
  }, settings);

  // Calculate some dimensions.
  this.settings.pixel_grid_width = this.settings.tile_width * this.settings.grid_width;
  this.settings.pixel_grid_height = this.settings.tile_height * this.settings.grid_height;

  // Setup the initial camera state to be in the middle of our grid.
  var grid_middle = this.gridToReal(this.settings.pixel_grid_width / 2, this.settings.pixel_grid_height / 2);
  this.setCameraCenter(grid_middle.x, grid_middle.y);

});


Grid.methods({

  /**
   * Trigger the movements and actions of our grid.
   */
  'tick' : function() {
    this.drawWireGrid();
    this.panCamera();
  },


  /**
   * Pan the camera based on user Input.
   */
  'panCamera' : function() {
    // Make the board respond to key movements.
    this.settings.camera_x += (Input.keyDown(Input.VK.KEY_LEFT) || Input.mouseOnScreenLeft(this.settings.screen_scroll_gutter)) ? this.settings.pan_speed : 0;
    this.settings.camera_x -= (Input.keyDown(Input.VK.KEY_RIGHT) || Input.mouseOnScreenRight(this.settings.screen_scroll_gutter)) ? this.settings.pan_speed : 0;
    this.settings.camera_y += (Input.keyDown(Input.VK.KEY_UP) || Input.mouseOnScreenTop(this.settings.screen_scroll_gutter)) ? this.settings.pan_speed : 0;
    this.settings.camera_y -= (Input.keyDown(Input.VK.KEY_DOWN) || Input.mouseOnScreenBottom(this.settings.screen_scroll_gutter)) ? this.settings.pan_speed : 0;
  },

  /**
   * Set the center of the camera to the specified co-ordinates.
   */
  'setCameraCenter' : function(x, y) {
    this.settings.camera_x = (innerWidth/2) - x/4;
    this.settings.camera_y = (innerHeight/2) - y/4;
  },


  /**
   * Apply visible lines across our isometric board.
   */
  'drawWireGrid' : function() {
    var context = this.settings.context;

    context.save();

    // Since our grid will be easier to draw as a flat grid, have our isometric
    // context applied.
    this.applyViewportTransformation();
    this.applyIsometricTilt();

    context.strokeStyle = '#000';
    context.lineWidth = 0.4;

    context.beginPath();

    for (var i = 0; i <= this.settings.pixel_grid_width / this.settings.tile_width; i++) {
      context.moveTo(i * this.settings.tile_width, 0);
      context.lineTo(i * this.settings.tile_width, this.settings.pixel_grid_height);
    }

    for (var i = 0; i <= this.settings.pixel_grid_height / this.settings.tile_height; i++) {
      context.moveTo(0, i * this.settings.tile_height);
      context.lineTo(this.settings.pixel_grid_width, i * this.settings.tile_height);
    }

    context.stroke();
    context.restore();
  },

  /**
   * Highlight a set of grid co-ordinates.
   */
  'highlightWireGrid' : function(x, y) {

    var context = this.settings.context;

    context.save();

    this.applyViewportTransformation();
    this.applyIsometricTilt();

    context.strokeStyle = '#f00';
    context.lineWidth = 4;
    context.beginPath();

    var start_x = x * this.settings.tile_width;
    var end_x = start_x + this.settings.tile_width;

    var start_y = y * this.settings.tile_height;
    var end_y = start_y + this.settings.tile_height;

    context.moveTo(start_x, start_y);
    context.lineTo(end_x, start_y);
    context.lineTo(end_x, end_y);
    context.lineTo(end_x - this.settings.tile_width, end_y);
    context.lineTo(start_x, start_y);

    context.stroke();
    context.restore();
  },


  /**
   * Apply an isometric tilt to the canvas context for rendering square elements
   * from an isometric viewpoint.
   */
  'applyIsometricTilt' : function() {
    var context = this.settings.context;
    context.scale(1, this.settings.tilt_ratio);
    context.rotate(Grid.degreesToRadians(45));
  },


  'setContextNonIsometric' : function() {
    this.settings.context.non_isometric = true;
  },

  /**
   * Apply a viewport transformation to the context to allow anything to be
   * rendered within the context of the games viewport.
   */
  'applyViewportTransformation' : function() {
    var context = this.settings.context;
    context.translate(this.settings.camera_x, this.settings.camera_y);
  },

  /**
   * Get the real canvas coordinates from a grid square that has been transformed.
   */
  'getGridCoordinatesByTile' : function(x, y) {
    var grid_x = this.settings.tile_width * x;
    var grid_y = this.settings.tile_height * y;
    return {x : grid_x, y : grid_y};
  },

  'getTileByGridCoordinates' : function(x, y) {
    var grid_x = Math.floor(x / this.settings.tile_width);
    var grid_y = Math.floor(y / this.settings.tile_height);
    return {x : grid_x, y : grid_y};
  },

  /**
   * Take a coordinate on the screen and convert it to the grid coordinates.
   */
  'realToGrid' : function(x, y) {
    x -= this.settings.camera_x;
    y -= this.settings.camera_y;
    var r = 2;
    var d = 1.4;
    return {
      'x' : Math.floor(x/d + r*y/d),
      'y' : Math.floor(r*y/d - x/d)
    };
  },

  /**
   * Get the grid coordinate and map it to a screen one.
   */
  'gridToReal' : function(xi, yi) {
    xi += this.settings.camera_x;
    yi += this.settings.camera_y;
    var r = 2;
    var d = 1.4;
    return {
      'x' : (xi - yi) * d / r,
      'y' : (xi + yi) * d
    };
  }

});


Grid.statics({
  'degreesToRadians' : function(degrees) {
    return degrees*(Math.PI/180);
  }
});
