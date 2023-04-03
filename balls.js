export default class Balls {
    //Heroes class that defines properties and methods of our heroes
    constructor({x, y}, size, {r, g, b}, {speedX, speedY}) {
        this.location = {x: x, y: y};
        this.size = size;
        this.colour = {r: r, g: g, b: b};
        this.speed = {speedX: speedX, speedY: speedY};
    }
    drawHero(){
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${this.colour.r}, ${this.colour.g}, ${this.colour.b})`;
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
} 
