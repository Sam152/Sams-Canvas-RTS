
/**
 * A paint that can be applied to a terrain.
 */
var TerrainPaint = klass(function(settings) {

  this.settings = _.extend({
    'img' : false,
    'frames' : 1,
    'map_symbol' : '!',
    'grid' : false,
    'isometic' : true,
    'context' : false
  }, settings);

  this.paint_locations = [];

});


TerrainPaint.methods({

  'loadPaint' : function() {
    this.sprite = new Sprite({
      'context' : this.settings.context,
      'total_frames' : this.settings.frames,
      'frame_width' : this.settings.grid.settings.tile_width,
      'frame_height' : this.settings.grid.settings.tile_height,
      'source' : this.settings.img,
      'frame_cycle_speed' : 6
    });
  },

  'draw' : function() {
    var self = this;
    _.each(this.paint_locations, function(location) {
      self.sprite.animate(location.pixel_x, location.pixel_y);
    });
  },

  'addToGrid' : function(x, y) {
    this.paint_locations.push({
      'grid_x' : x,
      'grid_y' : y,
      'pixel_x' : this.settings.grid.settings.tile_width * x,
      'pixel_y' : this.settings.grid.settings.tile_height * y,
    });
  }

});

