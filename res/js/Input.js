
/**
 * Capture input from a users keyboard and expose it cleanly.
 */
var Input = klass(function() {
});


Input.statics({

  /**
   * Return the state of an individual key.
   */
  'getKeyState' : function(key_code) {
    return key_code in this.keyStates
      ? this.keyStates[key_code]
      : false;
  },

  /**
   * Start capturing the keyboard events and populating our keyStates object.
   */
  'startCapture' : function() {
    var self = this;
    this.keyStates = {};

    function updateKeyState(e) {
      self.keyStates[e.keyCode] = e.type == 'keydown';
    }

    window.addEventListener('keydown', updateKeyState);
    window.addEventListener('keyup', updateKeyState);
  },

  /**
   * A virtual keyboard representing some commonly accessed keys and their
   * corresponding keyCode.
   */
  'virtualKeyboard' : {
    'KEY_RIGHT' : 39,
    'KEY_LEFT' : 37,
    'KEY_UP' : 38,
    'KEY_DOWN' : 40
  }

});

