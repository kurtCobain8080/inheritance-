/**
 * Created by simone.dinuovo on 2/22/15.
 */
var createSpriteElements = function(context,currentSelection,paths,alphaCutters)
{
// keyboard select events
    /**
     * @private shiftKey - register shift button
     * @type {boolean}
     */
    var shiftKey = false;
    /**
     * @private ctrlKey - register ctrl button
     * @type {boolean}
     */
    var ctrlKey = false;

    /**
     *
     * @param keyCode {int} - javascript keycode
     * @param event {string}
     */
    function keyMap(keyCode, event){
        if ( event == 'keydown' )
            var bool = true;
        else
            var bool = false;

        switch( keyCode ){
            case 16:
                shiftKey = bool;
            case 17:
                ctrlKey = bool;
            default:
                break;
        }
    }

    /**
     * document keydown register
     */
    document.addEventListener('keydown',function(e){
        //e.preventDefault();
        keyMap(e.which,'keydown')
    },true);
    /**
     * document keyup register
     */
    document.addEventListener('keyup',function(e){
        //e.preventDefault();
        keyMap(e.which,'keyup')
    },true);
    var spriteElement = context.root.push(
        CanvasElement({
            "context" : context,
            "x" : alphaCutters[paths].vertexs[0],
            "y" : alphaCutters[paths].vertexs[1],
            "width" : alphaCutters[paths].vertexs[2],
            "height" :  alphaCutters[paths].vertexs[3],
            "border" : "2 #000",
            "name" : "paths" + paths
        })
    );
    spriteElement.on('click',function(e,x,y,el){

        if (ctrlKey && currentSelection.elements.indexOf(spriteElement.settings.name) < 0)
        {
            currentSelection.add(spriteElement);
            return;
        }
        else if (!ctrlKey && currentSelection.elements.indexOf(spriteElement.settings.name) < 0)
        {
            currentSelection.add(spriteElement);
            return;
        }
        else if (currentSelection.elements.indexOf(spriteElement.settings.name) > -1 )
        {
            currentSelection.remove(spriteElement);
            return;
        }
        else
            currentSelection.add(spriteElement);

    });
}