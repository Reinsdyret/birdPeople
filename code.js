class Bird{
    x;
    y;
    width;
    height;
    direction;
    spritesheet;
    img;
    constructor(x,y,xDirection,yDirection,spritesheet){
        this.x = x;
        this.y = y; 
        this.direction = {
            x: xDirection,
            y: yDirection
        };
        this.spritesheet = spritesheet;
        this.img = document.createElement("img");
        this.img.src = "sprites/" + this.spritesheet + ".png";

        //Sett høyde og bredde
        this.width = 800 / 4;
        this.height = 450 / 3;
    }

    update(){
        this.x += this.direction.x;
        this.y += this.direction.y;

        //Forutsir at posisjonen er øvre venstre hjørne
        if(this.y + this.height >= canvas.height || this.y <=0){
            this.direction.y *= -1;
        }
        if(this.x + this.width >= canvas.width || this.x <= 0){
            this.direction.x *= -1;
        }
    }

    drawFrame(ctx,scale,frameX, frameY, canvasX, canvasY){
        ctx.drawImage(this.img,frameX * this.width, frameY * this.height, this.width, this.height, canvasX, canvasY, this.width * scale, this.height * scale);
    }


}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "1px solid black";

let birds = [];
birds.push(new Bird(0,0,1,1,"larsScaled"));



const cycleLoop = [0,1,2,3,2,1,0];
const scale = 2; 
let cycleIndex = 0;
let frameCount = 0;
function step(){
    frameCount++;

    if(frameCount < 2.5){
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i<birds.length; i++){
        birds[i].drawFrame(ctx,scale,cycleLoop[cycleIndex],0,0,0);
    }
    cycleIndex++;

    if(cycleIndex >= cycleLoop.length){
        cycleIndex = 0;
    }

    window.requestAnimationFrame(step);
}

function init(){
    window.requestAnimationFrame(step);
}