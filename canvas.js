const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 650;
canvas.width = 350;

let speedR = 1;
let speedG = 1;
let speedB = 1;

class Heroes {
    constructor(x, y, size, r, g, b, speedX, speedY) {
        this.location = {x: x, y: y};
        this.size = size;
        this.colour = {r: r, g: g, b: b};
        this.speed = {speedX: speedX, speedY: speedY};
    }
} 

const hero = new Heroes(50, 50, 30, 120, 250, 5, 2, 2);

function drawHero(){
    ctx.beginPath();
    ctx.arc(hero.location.x + hero.size , hero.location.y + hero.size, hero.size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(" + hero.colour.r + ", "+ hero.colour.g +", " + hero.colour.b + ")";
    ctx.fill();
}
drawHero()

function startAnimation(){
    let sliderX = document.getElementById("sliderX");
    let sliderY = document.getElementById("sliderY");
    //let hero.speedX = parseInt(sliderX.value);
    //let hero.speedY = parseInt(sliderY.value);
    const id = setInterval(() => {
    
    
    changeColour();
    colourBounce();
    move();
    moveBounce();
    drawHero();
    }, 10);

function colourBounce(){
    if (hero.colour.r >= 255 || hero.colour.r <= 0)
    speedR *= -1;
    if (hero.colour.g >= 255 || hero.colour.g <= 0)
    speedG *= -1;
    if (hero.colour.b >= 255 || hero.colour.b <= 0)
    speedB *= -1;
}

function changeColour(){
    hero.colour.r += speedR;
    hero.colour.g += speedG;
    hero.colour.b += speedB;
}
function move(){
    hero.location.x += hero.speed.speedX;
    hero.location.y += hero.speed.speedY;
}
function moveBounce(){
    if (hero.location.x > (canvas.width - (hero.size*2)) || hero.location.x < 0){
    hero.speed.speedX *= -1;
} if (hero.location.y > (canvas.height - (hero.size*2)) || hero.location.y < 0){
    hero.speed.speedY *= -1;
} 
}
}
