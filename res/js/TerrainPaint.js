
/**
 * A paint that can be applied to a terrain.
 */
var TerrainPaint = klass(function(settings) {

  this.settings = _.extend({
    'source_image' : false,
    'source_image_width' : 0,
    'source_image_height' : 0
  }, settings);

});


TerrainPaint.methods({
  'getSprite' : function() {
  }
});

