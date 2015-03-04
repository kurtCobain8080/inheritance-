/**
 * Created by simone.dinuovo on 2/22/15.
 */

var isPlainObject = function( obj , key) {
    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var cons = canvasElementPrototype;

    var isWindow = function( obj) {
        return obj != null && obj === obj.window;
    }

    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if ( obj == null ) return false;
    if ( typeof obj !== "object" || obj.nodeType || isWindow( obj ) ) {
        return false;
    }

    if ( ( obj.constructor &&
        !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) &&
        obj.constructor != cons
        ) {
        return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
};
var printObj = function(obj){
    var arr = [];
    for ( var key in obj )
    {
        var val = obj[key];
        if ( obj.hasOwnProperty(key) && key != "__proto__" && key ){
            var next = '"' + key + '"' + " : ";
            if ( isPlainObject(val) )
                next += printObj( val );
            else if ( Array.isArray(val) ){
                next+='[';
                for(var i=0;i<val.length;i++){
                    var comma = i<val.length-1 ? ',' : '';
                    if ( isPlainObject(val) || Array.isArray(val) )
                        next+=printObj( val[i] ) + comma;
                    else
                        next+=val + comma;
                }
                next+=']';
            }
            else if ( typeof val === 'string' || typeof val === 'object'  )
                next+= '"' + val + '"';
            else if ( typeof val === 'undefined' )
                next+= 'null';
            else
                next+= typeof val !== 'function' ? val : '"function(){ not versioned }"';
        }

        arr.push( next );
    };
    return "{ " +  arr.join( ", " ) + "}";
}
