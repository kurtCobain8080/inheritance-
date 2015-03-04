/**
 * Created by Simone on 08/02/15.
 */
/**
 *
 * @param imgData {Uint8ClampedArray} - image bitmap data
 * @param colorCut {array of four integers} - color to cut from the background. Default alpha(0);
 * @returns cutters {object} - rectangles founds
 */
var alphaCutter = function(imgData,colorCut){
    var cutters = [];
    var imageWidth = imgData.width;
    var imageHeight = imgData.height;
    var data = imgData.data;
    var pixelTrim = new Uint8ClampedArray(data.length/4);
    function binarySearch(arr, val) {
        // given that arr is sorted,
        // find i for which arr[i] == val
        // if it doesn't exist, return -1

        start = 0;
        end = arr.length - 1;

        while(end >= start) {
            midptidx = Math.floor((start+end)/2);
            midptval = arr[midptidx];
            if(midptval === val) {
                return midptidx;
            } else if(midptval > val) {
                end = midptidx - 1;
            } else {
                start = midptidx + 1;
            }
        }
        return -1;
    }
    //  TODO: check settings buffer 32-bit for best performance in iterations ( see http://jsperf.com/canvas-pixel-manipulation );
    // retrieve 'valid' pixels ( differents from background - check if colorCut variable is undefined )
    if ( typeof colorCut === 'undefined' )
    {
        for(var i=0;i<data.length;i+=4)
            if ( data[i+3] == 0 )
                pixelTrim[i/4] = 0;
            else
                pixelTrim[i/4] = 1;
    }
    else
    {
        for(var i=0;i<data.length;i+=4)
            if ( data[i] == colorCut[0] && data[i+1] == colorCut[1] && data[i+2] == colorCut[2] &&  data[i+3] == colorCut[3] )
                pixelTrim[i/4] = 0;
            else
                pixelTrim[i/4] = 1;
    }
    // analyze every 'valid' pixel to check if has 'valid' pixel in its boundaries
    var paths = 0;
    var path = {
        x : [],
        y : [],
        points : [],
        vertexs : []
    }
    var pushPath = function(innerPath,n){
        var x = n%imageWidth;
        var y = Math.floor( n/imageWidth );
        //if( points.indexOf([x,y]) > -1 ) return;
        if( binarySearch(innerPath.points,[x,y]) > -1 ) return;
        innerPath.points[innerPath.points.length] = [x,y];
        innerPath.x[innerPath.x.length] = x ;
        innerPath.y[innerPath.y.length] = y ;
    }

    function pushPixel(px){
        pushPath( cutters[paths], px );
        pixelTrim[px] = 0;
        // pixelPosition - imageWidth - 1  | pixelPosition - imageWidth | pixelPosition - imageWidth + 1
        // ---------------------------------------------------------------------------------------------
        //       pixelPosition - 1         |     pixelPosition          | pixelPostition + 1
        // ---------------------------------------------------------------------------------------------
        // pixelPosition + imageWidth - 1  | pixelPosition + imageWidth | pixelPosition + imageWidth + 1
        if( px-imageWidth-1 >= 0 && pixelTrim[px-imageWidth-1] )
            pushPixel(px-imageWidth-1);
        if( px-imageWidth >= 0 && pixelTrim[px-imageWidth] )
            pushPixel(px-imageWidth);
        if( px-imageWidth+1 >= 0 && pixelTrim[px-imageWidth+1] )
            pushPixel(px-imageWidth+1);
        if( px-1 >= 0 && pixelTrim[px-1] )
            pushPixel(px-1);
        if( px+1 <= pixelTrim.length && pixelTrim[px+1] )
            pushPixel(px+1);
        if( px+imageWidth-1 <= pixelTrim.length && pixelTrim[px+imageWidth-1] )
            pushPixel(px+imageWidth-1);
        if( px+imageWidth <= pixelTrim.length && pixelTrim[px+imageWidth] )
            pushPixel(px+imageWidth);
        if( px+imageWidth+1 <= pixelTrim.length && pixelTrim[px+imageWidth+1] )
            pushPixel(px+imageWidth+1);
    }

    for(var pixelPosition=0;pixelPosition<pixelTrim.length;pixelPosition++)
    {
        if ( pixelTrim[pixelPosition] )
        {
            cutters[paths] = {x : [],y : [],points : [],vertexs : []};
            pushPixel( pixelPosition );
            cutters[paths].vertexs[0] = Math.min.apply( Math, cutters[paths].x );
            cutters[paths].vertexs[1] = Math.min.apply( Math, cutters[paths].y );
            cutters[paths].vertexs[2] = ( Math.max.apply( Math, cutters[paths].x ) ) - cutters[paths].vertexs[0]+1;
            cutters[paths].vertexs[3] = ( Math.max.apply( Math, cutters[paths].y ) ) - cutters[paths].vertexs[1]+1;
            paths+=1;
        }

    }

    return cutters;
};
