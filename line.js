/**
 * Created by Simone on 28/12/14.
 */
/**
 * draw a line
 * @param {Object} {
     * @param {CanvasRenderingContext2D} context - canvas context
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} x1
 * @param {number} y1
 * @param {string} [color="#000"] - color code for border ( default 'black' )
 * }
 * @returns {this} {
     * @function {draw} context - canvas context
 * }
 * @constructor
 */
var Line = function(options){
    var defaults = {
        "context" : document.getElementsByTagName('canvas')[0].getContext("2d"),
        "x" : 0,
        "y" : 0,
        "z" : 0,
        "x1" : 0,
        "y1" : 0,
        "color" : "#000",
        "name" : null
    };
    var settings = extend(defaults,options);
    var $self = new canvasElementPrototype(settings);
    $self.settings = settings;
    $self.draw = function(){
        settings.context.beginPath();
        settings.context.lineWidth = 0.5;
        settings.context.strokeStyle = settings.color;
        settings.context.moveTo(settings.x, settings.y);
        settings.context.lineTo(settings.x1, settings.y1);
        settings.context.stroke();
    };
    return $self;
}