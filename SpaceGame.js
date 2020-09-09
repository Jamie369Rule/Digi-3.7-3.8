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
var shipSpeed = 4
var upArrow = false
var downArrow = false
//var obsRadius = Math.random () * (40 - 20) + 20;
var obsSpeed = 3
var obs1MinY = 0 + obsRadius;
var obs1MaxY = 100 - obsRadius;
var obs2MinY = 100 + obsRadius;
var obs2MaxY = 200 - obsRadius;
var obs3MinY = 200 + obsRadius;
var obs3MaxY = 300 - obsRadius;
var obsMinX = cvs.width + shipRadius;
var obsMaxX = cvs.width + 500;

// var small = 20
// var medium = 30
// var large = 40
var obsRadius = [20, 30, 40];
var randomRadius = obsRadius[Math.floor(Math.random()*obsRadius.length)];
console.log("randomRadius")

//var randomRadius = obsRadius[Math.round(Math.random * obsRadius.length)];



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
  const obs1 = {
    x : obsX(obsMinX, obsMaxX),
    y : obsY(obs1MinY, obs1MaxY),
    radius : randomRadius,
    speed : obsSpeed
  }

  const obs2 = {
    x : obsX(obsMinX, obsMaxX),
    y : obsY(obs2MinY, obs2MaxY),
    radius : randomRadius,
    speed : obsSpeed
  }

  const obs3 = {
    x : obsX(obsMinX, obsMaxX),
    y : obsY(obs3MinY, obs3MaxY),
    radius : randomRadius,
    speed : obsSpeed
  }

// draw obstacles
function drawObs1(){
  ctx.beginPath();

  ctx.arc(obs1.x, obs1.y, obs1.radius, 0, Math.PI*2);
  ctx.fillStyle = "White";
  ctx.fill();

  ctx.closePath();
}

function drawObs2(){
  ctx.beginPath();

  ctx.arc(obs2.x, obs2.y, obs2.radius, 0, Math.PI*2);
  ctx.fillStyle = "White";
  ctx.fill();

  ctx.closePath();
}

function drawObs3(){
  ctx.beginPath();

  ctx.arc(obs3.x, obs3.y, obs3.radius, 0, Math.PI*2);
  ctx.fillStyle = "White";
  ctx.fill();

  ctx.closePath();
}

// change the Y value for the obstacle when it spawns again
function obsY(min, max) {
  return Math.random() * (max - min) + min;
}

//change the X vaule when the ball resets so they come at different times
function obsX(min, max) {
  return Math.random() * (max - min) + min;
}

//change the raidus of the obs when it spawns again


// move obstacle
function moveObs1() {
  if(obs1.x + obsRadius > 0){
  obs1.x -= obsSpeed;
}else{
  obs1.y = obsY(obs1MinY, obs1MaxY);
  obs1.x = obsX(obsMinX, obsMaxX);
  obs1.radius = randomRadius;
  }
}

function moveObs2() {
  if(obs2.x + obsRadius > 0){
  obs2.x -= obsSpeed;
}else{
  obs2.y = obsY(obs2MinY, obs2MaxY);
  obs2.x = obsX(obsMinX, obsMaxX);
  obs2.radius = randomRadius;
  }
}

function moveObs3() {
  if(obs3.x + obsRadius > 0){
  obs3.x -= obsSpeed;
}else{
  obs3.y = obsY(obs2MinY, obs2MaxY);
  obs3.x = obsX(obsMinX, obsMaxX);
  obs3.radius = randomRadius;
  }
}

function update() {
  moveShip();
  moveObs1();
  moveObs2();
  moveObs3();
}

function draw(){
    drawShip();
    drawObs1();
    drawObs2();
    drawObs3();
}

//game loop
function loop(){
  ctx.beginPath();
  ctx.rect(0, 0, 800, 500);
  ctx.fillStyle = "Black";
  ctx.fill();

  update();
  draw();

  requestAnimationFrame(loop);
	}
loop();
