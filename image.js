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
    if ( typeof options.img === 'undefined' || options.img.src === 'undefined' ) return;

    var defaults = {
        "context" : document.getElementsByTagName('canvas')[0].getContext("2d"),
        "img" : null,
        "sx" : 0,
        "sy" : 0,
        "swidth" : options.img.naturalWidth,
        "sheight" : options.img.naturalHeight,
        "x" : 0,
        "y" : 0,
        "z" : 0,
        "width" : 0,
        "height" : 0,
        "name" : null,
        "border" : null,
        "behaviour" : function(){}
    };
    var $self = new function(){
        /* creating events callbacks */
        var events = [];
        this.on = function(event,callback){
            function action(e){
                var x = e.pageX - settings.context.leftEl;
                var y = e.pageY - settings.context.topEl;
                var x1 = settings.x + settings.width;
                var y1 = settings.y + settings.height;
                if ( ( x >= settings.x && x <= x1 ) &&
                    ( y >= settings.y && y <= y1 )
                    )
                    callback(e);
            }
            settings.context.canvas.addEventListener(event,action,false);
            events.push({
                'event' : event,
                'action' : action
            })
        };
        this.destroy = function(){
            for(var i = 0; i<events.length; i++)
                settings.context.canvas.removeEventListener(events[i].event,events[i].action,false);
        };
    };
    $self.settings = extend(defaults,options);
    var settings = $self.settings;
    $self.draw = function(){
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
            if ( settings.border )
                settings.context.strokeRect(settings.x,settings.y,settings.width,settings.height);
    };
    /* creating imgData properties */
    var fakeCanvas = document.createElement('canvas');
    fakeCanvas.width = settings.img.naturalWidth;
    fakeCanvas.height = settings.img.naturalHeight;
    fakeCanvas.getContext("2d").drawImage(settings.img,0,0,fakeCanvas.width,fakeCanvas.height);
    $self.imgData = fakeCanvas.getContext("2d").getImageData(0,0,fakeCanvas.width,fakeCanvas.height);
    return $self;
}