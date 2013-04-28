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
    var paints = self.settings.terrain.getPaints();
    $.each(paints, function(name, paint) {
      var img = paint.sprite.getDomNode();
      var $wrap = $('<div/>', {'class' : 'wrap', 'id': 'paint-' + name}).append(img);
      $wrap.data('paint', paint);
      self.$bucket.append($wrap);
    });

    // Add them to body for lack of a better place.
    $('body').append(self.$bucket);

    // Set the active paint when one is clicked.
    $('.wrap').click(function(e) {
      e.stopPropagation();
      self.setActivePaint($(this).data('paint').settings.name);
    });
  },

  /**
   * Set the active paint.
   */
  'setActivePaint' : function(name) {

    var $paints = $('#bucket .wrap');
    var $dom_paint = $('#paint-' + name);

    $paints.removeClass('active');
    $dom_paint.addClass('active');

    this.active_paint = this.settings.terrain.getPaint(name);
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
   * Please a resource on the map based on the state of the current paint bucket.
   */
  'placeResource' : function(x, y) {
    var grid = this.settings.grid;
    var grid_location = grid.realToGrid(x, y);
    var tile = grid.getTileByGridCoordinates(grid_location.x, grid_location.y);

    if (this.active_paint) {
      this.active_paint.addToGrid(tile.x, tile.y);
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