
/**
 * A renderable sprite.
 */
var Sprite = Resource.extend(function(settings) {

  this.settings = _.extend({
    'total_frames' : 1,
    'frame_width' : 1,
    'frame_height' : 1,
    'frame_cycle_speed' : 25,
    'context' : false,
  }, settings, this.settings);

  this.image = new Image();
  this.image.src = this.getPath();

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
  'render' : function(x, y, isometric, frame) {

    if (typeof frame == 'undefined') {
      frame = 0;
    }

    if (typeof isometric == 'undefined') {
      isometric = true;
    }

    var context = this.settings.context;

    if (!isometric) {
      context.save();
      context.translate(x-65,y-20);
      context.rotate(Grid.degreesToRadians(-45));
      context.scale(1, 1/0.5);
      context.translate(-x,-y);
    }

    context.drawImage(
      this.image,
      frame * this.settings.frame_width,
      0,
      this.settings.frame_width,
      this.settings.frame_height,
      x,
      y,
      this.settings.frame_width,
      this.settings.frame_height
    );

    if (!isometric) {
      context.restore();
    }


  },

  /**
   * Animate the sprite from start to end.
   */
  'animate' : function(x, y, isometric) {
    if (typeof this.fullAnimation == 'undefined') {
      this.fullAnimation = this.createAnimationSequence(0, this.settings.total_frames);
    }
    this.fullAnimation(x, y, isometric);
  },


  /**
   * Create a sequence of frames to be rendered.
   */
  'createAnimationSequence' : function(start, end, speed) {
    var self = this;
    var current_frame = start;

    setInterval(function() {
      current_frame++;
      if (current_frame == end) {
        current_frame = start;
      }
    }, 1000 / this.settings.frame_cycle_speed)

    return function(x, y, isometric) {
      self.render(x, y, isometric, current_frame);
    };
  }

});

