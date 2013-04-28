
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
    'position_offset' : 0,
    'isometric' : true
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
  'render' : function(x, y, frame) {

    if (typeof frame == 'undefined') {
      frame = 0;
    }

    var context = this.settings.context;
    var frame_width = this.settings.frame_width;
    var frame_height = this.settings.frame_height;
    var offset = this.settings.position_offset;

    if (!this.settings.isometric) {
      // Either this or figure out a way to transform points correctly.
      context.save();
      context.translate(x+(frame_width/2)-offset,y+(frame_height/2)-offset);
      context.rotate(Grid.degreesToRadians(-45));
      context.scale(1, 1/0.5);
      context.translate(-x-(frame_width/2),-y-(frame_height/2));
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

    if (!this.settings.isometric) {
      context.restore();
    }

  },

  /**
   * Animate the sprite from start to end.
   */
  'animate' : function(x, y) {
    if (typeof this.fullAnimation == 'undefined') {
      this.fullAnimation = this.createAnimationSequence(0, this.settings.total_frames);
    }
    this.fullAnimation(x, y);
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

    return function(x, y) {
      self.render(x, y, current_frame);
    };
  },

  /**
   * Get a DOM node representing the image of this sprite.
   */
  'getDomNode' : function() {
    var img = document.createElement('img');
    img.src = this.getPath();
    return img;
  },

});

