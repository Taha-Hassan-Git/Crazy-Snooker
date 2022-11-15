const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight*400/480;
canvas.width = window.innerWidth*400/480;
const startStop = document.getElementById("startstop");
const numberSlider = document.getElementById("makeheroes");
const speedSlider = document.getElementById("speed");
const sizeSlider = document.getElementById("size");
const colSlider1 = document.getElementById("col1");
const colSlider2 = document.getElementById("col2");
const colSlider3 = document.getElementById("col3");
//let speedR = 1;
//let speedG = 1;
//let speedB = 1;
let heroArray = [];


class Heroes {
    //Heroes class that defines properties and methods of our heroes
    constructor(x, y, size, r, g, b, speedX, speedY, glow, glowspeed) {
        this.location = {x: x, y: y};
        this.size = size;
        this.colour = {r: r, g: g, b: b};
        this.speed = {speedX: speedX, speedY: speedY};
        //this.colourspeed = {speedR: speedR, speedG: speedG, speedB: speedB};
        this.glow = glow;
        this.glowspeed = glowspeed;
    }
    drawHero(){
        ctx.beginPath();
        ctx.arc(this.location.x + this.size , this.location.y + this.size, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(" + this.colour.r + ", "+ this.colour.g +", " + this.colour.b + ")";
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = "rgb(" + this.colour.r + ", "+ this.colour.g +", " + this.colour.b + ")";
        ctx.fill();
    }
    move(){
        this.location.x += this.speed.speedX;
        this.location.y += this.speed.speedY;
    }
    moveBounce(){
        if (this.location.x > (canvas.width - (this.size*2)) || this.location.x < 0){
        this.speed.speedX *= -1;
        this.move();
    } if (this.location.y > (canvas.height - (this.size*2)) || this.location.y < 0){
        this.speed.speedY *= -1;
        this.move();
    } 
    }
    
    changeColour(){
        //this.colour.r += this.colourspeed.speedR;
        //this.colour.g += this.colourspeed.speedG;
        //this.colour.b += this.colourspeed.speedB;
        this.glow += this.glowspeed
    }
    colourBounce(){
        if (this.glow >= 15 || this.glow <= 0)
        this.glowspeed *= -1;
        /* if (this.colour.g >= this.maxcolour.maxG || this.colour.g <= this.mincolour.minG)
        this.colourspeed.speedG *= -1;
        if (this.colour.b >= this.maxcolour.maxB || this.colour.b <= this.mincolour.minB)
        this.colourspeed.speedB *= -1; */
    }

} 

function makeHeroes(){
    //Uses heroes class to make heroes
    //need to add user-assigned colour values rather than random
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heroArray = [];
    const heroNumber = numberSlider.value;
    const totalSpeed = (speedSlider.value / 10);
    const sizeInput = parseInt(sizeSlider.value);
    let colour1 = (hex2rgba(colSlider1.value));
    let colour2 = (hex2rgba(colSlider2.value));
    let colour3 = (hex2rgba(colSlider3.value));
    let colourArray = [colour1, colour2, colour3]
    for (let i = 0; i < heroNumber; i++){
        const size = sizeInput;
        let location = assignLocation(size);
        let randomColour = Math.floor(Math.random() * 3)
        const x = location[0];
        const y = location[1];
        const r = colourArray[randomColour][0];
        const g = colourArray[randomColour][1];
        const b = colourArray[randomColour][2];
        const glow = 0;
        const glowspeed = 0.5;
        let speedX = getRandomIntInclusive(1, totalSpeed - 1);
        let speedY = totalSpeed - speedX;
        if ((Math.floor(Math.random() * 2)) === 1){
            speedX *= -1
        }
        if ((Math.floor(Math.random() * 2)) === 1){
            speedY *= -1
        } 
        const hero = new Heroes(x, y, size, r, g, b, speedX, speedY, glow, glowspeed);
        heroArray.push(hero);
    }
    for (h in heroArray){
    heroArray[h].drawHero()
    }
}
function assignLocation(size){
    //called by makeHeroes, makes a grid and assigns a location based on a random number. 
    //Can use this to prevent overlapping in future
    let gridSize = size * 2;
    let widthBoxes = Math.floor((canvas.width / gridSize));
    let heightBoxes = Math.floor((canvas.height / gridSize));
    let randIntX = getRandomIntInclusive(1, widthBoxes);
    let randIntY = getRandomIntInclusive(1, heightBoxes);
    let randX = (randIntX * gridSize) - gridSize;
    let randY = (randIntY * gridSize) - gridSize;
    return [randX, randY];
}

function getRandomIntInclusive(min, max) {
    //Generates random Ints, called by various functions
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function hex2rgba(hexa){
    var r = parseInt(hexa.slice(1,3), 16);
        g = parseInt(hexa.slice(3,5), 16);
        b = parseInt(hexa.slice(5,7), 16);
    return [r,g,b]
  }
function collisionBounce(hero1, hero2, distance){
    let collisionVector = {x: hero2.location.x - hero1.location.x, y: hero2.location.y - hero1.location.y};
    let collisionDirection = {x: collisionVector.x / distance, y: collisionVector.y / distance};
    let velocityDifference = {x: hero1.speed.speedX - hero2.speed.speedX, y: hero1.speed.speedY - hero2.speed.speedY};
    let collisionSpeed = velocityDifference.x * collisionDirection.x + velocityDifference.y * collisionDirection.y;
    if (collisionSpeed < 0) {
        return
    }
    hero1.speed.speedX -= (collisionSpeed * collisionDirection.x);
    hero1.speed.speedY -= (collisionSpeed * collisionDirection.y);
    hero2.speed.speedX += (collisionSpeed * collisionDirection.x);
    hero2.speed.speedY += (collisionSpeed * collisionDirection.y);
    hero1.move();
    hero2.move();
    hero1.moveBounce();
    hero2.moveBounce();
}
function openNav() {
    document.getElementById("sidebar").style.width = "10rem";
  }
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}
//This renders default values for heroes when the page loads
makeHeroes();

function startStopAnimation(){
    if (startStop.innerHTML === "Start"){
        startStop.innerHTML = "Stop"
        const id = setInterval(() => {
            if (startStop.innerHTML === "Stop"){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < heroArray.length; i++){
                    heroArray[i].changeColour()
                    heroArray[i].colourBounce()
                    heroArray[i].move()
                    heroArray[i].moveBounce()
                    heroArray[i].drawHero()
                    let slice = heroArray.slice(i);
                    for (var j = 1; j < slice.length; j++){
                        let hX = heroArray[i].location.x;
                        let hY = heroArray[i].location.y;
                        let h2X = slice[j].location.x;
                        let h2Y = slice[j].location.y;
                        let xDistance = hX - h2X;
                        let yDistance = hY - h2Y;
                        let distance = Math.hypot(xDistance, yDistance);
                        
                        if (distance < (heroArray[i].size*2)){
                            collisionBounce(heroArray[i], heroArray[i+j], distance, xDistance, yDistance);
                        }
                    } 
                }
            } else {
        clearInterval(id);
            }
        }, 20);
    }
    else startStop.innerHTML = "Start";
    }

