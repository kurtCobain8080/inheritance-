/**
 * Created by simone.dinuovo on 05/01/15.
 */
var animation = function(tweening){
    var $self = this;
    var interpolation = {};
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
    switch ( tweening.transition.split('(')[0] )
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
    interpolation.update = function(timestamp,progress,el){
        /*console.log('\n $self.settings.name, progress,$self.settings.x');
        console.log($self.settings.name, progress,$self.settings.x);*/
        if ( interpolation.stop ) return;
        if ( !tweening.cycle && interpolation.animationTime == 1  ) return;
        var duration = interpolation.duration;
        //console.log(duration);
        var amount = interpolation.animationTime == 0 && interpolation.endAnimation ? 0 : 1 / ( duration / progress );
        interpolation.endAnimation = !(interpolation.animationTime == 0 && interpolation.endAnimation);
        interpolation.animationTime = ( interpolation.animationTime + amount ) > 1 ? 1 : (interpolation.animationTime + amount);
        var tween = 0;
        if (parameters.length)
            tween = Bezier.cubicBezier(parameters[0],parameters[1],parameters[2],parameters[3],interpolation.animationTime,interpolation.duration);
        else
            tween = Bezier[animationType](interpolation.animationTime,interpolation.duration);
        for ( var k in tweening.pointB )
            $self.settings[k] = interpolation.endAnimation ? tweening.pointA[k] + ( tween * Number( tweening.pointB[k] ) ) : tweening.pointA[k];

        /*console.log('\n$self.settings.name, parameters[0],parameters[1],parameters[2],parameters[3],interpolation.animationTime');
        console.log($self.settings.name, parameters[0],parameters[1],parameters[2],parameters[3],interpolation.animationTime);
        console.log($self.settings.name,tween);*/
        interpolation.endAnimation = interpolation.animationTime == 1;
        interpolation.animationTime = interpolation.animationTime == 1 ? 0 : interpolation.animationTime;
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
