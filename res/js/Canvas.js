
/**
 * A canvas DOM element that can be drawn on.
 */
var Canvas = klass(function(){

  this.width = 0;
  this.height = 0;

});


Canvas.methods({
  
  /**
   * Create a new canvas DOM element.
   */
  create : function() {
 
    this.dom_element = document.createElement('canvas');
    this.dom_element.setAttribute('class', 'canvas-element');
    
    document.body.appendChild(this.dom_element);
    
    this.width = this.dom_element.offsetWidth;
    this.height = this.dom_element.offsetHeight;

    this.context = this.dom_element.getContext("2d");

    return this.dom_element;

  },

});