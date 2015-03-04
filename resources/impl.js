/**
 * Created by simone.dinuovo on 2/22/15.
 */
var z = $( "#draggable" ).draggable({
    start: function() {
        console.log('start');
    },
    drag: function() {
        console.log('drag');
    },
    stop: function() {
        console.log('stop');
    }
});
console.log(z);
