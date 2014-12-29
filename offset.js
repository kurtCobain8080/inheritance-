/**
 * Created by Simone on 25/12/14.
 */
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