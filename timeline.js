/**
 * Created by simone.dinuovo on 02/01/15.
 */
var timeline = function(el){
    var timeline = [];
    var undefined = undefined;
    timeline.addLabel = function(options,position){

        var record = 0;

        if ( position == undefined )
            record = ( this.push({}) ) - 1;
        else
            record = this.splice(position,0,options);

        this[record].index = record;

        for(var k in options)
            this[record][k] = options[k];

        return this[record];
    };
    timeline.removeLabel = function(pos){
        if ( typeof pos === "number" )
            this.slice(pos,1);
        else
        {
            var count = 0;
            for(var i = 0; i<this.length; i++)
            {
                if ( this[i].label == pos )
                    break;
                else count++;
            }
            this.splice(count,1);
        }
    };
    timeline.getElementByName = function(name){
        var record = timeline.filter(function(element){
            if ( element.name == name )
                return element;
        });
        return record;
    };
    timeline.getNextByName = function(name){
        var $self = this;
        var record = timeline.filter(function(element){
            console.log(element.name, name);
            if ( element.name == name )
            {
                debugger;
                var ind = $self.indexOf(element) + 1;
                ind=ind<$self.length ? ind : false;
                return ind
            }
        });
        return record;
    };
    timeline.getElementByIndex = function(index){
        var record = timeline.filter(function(element){
            if ( element.index == index )
                return element;
        });
        return record;
    };
    timeline.getNextByIndex = function(index){
        var next = index+1;
        if ( next < this.length)
            return timeline[next];
        else
            return timeline[0];
    };
    return timeline;
};

/**
 * @example
var x = { 'name' : 'prova'};
var y = { 'name' : 'prova2'}
timelineX = timeline(x);
timelineY = timeline(y);
timelineX.addLabel('prova1',{x:10,y:11});
timelineY.addLabel('prova1',{x:0,y:1});
timelineY.addLabel('prova2',{x:2,y:3});
 **/
