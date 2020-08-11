const cvs = document.getElementById("spaceGame");
const ctx = cvs.getContext("2d");

// color canvas
ctx.beginPath();
ctx.rect(0, 0, 800, 500);
ctx.fillStyle = "Black";
ctx.fill();

//variables and constants
const ballX = 75
const ballRadius = 15


// this ball is my practice spaceship
// create ball
const ball = {
	x : ballX,
	y : cvs.height/2,
	radius : ballRadius,
}

// draw ball
function drawBall(){
  ctx.beginPath();

  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = "White";
  ctx.fill();

  ctx.closePath();
}

//game loop
function loop(){
  ctx.beginPath();
  ctx.rect(0, 0, 800, 500);
  ctx.fillStyle = "Black";
  ctx.fill();

  drawBall();

		requestAnimationFrame(loop);
	}
loop();
