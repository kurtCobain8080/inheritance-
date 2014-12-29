/**
 * Created by Simone on 21/12/14.
 */
/**
 * draw a circle
 * @param {Object} {
     * @param {CanvasRenderingContext2D} context - canvas context
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} ray
     * @param {string} [border="#000"] - color code for border ( default 'black' )
     * @param {string} [background="#000"] - color code for background ( default 'black' )
 * }
 * @returns {canvasElementPrototype} {
     * @function {draw} context - canvas context
 * }
 * @constructor
 */
var Circle = function(options){
    var defaults = {
        "context" : document.getElementsByTagName('canvas')[0].getContext("2d"),
        "x" : 0,
        "y" : 0,
        "z" : 0,
        "ray" : 0,
        "border" : "#000",
        "background" : "#000",
        "name" : null
    };
    var settings = extend(defaults,options);
    var $self = new canvasElementPrototype(settings);
    $self.settings = settings;
    $self.draw = function(){
        settings.context.beginPath();
        settings.context.fillStyle=settings.background;
        settings.context.arc(settings.x, settings.y, settings.ray, 0, 2 * Math.PI, false);
        settings.context.fill();
    };
    return $self;
}