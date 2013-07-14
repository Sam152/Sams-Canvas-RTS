
/**
 * Save and load the state of the map.
 */
var MapState = klass(function(settings) {

  this.settings = _.extend({
    'terrain' : false,
    'grid' : false
  }, settings);

});

MapState.statics({
  'POINT_SPLIT' : '.',
  'EMPTY_SYMBOL' : '0'
});

MapState.methods({

  /**
   * Load a map file and apply it to some terrain.
   */
  'loadMap' : function(map) {

    var self = this;
    var terrain = self.settings.terrain;
    var grid = self.settings.grid;

    // Get our maps as a resource.
    var map_file = new Resource({'source' : map, 'type' : 'maps'});

    // Download our map.
    map_file.getString(function(map_data) {

      // Parse our map string into JSON.
      var map_object = JSON.parse(map_data);

      // Loop through all the points in our map.
      $.each(map_object.points, function(point_str, obj) {

        // Draw our point on the map.
        var point = {
          'x' : point_str.split(MapState.POINT_SPLIT)[0],
          'y' : point_str.split(MapState.POINT_SPLIT)[1]
        };
        var iso = _.keys(obj)[0];
        var non_iso = obj[iso];
        $.each([iso, non_iso], function(i, symbol) {
          var paint = terrain.getPaintByMapSymbol(symbol);
          if (paint) {
            paint.addToGrid(point.x, point.y);
          }
        });
      });

      // Set the size of our grid to what our map defines.
      grid.setGridWidth(map_object.width, map_object.height);
    });
  },

  /**
   * Save a map structure from a terrain state. The structure is as follows:
   * { 'X.Y' : {ISO : NON_ISO} }
   * Where x and y are grid co-ordiantes and ISO is an isometric tile and
   * NON_ISO is a non-isometric tile.
   */
  'saveMap' : function() {
    var points = {};
    var self = this;
    var grid = self.settings.grid;

    $.each(this.settings.terrain.getPaints(), function(name, paint) {

      var symbol = paint.settings.map_symbol;
      var isometric = paint.settings.isometric;

      $.each(paint.paint_locations, function(i, location) {

        var key_string = location.grid_x + MapState.POINT_SPLIT + location.grid_y;
        var tile_obj;

        // If we don't have anything on our tile.
        if (typeof points[key_string] == 'undefined') {

          // Create a new object to represent our tile.
          tile_obj = points[key_string] = {};

          // Add our tile object with a placeholder '0' for the other occupant
          // of the tile.
          if (isometric) {
            tile_obj[symbol] = MapState.EMPTY_SYMBOL;
          } else {
            tile_obj[MapState.EMPTY_SYMBOL] = symbol;
          }

        } else {

          tile_obj = points[key_string];

          // If we already had an occupant and our current tile is isometric
          // the other tile must be non-isometirc meaning that we currently have
          // an object like {'0' : TILE_SYMBOL}
          if (isometric) {
            // Update our tile object to include both occupants.
            var other_occupant = tile_obj[MapState.EMPTY_SYMBOL];
            tile_obj = {symbol : other_occupant};

          // If we already had a tile object and our current tile is non isometric
          // it means our current tile object is in the form of { TILE_SYMBOL : 0 }
          // meaning we need to find the tile symbol key and turn it's value into
          // our current key.
          } else {
            // Find the first properties key.
            var other_occupant = _.keys(tile_obj)[0];
            tile_obj[other_occupant] = symbol;
          }
        }
      });
    });

    var map = {
      'points' : points,
      'width' : grid.settings.grid_width,
      'height' : grid.settings.grid_height
    }

    console.clear();

    // Encode and compress our map.
    var uncompressed_map = JSON.stringify(map);
    var compressed_map = lzw_encode(uncompressed_map);

    console.log('Origianl size: ' + (uncompressed_map.length/1000) + 'mb');
    console.log('Compressed size: ' + (compressed_map.length/1000) + 'mb');

    window.prompt ("Copy to clipboard: Ctrl+C, Enter", uncompressed_map);
  }
});
