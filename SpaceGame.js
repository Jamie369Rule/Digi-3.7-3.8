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
var upArrow = false
var downArrow = false
var obsRadius = 30
var obsSpeed = 5


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
	if(event.keyCode == 38){
		upArrow = true;
	}else if(event.keyCode == 40){
	downArrow = true;
	}
});
document.addEventListener("keyup", function(event){
	if(event.keyCode == 38){
		upArrow = false;
	}else if(event.keyCode == 40){
		downArrow = false;
	}
});

// move the spaceship
function moveShip(){
  if(upArrow && ship.y - shipRadius > 0){
    ship.y -= shipSpeed;
  }else if(downArrow && ship.y + shipRadius < cvs.height){
    ship.y += shipSpeed;
  }
}

//create obstacle
const obs = {
  x : cvs.width,
  y : cvs.height/2,
  radius : obsRadius,
  speed : obsSpeed
}

// draw obstacle
function drawObs(){
  ctx.beginPath();

  ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI*2);
  ctx.fillStyle = "White";
  ctx.fill();

  ctx.closePath();
}

// move obstacle
function moveObs() {
obs.x -= obsSpeed;
}

function draw(){
    drawShip();
    drawObs();
}

function update() {
  moveShip();
  moveObs();
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
