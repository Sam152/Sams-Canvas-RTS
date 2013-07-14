/**
 * Represents an encounter between a group of players.
 */
var PaintBucket = klass(function(settings) {

  this.settings = _.extend({
    'context' : false,
    'terrain' : false,
    'grid' : false
  }, settings);

  this.active_paint = false;

  this.map_state = new MapState({
    'grid' : this.settings.grid,
    'terrain' : this.settings.terrain
  });

});


PaintBucket.methods({

  /**
   * Tick the paint bucket.
   */
  'tick' : function() {
    this.highlightMouseMovement();
  },

  /**
   * Setup its state.
   */
  'setupInitialState' : function() {
    this.createSelectionBucket();
    this.setupPainting();
  },

  'createSelectionBucket' : function() {
    var self = this;

    // Create some DOM elements with our resources in them.
    self.$bucket = $('<div/>').attr('id', 'bucket');
    self.$paint_wrapper = $('<div/>').attr('id', 'paint-wrapper');
    var paints = self.settings.terrain.getPaints();
    $.each(paints, function(name, paint) {
      var img = paint.sprite.getDomNode();
      var $wrap = $('<div/>', {'class' : 'wrap', 'id': 'paint-' + name}).append(img);
      $wrap.data('paint', paint);
      self.$paint_wrapper.append($wrap);
    });

    self.$bucket.append(self.$paint_wrapper);

    self.$clear = $('<div/>').attr('id', 'clear');
    self.$save = $('<div/>').attr('id', 'save');
    self.$load = $('<div/>').attr('id', 'load');

    self.$bucket.append(self.$clear);
    self.$bucket.append(self.$save);
    self.$bucket.append(self.$load);

    // Add them to body for lack of a better place.
    $('body').append(self.$bucket);

    // Set the active paint when one is clicked.
    $('.wrap').click(function(e) {
      self.setActivePaint($(this).data('paint').settings.name);
    });

    self.$clear.click(function() {
      self.setActivePaint(false);
    });

    self.$save.click(function() {
      self.map_state.saveMap(self.settings.grid);
    });

    self.$load.click(function() {
      var map_name = prompt('Enter the name of a map', '');
      if (map_name) {
        self.map_state.loadMap(map_name + '.map');
      }
    });

    // Stop interactions with the bucket messing with the canvas.
    self.$bucket.click(function(e) {
      e.stopPropagation();
    });
  },

  /**
   * Set the active paint.
   */
  'setActivePaint' : function(name) {

    var $paints = $('#bucket .wrap');
    $paints.removeClass('active');

    if (name) {
      var $dom_paint = $('#paint-' + name);
      $dom_paint.addClass('active');
      this.active_paint = this.settings.terrain.getPaint(name);
    } else {
      this.active_paint = false;
    }

  },

  /**
   * Allow the user to paint resources on to the map.
   */
  'setupPainting' : function() {
    var self = this;

    var dragging = false;
    var $body = $('body');

    // Detect if the mouse is down or not.
    $body.mousedown(function(){
      dragging = true;
    })
    .mouseup(function(){
      dragging = false;
    })
    .click(function(e) {
      self.placeResource(e.pageX, e.pageY);
    });

    // Respond to mouse movement.
    $(window).mousemove(function(e) {
      if (!dragging)
        return;
      self.placeResource(e.pageX, e.pageY);
    });

  },

  /**
   * Clear a map tile to make way for another resource. A good rule right now is
   * that each tile may only have 1 occupant that is isometric and 1 occupant
   * that is non-isometric. This allows for a base and an item, something like
   * a tree on top.
   */
  'clearMap' : function(tile, makeWayFor) {
    var self = this;
    var paints = self.settings.terrain.getPaints();
    $.each(paints, function(paint_name, paint) {
      if (makeWayFor) {
        // Ensure we are removing a paint of the same type.
        if (paint.settings.isometric != makeWayFor.settings.isometric) {
          return;
        }
      }
      paint.removeFromGrid(tile.x, tile.y);
    });
  },

  /**
   * Please a resource on the map based on the state of the current paint bucket.
   */
  'placeResource' : function(x, y) {
    var self = this;
    var grid = this.settings.grid;
    var grid_location = grid.realToGrid(x, y);


    var tile = grid.getTileByGridCoordinates(grid_location.x, grid_location.y);

    self.clearMap(tile, self.active_paint);
    if (self.active_paint) {
      self.active_paint.addToGrid(tile.x, tile.y);
    }
  },

  /**
   * Track all the mouse movement on the screen.
   */
  'highlightMouseMovement' : function(e) {

    // Get our grid and mouse position.
    var mouse = Input.getMouseState();
    var grid = this.settings.grid;

    // Get the coords of the mouse position translated into isometric terms.
    var grid_coords = grid.realToGrid(mouse.offsetX, mouse.offsetY);

    // Get the corresponding tile.
    var tile = grid.getTileByGridCoordinates(grid_coords.x, grid_coords.y);

    // Highlight that tile.
    grid.highlightWireGrid(tile.x, tile.y);
  }

});