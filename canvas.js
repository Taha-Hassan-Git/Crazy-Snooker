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
        this.colourspeed = {speedR: speedR, speedG: speedG, speedB: speedB};
    }
    drawHero(){
        ctx.beginPath();
        ctx.arc(this.location.x + this.size , this.location.y + this.size, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(" + this.colour.r + ", "+ this.colour.g +", " + this.colour.b + ")";
        ctx.fill();
    }
    move(){
        this.location.x += this.speed.speedX;
        this.location.y += this.speed.speedY;
    }
    moveBounce(){
        if (this.location.x > (canvas.width - (this.size*2)) || this.location.x < 0){
        this.speed.speedX *= -1;
    } if (this.location.y > (canvas.height - (this.size*2)) || this.location.y < 0){
        this.speed.speedY *= -1;
    } 
    }
    
    changeColour(){
        this.colour.r += this.colourspeed.speedR;
        this.colour.g += this.colourspeed.speedG;
        this.colour.b += this.colourspeed.speedB;
    }
    colourBounce(){
        if (this.colour.r >= 255 || this.colour.r <= 0)
        this.colourspeed.speedR *= -1;
        if (this.colour.g >= 255 || this.colour.g <= 0)
        this.colourspeed.speedG *= -1;
        if (this.colour.b >= 255 || this.colour.b <= 0)
        this.colourspeed.speedB *= -1;
    }

} 

const hero = new Heroes(50, 50, 30, 120, 250, 5, 2, 2);

hero.drawHero()

function startAnimation(){
    let sliderX = document.getElementById("sliderX");
    let sliderY = document.getElementById("sliderY");
    //let hero.speedX = parseInt(sliderX.value);
    //let hero.speedY = parseInt(sliderY.value);
    const id = setInterval(() => {
    
    
    hero.changeColour()
    hero.colourBounce()
    hero.move()
    hero.moveBounce()
    hero.drawHero()
    }, 10);
}
