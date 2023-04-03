import Balls from '/Balls.js';

let canvas;
let ctx;

window.onload = init;

function init(){

    canvas = document.getElementById('canvas');
    canvas.height = window.innerHeight*400/480;
    canvas.width = window.innerWidth*400/480;
    ctx = canvas.getContext('2d');

    //canvas.addEventListener('mousedown', )
        //makeBalls();
        drawLine([50, 50], [100,100])

    
}

function makeBalls(){
    const redArray = []
    const cue = new Balls({x:50, y:50}, 50, {r: 255, g: 255, b: 255}, {speecX: 1, speedY: 2}, ctx);
    cue.drawBall()
    for(let i = 0; i < 5; i++){
        console.log('red');
        const red = new Balls({x: (i+1)*100, y:(i+1)*100}, 50, {r: 255, g: 100, b: 100}, {speecX: 1, speedY: 2}, ctx);
        redArray.push(red);
        red.drawBall();
    }

}

function drawLine(locationA, locationB){
    const [xA, yA] = locationA;
    const [xB, yB] = locationB;
    
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#0bab02";
    ctx.beginPath();
    ctx.moveTo(xA, yA);
    ctx.lineTo(xB, yB);
    ctx.stroke();
}
