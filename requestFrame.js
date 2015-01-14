/**
 * Created by Simone on 21/12/14.
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