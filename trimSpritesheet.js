/**
 * Created by Simone on 26/12/14.
 */
function trimSpritesheet(canvasImage){
    var imgData = canvasImage.imgData;
    var dataFull = [];
    var paths = [];
    for(var i = 0; i<imgData.data.length;i+4)
    {
        if ( imgData.data[i+3] > 0 )
            dataFull.push( Math.floor(i) );
    }

    for(var ii=0;ii<dataFull.length;ii++)
    {
        var pixelData = [ii-canvasImage.settings.width-1, ii-canvasImage.settings.width, ii-canvasImage.settings.width+1,
            ii-1, ii+1, ii+canvasImage.settings.width-1, ii+canvasImage.settings.width, ii+canvasImage.settings.width+1]
        for(var k= 0;k<pixelData.length;k++)
        {
            if (dataFull.indexOf(pixelData[k]) > - 1 )
            {
                for(var z = 0; z<paths.length;z++)
                {
                    if ( paths[z].indexOf(pixelData[k]) > -1 )
                    {
                        paths[z].push(ii);
                        break
                    }
                    else if ( z == paths.length-1 )
                        paths.push( [] );
                }
                break;
            }
        }
    }
    return paths;
}