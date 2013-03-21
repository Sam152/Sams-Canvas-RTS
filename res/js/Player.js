
/**
 * A player instance in the RTS. A player represents any entity that has control
 * over a group of units.
 */
var Player = klass(function(settings) {

  this.settings = _.extend({
    'colour' : '#f00'
  }, settings)

});