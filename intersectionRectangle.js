/**
 * Created by simone.dinuovo on 2/21/15.
 */
function intersectionRectangle(a1,a2,b1,b2)
{
    // clock ver
    var point1_is_inner = ( a1.x >= b1.x  && a1.x <= b2.x )  && ( a1.y >= b1.y  && a1.y <= b2.y );
    var point2_is_inner = ( a2.x >= b1.x  && a2.x <= b2.x )  && ( a1.y >= b1.y  && a1.y <= b2.y );
    var point3_is_inner = ( a2.x >= b1.x  && a2.x <= b2.x )  && ( a2.y >= b1.y  && a2.y <= b2.y );
    var point4_is_inner = ( a1.x >= b1.x  && a1.x <= b2.x )  && ( a2.y >= b1.y  && a2.y <= b2.y );
    if( point1_is_inner || point2_is_inner || point3_is_inner || point4_is_inner )
        return true;
    else
        return false;
}
