/**
 * Created by Simone on 22/12/14.
 */
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
    };
    var settings = extend(defaults,options);
    var context = settings.el.getContext("2d");
    context.updates = [settings.update];
    context.update = function(timestamp, progress){
        for(var i = 0;i<context.updates.length;i++)
            context.updates[i](timestamp, progress);
    };
    context.settings = settings;
    var viewportOffset = offset(settings.el);
    context.topEl = Math.floor( viewportOffset.top );
    context.leftEl = Math.floor( viewportOffset.left );
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
    var windowWidth = window.innerWidth;
    context.frames = requestFrame(function(timestamp, progress){
        if ( stop ) return;
        if ( windowWidth && windowWidth != window.innerWidth ) // detecting zoom
        {
            console.log('zoom || resize!');
            var viewportOffset = offset(settings.el);
            context.topEl = Math.floor( viewportOffset.top );
            context.leftEl = Math.floor( viewportOffset.left );
            windowWidth = window.innerWidth;
        }
        context.update(timestamp, progress);
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        var contextLength = context.elements.length;
        for(var k=0;k<contextLength;k++)
        {
            if ( typeof context.elements[k].draw !== 'undefined' )
            {
                if ( typeof context.elements[k].update !== 'undefined' )
                    context.elements[k].update(timestamp, progress,context.elements[k]);

                context.elements[k].draw();
                if ( typeof context.elements[k].postRender !== 'undefined' )
                    context.elements[k].postRender(timestamp, progress,context.elements[k]);
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