/**
 * Created by Simone on 21/12/14.
 */
/**
 * draw a rectangle
 * @param {obj} {
     * @param {CanvasRenderingContext2D} context - canvas context
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} width
     * @param {number} height
     * @param {string} [border="#000"] - color code for border ( default 'black' )
     * @param {string} [background="#000"] - color code for background ( default 'black' )
 * }
 * @returns {obj} {
     * @function {draw} context - canvas context
 * }
 * @constructor
 */
function Rectangle(options){
    var defaults = {
        "context" : document.getElementsByTagName('canvas')[0].getContext("2d"),
        "x" : 0,
        "y" : 0,
        "z" : 0,
        "width" : 0,
        "height" : 0,
        "border" : "#000",
        "background" : "#000"
    };
    this.settings = extend(defaults,options);
    var settings = this.settings;
    this.draw = function(){
        settings.context.beginPath();
        if (settings.border != 'transparent') {
            settings.context.strokeStyle= settings.border;
            settings.context.strokeRect(settings.x-1,settings.y-1,settings.width+1,settings.height+1);
        }
        if (settings.background != 'transparent') {
            settings.context.fillStyle = settings.background;
            settings.context.fillRect(settings.x,settings.y,settings.width,settings.height);
        }
    };
    return this;
}