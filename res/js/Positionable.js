
/**
 * Represents something that can appear on the screen.
 */
var Positionable = klass(function(settings) {

  this.settings = _.extend({
    'grid_bound' :        true,
    'grid_position_x' :   0,
    'grid_position_y' :   0,
    'pixel_position_x' :  0,
    'pixel_position_y' :  0
  }, settings);

});


Positionable.methods({
  'getPixelPosition' : function() {
    return {
      'x' : this.settings.pixel_position_x,
      'y' : this.settings.pixel_position_y
    }
  },

  'getGridPosition' : function() {
    return {
      'x' : this.settings.grid_position_x,
      'y' : this.settings.grid_position_y
    }
  },

  'setPixelPosition' : function(x, y) {
  },

  'setGridPosition' : function(x, y) {
  }
});

