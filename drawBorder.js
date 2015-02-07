/**
 * Created by simone.dinuovo on 06/02/15.
 */

function draw () {
    var canvas = document.getElementById('rectangle');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var borderValue = 40;
    ctx.lineWidth = borderValue;

    ctx.strokeStyle = "red";
    ctx.strokeRect(40,40,100,100);
    ctx.fillStyle = "black";
    ctx.fillRect(40,40,100,100);
}
draw();
