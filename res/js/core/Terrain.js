
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
  'generateGameTerrain' : function() {
    this.applyCoat(this.paints.sand);
    // this.applyCoat(this.paints.tree);
  },

  /**
   * Apply a coat of paint to the entire map.
   */
  'applyCoat' : function(paint) {
    for (var i = 0; i < this.settings.grid.settings.grid_width; i++) {
      for (var n = 0; n < this.settings.grid.settings.grid_height; n++) {
        paint.addToGrid(i,n);
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
   * Get a map of the current terrain as it stands.
   */
  'getMap' : function() {

  },

  /**
   * Take our static paint data and load them into TerrainPaint objects.
   */
  'loadPaints' : function() {
    var self = this;
    _.each(Terrain.paint_data, function(data, paint_name) {

      data.grid = self.settings.grid;
      data.context = self.settings.context;
      data.name = paint_name;
      self.paints[paint_name] = new TerrainPaint(data);
      self.paints[paint_name].loadPaint();
    });
  },

  /**
   * Allow users of this class access to the paints.
   */
  'getPaint' : function(paint_name) {
    return this.paints[paint_name];
  },

  /**
   * Allow users of this class access to all the paints.
   */
   'getPaints' : function() {
      return this.paints;
   },

  /**
   * Ensure every tick our paints are correctly rendered on the play grid.
   */
  'tick' : function() {
    var self = this;

    self.settings.context.save();
    self.settings.grid.applyViewportTransformation();
    self.settings.grid.applyIsometricTilt();

    // Loop through all our paints and draw each one.
    _.each(self.paints, function(paint, paint_name) {
      paint.draw();
    });

    self.settings.context.restore();
  }

});


Terrain.statics({

  /**
   * The data required to construct a paint.
   */
  'paint_data' : {
    'water' : {
      'img' : 'water.jpg',
      'frames' : 6,
      'map_symbol' : '~',
      'isometric' : true,
      'offset' : 0
    },
    'grass' : {
      'img' : 'grass.jpg',
      'frames' : 1,
      'map_symbol' : '#',
      'isometric' : true,
      'offset' : 0
    },
    'sand' : {
      'img' : 'sand.jpeg',
      'frames' : 1,
      'map_symbol' : 'i',
      'isometric' : true,
      'offset' : 30
    },
    'desert' : {
      'img' : 'desert.jpg',
      'frames' : 1,
      'map_symbol' : 'd',
      'isometric' : true,
      'offset' : 30
    },
    'tree' : {
      'img' : 'tree.png',
      'frames' : 1,
      'map_symbol' : 'i',
      'isometric' : false,
      'offset' : 30
    },
    'palm' : {
      'img' : 'palm.png',
      'frames' : 1,
      'map_symbol' : 'i',
      'isometric' : false,
      'offset' : 30
    },
    'cactus1' : {
      'img' : 'cactus1.png',
      'frames' : 1,
      'map_symbol' : '+',
      'isometric' : false,
      'offset' : 30
    },
    'cactus2' : {
      'img' : 'cactus2.png',
      'frames' : 1,
      'map_symbol' : '+',
      'isometric' : false,
      'offset' : 30
    },
    'grass-rock' : {
      'img' : 'grass-rock.png',
      'frames' : 1,
      'map_symbol' : 'i',
      'isometric' : false,
      'offset' : 30
    }
  }
});

