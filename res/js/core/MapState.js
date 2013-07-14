
/**
 * Save and load the state of the map.
 */
var MapState = klass(function(settings) {

  this.settings = _.extend({
    'grid' : false,
    'terrain' : false
  }, settings);

});


MapState.methods({
  'loadMap' : function(map) {

  },
  'saveMap' : function() {
//    console.log(this.settings.terrain);
  },
  'fixTiles' : function() {
    console.log('Tile fix');
  }
});
