const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 650;
canvas.width = 350;

var size = 30;
var speedX = 1;
var speedY = 1;
let x = 0;
let y = 0;
var r = 255;
var g = 50;
var b = 200;

var speedR = 1;
var speedG = 1;
var speedB = 1;

/* class Heroes {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
    drawHero(){
        ctx.arc(this.x + size , this.y + size, size, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(" + r + ", "+ g +", " + b + ")";
        return ctx.fill();
    }
}

var newHero = new Heroes(0, 0, 30) */
function grabInputs(speedX, speedY){
    
}

function drawHero(){
    ctx.beginPath();
    ctx.arc(x + size , y + size, size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(" + r + ", "+ g +", " + b + ")";
    ctx.fill();
}
drawHero()

function startAnimation(){
    var sliderX = document.getElementById("sliderX");
    var sliderY = document.getElementById("sliderY");
    var speedX = parseInt(sliderX.value);
    var speedY = parseInt(sliderY.value);

    const id = setInterval(() => {
    
    
    changeColour();
    colourBounce();
    move();
    moveBounce();
    drawHero();
    }, 10);

function colourBounce(){
    if (r >= 255 || r <= 0)
    speedR *= -1;
    if (g >= 255 || g <= 0)
    speedG *= -1;
    if (b >= 255 || b <= 0)
    speedB *= -1;
}

function changeColour(){
    r += speedR;
    g += speedG;
    b += speedB;
}
function move(){
    x += speedX;
    y += speedY;
}
function moveBounce(){
    if (x > (canvas.width - (size*2)) || x < 0){
    speedX *= -1;
} if (y > (canvas.height - (size*2)) || y < 0){
    speedY *= -1;
} 
}
}
