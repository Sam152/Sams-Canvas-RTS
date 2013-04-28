
/**
 * Capture input from a users keyboard and expose it cleanly.
 */
var Input = klass(function() {});


Input.statics({

  /**
   * Return the state of an individual key.
   */
  'keyDown' : function(key_code) {
    return key_code in this.key_states
      ? this.key_states[key_code]
      : false;
  },

  /**
   * Start capturing the keyboard events and populating our key_states object.
   */
  'startCapture' : function() {
    var self = this;
    this.key_states = {};
    this.mouse_position = {
      'offsetX' : 0,
      'offsetY' : 0,
      'screenX' : 0,
      'screenY' : 0,
      'moved' : false
    };

    function updateKeyState(e) {
      self.key_states[e.keyCode] = e.type == 'keydown';
    }

    function updateMouseState(e) {
      self.mouse_position = {
        'offsetX' : e.offsetX,
        'offsetY' : e.offsetY,
        'screenX' : e.screenX,
        'screenY' : e.screenY,
        'moved' : true
      };
    }

    window.addEventListener('keydown', updateKeyState);
    window.addEventListener('keyup', updateKeyState);
    window.addEventListener('mousemove', updateMouseState);
  },


  /**
   * Get the last known location of the mouse.
   */
  'getMouseState' : function() {
    return this.mouse_position;
  },

  /**
   * Register an event listener for moving of the mouse.
   */
  'mouseMove' : function(func) {
    window.addEventListener('mousemove', func);
  },

  /**
   * Some methods to determin if the mouse is on a screen's edge.
   */
  'mouseOnScreenLeft' : function(gutter_width) {
    return this.mouse_position.moved && this.mouse_position.offsetX < gutter_width;
  },
  'mouseOnScreenRight' : function(gutter_width) {
    return this.mouse_position.moved && this.mouse_position.offsetX > (window.innerWidth - gutter_width);
  },
  'mouseOnScreenTop' : function(gutter_width) {
    return this.mouse_position.moved && this.mouse_position.offsetY < gutter_width;
  },
  'mouseOnScreenBottom' : function(gutter_width) {
    return this.mouse_position.moved && this.mouse_position.offsetY > (window.innerHeight - gutter_width);
  },


  /**
   * A virtual keyboard representing some commonly accessed keys and their
   * corresponding keyCode.
   */
  'VK' : {
    'KEY_RIGHT' : 39,
    'KEY_LEFT' : 37,
    'KEY_UP' : 38,
    'KEY_DOWN' : 40
  }

});

