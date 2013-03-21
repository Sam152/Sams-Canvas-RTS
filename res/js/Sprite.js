
/**
 * A renderable sprite.
 */
var Sprite = klass(function(settings) {

  this.settings = _.extend({
    'frames' : 1,
    'frame_width' : 100,
    'frame_height' : 100,
    'frame_toggle_speed' : 25
  }, settings);

});

Sprite.methods({

  'createAnimationSequence' : function() {
    var self = this;

    return function() {
    };
  },

  'setFrameToggleSpeed' : function() {
  }
});

