
/**
 * A renderable sprite.
 */
var Sprite = Resource.extend(function(settings) {

  this.settings = _.extend({
    'total_frames' : 1,
    'frame_width' : 1,
    'frame_height' : 1,
    'frame_cycle_speed' : 25,
    'canvas' : false
  }, settings, this.settings);

  this.current_frame = 0;

});


Sprite.methods({

  /**
   * Set the speed at which the animation frame changes.
   */
  'setFrameCycleSpeed' : function(speed) {
    this.frame_cycle_speed = speed;
  },

  /**
   * Render a sprite somewhere on the assigned canvas instance.
   */
  'render' : function(x, y) {

  },

  /**
   * Create a sequence of frames to be rendered.
   */
  'createAnimationSequence' : function() {
    var self = this;

    return function() {
    
    };
  },

});
