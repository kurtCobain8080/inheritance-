/**
 * Created by simone.dinuovo on 31/12/14.
 */
function AnimationBezierCurve(options)
{
    var defaults = {
        cp1x : null,
        cp1y : null,
        cp2x : null,
        cp2y : null,
        width : 300,
        height : 150,
        padding : 75,
        lineWidth : 0.5
    }
    var settings = extend(defaults,options);
    var cp1x = settings.cp1x;
    var cp1y = settings.cp1y;
    var cp2x = settings.cp2x;
    var cp2y = settings.cp2y;
    var img = new Image();
    var InterpolationInterfaceSizeX = ( 1 / settings.width ); // 300 is the width of the maximum draggable canvas;
    var InterpolationInterfaceSizeY = ( 1 / settings.height ); // 250 is the height of the maximum draggable canvas;
    var contextPadding = settings.padding;
    img.src = 'images/grid.png';
    img.onload = function(){
        var context = setCanvas({
            update : function(){
                var bezier = context.root.bezierCurve;
                if ( !cp1x.stateFocus ) {
                    cp1x.value = InterpolationInterfaceSizeX * ( bezier.settings.cp1x - contextPadding );
                }
                if ( cp1x.stateBlur ) {
                    bezier.settings.cp1x = (  settings.width * Number( cp1x.value ) ) + contextPadding;
                    //bezier.cPoint1.settings.x = (  settings.width * Number( cp1x.value ) ) + contextPadding ;
                    //bezier.cJoint1.settings.x1 = (  settings.width * Number( cp1x.value ) ) + contextPadding ;
                    console.warn(cp1x.value,bezier.settings.cp1x,bezier.cPoint1.settings.x,bezier.cJoint1.settings.x1 );
                    cp1x.stateFocus = false;
                    cp1x.stateBlur = false;
                }
                if ( !cp1y.stateFocus ) cp1y.value = InterpolationInterfaceSizeY * ( bezier.settings.cp1y - contextPadding );
                if ( cp1y.stateBlur ) {
                    bezier.settings.cp1y = ( settings.height * Number( cp1y.value ) ) + contextPadding;
                    //bezier.cPoint1.settings.y = ( settings.height * Number( cp1y.value ) ) + contextPadding;
                    //bezier.cJoint1.settings.y1 =  ( settings.height * Number( cp1y.value ) ) + contextPadding;
                    cp1y.stateFocus = false;
                    cp1y.stateBlur = false;
                }
                if ( !cp2x.stateFocus ) cp2x.value = InterpolationInterfaceSizeX * ( bezier.settings.cp2x - contextPadding );
                if ( cp2x.stateBlur ) {
                    bezier.settings.cp2x = ( settings.width * Number( cp2x.value ) ) + contextPadding;
                    //bezier.cPoint2.settings.x = ( settings.width * Number( cp2x.value ) ) + contextPadding;
                    //bezier.cJoint2.settings.x1 = ( settings.width * Number( cp2x.value ) ) + contextPadding;
                    cp2x.stateFocus = false;
                    cp2x.stateBlur = false;
                }
                if ( !cp2y.stateFocus ) cp2y.value = InterpolationInterfaceSizeY * ( bezier.settings.cp2y - contextPadding );
                if ( cp2y.stateBlur ) {
                    bezier.settings.cp2y =  ( settings.height * Number( cp2y.value ) ) + contextPadding;
                    //bezier.cPoint2.settings.y =  ( settings.height * Number( cp2y.value ) ) + contextPadding;
                    //bezier.cJoint2.settings.y1 =  ( settings.height * Number( cp2y.value ) ) + contextPadding;
                    cp2y.stateFocus = false;
                    cp2y.stateBlur = false;
                }
            }
        });
        context.root.push(
            CanvasElement({
                "context" : context,
                "background-image" : img,
                "x" : contextPadding,
                "y" : contextPadding,
                "width" : 300,
                "height" : 150
            })
        );
        var bezierWidth = context.canvas.width - contextPadding - contextPadding;
        var bezierHeight = context.canvas.height - contextPadding - contextPadding;
        var bezier = context.root.push(
            bezierCurve({
                "context" : context,
                "x1" : contextPadding,
                "y1" : context.canvas.height - contextPadding,
                "cp1x" : contextPadding + ( bezierWidth * 0.5 ),
                "cp1y" : ( contextPadding + bezierHeight ) - ( bezierHeight * 0.5 ),
                "cp2x" : ( contextPadding + bezierWidth ) - ( bezierWidth * 0.5 ) ,
                "cp2y" : contextPadding + ( bezierHeight * 0.5 ),
                "x2" : context.canvas.width - contextPadding,
                "y2" : contextPadding,
                "lineWidth" : 0.5,
                "name" : 'bezierCurve'
            })
        );
    };
}