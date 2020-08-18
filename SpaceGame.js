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
var shipSpeed = 5
var shipDown = true


// this ball is my practice spaceship
// create spaceship
const ship = {
	x : shipX,
	y : cvs.height/2,
	radius : shipRadius,
}

// draw ball
function drawShip(){
  ctx.beginPath();

  ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI*2);
  ctx.fillStyle = "White";
  ctx.fill();

  ctx.closePath();
}

// control spaceship
document.addEventListener("keydown", function(event){
  if(event.keyCode == 32){
    if(shipDown = true){
      shipDown = false; console.log("space")
    }else if(ballDown = false){
      shipDown = true;
    }
  }
});


// spaceship moving
function shipMoveDown() {
  if(shipDown = true){
    ship.y += shipSpeed;
  }
}

function shipMoveUp(){
  if(shipDown = false){
    ship.y -= shipSpeed;
  }
}

// wallCollision
function wallCollision() {
  if(ship.y < 0){
    shipDown = true;
  }
  if(ship.y > cvs.height - shipRadius){
    shipDown = false; console.log("bottom")
  }
}


function draw(){
    drawShip();
}

function update() {
  wallCollision();
  shipMoveDown();
  shipMoveUp();
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
