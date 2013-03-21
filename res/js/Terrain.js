
/**
 * A simple terrain generator.
 */
var Terrain = klass(function() {
  this.paints = [];
});


Terrain.methods({

  'loadPaints' : function() {

    this.paints.push(
      new TerrainPaint({

      })
    );

  }
});
