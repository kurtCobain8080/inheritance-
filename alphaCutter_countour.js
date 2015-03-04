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
    var imageWidthOriginal = imgData.width;
    var imageHeight = imgData.height;
    var data = imgData.data;
    var dataLength = data.length;
    var pixelTrim = new Uint8ClampedArray(data.length/4);
    var dataLength2 = pixelTrim.length;
    var x,y;
    // analyze every 'valid' pixel to check if has 'valid' pixel in its boundaries
    var path = function(){
        this.x = xx = [];
        this.y = yy = [];
        this.points = points = [];
        this.vertexs = vertex = []; // x1,y1,width,height,x2,y2

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

    function pushPixelTrim(pixelPositionAlpha){
        // imageWidth = imageWidth * 4;
        // pixelPosition = (px/4)|0;
        // pixelPosition - imageWidth - 4  | pixelPosition - imageWidth | pixelPosition - imageWidth + 4
        // ---------------------------------------------------------------------------------------------
        //       pixelPosition - 4         |     pixelPosition          | pixelPostition + 4
        // ---------------------------------------------------------------------------------------------
        // pixelPosition + imageWidth - 4  | pixelPosition + imageWidth | pixelPosition + imageWidth + 4
        var px = Math.floor(pixelPositionAlpha/4);
        if( pixelPositionAlpha-imageWidth-4 >= 0 && data[pixelPositionAlpha-imageWidth-4] == 0 )
        {
            pixelTrim[px] = 1;
            //pushPixel(pixelPositionAlpha-imageWidth-4);
            return;
        }
        if( pixelPositionAlpha-imageWidth >= 0 && data[pixelPositionAlpha-imageWidth] == 0)
        {
            pixelTrim[px] = 1;
            //pushPixel(pixelPositionAlpha-imageWidth);
            return;
        }
        if( pixelPositionAlpha-imageWidth+4 >= 0 && data[pixelPositionAlpha-imageWidth+4] == 0 )
        {
            pixelTrim[px] = 1;
            //pushPixel(pixelPositionAlpha-imageWidth+4);
            return;
        }
        if( pixelPositionAlpha-4 >= 0 && data[pixelPositionAlpha-4] == 0)
        {
            pixelTrim[px] = 1;
            //pushPixel(pixelPositionAlpha-4);
            return;
        }
        if( pixelPositionAlpha+4 <= dataLength && data[pixelPositionAlpha+4] == 0)
        {
            pixelTrim[px] = 1;
            //pushPixel(pixelPositionAlpha+4);
            return;
        }
        if( pixelPositionAlpha+imageWidth-4 <= dataLength && data[pixelPositionAlpha+imageWidth-4] == 0)
        {
            pixelTrim[px] = 1;
            //pushPixel(pixelPositionAlpha+imageWidth-4);
            return;
        }
        if( pixelPositionAlpha+imageWidth <= dataLength && data[pixelPositionAlpha+imageWidth] == 0)
        {
            pixelTrim[px] = 1;
            //pushPixel(pixelPositionAlpha+imageWidth);
            return;
        }
        if( pixelPositionAlpha+imageWidth+4 <= dataLength && data[pixelPositionAlpha+imageWidth+4] == 0)
        {
            pixelTrim[px] = 1;
            //pushPixel(pixelPositionAlpha+imageWidth+4);
            return;
        }
    }
    function pushPixel(px){
        cutters[paths].push(px);
        pixelTrim[px] = 0;
        // pixelPosition - imageWidth - 1  | pixelPosition - imageWidth | pixelPosition - imageWidth + 1
        // ---------------------------------------------------------------------------------------------
        //       pixelPosition - 1         |     pixelPosition          | pixelPostition + 1
        // ---------------------------------------------------------------------------------------------
        // pixelPosition + imageWidth - 1  | pixelPosition + imageWidth | pixelPosition + imageWidth + 1
        if( px-imageWidthOriginal-1 >= 0 && pixelTrim[px-imageWidthOriginal-1] )
            pushPixel(px-imageWidthOriginal-1);
        if( px-imageWidthOriginal >= 0 && pixelTrim[px-imageWidthOriginal] )
            pushPixel(px-imageWidthOriginal);
        if( px-imageWidthOriginal+1 >= 0 && pixelTrim[px-imageWidthOriginal+1] )
            pushPixel(px-imageWidthOriginal+1);
        if( px-1 >= 0 && pixelTrim[px-1] )
            pushPixel(px-1);
        if( px+1 <= dataLength2 && pixelTrim[px+1] )
            pushPixel(px+1);
        if( px+imageWidthOriginal-1 <= dataLength2 && pixelTrim[px+imageWidthOriginal-1] )
            pushPixel(px+imageWidth-1);
        if( px+imageWidthOriginal <= dataLength2 && pixelTrim[px+imageWidthOriginal] )
            pushPixel(px+imageWidthOriginal);
        if( px+imageWidthOriginal+1 <= dataLength2 && pixelTrim[px+imageWidthOriginal+1] )
            pushPixel(px+imageWidthOriginal+1);
    }
    // retrieve 'valid' pixels ( differents from background - check if colorCut variable is undefined )
    var paths = 0;
    callback('initialized',{});
    var counter = 0.05;
    if ( typeof colorCut === 'undefined' )
    {
        for(var i=0;i<dataLength;i+=4)
        {
            if ( data[i+3] )
            {
                pushPixelTrim( i+3 );
            }
        }
        for(var ii=0;ii<dataLength2;ii++)
        {
            if( ii>=Math.floor(dataLength2*counter)-3 && ii<=Math.floor(dataLength2*counter)+3 )
            {
                callback( (counter*100),{});
                //counter= Math.abs( -(counter + 0.05).toFixed(2) );
                counter = (counter * 100 + 0.05 * 100) / 100;
                //counter+=0.05;
            }

            if ( pixelTrim[ii] )
            {
                cutters[paths] = new path();
                pushPixel( ii );
                var sortingX = cutters[paths].x.sort(function(a, b){return a-b});
                var sortingY = cutters[paths].y.sort(function(a, b){return a-b});
                cutters[paths].vertexs[0] = sortingX[0];
                cutters[paths].vertexs[1] = sortingY[0];
                cutters[paths].vertexs[2] = ( sortingX[sortingX.length-1] ) - cutters[paths].vertexs[0];
                cutters[paths].vertexs[3] = ( sortingY[sortingY.length-1] ) - cutters[paths].vertexs[1];
                cutters[paths].vertexs[4] = sortingX[sortingX.length-1];
                cutters[paths].vertexs[5] = sortingY[sortingY.length-1];
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
    var addCuts = [];
    for(var cuts = 0; cuts < cutters.length; cuts++)
    {
        for (var cuts2 = 0; cuts2 < cutters.length; cuts2++)
        {
            if ( cutters[cuts] && cutters[cuts2] && cuts != cuts2 )
            {
                var rect1 = { x : cutters[cuts].vertexs[0], y : cutters[cuts].vertexs[1] };
                var rect2 = { x : cutters[cuts].vertexs[4], y : cutters[cuts].vertexs[5] };
                var rect3 = { x : cutters[cuts2].vertexs[0], y : cutters[cuts2].vertexs[1] };
                var rect4 = { x : cutters[cuts2].vertexs[4], y : cutters[cuts2].vertexs[5] };
                if ( intersectionRectangle(rect1, rect2, rect3, rect4 ) )
                {
                    delete cutters[cuts];
                    break;
                }
            }
        }
    };
    for(var cuts3 = cutters.length; cuts3 >= 0; cuts3--)
        if( typeof cutters[cuts3] === 'undefined' )
            cutters.splice(cuts3,1);

    callback( 100,{});
    return JSON.parse(JSON.stringify(cutters));
};
