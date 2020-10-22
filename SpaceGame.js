const cvs = document.getElementById("spaceGame");
const ctx = cvs.getContext("2d");

// color canvas
ctx.beginPath();
ctx.rect(0, 0, cvs.width, cvs.height);
ctx.fillStyle = "Black";
ctx.fill();

//variables
var upArrow = false;
var downArrow = false;
var obsRadius = 30;
var obstacles = [];
var createObs = true;
var totalObs = 8;
var obsMinSpeed = 3;
var obsMaxSpeed = 5;
var gameOver = false;
var score = 0;
var highScores = [];
var leaderboardXPos = cvs.width/2
var leaderboardYPos = 150


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
			gameOver = true;
			checkScore();
		}
  });
}

// SCORE
function drawScore(){
	ctx.font = "16px Arial";
 	ctx.fillStyle = "white";
 	ctx.fillText("Score: "+score, 30, 20);
}

function addScore() {
	if(! gameOver){
		score = score + 1;
	}
}


// leaderboard
function checkScore(){
		console.log('checkscore');
	highScores.push(score);
	highScores.sort(function(a, b){return b - a});

	if (highScores.length > 5){
			highScores.pop()
			console.log(highScores);
	}
}




// End game screen
function endGame(){
	if(gameOver){

// draw the end screen
	ctx.beginPath();
	ctx.rect(0, 0, cvs.width, cvs.height);
	ctx.fillStyle = "Black";
	ctx.fill();

//write the words
	ctx.font = "35px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("GAMEOVER", cvs.width/2, 50);

	// ctx.font = "20px Arial";
	// ctx.fillText("Score: "+score, cvs.width/2, 300);

	ctx.font = "20px Arial";
	ctx.fillText("Press Space To Try Again", cvs.width/2, 450);

	// draw leaderboard
	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Leaderboard", leaderboardXPos, leaderboardYPos);

	for ( var i = 0; i < highScores.length; i++) {
		ctx.font = "20px Arial";
		ctx.fillstyle = "white";
		ctx.fillText((i + 1) + ": " + highScores[i], leaderboardXPos - 10, leaderboardYPos + 30);
		leaderboardYPos += 35;
	}
leaderboardYPos = 150;

	obstacles.splice(0,obstacles.length)
 }
}


function gameReset() {
	document.addEventListener('keydown', function(event){
		if(gameOver && event.keyCode == 32){
			console.log('reset')
			gameOver = false;
			score = 0;
			createObs = true;
			ship.y = cvs.height/2;

		}
	})
}


//game loop
function loop(){
  ctx.beginPath();
  ctx.rect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = "Black";
  ctx.fill();


  if(createObs){
    for( var i = 0; i < totalObs; i++){
      makeObs();
    }
  createObs = false;
  }

  drawObs();
  drawShip();
  moveShip();
  moveObs();

	drawScore();
	addScore();
	endGame();
	gameReset();

  requestAnimationFrame(loop);
	}
  loop();
