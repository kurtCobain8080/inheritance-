/**
 * Created by Simone on 08/02/15.
 */
/**
 *
 * @param imgData {Uint8ClampedArray} - image bitmap data
 * @param colorCut {array of four integers} - color to cut from the background. Default alpha(0);
 * @param callback {function} - news from the process are passed to this function
 * @returns cutters {array} - rectangles founds in vertex
 */
var alphaCutter = function(imgData,colorCut, callback){
    var cutters = [];
    var imageWidth = imgData.width*4;
    var imageHeight = imgData.height;
    var data = imgData.data;
    var dataLength = data.length;
    //var pixelTrim = new Uint8ClampedArray(data.length/4);
    var x,y;
    // analyze every 'valid' pixel to check if has 'valid' pixel in its boundaries
    var path = function(){
        this.x = xx = [];
        this.y = yy = [];
        this.points = points = [];
        this.vertexs = vertex = []; // x1,y1,width,height

        this.push = function(n){
            x =  Math.floor( n % (imageWidth/4) );
            y = Math.floor( n/(imageWidth/4) );
            if( points.indexOf([x,y]) > -1 ) return;
            //if( binarySearch(points,[x,y]) > -1 ) return;
            points[points.length] = [x,y];
            xx[xx.length] = x ;
            yy[yy.length] = y ;
        };
    };
    /*var pushPath = function(innerPath,n){
        var x = n & ((imageWidth/4)-1);
        var y = Math.floor( n/(imageWidth/4) );
        //if( points.indexOf([x,y]) > -1 ) return;
        if( binarySearch(innerPath.points, [x,y] ) > -1 ) return;
        innerPath.points[innerPath.points.length] = [x,y];
        innerPath.x[innerPath.x.length] = x ;
        innerPath.y[innerPath.y.length] = y ;
    }*/

    function pushPixel(pixelPositionAlpha){
        // imageWidth = imageWidth * 4;
        // pixelPosition = (px/4)|0;
        // pixelPosition - imageWidth - 4  | pixelPosition - imageWidth | pixelPosition - imageWidth + 4
        // ---------------------------------------------------------------------------------------------
        //       pixelPosition - 4         |     pixelPosition          | pixelPostition + 4
        // ---------------------------------------------------------------------------------------------
        // pixelPosition + imageWidth - 4  | pixelPosition + imageWidth | pixelPosition + imageWidth + 4
        var px = Math.floor(pixelPositionAlpha/4);
        cutters[paths].push(px);
        //pushPath(cutters[paths],pixelPositionAlpha);
        data[pixelPositionAlpha] = 0;
        if( pixelPositionAlpha-imageWidth-4 >= 0 && data[pixelPositionAlpha-imageWidth-4] )
            pushPixel(pixelPositionAlpha-imageWidth-4);
        if( pixelPositionAlpha-imageWidth >= 0 && data[pixelPositionAlpha-imageWidth] )
            pushPixel(pixelPositionAlpha-imageWidth);
        if( pixelPositionAlpha-imageWidth+4 >= 0 && data[pixelPositionAlpha-imageWidth+4] )
            pushPixel(pixelPositionAlpha-imageWidth+4);
        if( pixelPositionAlpha-4 >= 0 && data[pixelPositionAlpha-4] )
            pushPixel(pixelPositionAlpha-4);
        if( pixelPositionAlpha+4 <= dataLength && data[pixelPositionAlpha+4] )
            pushPixel(pixelPositionAlpha+4);
        if( pixelPositionAlpha+imageWidth-4 <= dataLength && data[pixelPositionAlpha+imageWidth-4] )
            pushPixel(pixelPositionAlpha+imageWidth-4);
        if( pixelPositionAlpha+imageWidth <= dataLength && data[pixelPositionAlpha+imageWidth] )
            pushPixel(pixelPositionAlpha+imageWidth);
        if( pixelPositionAlpha+imageWidth+4 <= dataLength && data[pixelPositionAlpha+imageWidth+4] )
            pushPixel(pixelPositionAlpha+imageWidth+4);
    }
    // retrieve 'valid' pixels ( differents from background - check if colorCut variable is undefined )
    var paths = 0;
    callback('initialized',{});
    var counter = 0.05;
    if ( typeof colorCut === 'undefined' )
    {
        for(var i=0;i<dataLength;i+=4)
        {
            if( i>=Math.floor(dataLength*counter)-3 && i<=Math.floor(dataLength*counter)+3 )
            {
                callback( (counter*100),{});
                //counter= Math.abs( -(counter + 0.05).toFixed(2) );
                counter = (counter * 100 + 0.05 * 100) / 100;
                //counter+=0.05;
            }

            if ( data[i+3] )
            {
                cutters[paths] = new path();
                pushPixel( i+3 );
                var sortingX = cutters[paths].x.sort(function(a, b){return a-b});
                var sortingY = cutters[paths].y.sort(function(a, b){return a-b});
                cutters[paths].vertexs[0] = sortingX[0];
                cutters[paths].vertexs[1] = sortingY[0];
                cutters[paths].vertexs[2] = ( sortingX[sortingX.length-1] ) - cutters[paths].vertexs[0]+1;
                cutters[paths].vertexs[3] = ( sortingY[sortingY.length-1] ) - cutters[paths].vertexs[1]+1;
                paths+=1;
            }
        }
    }
    // TODO
    /*else
     {
     for(var i=0;i<data.length;i+=4)
     if ( data[i] == colorCut[0] && data[i+1] == colorCut[1] && data[i+2] == colorCut[2] &&  data[i+3] == colorCut[3] )
     pixelTrim[i/4] = 0;
     else
     pixelTrim[i/4] = 1;
     }*/
    callback( 100,{});
    return JSON.parse(JSON.stringify(cutters));
};
