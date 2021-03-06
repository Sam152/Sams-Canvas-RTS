
/**
 * Something loaded from disk used by the program.
 */
var Resource = klass(function(settings) {

  this.settings = _.extend({
    'source' : false,
    'type' : 'img'
  }, settings);

});


Resource.methods({

  /**
   * Checks that a given resource exists on disk.
   */
  'verifyResource' : function() {
    console.log('Verifying existence of: ' + this.settings.source);
  },

  'getPath' : function() {
    return 'res/' + this.settings.type + '/' + this.settings.source;
  },

  'getString' : function(callback) {
    $.get(this.getPath(), callback)
  }

});
