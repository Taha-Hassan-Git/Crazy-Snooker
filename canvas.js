const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 500;
canvas.width = 350;
const startStop = document.getElementById("startstop");
const numberSlider = document.getElementById("makeheroes");
const speedSlider = document.getElementById("speed");
const sizeSlider = document.getElementById("size");
const colSlider1 = document.getElementById("col1");
const colSlider2 = document.getElementById("col2");
const colSlider3 = document.getElementById("col3");
let speedR = 1;
let speedG = 1;
let speedB = 1;
let heroArray = [];


class Heroes {
    //Heroes class that defines properties and methods of our heroes
    //add max and min colours to colourbounce
    constructor(x, y, size, r, g, b, speedX, speedY) {
        this.location = {x: x, y: y};
        this.size = size;
        this.colour = {r: r, g: g, b: b};
        this.speed = {speedX: speedX, speedY: speedY};
        this.colourspeed = {speedR: speedR, speedG: speedG, speedB: speedB};
        //this.maxcolour = {maxR: maxR, maxG: maxG, maxB: maxB}
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

function makeHeroes(){
    //Uses heroes class to make heroes
    //need to add user-assigned colour values rather than random
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heroArray = [];
    const heroNumber = numberSlider.value;
    const totalSpeed = speedSlider.value;
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
        let speedX = getRandomIntInclusive(1, totalSpeed - 1);
        let speedY = totalSpeed - speedX;
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
function collisionBounce(hero1, hero2, distance, xDistance, yDistance){
    let vCollision = {x: hero2.location.x - hero1.location.x, y: hero2.location.y - hero1.location.y};
    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
    let vRelativeVelocity = {x: hero1.speed.speedX - hero2.speed.speedX, y: hero1.speed.speedY - hero2.speed.speedY};
    let collisionSpeed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
    if (collisionSpeed < 0) {
        return
    }
    hero1.speed.speedX -= (collisionSpeed * vCollisionNorm.x);
    hero1.speed.speedY -= (collisionSpeed * vCollisionNorm.y);
    hero2.speed.speedX += (collisionSpeed * vCollisionNorm.x);
    hero2.speed.speedY += (collisionSpeed * vCollisionNorm.y);
}

function swapColours(hero1, hero2){
    let hero1colours = hero1.colour;
    let hero2colours = hero2.colour;
    hero2.colour = hero1colours;
    hero1.colour = hero2colours;
}

//This renders default values for heroes when the page loads
makeHeroes();


function startStopAnimation(){
    if (startStop.innerHTML === "Start"){
        startStop.innerHTML = "Stop"
        //console.log(heroArray);
        const id = setInterval(() => {
            if (startStop.innerHTML === "Stop"){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < heroArray.length; i++){
                    //heroArray[i].changeColour()
                    //heroArray[i].colourBounce()
                    heroArray[i].move()
                    heroArray[i].moveBounce()
                    heroArray[i].drawHero()
                    let slice = heroArray.slice(i);
                    for (var j = 1; j < slice.length; j++){
                        //this doesn't accurately detect collision
                        let hX = heroArray[i].location.x;
                        let hY = heroArray[i].location.y;
                        let h2X = slice[j].location.x;
                        let h2Y = slice[j].location.y;
                        let xDistance = hX - h2X;
                        let yDistance = hY - h2Y;
                        let distance = Math.hypot(xDistance, yDistance);
                        
                        if (distance < (heroArray[i].size*2)){
                            //heroArray[j-i] sometimes isn't a hero object
                            collisionBounce(heroArray[i], heroArray[i+j], distance, xDistance, yDistance);
                            swapColours(heroArray[i], heroArray[i+j]);
                        }
                    } 
                }
            } else {
        clearInterval(id);
            }
        }, 10);
    }
    else startStop.innerHTML = "Start";
    }

