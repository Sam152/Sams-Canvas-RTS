
/**
 * Create a ticker to complete a task on regular intervals.
 */
var Ticker = klass(function(settings) {

  this.settings = _.extend({
    'ticks_per_second' : 30,
    'count' : 0,
    'tick_function' : function() {}
  }, settings);

  this.target_tick_time = (1000 / this.settings.ticks_per_second);

});


Ticker.methods({

  'start' : function() {
    var self = this;

    var tick_time = 0;
    var next_tick_ms = 0;

    // If we have called start, reset the stopped flag.
    this.stopped = false;

    function execute_tick() {
      
      setTimeout(function() {
        
        self.count++;

        var start = self.milliseconds();
        self.settings.tick_function();
        var end = self.milliseconds();

        tick_time = end - start;
        next_tick_ms = tick_time > self.target_tick_time
          // If our tick time was longer we are running behind a bit.
          ? 0
          // Otherwise trigger the next frame at the correct time.
          : self.target_tick_time - tick_time;

        if (!self.stopped) {
          execute_tick();
        }

      }, next_tick_ms);

    }

    execute_tick();

  },


  /**
   * Stop our ticker.
   */
  'stop' : function() {
    this.stopped = true;
  },


  /**
   * Get the number of times we have executed our tick function.
   */
  'get_tick_count' : function() {
    return this.count;
  },


  /**
   * A millisecond counter.
   */
  'milliseconds' : function(){
    return (new Date).getTime();
  },

});