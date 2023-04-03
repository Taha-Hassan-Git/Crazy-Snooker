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

        draw();
        drawLine([50, 50], [100,100])

    
}

function draw(){

    // Get a random color, red or blue
    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

    // Draw a rectangle
    ctx.fillStyle = randomColor;
    ctx.fillRect(100, 50, 200, 175);
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
