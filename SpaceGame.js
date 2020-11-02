const cvs = document.getElementById("spaceGame");
const ctx = cvs.getContext("2d");

// color canvas
ctx.beginPath();
ctx.rect(0, 0, cvs.width, cvs.height);
ctx.fillStyle = "Black";
ctx.fill();

// Ship variables
var upArrow = false;
var downArrow = false;

// Obstacle Variables
var obsSize = 70;
var obstacles = [];
var createObs = true;
var totalObs = 8;
var obsMinSpeed = 3;
var obsMaxSpeed = 5;

// Game Variables
var gameStart = false;
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
	size : 40,
	speed : 6,
}

// draw ball
function drawShip(){
	ctx.drawImage(SHIP_IMG, ship.x, ship.y, ship.size, ship.size);
}
// End of fucntion

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
// End of function

// move the spaceship
function moveShip(){
  if(upArrow && ship.y > 0){
    ship.y -= ship.speed;
  }else if(downArrow && ship.y + ship.size < cvs.height){
    ship.y += ship.speed;
  }
}
// End of function

// Create obstacle
function makeObs() {
  var obs = {
    x : cvs.width,
    y :  Math.floor(Math.random() * ((cvs.height + obsSize) - obsSize)),
		size : obsSize,
    speed : (Math.random() * (obsMaxSpeed - obsMinSpeed) + obsMinSpeed),

  }
    obstacles.push(obs);
}
// End of function

// draw obstacles
function drawObs(){
for (var i = 0; i < obstacles.length; i++) {
	ctx.drawImage(OBS_IMG, obstacles[i].x, obstacles[i].y, obstacles[i].size, obstacles[i].size);
	}
}
// End of function

// Obstacle movement
function moveObs() {
  obstacles.forEach(function(obs){

    obs.x -= obs.speed;

    if(obs.x < 0 - obs.size) {
      obs.y =  Math.floor(Math.random() * ((cvs.height) - obs.size));
      obs.x = cvs.width + obs.size;
      obs.speed = (Math.random() * (obsMaxSpeed - obsMinSpeed) + obsMinSpeed)
    }
		// Collision detection
		if(ship.x + ship.size > obs.x && ship.x < obs.x + obs.size && ship.y + ship.size > obs.y && ship.y < obs.y + obs.size){
			console.log('hit');
			gameOver = true;
			checkScore();
		}
  });
}
// End of function


// Score
function drawScore(){
	ctx.font = "16px Arial";
 	ctx.fillStyle = "white";
 	ctx.fillText("Score: "+score, 50, 20);
}

function addScore() {
	if(! gameOver){
		score = score + 1;
	}
}
// End of function


// leaderboard
function checkScore(){
		console.log('checkscore');
		var userScore = {
				user : prompt('What is your Name?'),
				score : score,
		}

// Pushes most recent score into array and sorts it
	highScores.push(userScore);
	highScores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

// Removes the last item in the array keeping it at 5
	if (highScores.length > 5){
			highScores.pop()
			console.log(highScores);
	}
}
// End of function

// Start screen
function startGame() {
	if(! gameStart){
		ctx.font = "100px Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("SPACE", cvs.width/2, cvs.height/2);

		ctx.font = "20px Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Press Space To Play", cvs.width/2, 450);

		document.addEventListener('keydown', function(event){
			if(event.keyCode == 32){
				gameStart = true;
			}
		})
	}
}
// End of function


// End game screen
function endGame(){
	if(gameOver){

// Draw the end screen
	ctx.beginPath();
	ctx.rect(0, 0, cvs.width, cvs.height);
	ctx.fillStyle = "Black";
	ctx.fill();

// Write the words
	ctx.font = "50px Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("GAMEOVER", cvs.width/2, 75);

	ctx.font = "20px Arial";
	ctx.fillText("Press Space To Try Again", cvs.width/2, 450);

	// Draw leaderboard
	ctx.font = "35px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("HIGHSCORES", leaderboardXPos, leaderboardYPos);

	for ( var i = 0; i < highScores.length; i++) {
		ctx.font = "25px Arial";
		ctx.fillstyle = "white";
		ctx.fillText((i + 1) + ": " + highScores[i].user + " " + highScores[i].score, leaderboardXPos - 10, leaderboardYPos + 30);
		leaderboardYPos += 50;
	}
leaderboardYPos = 150;

	obstacles.splice(0,obstacles.length)
 }
}
// End of function


// Reset game from end screen when spacebar pushed
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
// End of function


// Game loop
function loop(){
	ctx.drawImage(BG_IMG, 0, 0, cvs.width, cvs.height);

	startGame();

if(gameStart){
// Creates a maxium amount of obstacles
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
};
  requestAnimationFrame(loop);
	}
	// End of function
  loop();
