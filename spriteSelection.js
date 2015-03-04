/**
 * Created by simone.dinuovo on 02/01/15.
 */
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
        if (!properties) return;
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