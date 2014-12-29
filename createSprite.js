/**
 * Created by Simone on 26/12/14.
 */

function createSprite(context){
    var widthCostrain = 1000;
    var $self = new function(){};
    $self.x = 0;
    $self.y = 0;
    $self.width = 0;
    $self.height = 0;
    $self.currentWidth = 0;
    $self.currentHeight = 0;
    $self.rows = 0;
    $self.add = function(image){
        var width = image.naturalWidth;
        var height = image.naturalHeight;
        $self.rows = ( $self.x + width < widthCostrain ) ? $self.rows : $self.rows + $self.currentHeight;
        $self.x = ( $self.x + width < widthCostrain ) ? $self.x + $self.currentWidth  : 0;
        $self.y = $self.x  ? $self.y : $self.currentHeight;
        $self.width = ( $self.width < $self.x + width) && ( $self.x + width < widthCostrain ) ? $self.x + width : $self.width;
        $self.currentWidth = width;
        $self.currentHeight = height + $self.rows > $self.currentHeight ? height : $self.currentHeight;
        $self.height = $self.currentHeight + $self.rows;
        var img = context.root.push( CanvasImage({ x:$self.x, y:$self.y, img:image, width:width, height:height, border:true }) );
        return img;
    };
    return $self;
}
