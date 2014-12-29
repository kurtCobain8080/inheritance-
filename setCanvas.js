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
    }
    var settings = extend(defaults,options);
    var context = settings.el.getContext("2d");
    context.settings = settings;
    var viewportOffset = offset(settings.el);
    context.topEl = viewportOffset.top;
    context.leftEl = viewportOffset.left;
    context.canvas.width = settings.width ||  context.canvas.width;
    context.canvas.height = settings.height ||  context.canvas.height;
    context.root = {
        /**
         * push a canvasElement object in root
         * @param {canvasElement} obj
         * @returns obj
         */
        push : function(obj){
            obj.settings.name = obj.settings.name || 'layer' + context.root.length();
            context.root[obj.settings.name] = obj;
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
            context.root[layer].destroy();
            delete context.root[layer];
        }
    };
    context.frames = requestFrame(function(progress){
        context.settings.update(progress);
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        for(var k in context.root)
            if ( typeof context.root[k].draw !== 'undefined' )
            context.root[k].draw();

        context.settings.postRender(progress);
    });
    context.getElement = function(name){
        return context.root[name];
    };
    return context;
}