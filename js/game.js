// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = $(window).width();
canvas.height = $(window).height();
document.body.appendChild(canvas);

//brus

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var mouseX;
var mouseY;

addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	//console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
	mouseX = mousePos.x;
	mouseY = mousePos.y;
}, false);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
  		x: evt.clientX - rect.left,
  		y: evt.clientY - rect.top
	};
}

var mouseDown = false;

addEventListener('mousedown', function(evt) {
	mouseDown = true;
}, false);

addEventListener('mouseup', function(evt) {
	mouseDown = false;
}, false);

function init(){

}

// Update game objects
var update = function (modifier) {
	if (38 in keysDown || 87 in keysDown) { // Player holding up or w
		hero.y -= hero.speed * modifier;
		if(cantMove()){
			hero.y += hero.speed * modifier;
		}
	}
	if (40 in keysDown || 83 in keysDown) { // Player holding down or s
		hero.y += hero.speed * modifier;
		if(cantMove()){
			hero.y -= hero.speed * modifier;
		}
	}
	if (37 in keysDown || 65 in keysDown) { // Player holding left or a
		hero.x -= hero.speed * modifier;
		if(cantMove()){
			hero.x += hero.speed * modifier;
		}
	}
	if (39 in keysDown || 68 in keysDown) { // Player holding right or d
		hero.x += hero.speed * modifier;
		if(cantMove()){
			hero.x -= hero.speed * modifier;
		}
	}
};

function cantMove(){
	return false;
}

function clamp(value, min, max){
	return value;
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

var bgWidth = 100;
var bgHeight = 100;
var bgGridSize = 30;

// Draw everything
function render() {
	ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
    ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

    var camX = clamp(-hero.x + canvas.width/2, 0, (bgWidth * bgGridSize) - canvas.width);
    var camY = clamp(-hero.y + canvas.height/2, 0, (bgHeight * bgGridSize) - canvas.height);
    ctx.translate(camX, camY); 

	renderBackground(camX, camY);
	renderPlayer();
	renderMap(camX, camY);
	//etc
};

function renderBackground(camX, camY){
	ctx.fillStyle = "rgb(210, 210, 210)";
	ctx.fillRect(0, 0, bgWidth * bgGridSize, bgHeight * bgGridSize);
	ctx.strokeStyle = "rgb(190, 190, 190)";
	ctx.lineWidth = 2;
	for(var i = 0; i < bgWidth; i++){
		for(var j = 0; j < bgHeight; j++){
			ctx.strokeRect(i * bgGridSize, j * bgGridSize, bgGridSize, bgGridSize);
		}
	}
}

function getAngle(cx, cy, ex, ey) {
	var dy = ey - cy;
	var dx = ex - cx;
	var theta = Math.atan2(dy, dx); // range (-PI, PI]
	theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
	//if (theta < 0) theta = 360 + theta; // range [0, 360)
	return theta;
}

function renderMap(camX, camY){
	var heroMapx = hero.x / bgGridSize;
	var heroMapy = hero.y / bgGridSize;
	ctx.fillStyle = "rgba(50, 50, 50, 0.3)";
	ctx.strokeStyle = "rgba(20, 20, 20, 0.3)";
	ctx.lineWidth = 1;
	ctx.fillRect(canvas.width - bgWidth - 10 - camX, canvas.height - bgHeight - 10 - camY, bgWidth, bgHeight);
	ctx.strokeRect(canvas.width - bgWidth - 10 - camX, canvas.height - bgHeight - 10 - camY, bgWidth, bgHeight);
	ctx.fillStyle = "rgb(150, 255, 150)";
	ctx.fillRect(canvas.width - bgWidth - 10 + heroMapx - camX, canvas.height - bgHeight - 10 + heroMapy - camY, 2, 2);
}

function renderPlayer(){
	//player
	ctx.fillStyle = "rgb(150, 255, 150)";
	ctx.strokeStyle = "rgb(60, 60, 60)";
	ctx.lineWidth = 5;
	//ctx.fillOval(hero.x, hero.y, hero.width, hero.height);
	ctx.beginPath();
	ctx.arc(hero.x, hero.y, 20, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	//gun
	//ctx.fillStyle = "rgb(50, 50, 50)";
	//fillRotatedRect((hero.x + hero.width/2) - 10, (hero.y + hero.height/2) - 5, 20, 10, gun.angle);
}

function fillRotatedRect(x, y, width, height, deg){
    //Convert degrees to radian 
    var rad = (deg + 90) * Math.PI / 180;
    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);
    //ctx.translate(ox, oy);
    //Rotate the canvas around the origin
    ctx.rotate(rad);
    //draw the rectangle
    ctx.fillRect(width / 2 * (-1),height / 2 * (-1),width,height);
    //reset the canvas  
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame
					 || w.webkitRequestAnimationFrame
					 || w.msRequestAnimationFrame 
					 || w.mozRequestAnimationFrame;

// Let's play this game!
hero.x = canvas.width/2;
hero.y = canvas.height/2;
var then = Date.now();
init();
main();