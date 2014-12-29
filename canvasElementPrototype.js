/**
 * Created by Simone on 27/12/14.
 */
function canvasElementPrototype(settings){
    var undefined = undefined;
    var events = [];
    this.on = function(event,callback){
        function action(e){
            var x = e.pageX - settings.context.leftEl;
            var y = e.pageY - settings.context.topEl;
            settings.context.beginPath();
            if ( settings.ray == undefined )
                var point1 = settings.context.rect(settings.x,settings.y,settings.width,settings.height);
            else
                var point1 = settings.context.arc(settings.x, settings.y, settings.ray, 0, 2 * Math.PI, false);

            if ( settings.context.isPointInPath(x,y) ){
                callback(e, x, y);
            }

        }
        settings.context.canvas.addEventListener(event,action,false);
        events.push({
            'event' : event,
            'action' : action
        });
    }
    this.destroy = function(){
        for(var i = 0; i<events.length; i++)
            settings.context.canvas.removeEventListener(events[i].event,events[i].action,false);
    };
}