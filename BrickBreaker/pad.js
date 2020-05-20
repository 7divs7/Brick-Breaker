//export default class Paddle
//import Paddle from '/src/paddle';

class InputHandler
{
    constructor(paddle)
    {
        document.addEventListener("keydown", event => {
            //alert(event.keyCode);
            switch(event.keyCode)
            {
                case 37: paddle.moveLeft();
                break;
                case 39: paddle.moveRight();
                break;
            }
        });

        document.addEventListener("keyup", event => {
            //alert(event.keyCode);
            switch(event.keyCode)
            {
                case 37: if(paddle.speed<0) paddle.stop();
                break;
                case 39: if(paddle.speed>0) paddle.stop();
                break;
            }
        });
    }
}

class Paddle
{
    constructor(display_width, display_height)
    {
        this.image = document.getElementById("base");

        this.display_width = display_width;
        this.display_height = display_height;

        this.width = 150;
        this.height = 20;

        this.maxSpeed = 5;
        this.speed = 0;
        
        this.position = {
            x: this.display_width/2 - this.width/2,
            y: this.display_height - this.height-10
        };
    }

    draw(ctx)
    {
        //ctx.fillStyle = '#f00';
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    moveLeft()
    {
        this.speed = -this.maxSpeed; 
        //speed = -10
    }
    moveRight()
    {
        this.speed = this.maxSpeed; 
    }

    stop()
    {
        this.speed = 0;
    }

    update(deltaTime)
    {
        //if(!deltaTime) return;
        this.position.x += this.speed;
        //5 pixels/ how much time has passed

        //check boundary
        if(this.position.x < 0) this.position.x = 0;
        else if(this.position.x + this.width > this.display_width) this.position.x = this.display_width-this.width;
    }

}


class Ball
{
    constructor(paddle)
    {   
        this.image = document.getElementById("ball_img");
        this.speed = {x: 4, y: -4};
        this.position = {x: 300, y: 300};
        this.size = 35;

        this.paddle = paddle;
    }

    draw(ctx)
    {
        ctx.drawImage(this.image,this.position.x,this.position.y,this.size,this.size);
    }


    update(deltaTime)
    {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //COLLISION DETECTION WITH WALLS, PADDLE
        //wall left or right
        if(this.position.x + this.size > display_width || this.position.x < 0)
            this.speed.x = -this.speed.x;

        //wall top 
        if( this.position.y < 0)
            this.speed.y = -this.speed.y; 
        
        //wall bottom
        
        if(this.position.y + this.size > display_height)
        {
            //alert("belf");
        
            
            window.location.href = "pad_play.html";
        }
        
        //collision with paddle

        if(paddleCollision(this, this.paddle))
        {
            this.speed.y = - this.speed.y;
            this.position.y = this.paddle.position.y - this.size;
        }
             
    }
}


class Brick
{
    constructor(ball,position)
    {
        this.image = document.getElementById("brick_img");
        
        this.position = position;
        this.width = 80;
        this.height = 30;

        this.ball = ball;

        this.deletion = false;
    }

    update()
    {
        //COLLISION DETECTION WITH BALL
        if(brickCollision(this.ball, this))
        {
            //alert("bkeh");
            this.ball.speed.y = - this.ball.speed.y;
            this.deletion = true;
            //this.ball.position.y = this.position.y - this.height;
        }

    }

    draw(ctx)
    {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

function paddleCollision(ball, thing)
{

    //collision with paddle
    let ball_bottom = ball.position.y + ball.size;
    let paddle_top = thing.position.y;
    let paddle_left = thing.position.x;
    let paddle_right = thing.position.x + thing.width;
    
    if(ball_bottom >= paddle_top &&
        ball.position.x >= paddle_left && 
        ball.position.x + ball.size <= paddle_right)
        {
            return true;
        }
    else
    {
        return false;
    }
}

function brickCollision(ball, thing)
{

    //collision with brick
    let ball_bottom = ball.position.y + ball.size;
    let ball_top = ball.position.y;
    let brick_top = thing.position.y;
    let brick_bottom = thing.position.y + thing.height;
    let brick_left = thing.position.x;
    let brick_right = thing.position.x + thing.width;
    
    if(ball_bottom < brick_bottom)
    {
        if(ball_bottom >= brick_top &&
            ball.position.x >= brick_left && 
            ball.position.x + ball.size <= brick_right)
            {
                return true;
            }
        else
        {
            return false;
        }
    }
    if(ball_top < brick_top)
    if(brick_bottom >= ball_top &&
        ball.position.x >= brick_left && 
        ball.position.x + ball.size <= brick_right)
        {
            return true;
        }
    else
    {
        return false;
    }
}


//LEVELS (1: brick, 0: no brick)


const level1 = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];

const level2 = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1]
];

const level3 = [
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],

];




function buildLevel(ball, level)
{
    
    if(level == level1)
    {
        l = 1;
    }
    else if(level == level2)
    {
        l = 2;
    }
    if(level == level3)
    {
        l = 3;
    }
    
    let bricks = []

    level.forEach((row,rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if(brick === 1)
            {
                let position = {
                    x: 80 * brickIndex,
                    y: 30 * rowIndex
                };
                bricks.push(new Brick(ball, position));
            }
        });
    });

    return bricks;
}

function update_bricks(brick_objects)
{
    brick_objects.forEach((object) => object.update());
    return( brick_objects.filter(object => !object.deletion))
}
function draw_bricks(brick_objects)
{
    brick_objects.forEach((object) => object.draw(ctx));
}
//***********  SCREEN  ***********

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");  //to fill in the canvas ctx is your screen

const display_width = 800;
const display_height = 600;


//create objects Game class
let paddle = new Paddle(display_width, display_height);
let ball = new Ball(paddle);

//create multiple brick objects
/*
for(let i = 0; i<10; i++)
    bricks.push(new Brick({x: i*80, y: 30}));
*/

let l = 0;
let bricks = [];
nextLevel = (localStorage.getItem("nextLevel1"));
start_1 = (localStorage.getItem("start_0"));
//alert([nextLevel,start_1]);

if(start_1 == 0)
{
    l = 1;
    bricks = buildLevel(ball,level1);
    
    //alert("Fsf");
}
//start_1 = 1;
else
{
    if(nextLevel == 2)
{
    //alert(nextLevel);
    l = 2;
    bricks = buildLevel(ball,level2);
}
else if(nextLevel == 3)
{
    //alert(nextLevel);
    l = 3;
    bricks = buildLevel(ball,level3);
}
else
{
    //l = 1;
    bricks = buildLevel(ball,level1);
}
}





    

//let bricks = buildLevel(ball,test);
let brick_objects = [...bricks];


new InputHandler(paddle);

//game loop 

let lastTime = 0;

let curtain = document.getElementById("curtain");

function gameLoop(timestamp)
{
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    //ctx.clearRect(0,0,display_width,display_height); //clearing between every frame just like 
    ctx.drawImage(curtain,0,0, display_width,display_height); 

    paddle.update(deltaTime);
    ball.update(deltaTime);
    brick_objects = update_bricks(brick_objects);
    
    paddle.draw(ctx);
    ball.draw(ctx);
    draw_bricks(brick_objects);

    if(brick_objects.length == 0)
    {
       // alert(l);
        var getInput = l;
        localStorage.setItem("previousLevel",getInput);
        if(getInput == 3)
        {
            window.location.href = "PlayGame.html";
        }
        else
        {
            window.location.href = "pad_trans.html";
        }
        
    }
    
    requestAnimationFrame(gameLoop);


}

requestAnimationFrame(gameLoop); 
//doing this can get rid of the return part in update func