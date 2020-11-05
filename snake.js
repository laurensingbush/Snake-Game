// select the canvas
const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

// get canvas width and height
var canvas_width = $("#myCanvas").width();
var canvas_height = $("#myCanvas").height();

// create the unit
const box = 32;

// create the score variable
let score = 0;

// create the snake
let snake= [];

// head of snake
snake[0] = {
    x: 9 * box, 
    y: 10 * box
};

// randomly generate the food location
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 2) * box
};

// control the snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

// function to check for collisions
function collision(head, array) {
    for (let index = 0; index < array.length; index++) {
        if (head.x == array[index].x && head.y == array[index].y) {
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
function draw() {
    // draw the game board
    ctx.beginPath();
    ctx.fillStyle = "#001a00";
    ctx.fillRect(0, 0, canvas_width, canvas_height);

    ctx.beginPath();
    ctx.fillStyle = "#001a00";
    ctx.fillRect(box, 2*box, 17*box, 16*box );
    ctx.strokeStyle = "#004d1a";
    ctx.lineWidth = 2;
    ctx.strokeRect(box, 2*box, 17*box, 16*box );
    
    // draw the snake
    for (let index = 0; index < snake.length; index++) {
        ctx.beginPath();
        ctx.fillStyle = "green"
        ctx.fillRect(snake[index].x, snake[index].y, box, box);
        ctx.strokeStyle = "#001a00";
        ctx.lineWidth = 1;
        ctx.strokeRect(snake[index].x, snake[index].y, box, box);
    }
    
    // draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction the player pressed
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 2) * box
        }
        // don't remove the tail
    } else {
         // remove the tail
        snake.pop(); 
    }
    
    // add new snake head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over 
    if (snakeX < box || snakeX > 17 * box || snakeY < 2*box || snakeY > 17*box || collision(newHead, snake)) {
        ctx.fillStyle = "red";
        ctx.font = "30px Play";
        ctx.fillText("GAME OVER", 6.5*box, 10*box);
        ctx.fillText("Score: " + score , 7.5*box, 11*box);
        setTimeout(() => document.location.reload(), 2000); // refresh page to start new game
        clearInterval(game);
    }

    snake.unshift(newHead);

    // display the score
    ctx.fillStyle = "green";
    ctx.font = "30px Play";
    ctx.fillText("Snake", box, 1.5*box);
    ctx.fillText("Score: " + score, 14.5*box, 1.5*box);

}

//call draw funtion every 100 ms
let game = setInterval(draw, 100);