/**
 * Created by simone.dinuovo on 2/22/15.
 */
var documentSelection = function(callback){
    var x, y;
    var mD = false;
    var sel;
    var $self = this;
    $self.stop = false;
    $self.mousedown = function(e){
        e.preventDefault;
        if ( $self.stop || e.which == 3 || e.which == 2 ) return;
        mD = true;
        x = e.pageX;
        y = e.pageY;
        if ( !html.className.search("crosshair") < 0 ) html.className += " crosshair";
        sel = document.createElement('div');
        sel.className = "documentSelectionEl";
        sel.style.width = "0";
        sel.style.height = "0";
        sel.style.left = x + "px";
        sel.style.top = y + "px";
        document.body.appendChild(sel);
        return false;
    };
    $self.mousemove = function(e){
        e.preventDefault;
        if ( $self.stop ) return;
        if ( !mD ) return;
        var newX = e.pageX;
        var newY = e.pageY;
        if ( !html.className.search("crosshair") < 0  ) html.className += " crosshair";
        if ( newX - x < 0 ) sel.style.left = newX + "px";
        if ( newY - y < 0 ) sel.style.top = newY + "px";
        if ( newX - x < 0 )
            sel.style.width = Math.abs( newX - x )  + "px";
        else
            sel.style.width = newX - x  + "px";
        if ( newY - y < 0 )
            sel.style.height = Math.abs( newY - y )  + "px";
        else
            sel.style.height = newY - y  + "px";
        return false;
    };
    $self.mouseup = function(e){
        e.preventDefault;
        if ( $self.stop || e.which == 3 || e.which == 2 ) return;
        mD = false;
        var newX = e.pageX;
        var newY = e.pageY;
        html.className.replace("crosshair","");
        callback(parseInt(sel.style.left), parseInt(sel.style.top), parseInt(sel.style.width), parseInt(sel.style.height));
        document.body.removeChild(sel);
        return false;
    }
    $self.clickAndContext = function(e){
        e.preventDefault();
        return false;
    }
    function init(){
        document.addEventListener('mousedown',$self.mousedown,false);
        document.addEventListener('mousemove',$self.mousemove,false);
        document.addEventListener('mouseup',$self.mouseup,false);
        document.addEventListener('click',$self.clickAndContext,false);
        document.addEventListener('contextmenu',$self.clickAndContext,false);
    }
    init();
    return {
        stop:function(){
            $self.stop = true;
            document.removeEventListener('mousedown',$self.mousedown,false);
            document.removeEventListener('mousemove',$self.mousemove,false);
            document.removeEventListener('mouseup',$self.mouseup,false);
            document.removeEventListener('contextmenu',$self.clickAndContext,false);
            document.removeEventListener('click',$self.clickAndContext,false);
        },
        play:function(){
            $self.stop = false;
            init();
        }
    }
};
