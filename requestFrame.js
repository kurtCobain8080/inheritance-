/**
 * Created by Simone on 21/12/14.
 */
/**
 *
 * @param {function} render - rendering function( update - render );
 */
var requestFrame = function(render){
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame||
    function( callback ){
        var timestamp = Date.now();
        window.setTimeout(function() { callback(timestamp) }, 1000 / 30);
    };
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var start = 0;
var stop = false;
this.stop = function(){
    stop = true;
    cancelAnimationFrame(renderHeader);
}
this.play = function(){
    if ( !stop ) return;
    stop = false;
    requestAnimationFrame(renderHeader);
}

var renderHeader = function(timestamp){
    if ( stop ) return;
    requestAnimationFrame(renderHeader);
    var progress = timestamp - start;
    start = timestamp;
    console.log('Progress:-->', progress);
    render();
}
requestAnimationFrame(renderHeader);
return this;
};