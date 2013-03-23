
/**
 * Something loaded from disk used by the program.
 */
var Resource = klass(function(settings) {

  this.settings = _.extend({
    'source' : false
  }, settings);

});


Resource.methods({

  /**
   * Checks that a given resource exists on disk.
   */
  verifyResource : function() {
    console.log('Verifying existence of: ' + this.settings.source);
  }

});
