/**
 * Created by Simone on 27/12/14.
 */
/**
 * @requires <timeline.js>
 * @requires <animation.js>
 * @class canvasElementPrototype
 * @description prototype with inner functions and property shared by the canvas objects.
 * @param settings {object} - an object representing the property of a canvas object
 */
function canvasElementPrototype(settings){
    var undefined = undefined;
    /**
     * @private
     * @var {array} events
     * @memberof canvasElementPrototype
     */
    var events = [];
    var $self = this;
    this.classes = {};
    this.id = settings.name;
    var originalSettings = settings;
    this.addClass = function(Class){
        $self.classes[Class.name] = {};
        for(var k in Class)
            if(k != "name")
            {
                $self.classes[Class.name][k] = $self.settings[k];
                $self.settings[k] = Class[k];
            }
    };
    this.removeClass = function(Class){
        var className = Class.name;
        for(var k in Class)
            if(k != "name")
                $self.settings[k] = $self.classes[className][k];

        delete $self.classes[className];
    };
    this.toggleClass = function(Class){
        var className = Class.name;
        if ( $self.classes[className] )
            this.removeClass(Class);
        else
            this.addClass(Class);
    };
    /**
     * @public
     * @function on - push events on the inner events array, do interpolation with a rectangle or a circle
     * @param event - the event selected ( all events supported by addEventListener native method )
     * @param callback - callback function
     * @memberof canvasElementPrototype
     * @inner
     */
    this.on = function(event,callback){
        function action(e){
            var x = e.pageX - settings.context.leftEl;
            var y = e.pageY - settings.context.topEl;
            var point1;
            settings.context.beginPath();
            if ( settings.ray == undefined ) // for squares
                point1 = settings.context.rect(settings.x,settings.y,settings.width,settings.height);
            else // for circles
                point1 = settings.context.arc(settings.x, settings.y, settings.ray, 0, 2 * Math.PI, false);

            if ( settings.context.isPointInPath(x,y) ){
                callback(e, x, y, $self);
            }

        }
        settings.context.canvas.addEventListener(event,action,false);
        events.push({
            'event' : event,
            'action' : action
        });
    };
    /**
     * @public
     * @typedef {timeline} - timeline instance
     * @memberof canvasElementPrototype
     */
    this.timeline = window.timeline();
    var timeline = this.timeline;
    //timeline.addLabel(settings);
    /**
     * @public
     * @var {array} updates
     * @memberof canvasElementPrototype
     */
    this.updates = [];
    var updates = this.updates;
    if ( settings.update != undefined && settings.update ) updates.push(settings.update);
    updates.getElementByLabel = function(label){
        return this.filter(function(e){
            if ( e.label != undefined && e.label == label )
                return e;
        });
    };
    updates.remove = function(label){
        this.splice(index,1);
        return this;
    };
    /**
     * @public
     * @function update
     * @description updates functions array. It cicles updates functions. Override it at your own risk.
     * @param timestamp - timestamp returned by {@link https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame|requestAnimationFrame} method
     * @param progress - currently framerate.
     * @memberof canvasElementPrototype
     * @inner
     */
    this.update = function(timestamp, progress){
        for(var i = 0;i<updates.length;i++)
            updates[i](timestamp, progress);
    };
    this.postRender = settings.postRender;
    /**
     * @public
     * @typedef {animation} - istanceofAnimation
     * @memberof canvasElementPrototype
     */
    this.animation = animation;
    this.destroy = function(){
        for(var i = 0; i<events.length; i++)
            settings.context.canvas.removeEventListener(events[i].event,events[i].action,false);
    };
}