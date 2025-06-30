  const canvas = document.querySelector("#gamecanvas");
  const ctx = canvas.getContext("2d");
  

  


let snake = [ {x: 150, y: 150}, {x:140, y:150}, {x:130, y:150},{x:120, y:150},{x:110,y:150}];

let dx = 0;
let dy = 0;
let foodx;
let foody;
let score = 0;

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
    
    const hasEatenFood = head.x === foodx && head.y === foody;

    if(hasEatenFood){
      createFood();
      score += 10;
      document.querySelector(".score").textContent = score;

    } else{
      snake.pop();
    }
    
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




function randomTen(min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min) / 10) * 10;
}

function createFood() {
  let newFood;
  let isOnSnake;

  do {
    newFood = {
      x: randomTen(0, canvas.width - 10),
      y: randomTen(0, canvas.height - 10)
    };

    // Check if this food overlaps the snake
    isOnSnake = snake.some(part => part.x === newFood.x && part.y === newFood.y);
  } while (isOnSnake);

  // After finding a good spot, assign to global foodx, foody
  foodx = newFood.x;
  foody = newFood.y;
}

  function drawFood(){
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(foodx, foody,10,10);
    ctx.strokeRect (foodx,foody,10,10);
  }


  createFood();


  function gameLoop() {
    clearcanvas();
    advanceSnake();
    drawSnake();
    drawFood();
  }

    setInterval(() => {
    gameLoop()
  }, 100);
