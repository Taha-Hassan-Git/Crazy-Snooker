const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 650;
canvas.width = 350;
let sliderX = document.getElementById("sliderX");
let sliderY = document.getElementById("sliderY");
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

let heroArray = [];
function makeHeroes(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heroArray = [];
    const numberSlider = document.getElementById("makeheroes");
    const speedSlider = document.getElementById("speed");
    const heroNumber = numberSlider.value;
    const totalSpeed = speedSlider.value;
    for (let i = 0; i < heroNumber; i++){
        const size = 10;
        let location = assignLocation(size);
        const x = location[0];
        const y = location[1];
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        let speedX = Math.floor(Math.random() * totalSpeed + 1);
        let speedY = Math.floor(Math.random() * (totalSpeed - speedX) + 1);
        if ((Math.floor(Math.random() * 2)) === 1){
            speedX *= -1
        }
        if ((Math.floor(Math.random() * 2)) === 1){
            speedY *= -1
        } 
        const hero = new Heroes(x, y, size, r, g, b, speedX, speedY);
        heroArray.push(hero);
    }
    for (h in heroArray){
    heroArray[h].drawHero()
    }
}
function assignLocation(size){
    let gridSize = size * 2;
    let widthBoxes = Math.floor((canvas.width / gridSize));
    let heightBoxes = Math.floor((canvas.height / gridSize));
    let randIntX = getRandomIntInclusive(1, widthBoxes);
    let randIntY = getRandomIntInclusive(1, heightBoxes);
    let randX = (randIntX * gridSize) - size;
    let randY = (randIntY * gridSize) - size;
    return [randX, randY];
}
let started = false;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startAnimation(){
    if (started === false){
        const id = setInterval(() => {
        for (h in heroArray){
            heroArray[h].changeColour()
            heroArray[h].colourBounce()
            heroArray[h].move()
            heroArray[h].moveBounce()
            heroArray[h].drawHero()
        }
            
        }, 10);
    started === true;
    }
    
}
