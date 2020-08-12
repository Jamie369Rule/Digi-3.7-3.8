const cvs = document.getElementById("spaceGame");
const ctx = cvs.getContext("2d");

// color canvas
ctx.beginPath();
ctx.rect(0, 0, 800, 500);
ctx.fillStyle = "Black";
ctx.fill();

//variables and constants
const shipX = 75
const shipRadius = 15
const shipSpeed = 5
var shipDown = true


// this ball is my practice spaceship
// create spaceship
const ship = {
	x : shipX,
	y : cvs.height/2,
	radius : shipRadius,
  speed : shipSpeed
}

// draw ball
function drawShip(){
  ctx.beginPath();

  ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI*2);
  ctx.fillStyle = "White";
  ctx.fill();

  ctx.closePath();
}

// spaceship falling


// control spaceship
document.addEventListener("keydown", function (event){
  if(event.code == 32){
    if(shipDown = true){
      shipDown = false;
    }else if(ballDown = false){
      shipdown = true;
    }
  }
});

function draw(){
    drawShip();
}

function update() {
}

//game loop
function loop(){
  ctx.beginPath();
  ctx.rect(0, 0, 800, 500);
  ctx.fillStyle = "Black";
  ctx.fill();

  draw();
  update();

		requestAnimationFrame(loop);
	}
loop();
