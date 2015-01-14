/**
 * Created by Simone on 27/12/14.
 */
/**
 *
 * @param options {object} = {
 * @param context {CanvasRenderingContext2D}
 * @param x1 {int|number} - x1 point
 * @param x2 {int|number} - y1 point of the curve - according to the screen y
 * @param cp1x {number} - control point 1 x
 * @param cp1y {number} - control point 1 y - the function automatically invert it according to cartesian y // TODO creating value converter
 * @param cp1x {number} - control point 2 x
 * @param cp2y {number} - control point 2 y - the function automatically invert it according to cartesian y // TODO creating value converter
 * @param x2 {number} - x2 point
 * @param y2 {number} - y2 point
 * @param y2 {number} - y2 point
 * @param lineWidth {number} - the line width of the curve. default 0.5
 * @param name {string} - canvas element alias
 * }
 * @returns {canvasElementPrototype}
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
        "lineWidth" : 0.5,
        "name" : null
    };
    var settings = extend(defaults,options);
    var $self = new canvasElementPrototype(settings);
    $self.settings = settings;
    var ctrlPointScreen1 = Math.abs(settings.width - settings.cp1y);
    var ctrlPointScreen2 = Math.abs(settings.width - settings.cp2y);
    var point1 = $self.point1 = settings.context.root.push(
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
    var point2 = $self.point2 = settings.context.root.push(
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
    var cPoint1 = $self.cPoint1 =settings.context.root.push(
        Circle({
                "context" : settings.context,
                "x" : settings.cp1x,
                "y" : settings.cp1y,
                "ray" : 4,
                "background" : "#000",
                "update" : function(){
                    cPoint1.settings.x = settings.cp1x;
                    cPoint1.settings.y = settings.height - settings.cp1y;
                },
                "name" : "cPoint1"
            }
        )
    );
    var cJoint1 = $self.cJoint1 =settings.context.root.push(
        Line({
                "context" : settings.context,
                "x" : settings.x1,
                "y" : settings.y1,
                "x1" : settings.cp1x,
                "y1" : settings.cp1y,
                "update" : function(){
                    cJoint1.settings.x1 = settings.cp1x;
                    cJoint1.settings.y1 = settings.height - settings.cp1y;
                },
                "name" : "cJoint1"
            }
        )
    );
    var cPoint2 = $self.cPoint2 = settings.context.root.push(
        Circle({
                "context" : settings.context,
                "x" : settings.cp2x,
                "y" : settings.cp2y,
                "z" : 0,
                "ray" : 4,
                "border" : 'transparent',
                "background" : "#000",
                "update" : function(){
                    cPoint2.settings.x = settings.cp2x;
                    cPoint2.settings.y = settings.height - settings.cp2y;
                },
                "name" : "cPoint2"
            }
        )
    );
    var cJoint2 = $self.cJoint2 = settings.context.root.push(
        Line({
                "context" : settings.context,
                "x" : settings.x2,
                "y" : settings.y2,
                "x1" : settings.cp2x,
                "y1" : settings.height - settings.cp2y,
                "update" : function(){
                    cJoint2.settings.x1 = settings.cp2x;
                    cJoint2.settings.y1 = settings.height - settings.cp2y;
                },
                "name" : "cJoint2"
            }
        )
    );
    var down1 = false;
    var down2 = false;
    var mouseup1 = false;
    var mouseup2 = false;
    cPoint1.on('mousedown',function(e){
        down1 = true;
    });
    $self.settings.context.canvas.addEventListener('mousemove',function(e){
        if ( !down1 ) return;
        var x = e.pageX - settings.context.leftEl;
        var y = e.pageY - settings.context.topEl;
        settings.cp1x = x;
        settings.cp1y = Math.abs(settings.width - y);
    });
    cPoint1.on('mouseup',function(e, x, y){
        down1 = false;
        mouseup1 = true;
    });
    cPoint2.on('mousedown',function(e){
        down2 = true;
    });
    $self.settings.context.canvas.addEventListener('mousemove',function(e){
        if ( !down2 ) return;
        var x = e.pageX - settings.context.leftEl;
        var y = e.pageY - settings.context.topEl;
        settings.cp2x = x;
        settings.cp2y = Math.abs(settings.width - y);
    });
    $self.settings.context.canvas.addEventListener('click',function(e){
       var down1 = false;
       var down2 = false;
       if ( ( settings.cp2x == settings.cp1x && mouseup1 ) && ( settings.cp2y == settings.cp1y && mouseup2 ) )
           settings.cp1x-=18;

        mouseup1 = false;
        mouseup2 = false;
    })
    cPoint2.on('mouseup',function(e, x, y){
        down2 = false;
        mouseup2 = true;
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
        ctx.bezierCurveTo(settings.cp1x, settings.height - settings.cp1y,
            settings.cp2x,
            settings.height - settings.cp2y,
            settings.x2,
            settings.y2);
        ctx.stroke();
    };
    return $self;
}