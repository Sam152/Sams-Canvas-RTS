/**
 * Our main RTS application object.
 */
var TickableState = klass(function(settings) {
  this.settings = _.extend({
    'ticks_per_second' : 24
  }, settings);
});


TickableState.methods({

  /**
   * This method should be override to setup the state of whatever is being ticked.
   */
  'setupInitialState' : function() {
  },


  /**
   * This should also be overriden to provide the logic for the ticking.
   */
  'tick' : function() {
  },

  /**
   * Set up the ticking state internall.
   */
  'internalSetup' : function() {
    // Spool up our canvas instance.
    this.canvas = new Canvas();
    this.canvas.create(window.innerWidth, window.innerHeight);
  },

  /**
   * Get the canvas instance.
   */
  'getCanvas' : function() {
    return this.canvas;
  },

  /**
   * Start our RTS game off.
   */
  'start' : function() {
    var self = this;

    self.internalSetup();
    self.setupInitialState();

    // Ensure we are capturing input events.
    Input.startCapture();

    var context = this.canvas.getContext();

    // Create a game ticker to handle gameplay.
    this.ticker = new Ticker(
      {
        'tick_function' : function() {
          self.canvas.clearContext();
          self.tick();
        },
        'ticks_per_second' : self.settings.ticks_per_second
      }
    ).start();
  }

});
