/**
 * Created by Simone on 22/12/14.
 */
/**
 *
 * @param {DOMelement} el - DOM canvas element
 * @param {number} width
 * @param {number} height
 * @returns {CanvasRenderingContext2D}
 */
function setCanvas(el,width,height){
    var el = el || document.getElementsByTagName('canvas')[0];
    var width = width || window.innerWidth;
    var height = height || window.innerHeight;
    var context = el.getContext("2d");
    context.canvas.width = width;
    context.canvas.height = height;
    context.root = {};
    return context;
}