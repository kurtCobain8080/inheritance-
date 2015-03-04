/**
 * Created by simone.dinuovo on 22/12/14.
 */



/**
 * @require extend.js
 * @require canvasElementPrototype
 * @param options {options} jsobject of parameters
 * @property context {CanvasRenderingContext2D} - Specifies the image, canvas, or video element to use. See {@link https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D|CanvasRenderingContext2D}
 * @property img {HTMLImageElement} - Specifies the image, canvas, or video element to use
 * @property sx {int|number} - Optional. The x coordinate ( of the image ) where to start clipping
 * @property sy {int|number} - Optional. The y coordinate where to start clipping
 * @property swidth {int|number} - Optional. The width of the clipped image
 * @property sheight {int|number} - Optional. The height of the clipped image
 * @property x {int|number} - The x coordinate where to place the image on the canvas
 * @property y {int|number} - The y coordinate where to place the image on the canvas
 * @property width {int|number} - Optional. The width of the image to use (stretch or reduce the image) ( clipped image should have the same value of swidth )
 * @property height {int|number} - Optional. The height of the image to use (stretch or reduce the image) ( clipped image should have the same value of sheight )
 * @returns {canvasElementPrototype}
 */
function CanvasImage(options){
    if ( typeof options.img === 'undefined' || options.img.src === 'undefined' ) return false;
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
        "width" : options.img.naturalWidth,
        "height" : options.img.naturalHeight,
        "name" : null,
        "border" : null,
        "behaviour" : function(){}
    };
    var settings = extend(defaults,options);
    var $self = new canvasElementPrototype(settings);
    $self.settings = settings;
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

/*
 // insert image in x,y
 ctx.drawImage(img, 10, 10);
 http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage
 // Position the image on the canvas, and specify width and height of the image:
 ctx.drawImage(img,10,10,150,180);
 http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage2
 // Clip the image and position the clipped part on the canvas:
 ctx.drawImage(img,90,130,50,60,10,10,50,60);
 http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage3

 // link to code that draws the frames of a video
 http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage_video
 */