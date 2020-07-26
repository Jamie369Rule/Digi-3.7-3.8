const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// color canvas
ctx.beginPath();
ctx.rect(0, 0, 800, 500);
ctx.fillStyle = "black";
ctx.fill();
