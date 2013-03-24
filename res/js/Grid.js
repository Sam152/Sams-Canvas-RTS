
/**
 * A grid that represents a the play board.
 */
var Grid = klass(function(settings){

  this.settings = _.extend({
    'tile_width' : 64,
    'tile_height' : 64,
    'play_width' : 64 * 10,
    'play_height' : 64 * 10,
    'context' : false,
    'camera_x' : 0,
    'camera_y' : 0,
    'screen_scroll_gutter' : 10,
    'pan_speed' : 15
  }, settings);

});


Grid.methods({

  /**
   * Trigger the movements and actions of our grid.
   */
  'tick' : function() {
    this.panCamera();
    this.drawWireGrid();
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
   * Apply visible lines across our isometric board.
   */
  'drawWireGrid' : function() {

    var context = this.settings.context;

    context.save();

    // Since our grid will be easier to draw as a flat grid, have our isometric
    // context applied.
    this.applyViewportTransformation();
    this.applyIsometricTilt();

    context.strokeStyle = '#00f';
    context.lineWidth = 0.4;

    context.beginPath();
    
    for (var i = 0; i <= this.settings.play_width / this.settings.tile_width; i++) {
      context.moveTo(i * this.settings.tile_width, 0);
      context.lineTo(i * this.settings.tile_width, this.settings.play_height);
    }

    for (var i = 0; i <= this.settings.play_height / this.settings.tile_height; i++) {
      context.moveTo(0, i * this.settings.tile_height);
      context.lineTo(this.settings.play_width, i * this.settings.tile_height);
    }

    context.stroke();
    context.restore();
  },


  /**
   * Apply an isometric tilt to the canvas context for rendering square elements
   * from an isometric viewpoint. Not all elements will have to be isometrically
   * drawn.
   */
  'applyIsometricTilt' : function() {
    var context = this.settings.context;
    var title_angle = 40;

    context.scale(1, 0.5);

    context.translate(this.settings.play_width / 2, this.settings.play_height / 2);
    context.rotate(Grid.degreesToRadians(45));
    context.translate(-this.settings.play_width / 2, -this.settings.play_height / 2);
  },

  /**
   * Apply a viewport transformation to the context to allow anything to be
   * rendered within the context of the games viewport.
   */
  'applyViewportTransformation' : function() {
    var context = this.settings.context;
    context.translate(this.settings.camera_x, this.settings.camera_y);
  }

});


Grid.statics({
  'degreesToRadians' : function(degrees) {
    return degrees*(Math.PI/180);
  }
});
