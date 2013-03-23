
/**
 * Our main RTS application object.
 */
var RTS = klass(function(settings) {

  this.settings = _.extend({
  }, settings);

});


RTS.methods({

  /**
   * Setup the initial state of our RTS ready for ticking.
   */
  'setupInitialState' : function() {

    // Spool up our canvas instance.
    this.canvas = new Canvas();
    this.canvas.create(window.innerWidth, window.innerHeight);

    // Create a grid to play the game on.
    this.grid = new Grid({'context' : this.canvas.getContext()});

    // Ensure we are capturing input events.
    Input.startCapture();

  },


  /**
   * Called when game is ticking. Handle main gameplay logic.
   */
  'tick' : function() {
    this.grid.tick();
  },

  /**
   * Start our RTS game off.
   */
  'start' : function() {
    var self = this;

    self.setupInitialState();
    var context = this.canvas.getContext();

    // Create a game ticker to handle gameplay.
    this.ticker = new Ticker(
      {
        'tick_function' : function() {
          self.canvas.clearContext();
          self.tick();        
        },
        'ticks_per_second' : 30
      }
    ).start();
  }

});

