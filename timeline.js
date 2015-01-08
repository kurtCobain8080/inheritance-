/**
 * Created by simone.dinuovo on 02/01/15.
 */
var timeline = function(el){
    var timeline = [];
    var undefined = undefined;
    timeline.addLabel = function(label,options,position){
        if ( position == undefined )
            var record = ( this.push({}) ) - 1;
        else
            var record = this.splice(position,0,options);

        this[record].label = label;
        this[record].index = record;

        for(var k in options)
            this[record][k] = options[k];

        console.log('oi', label, options, position);
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
    timeline.getElementByLabel = function(label){
        var record = timeline.filter(function(element){
            if ( element.label == label )
                return element;
        });
        return record;
    };
    timeline.getElementByIndex = function(index){
        var record = timeline.filter(function(element){
            if ( element.index == index )
                return element;
        });
        return record;
    }
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
