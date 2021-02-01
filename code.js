class Bird{
    x;
    y;
    width;
    height;
    direction;
    spritesheet;
    img;
    mirrored = false;
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
            //Sets mirrored to opposite value of current (flips)
            this.mirrored = !this.mirrored;
        }
    }

    drawFrame(ctx,scale,frameX, frameY, canvasX, canvasY){
        if(!this.mirrored){
            ctx.drawImage(this.img,frameX * this.width, frameY * this.height, this.width, this.height, canvasX, canvasY, this.width * scale, this.height * scale);
        }else{
            console.log(mirrored);
            ctx.save();
            ctx.transform(-1,0,0,1,0,0);
            ctx.drawImage(this.img,
                frameX * this.width, frameY * this.height, this.width,this.height,
                this.x, this.y, this.width * scale * -1, this.height * scale);
            ctx.restore();
        }
        
    }



}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "1px solid black";

let birds = [];
birds.push(new Bird(0,0,1,1,"lars"));



const cycleLoop = [0,1,2,3,2,1,0];
const scale = 2;
let frameIndex = 0;
let startTime;
let deltaTime = 0;
let cycleGoingDown = false;
let framesPerSecond = 10;
function step(frameIndex, mirrored){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i<birds.length; i++){
        birds[i].drawFrame(ctx,scale,cycleLoop[frameIndex],2,0,0,mirrored);
    }
}

function loop(){
    deltaTime = (new Date().getTime() / 1000) - startTime ;
    if(Math.floor(frameIndex) > 3){
        cycleGoingDown = true;
    }
    if(cycleGoingDown){
        deltaTime *= -1;
    }
    frameIndex += deltaTime * framesPerSecond;
    ctx.scale(1,-1);
    step(Math.floor(frameIndex),mirror);
    

    if(Math.floor(frameIndex) <= 0){
        cycleGoingDown = false;
    }
    startTime = new Date().getTime() / 1000;
    window.requestAnimationFrame(loop);
}

function init(){
    startTime = new Date().getTime() / 1000;
    window.requestAnimationFrame(loop);
}