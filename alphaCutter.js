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
    var cutters = {};
    var imageWidth = imgData.width;
    var imageHeight = imgData.height;
    var data = imgData.data;
    var pixelTrim = [];
    //  TODO: check settings buffer 32-bit for best performance in iterations ( see http://jsperf.com/canvas-pixel-manipulation );
    // retrieve 'valid' pixels ( differents from background - check if colorCut variable is undefined )
    if ( typeof colorCut === 'undefined' )
    {
        for(var i=0;i<data.length;i+=4)
            if ( data[i+3] == 0 )
                pixelTrim[i/4] = false;
            else
                pixelTrim[i/4] = true;
    }
    else
    {
        for(var i=0;i<data.length;i+=4)
            if ( data[i] == colorCut[0] && data[i+1] == colorCut[1] && data[i+2] == colorCut[2] &&  data[i+3] == colorCut[3] )
                pixelTrim[i/4] = false;
            else
                pixelTrim[i/4] = true;
    }
    // analyze every 'valid' pixel to check if has 'valid' pixel in its boundaries
    var paths = 0;
    var path = function(){
        this.x = xx = [];
        this.y = yy = [];
        this.points = points = [];
        this.vertexs = vertex = []; // x1,y1,width,height

        this.push = function(n){
            var x = n%imageWidth;
            var y = Math.floor( n/imageWidth );
            if( points.indexOf([x,y]) > -1 ) return;
            points.push([x,y]);
            xx.push( x );
            yy.push( y );
            vertex[0] = Math.min.apply( Math, xx );
            vertex[1] = Math.min.apply( Math, yy );
            vertex[2] = ( Math.max.apply( Math, xx ) ) - vertex[0]+1;
            vertex[3] = ( Math.max.apply( Math, yy ) ) - vertex[1]+1;
        };
    };

    function pushPixel(px){
        cutters[paths].push(px);
        pixelTrim[px] = false;
        // pixelPosition - imageWidth - 1  | pixelPosition - imageWidth | pixelPosition - imageWidth + 1
        // ---------------------------------------------------------------------------------------------
        //       pixelPosition - 1         |     pixelPosition          | pixelPostition + 1
        // ---------------------------------------------------------------------------------------------
        // pixelPosition + imageWidth - 1  | pixelPosition + imageWidth | pixelPosition + imageWidth + 1
        if( px-imageWidth-1 >= 0 && pixelTrim[px-imageWidth-1] )
            pushPixel(px-imageWidth-1)
        if( px-imageWidth >= 0 && pixelTrim[px-imageWidth] )
            pushPixel(px-imageWidth)
        if( px-imageWidth+1 >= 0 && pixelTrim[px-imageWidth+1] )
            pushPixel(px-imageWidth+1)
        if( px-1 >= 0 && pixelTrim[px-1] )
            pushPixel(px-1)
        if( px+1 <= pixelTrim.length && pixelTrim[px+1] )
            pushPixel(px+1)
        if( px+imageWidth-1 <= pixelTrim.length && pixelTrim[px+imageWidth-1] )
            pushPixel(px+imageWidth-1)
        if( px+imageWidth <= pixelTrim.length && pixelTrim[px+imageWidth] )
            pushPixel(px+imageWidth)
        if( px+imageWidth+1 <= pixelTrim.length && pixelTrim[px+imageWidth+1] )
            pushPixel(px+imageWidth+1)
    }

    for(var pixelPosition=0;pixelPosition<pixelTrim.length;pixelPosition++)
    {
        if ( pixelTrim[pixelPosition] )
        {
            cutters[paths] = new path();
            pushPixel( pixelPosition );
            paths+=1;
        }

    }

    return JSON.parse(JSON.stringify(cutters));
};
