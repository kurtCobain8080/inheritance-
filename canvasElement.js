/**
 * Created by Simone on 27/12/14.
 */
'use strict';
/**
 * Created by simone.dinuovo on 22/12/14.
 */

/**
 * canvas image prototype
 * numbers should be integers ( otherwise, performance could be slower )
 * @requires <canvasElementPrototype.js>
 * @param {Object} options {
     * @param context {CanvasRenderingContext2D} - Specifies the image, canvas, or video element to use
     * @param x {int|number} - The x coordinate where to place the image on the canvas
     * @param y {int|number} - The y coordinate where to place the image on the canvas
     * @param z {int|number} - Optional. z vertex for pseudo-3D
     * @param width {int|number} - Optional. The width of the element
     * @param height {int|number} - Optional. The height of the element

*  }
 */
function CanvasElement(options){
    var defaults = {
        "context" : document.getElementsByTagName('canvas')[0].getContext("2d"),
        "x" : 0,
        "y" : 0,
        "z" : 0,
        "width" : 0,
        "height" : 0,
        "name" : null,
        "border" : null,
        "border-color" : '#000',
        "background-color" : null,
        "background-image" : null,
        "background-repeat" : null,
        "opacity" : null,
        "behaviour" : function(){}
    };
    var settings = extend(defaults,options);
    var $self = new canvasElementPrototype(settings);
    $self.settings = settings;
    if(settings.border) var bordersValues = settings.border.split(" ");
    $self.draw = function(){
        var ctx = settings.context;
        var repeat = settings['background-repeat'] ? settings['background-repeat'] : 'repeat';
        var pat = settings["background-image"] ? ctx.createPattern(settings["background-image"],repeat) : null;
        if ( settings.border ){
            ctx.beginPath();
            var storageLineWidth = ctx.lineWidth;
            ctx.lineWidth = bordersValues[0];
            ctx.strokeStyle = bordersValues[1];
            ctx.strokeRect(settings.x,settings.y,settings.width,settings.height);
            // resets
            ctx.lineWidth = storageLineWidth;
        }
        ctx.beginPath();
        ctx.rect(settings.x,settings.y,settings.width,settings.height);
        if ( settings.opacity ) ctx.globalAlpha = settings.opacity;
        if ( settings["background-color"] ){
            ctx.fillStyle = settings["background-color"];
            ctx.fill();
        }
        if ( pat ) {
            ctx.fillStyle=pat;
            ctx.save();
            ctx.translate(settings.x,settings.y);
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    };
    return $self;
}
