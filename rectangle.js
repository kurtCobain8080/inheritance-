/**
 * Created by Simone on 21/12/14.
 */
/**
 * draw a rectangle
 * @param {Object} {
     * @param {CanvasRenderingContext2D} context - canvas context
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} width
     * @param {number} height
     * @param {string} [border="#000"] - color code for border ( default 'black' )
     * @param {string} [background="#000"] - color code for background ( default 'black' )
 * }
 * @returns {this} {
     * @function {draw} context - canvas context
 * }
 * @constructor
 */
var Rectangle = function(options){
    var defaults = {
        "context" : document.getElementsByTagName('canvas')[0].getContext("2d"),
        "x" : 0,
        "y" : 0,
        "z" : 0,
        "width" : 0,
        "height" : 0,
        "border" : "transparent",
        "background" : "#000",
        "name" : null
    };
    var settings = extend(defaults,options);
    var $self = new canvasElementPrototype(settings);
    $self.settings = settings;
    $self.draw = function(){
        if (settings.border != 'transparent') {
            settings.context.beginPath();
            settings.context.strokeStyle = settings.border;
            settings.context.strokeRect(settings.x-1,settings.y-1,settings.width+1,settings.height+1);
        }
        if (settings.background != 'transparent') {
            settings.context.beginPath();
            settings.context.fillStyle = settings.background;
            settings.context.fillRect(settings.x,settings.y,settings.width,settings.height);
        }
    };
    return $self;
}