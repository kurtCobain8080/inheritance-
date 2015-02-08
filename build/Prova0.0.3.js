/*! Prova - v0.0.3 - 2015-02-08 */
var extend = function ( defaults, options ) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};
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
/**
 *
 * @param {function} render - rendering function( update - render );
 */
var requestFrame = function(render){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame||
        function( callback ){
            var timestamp = Date.now();
            window.setTimeout(function() { callback(timestamp) }, 1000 / 30);
        };
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    var $self = function(){
        var self = this;
        var start = 0;
        var stops = false;
        var frame;
        this.label = '';
        var renderHeader = function(timestamp){
            if ( stops ) return;
            frame = requestAnimationFrame(renderHeader);
            var progress = timestamp - start;
            start = timestamp;
            render(timestamp, progress);
        }
        this.stop = function(){
            stops = true;
            cancelAnimationFrame(frame);
        };
        this.play = function(){
            if ( !stops ) return;
            stops = false;
            frame = requestAnimationFrame(renderHeader);
        };
        frame = requestAnimationFrame(renderHeader);
    };
    return new $self;
};
function offset(elem){

    var box = { top: 0, left: 0 };
    var docElem = document.documentElement;
    var win = window;
    var core_strundefined = typeof undefined;
    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
        box = elem.getBoundingClientRect();
    }

    return {
        top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
        left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
    };
}
/**
 * @class canvasElementPrototype
 * @description prototype with inner functions and property shared by the canvas objects.
 * @param settings {object} - an object representing the property of a canvas object
 */
function canvasElementPrototype(settings){
    var undefined = undefined;
    /**
     * @private
     * @var {array} events
     * @memberof canvasElementPrototype
     */
    var events = [];
    var $self = this;
    /**
     * @public
     * @function on - push events on the inner events array, do interpolation with a rectangle or a circle
     * @param event - the event selected ( all events supported by addEventListener native method )
     * @param callback - callback function
     * @memberof canvasElementPrototype
     * @inner
     */
    this.on = function(event,callback){
        function action(e){
            var x = e.pageX - settings.context.leftEl;
            var y = e.pageY - settings.context.topEl;
            settings.context.beginPath();
            if ( settings.ray == undefined )
                var point1 = settings.context.rect(settings.x,settings.y,settings.width,settings.height);
            else
                var point1 = settings.context.arc(settings.x, settings.y, settings.ray, 0, 2 * Math.PI, false);

            if ( settings.context.isPointInPath(x,y) ){
                callback(e, x, y);
            }

        }
        settings.context.canvas.addEventListener(event,action,false);
        events.push({
            'event' : event,
            'action' : action
        });
    };
    /**
     * @public
     * @typedef {timeline} - timeline instance
     * @memberof canvasElementPrototype
     */
    this.timeline = window.timeline();
    var timeline = this.timeline;
    //timeline.addLabel(settings);
    /**
     * @public
     * @var {array} updates
     * @memberof canvasElementPrototype
     */
    this.updates = [];
    var updates = this.updates;
    if ( settings.update != undefined && settings.update ) updates.push(settings.update);
    updates.getElementByLabel = function(label){
        return this.filter(function(e){
            if ( e.label != undefined && e.label == label )
                return e;
        });
    };
    updates.remove = function(label){
        this.splice(index,1);
        return this;
    };
    /**
     * @public
     * @function update
     * @description updates functions array. It cicles updates functions. Override it at your own risk.
     * @param timestamp - timestamp returned by {@link https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame|requestAnimationFrame} method
     * @param progress - currently framerate.
     * @memberof canvasElementPrototype
     * @inner
     */
    this.update = function(timestamp, progress){
        for(var i = 0;i<updates.length;i++)
            updates[i](timestamp, progress);
    };
    this.postRender = settings.postRender;
    /**
     * @public
     * @typedef {animation} - istanceofAnimation
     * @memberof canvasElementPrototype
     */
    this.animation = animation;
    this.destroy = function(){
        for(var i = 0; i<events.length; i++)
            settings.context.canvas.removeEventListener(events[i].event,events[i].action,false);
    };
}
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
            var storageLineWidth = ctx.lineWidth;
            ctx.lineWidth = bordersValues[0];
            ctx.strokeStyle = bordersValues[1];
            ctx.strokeRect(settings.x,settings.y,settings.width,settings.height);
            ctx.lineWidth = storageLineWidth;
        }
        ctx.beginPath();
        ctx.rect(settings.x,settings.y,settings.width,settings.height);
        if ( settings.opacity ) ctx.globalAlpha = settings.opacity;
        ctx.fillStyle = settings["background-color"];
        if ( ctx.fillStyle ) ctx.fill();
        ctx.fillStyle=pat;
        if ( ctx.fillStyle ) {
            ctx.save();
            ctx.translate(settings.x,settings.y);
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    };
    return $self;
}

/**
 * A higher-level canvas interface
 *
 * @requires <extend.js>
 * @requires <offset.js>
 * @requires <requestFrame.js>
 * @param {Object} options = {
 * @param {DOMelement} el - DOM canvas element
 * @param {number} width
 * @param {number} height
 * @param {function} update
 * }
 * @returns {CanvasRenderingContext2D} - new method and properties added to context{
 *      @property {int} topEl - viewport position y
 *      @property {int} leftEl - viewport position x
 *      @property {object} root - canvas elements root ( like DOM document )
 *      @function frames - requestFrame object. clear the canvas, draw elements on the root
 *      @function getElement - get an element from context.root with the name reference
 * }
 */
function setCanvas(options){
    var defaults = {
        el : document.getElementsByTagName('canvas')[0],
        width : null,
        height : null,
        update : function(){},
        postRender : function(){}
    }
    var settings = extend(defaults,options);
    var context = settings.el.getContext("2d");
    context.updates = [settings.update];
    context.update = function(timestamp, progress){
        for(var i = 0;i<context.updates.length;i++)
            context.updates[i](timestamp, progress);
    }
    context.settings = settings;
    var viewportOffset = offset(settings.el);
    context.topEl = viewportOffset.top;
    context.leftEl = viewportOffset.left;
    context.canvas.width = settings.width ||  context.canvas.width;
    context.canvas.height = settings.height ||  context.canvas.height;
    context.elements = [];
    context.elements.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };
    context.elements.remove = function(index){
        this.splice(index,1);
        for(var i = index;i<this.length; i++)
            context.elements[i].settings.index = context.elements.indexOf(context.elements[i]);

    };
    context.root = {
        /**
         * push a canvasElement object in root
         * @param {canvasElement} obj
         * @returns obj
         */
        push : function(obj){
            obj.settings.name = obj.settings.name || 'layer' + context.root.length();
            var newObj = context.root[obj.settings.name] = obj;
            newObj.settings.index = context.elements.length;
            context.elements.push(newObj);
            return context.root[obj.settings.name];
        },
        /**
         * return the length of the root object
         * @returns {number} - length of the object ( - this 3 methods )
         */
        length : function(){
            return Object.keys(context.root).length-3;
        },
        /**
         * remove an element from context.root ( invoking canvasElement method destroy )
         * @param {string} layer - layer name
         */
        remove : function(layer){
            if ( typeof context.root[layer] === 'undefined' ) return false;
            context.root[layer].destroy();
            context.elements.remove(context.root[layer].settings.index);
            delete context.root[layer];
        }
    };
    var stop = false;
    context.frames = requestFrame(function(timestamp, progress){
        if ( stop ) return;
        context.update(timestamp, progress);
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        for(var k in context.root)
        {
            if ( typeof context.root[k].draw !== 'undefined' )
            {
                if ( typeof context.root[k].update !== 'undefined' )
                    context.root[k].update(timestamp, progress,context.root[k]);

                context.root[k].draw();
                if ( typeof context.root[k].postRender !== 'undefined' )
                    context.root[k].postRender(timestamp, progress,context.root[k]);
            }
        }
        context.settings.postRender(timestamp, progress);
    });
    context.frames.label = settings.el.id;
    context.stop = function(){
        stop = true;
    };
    context.play = function(){
        stop = false;
    };
    context.getElement = function(name){
        return context.root[name];
    };
    return context;
}
function createSprite(context){
    var widthCostrain = 1000;
    var $self = new function(){};
    $self.x = 0;
    $self.y = 0;
    $self.width = 0;
    $self.height = 0;
    $self.currentWidth = 0;
    $self.currentHeight = 0;
    $self.items = 0;
    $self.rows = 0;
    $self.images = [];
    $self.addSprite = function(image){
        var width = image.naturalWidth;
        var height = image.naturalHeight;
        $self.rows = ( $self.x + width < widthCostrain ) ? $self.rows : $self.rows + $self.currentHeight;
        $self.x = ( $self.x + width < widthCostrain ) ? $self.x + $self.currentWidth  : 0;
        $self.y = $self.x  ? $self.y : $self.currentHeight;
        $self.width = ( $self.width < $self.x + width) && ( $self.x + width < widthCostrain ) ? $self.x + width : $self.width;
        $self.currentWidth = width;
        $self.currentHeight = height + $self.rows > $self.currentHeight ? height : $self.currentHeight;
        $self.height = $self.currentHeight + $self.rows;
        var img = context.root.push( CanvasImage({ x:$self.x, y:$self.y, img:image, width:width, height:height, border:true }) );
        $self.images.push(img);
        $self.items++;
        return img;
    };
    $self.clear = function(){
        for(var i = $self.images.length-1;i>-1;i--)
            context.root.remove($self.images[i].settings.name);

        $self.x = 0;
        $self.y = 0;
        $self.width = 0;
        $self.height = 0;
        $self.currentWidth = 0;
        $self.currentHeight = 0;
        $self.items = 0;
        $self.rows = 0;
        $self.images = [];
    };
    return $self;
}

/**
 *
 * @param options(object) = {
 * @param el {HTMLInputElement}
 * @param change {function} - function on change
 * @param callback {function}
 * }

 */
var uploadFile = function(options){
    var el = options.el || document.getElementsByTagName('input')[0];
    var change = options.change || function(){};
    var callback = options.callback || function(){};
    var $self = (function(){
        /**
         * @private
         */
        var processFile = function(file,processCallback)
        {
            var reader = new FileReader();

            if(file.type.indexOf("text") >= 0 ){
                reader.onload = function(e) {
                    processCallback(e.target.result);
                 }
                reader.readAsText(file);
            }
            else if(file.type.indexOf("image") >= 0){
                reader.onload = function(e) {
                    var image = new Image();
                    image.onload = function(){
                        processCallback(image);
                    }
                    image.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }
        el.addEventListener("change", function(e){
            change();
            var files = e.target.files;
            for(var i=0;i<files.length;i++) // adding multiple selection help
            {
                processFile(files[i],function(processedFile){
                    callback(processedFile);
                });
            }
        });
    })();
    return $self;
}
/**
 * select canvasElementSprite, one or multiple
 *
 * @param context {CanvasRenderingContext2D} - Currently canvas context
 * @param image {HTMLImageElement} - current image triggering click
 * @param properties {HTMLCollection} - a collection of input
 * @returns spriteSelection {array} - collection of canvas Elements
 *
 */
var spriteSelection = function(context,properties){
    function setProperties(el){
        if ( typeof el === 'undefined' )
        {
            for (var i = 0;i<properties.length;i++)
                properties[i].value = 'no selection';
            return;
        }
        for (var i = 0;i<properties.length;i++)
        {
            var prop = properties[i].id.replace('el','').toLowerCase();
            properties[i].value = el.settings[prop];
        }
    }
    return {
        elements : [],
        add : function(image){
            var elements = this.elements;
            if ( elements.indexOf(image.settings.name) < 0 ) this.elements.push(image.settings.name);
            else return;
            image.postRender = function(){
                context.globalAlpha = 0.3;
                context.fillRect(image.settings.x,image.settings.y, image.settings.width,image.settings.height);
                context.globalAlpha = 1;
            };
            setProperties(image)
        },
        remove : function(image){
            var index = this.elements.indexOf(image.settings.name);
            this.elements.splice(index,1);
            image.postRender = undefined;
            var lastIndex = this.elements[this.elements.length-1];
            setProperties(context.root[lastIndex]);
        },
        clear : function(){
            for ( var i = 0;i<this.elements.length;i++)
                context.root[this.elements[i]].postRender = undefined;

            this.elements = [];
        }
    }
};