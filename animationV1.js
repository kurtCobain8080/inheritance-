/**
 * Created by simone.dinuovo on 05/01/15.
 */
var animation = function(tweening){
    var undefined = undefined;
    var $self = this;
    var interpolation = {};
    interpolation.settings = {};

    for(var sets in $self.settings)
        if ( tweening.pointA && tweening.pointA[sets] != undefined )
            interpolation.settings[sets] = tweening.pointA[sets];
        else
            interpolation.settings[sets] = $self.settings[sets];

    interpolation.duration = tweening.duration;
    interpolation.animationTime = 0;
    interpolation.stop = false;
    interpolation.play = function(){
        interpolation.stop = true;
    };
    interpolation.transition = {
        parameters : []
    };
    interpolation.endAnimation = false;
    var animationType;
    var parameters = [];
    var transitionType = tweening.transition.split('(')[0];
    switch ( transitionType )
    {
        case 'cubic-bezier':
            animationType = 'cubicBezier';
            interpolation.transition.parameters = tweening.transition.trim()
                .split('(')[1]
                .replace(')','')
                .split(',');
            parameters = interpolation.transition.parameters;
            for(var i = 0; i<parameters.length;i++)
                parameters[i] = Number(parameters[i]);

            if ( parameters.length != 4 )
            {
                throw new Error('bezier paramaters \n' + parameters + '\n length is not 4.');
                return;
            };
            break;
        default:
            animationType = tweening.transition;
            break;
    };
    interpolation.transition.animationType = animationType;

    interpolation.update = function(timestamp,progress){
        if ( interpolation.stop ) return;
        if ( !tweening.cycle && interpolation.animationTime == 1  ) return;
        interpolation.animationTime = interpolation.animationTime == 1 ? 0 : interpolation.animationTime;
        var duration = interpolation.duration;
        var amount = interpolation.animationTime == 0 && interpolation.endAnimation ? 0 : 1 / ( duration / progress );
        interpolation.animationTime = ( interpolation.animationTime + amount ) > 1 ? 1 : (interpolation.animationTime + amount);
        var tween = 0;
        if (parameters.length)
            tween = Bezier.cubicBezier(parameters[0],parameters[1],parameters[2],parameters[3],interpolation.animationTime,interpolation.duration);
        else
            tween = Bezier[animationType](interpolation.animationTime,interpolation.duration);
        for ( var k in tweening.pointB )
            $self.settings[k] = !interpolation.endAnimation ?  interpolation.settings[k] + ( tween * Number( tweening.pointB[k] ) ) :  interpolation.settings[k];

        if ( tweening.name == 'true' ) console.log($self.settings[k]);
        interpolation.endAnimation = !(interpolation.animationTime == 0 && interpolation.endAnimation);
        if ( interpolation.animationTime == 1 && !tweening.cycle &&  tweening.index != undefined ) {
            var newInterpolation = $self.timeline.getNextByIndex(tweening.index);
            interpolation.remove();
            $self.animation(newInterpolation);
            return;
        }

        interpolation.endAnimation = interpolation.animationTime == 1;
    };
    var newAnimation = function(timestamp,progress,el){
        interpolation.update(timestamp,progress,el);
    }
    var ref = $self.updates.push(newAnimation);
    interpolation.remove = function(){
        $self.updates.splice(0,ref);
    }
    return interpolation;
}
