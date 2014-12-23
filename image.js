/**
 * Created by simone.dinuovo on 22/12/14.
 */

/**
 * canvas image prototype
 * numbers should be integers ( otherwise, performance could be slower )
 * @requires <extend.js>
 * @param {Object} options {
     * @param context {CanvasRenderingContext2D} - Specifies the image, canvas, or video element to use
     * @param img {HTMLImageElement} - Specifies the image, canvas, or video element to use
     * @param sx {int|number} - Optional. The x coordinate ( of the image ) where to start clipping
     * @param sy {int|number} - Optional. The y coordinate where to start clipping
     * @param swidth {int|number} - Optional. The width of the clipped image
     * @param sheight {int|number} - Optional. The height of the clipped image
     * @param x {int|number} - The x coordinate where to place the image on the canvas
     * @param y {int|number} - The y coordinate where to place the image on the canvas
     * @param width {int|number} - Optional. The width of the image to use (stretch or reduce the image) ( clipped image should have the same value of swidth )
     * @param height {int|number} - Optional. The height of the image to use (stretch or reduce the image) ( clipped image should have the same value of sheight )
 * }
 *
 * @example
 * // insert image in x,y
 * ctx.drawImage(img, 10, 10);
 * {@link http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage}
 *
 * @example
 * // Position the image on the canvas, and specify width and height of the image:
 * ctx.drawImage(img,10,10,150,180);
 * {@link http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage2}
 *
 * @example
 * // Clip the image and position the clipped part on the canvas:
 * ctx.drawImage(img,90,130,50,60,10,10,50,60);
 * {@link http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage3}
 *
 *  * @example
 * // link to code that draws the frames of a video
 * {@link http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage_video}
 */
function CanvasImage(options){
    var defaults = {
        "context" : document.getElementsByTagName('canvas')[0].getContext("2d"),
        "img" : null,
        "sx" : 0,
        "sy" : 0,
        "swidth" : 0,
        "sheight" : 0,
        "x" : 0,
        "y" : 0,
        "z" : 0,
        "width" : 0,
        "height" : 0,
        "behaviour" : function(){}
    };
    this.settings = extend(defaults,options);
    var settings = this.settings;
    this.draw = function(){
        settings.context.drawImage(
            settings.img,
            settings.sx,
            settings.sy,
            settings.swidth,
            settings.sheight,
            settings.x,
            settings.y,
            settings.width,
            settings.height
        );
    };
    return this;

}