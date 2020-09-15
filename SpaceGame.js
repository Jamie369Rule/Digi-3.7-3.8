const cvs = document.getElementById("spaceGame");
const ctx = cvs.getContext("2d");

// color canvas
ctx.beginPath();
ctx.rect(0, 0, cvs.width, cvs.height);
ctx.fillStyle = "Black";
ctx.fill();


var upArrow = false
var downArrow = false

var obsRadius = 30
var obstacles = [];
var startPos = true
var totalObs = 6
var obsMinSpeed = 3
var obsMaxSpeed = 5

var obsHit = false


// this ball is my practice spaceship
// create spaceship
const ship = {
	x : 100,
	y : cvs.height/2,
	speed : 8,
	radius : 15,
}

// draw ball
function drawShip(){
  ctx.beginPath();

  ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI*2);
  ctx.fillStyle = "Green";
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
  if(upArrow && ship.y - ship.radius > 0){
    ship.y -= ship.speed;
  }else if(downArrow && ship.y + ship.radius < cvs.height){
    ship.y += ship.speed;
  }
}

// Obstacle
function makeObs() {
  var obs = {
    x : cvs.width + obsRadius,
    y :  Math.floor(Math.random() * ((cvs.height + obsRadius) - obsRadius)),
    speed : (Math.random() * (obsMaxSpeed - obsMinSpeed) + obsMinSpeed),
		radius : obsRadius
  }
    obstacles.push(obs);
}

// draw obstacles
function drawObs(){
  obstacles.forEach(function(obs, i) {
    ctx.beginPath();
    ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI*2);
    ctx.fillStyle = "Red";
    ctx.fill();
    ctx.closePath();
  });
}

// Obstacle movement
function moveObs() {
  obstacles.forEach(function(obs){

    obs.x -= obs.speed;

    if(obs.x < 0 - obs.radius) {
      obs.y =  Math.floor(Math.random() * ((cvs.height + obs.radius) - obs.radius));
      obs.x = cvs.width + obs.radius;
      obs.speed = (Math.random() * (obsMaxSpeed - obsMinSpeed) + obsMinSpeed)
    }
		// Collision detection
		if(ship.x + ship.radius > obs.x - obs.radius && ship.x - ship.radius < obs.x + obs.radius && ship.y + ship.radius > obs.y - obs.radius && ship.y - ship.radius < obs.y + obs.radius){
			console.log('hit');
			obsHit = true;
		}
  });
}

function gameOver(){
	if(obsHit){
	ctx.beginPath();
	ctx.rect(0, 0, cvs.width, cvs.height);
	ctx.fillStyle = "Black";
	ctx.fill();

	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("GAMEOVER", cvs.width/2, cvs.height/2);
 }
}




//game loop
function loop(){
  ctx.beginPath();
  ctx.rect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = "Black";
  ctx.fill();


  if(startPos){
    for( var i = 0; i < totalObs; i++){
      makeObs();
    }
  startPos = false;
  }

  drawObs();
  drawShip();
  moveShip();
  moveObs();

	gameOver();

  requestAnimationFrame(loop);
	}
  loop();
