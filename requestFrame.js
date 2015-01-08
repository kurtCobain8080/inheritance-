/**
 * Created by Simone on 21/12/14.
 */
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame||
    function( callback ){
        var timestamp = Date.now();
        window.setTimeout(function() { callback(timestamp) }, 1000 / 30);
    };
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
/**
 *
 * @param {function} render - rendering function( update - render );
 */
var requestFrame = function(render){
    var $self = function(){
        var self = this;
        var start = 0;
        var stop = false;
        this.label = '';
        var renderHeader = function(timestamp){
            if ( stop ) return;
            requestAnimationFrame(renderHeader);
            var progress = timestamp - start;
            start = timestamp;
            render(timestamp, progress);
        }
        this.stop = function(){
            stop = true;
            cancelAnimationFrame(renderHeader);
        };
        this.play = function(){
            if ( !stop ) return;
            stop = false;
            requestAnimationFrame(renderHeader);
        };
        requestAnimationFrame(renderHeader);
    };
    return new $self;
};