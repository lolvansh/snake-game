  const canvas = document.querySelector("#gamecanvas");
  const ctx = canvas.getContext("2d");

  


let snake = [ {x: 150, y: 150}, {x:140, y:150}, {x:130, y:150},{x:120, y:150},{x:110,y:150}];

let dx = 10;
let dy = 0

function clearcanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}



  function drawSnakePart(snakepart){
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakepart.x,snakepart.y,10,10)
    ctx.strokeRect(snakepart.x,snakepart.y,10,10);
  }

  function drawSnake(){
    snake.forEach(drawSnakePart);
  }

 function advanceSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
    
 }








function changeDirection(event){
    const LEFT_KEY = 37;
    const RIGHT_key = 39;
    const UP_key = 38;
    const DOWN_key = 40;

    const keypressed = event.keyCode;


    const goingUP = dy === -10;
    const goingDOWN = dy === 10;
    const goingRIGHT = dx === 10;
    const goingLEFT = dx === -10;

    if (keypressed === LEFT_KEY && !goingRIGHT){
        dx = -10;
        dy = 0;
    }
    if (keypressed === RIGHT_key && !goingLEFT){
        dx = 10;
        dy = 0;
    }
    if (keypressed === UP_key && !goingDOWN){
        dx = 0;
        dy = -10;
    }

    if (keypressed === DOWN_key && !goingUP){
        dx = 0;
        dy = 10;
    }
}

document.addEventListener("keydown", changeDirection);

  drawSnake();

  function gameLoop() {
    clearcanvas();
    advanceSnake();
    drawSnake();
  }

    setInterval(() => {
    gameLoop()
  }, 100);