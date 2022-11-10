const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 650;
canvas.width = 350;



size = 30;
speedX = 5;
speedY = 10;
let x = 0;
let y = 0;
r = 200;
g = 100;
b = 0;

speedR = 1;
speedG = 1;
speedB = 1;

const id = setInterval(() => {
    ctx.beginPath();
    ctx.arc(x + (size/2) , y + (size/2), size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(" + r + ", "+ g +", " + b + ")";
    ctx.fill();
    
    changeColour();
    colourBounce();
    move();
    checkBounce();
    
    
    }, 20);

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
function checkBounce(){
    if (x > (canvas.width - size) || x < 0){
    speedX *= -1;
} if (y > (canvas.height - size) || y < 0){
    speedY *= -1;
} 
}