
/**
 * A paint that can be applied to a terrain.
 */
var TerrainPaint = klass(function(settings) {

  this.settings = _.extend({
    'img' : false,
    'frames' : 1,
    'map_symbol' : '!',
    'grid' : false,
    'isometric' : true,
    'context' : false,
    'name' : false
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
      'isometric' : this.settings.isometric,
      'frame_cycle_speed' : 6,
      'position_offset' : this.settings.offset
    });
  },

  'draw' : function() {
    var self = this;
    _.each(this.paint_locations, function(location) {
      self.sprite.animate(location.pixel_x, location.pixel_y, self.settings.isometic);
    });
  },

  'addToGrid' : function(x, y) {
    this.paint_locations.push({
      'grid_x' : x,
      'grid_y' : y,
      'pixel_x' : this.settings.grid.settings.tile_width * x,
      'pixel_y' : this.settings.grid.settings.tile_height * y,
    });
  },

  'removeFromGrid' : function(x, y) {
    this.paint_locations = _(this.paint_locations).reject(function(el) {
      return el.grid_x == x && el.grid_y == y;
    });
  }

});

