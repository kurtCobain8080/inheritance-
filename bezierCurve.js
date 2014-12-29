/**
 * Created by Simone on 27/12/14.
 */
function bezierCurve(options){
    var defaults = {
        "context" : document.getElementsByTagName('canvas')[0].getContext("2d"),
        "x1" : 0,
        "y1" : 0,
        "cp1x" : 0,
        "cp1y" : 0,
        "cp2x" : 0,
        "cp2y" : 0,
        "x2" : 0,
        "y2" : 0,
        "lineWidth" : 0,
        "name" : null
    };
    var settings = extend(defaults,options);
    var $self = new canvasElementPrototype(settings);
    $self.settings = settings;
    var point1 = settings.context.root.push(
        Rectangle({
                "context" : settings.context,
                "x" : settings.x1-2,
                "y" : settings.y1-2,
                "width" : 4,
                "height" : 4,
                "border" : 'transparent',
                "background" : "#000"
            }
        )
    );
    var point2 = settings.context.root.push(
        Rectangle({
                "context" : settings.context,
                "x" : settings.x2-2,
                "y" : settings.y2-2,
                "width" : 4,
                "height" : 4,
                "border" : 'transparent',
                "background" : "#000"
            }
        )
    );
    var cPoint1 = settings.context.root.push(
        Circle({
                "context" : settings.context,
                "x" : settings.x1,
                "y" : settings.y1,
                "ray" : 4,
                "background" : "#000"
            }
        )
    );
    var xJoint1 = settings.context.root.push(
        Line({
                "context" : settings.context,
                "x" : settings.x1,
                "y" : settings.y1,
                "x1" : settings.x1,
                "y1" : settings.y1
            }
        )
    );
    var cPoint2 = settings.context.root.push(
        Circle({
                "context" : settings.context,
                "x" : settings.x2,
                "y" : settings.y2,
                "z" : 0,
                "ray" : 4,
                "border" : 'transparent',
                "background" : "#000"
            }
        )
    );
    var xJoint2 = settings.context.root.push(
        Line({
                "context" : settings.context,
                "x" : settings.x2,
                "y" : settings.y2,
                "x1" : settings.x2,
                "y1" : settings.y2
            }
        )
    );
    var down1 = false;
    var down2 = false;
    cPoint1.on('mousedown',function(e){
        down1 = true;
    });
    $self.settings.context.canvas.addEventListener('mousemove',function(e){
        if ( !down1 ) return;
        var x = e.pageX - settings.context.leftEl;
        var y = e.pageY - settings.context.topEl;
        cPoint1.settings.x = x;
        cPoint1.settings.y = y;
        xJoint1.settings.x1 = x;
        xJoint1.settings.y1 = y;
        settings.cp1x = x;
        settings.cp1y = y;
    });
    cPoint1.on('mouseup',function(e, x, y){
        down1 = false;
        cPoint1.settings.x = x;
        cPoint1.settings.y = y;
    });
    cPoint2.on('mousedown',function(e){
        down2 = true;
    });
    $self.settings.context.canvas.addEventListener('mousemove',function(e){
        if ( !down2 ) return;
        var x = e.pageX - settings.context.leftEl;
        var y = e.pageY - settings.context.topEl;
        cPoint2.settings.x = x;
        cPoint2.settings.y = y;
        xJoint2.settings.x1 = x;
        xJoint2.settings.y1 = y;
        settings.cp2x = x;
        settings.cp2y = y;
    });
    cPoint2.on('mouseup',function(e, x, y){
        down2 = false;
        cPoint2.settings.x = x;
        cPoint2.settings.y = y;
    });
    $self.settings.x = $self.settings.x1;
    $self.settings.y = $self.settings.y1;
    $self.settings.width = $self.settings.x2 - $self.settings.x1;
    $self.settings.height = $self.settings.x2 - $self.settings.x1;
    $self.draw = function(){
        var ctx = settings.context;
        ctx.beginPath();
        ctx.lineWidth = settings.lineWidth;
        ctx.moveTo(settings.x1, settings.y1);
        ctx.bezierCurveTo(settings.cp1x, settings.cp1y, settings.cp2x, settings.cp2y, settings.x2, settings.y2);
        ctx.stroke();
    };
    return $self;
}