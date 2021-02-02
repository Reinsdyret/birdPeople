class Bird{
    x;
    y;
    width;
    height;
    direction;
    spritesheet;
    img;
    side;
    constructor(x,y,xDirection,yDirection,spritesheet){
        this.x = x;
        this.y = y; 
        this.direction = {
            x: xDirection * -1,
            y: yDirection * -1
        };
        this.spritesheet = spritesheet;
        this.img = document.createElement("img");
        this.img.src = "sprites/" + spritesheet + ".png";

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
        if(this.x <= 0 || this.x + this.width >= canvas.width){
            this.xDirection *= -1;
        }
    }

    drawFrame(ctx,scale,frameX, frameY, canvasX, canvasY){
            ctx.drawImage(this.img,frameX * this.width, frameY * this.height, this.width, this.height, this.x, this.y, this.width * scale, this.height * scale);
        }
        
    }

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "1px solid black";

let birds = [];
birds.push(new Bird(0,200,0,-1,"tobiasReal"));
birds[0].side = 2;
birds.push(new Bird(200,200,0,1,"lars"));
birds[1].side = 0;
birds.push(new Bird(300,200,0,-1,"haakon"))
birds[2].side = 1;



const cycleLoop = [0,1,2,3,2,1,0];
const scale = 2;
let frameIndex = 0;
let startTime;
let deltaTime = 0;
let cycleGoingDown = false;
let framesPerSecond = 10;
function step(frameIndex){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i<birds.length; i++){
        birds[i].drawFrame(ctx,scale,cycleLoop[frameIndex],birds[i].side,0,0);
    }
}

function loop(){
    for(let i = 0; i<birds.length; i++){
        birds[i].update();
    }
    deltaTime = (new Date().getTime() / 1000) - startTime ;
    if(Math.floor(frameIndex) > 3){
        cycleGoingDown = true;
    }
    if(cycleGoingDown){
        deltaTime *= -1;
    }
    frameIndex += deltaTime * framesPerSecond;
    ctx.scale(1,-1);
    step(Math.floor(frameIndex));
    

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
