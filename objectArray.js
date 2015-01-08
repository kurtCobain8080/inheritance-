/**
 * Created by simone.dinuovo on 06/01/15.
 */
var objectArray = {
    /**
     * push a canvasElement object in root
     * @param {canvasElement} obj
     * @returns obj
     */
    push : function(obj){
        var name = 'arrayElement' + this.length();
        this[name] = obj;
        return this[name];
    },
    /**
     * return the length of the root object
     * @returns {number} - length of the object ( - this 3 methods )
     */
    length : function(){
        return Object.keys(this).length-3;
    },
    /**
     * remove an element from context.root ( invoking canvasElement method destroy )
     * @param {string} layer - layer name
     */
    remove : function(layer){
        if ( typeof this[layer] === 'undefined' ) return false;
        delete this[layer];
    }
}