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
 * @requires <extend.js>
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
        var ctx = settings.context;
        var pat = settings["background-image"] ? ctx.createPattern(settings["background-image"],settings['background-repeat'] || 'repeat') : 'transparent';
        if ( settings.border ){
            ctx.beginPath();
            ctx.lineWidth = settings.border;
            ctx.strokeStyle = settings["border-color"];
            ctx.rect(settings.x-settings.border,settings.y-settings.border,settings.width+settings.border,settings.height+settings.border);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.rect(settings.x,settings.y,settings.width,settings.height);
        ctx.fillStyle = settings["background-color"];
        ctx.fill();
        ctx.fillStyle=pat;
        ctx.fill();
    };
    return $self;
}
