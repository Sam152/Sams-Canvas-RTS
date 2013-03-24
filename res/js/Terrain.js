
/**
 * A simple terrain generator.
 */
var Terrain = klass(function(settings) {

  this.settings = _.extend({
    'grid' : false,
    'context' : false
  }, settings);

  this.paints = {};

});


Terrain.methods({

  /**
   * Position our paints around the map.
   */
  'generateTerrain' : function() {

    for (var i = 0; i < this.settings.grid.settings.grid_width; i++) {
      for (var n = 0; n < this.settings.grid.settings.grid_height; n++) {
        this.paints.grass.addToGrid(i,n);
      }
    }

  },

  /**
   * Load a map and add the corresponding paints to our grid. Might want to go
   * with generated maps instead of loaded maps, but they may be handy for
   * predetermined terrains.
   */
  'loadMap' : function(map_name) {

  },

  /**
   * Take our static paint data and load them into TerrainPaint objects.
   */
  'loadPaints' : function() {
    var self = this;
    _.each(Terrain.paint_data, function(data, paint_name) {
      
      data.grid = self.settings.grid;
      data.context = self.settings.context;
      
      self.paints[paint_name] = new TerrainPaint(data);
      self.paints[paint_name].loadPaint();
    });

    this.generateTerrain();
  },

  /**
   * Ensure every tick our paints are correctly rendered on the play grid.
   */
  'tick' : function() {
    
    this.settings.context.save();
    this.settings.grid.applyViewportTransformation();
    this.settings.grid.applyIsometricTilt();

    _.each(this.paints, function(paint, paint_name) {
      paint.draw();
    });

    this.settings.context.restore();
  }

});


Terrain.statics({
  
  /**
   * The data required to construct a paint.
   */
  'paint_data' : {
    'grass' : {
      'img' : 'grass.jpg',
      'frames' : 1,
      'map_symbol' : '#'
    },
    'water' : {
      'img' : 'water.jpg',
      'frames' : 6,
      'map_symbol' : '~'
    },
    'tree' : {
      'img' : 'tree.png',
      'frames' : 1,
      'map_symbol' : 'i'
    }
  }
});

