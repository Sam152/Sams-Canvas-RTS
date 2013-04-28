
/**
 * A canvas DOM element that can be drawn on.
 */
var Canvas = klass(function(){
});


Canvas.methods({

  /**
   * Create a new canvas DOM element.
   */
  create : function(width, height) {
 
    this.dom_element = document.createElement('canvas');
    this.dom_element.setAttribute('class', 'canvas-element');
    
    this.dom_element.width = width;
    this.dom_element.height = height;

    document.body.appendChild(this.dom_element);

    this.context = this.dom_element.getContext("2d");

    return this.dom_element;
  },


  /**
   * Get a 2d rendering context.
   */
  'getContext' : function() {
    return this.context;
  },


  /**
   * Clear the context of any paintings.
   */
  'clearContext' : function() {
    this.getContext().clearRect(
      0,
      0,
      this.dom_element.width,
      this.dom_element.height
    );
  }

});

