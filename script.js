// Game constants
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 10;
const paddleSpeed = 5;
const ballSpeed = 4;

// Paddle state
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Ball state
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

// Game loop
function gameLoop() {
  movePaddles();
  moveBall();
  drawCanvas();

  requestAnimationFrame(gameLoop);
}

// Move the paddles
function movePaddles() {
  // Move left paddle
  if (leftPaddleUpPressed) {
    leftPaddleY -= paddleSpeed;
  } else if (leftPaddleDownPressed) {
    leftPaddleY += paddleSpeed;
  }

  // Move right paddle
  if (rightPaddleUpPressed) {
    rightPaddleY -= paddleSpeed;
  } else if (rightPaddleDownPressed) {
    rightPaddleY += paddleSpeed;
  }

  // Restrict paddles within the canvas
  if (leftPaddleY < 0) {
    leftPaddleY = 0;
  } else if (leftPaddleY + paddleHeight > canvas.height) {
    leftPaddleY = canvas.height - paddleHeight;
  }

  if (rightPaddleY < 0) {
    rightPaddleY = 0;
  } else if (rightPaddleY + paddleHeight > canvas.height) {
    rightPaddleY = canvas.height - paddleHeight;
  }
}

// Move the ball
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with paddles
  if (
    ballX <= paddleWidth &&
    ballY + ballSize >= leftPaddleY &&
    ballY <= leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  } else if (
    ballX + ballSize >= canvas.width - paddleWidth &&
    ballY + ballSize >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball collision with walls
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball out of bounds
  if (ballX < 0 || ballX + ballSize > canvas.width) {
    resetBall();
  }
}

// Reset the ball
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

// Draw the canvas
function drawCanvas() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw left paddle
    context.fillStyle = 'black';
    context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
  
    // Draw right paddle
    context.fillStyle = 'black';
    context.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
  
    // Draw ball
    context.fillStyle = 'black';
    context.fillRect(ballX, ballY, ballSize, ballSize);
  }
  
  // Keyboard event listeners
  let leftPaddleUpPressed = false;
  let leftPaddleDownPressed = false;
  let rightPaddleUpPressed = false;
  let rightPaddleDownPressed = false;
  
  document.addEventListener('keydown', function (event) {
    if (event.key === 'w') {
      leftPaddleUpPressed = true;
    } else if (event.key === 's') {
      leftPaddleDownPressed = true;
    } else if (event.key === 'ArrowUp') {
      rightPaddleUpPressed = true;
    } else if (event.key === 'ArrowDown') {
      rightPaddleDownPressed = true;
    }
  });
  
  document.addEventListener('keyup', function (event) {
    if (event.key === 'w') {
      leftPaddleUpPressed = false;
    } else if (event.key === 's') {
      leftPaddleDownPressed = false;
    } else if (event.key === 'ArrowUp') {
      rightPaddleUpPressed = false;
    } else if (event.key === 'ArrowDown') {
      rightPaddleDownPressed = false;
    }
  });
  
  // Start the game loop
  gameLoop();
  