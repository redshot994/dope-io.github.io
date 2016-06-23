//Player
var hero = {
	speed: 150, // movement in pixels per second
	height: 30,
	width: 30,
	accMax: 2,
	accRate: 0.5,
	ax: 0,
	ay: 0,
	friends: new Array(),
	vx: 0,
	vy: 0,
	friction: 0.97,
	maxVel: 2
};

function renderPlayer(){
	//player
	ctx.fillStyle = "rgb(150, 255, 150)";
	ctx.strokeStyle = "rgb(60, 60, 60)";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.arc(hero.x, hero.y, 20, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	renderFriends();
}

function updatePlayerPosition(player, modifier){
	//update velocity
	if(player.vx < player.maxVel && player.vx > -player.maxVel){
    	player.vx += player.ax;
	}
    if(player.vy < player.maxVel && player.vy > -player.maxVel){
    	player.vy += player.ay;
	}
	//console.log(player.vx);

    //cheat's friction
    player.vx *= player.friction;
    player.vy *= player.friction;

    //update position
    movePlayer(player, player.vx, player.vy);
}

function movePlayer(player, x, y){
	player.x += x;
	player.y += y;
	updateFriends(x, y);
}

function updateFriends(x, y){
	for(var i = 0; i < hero.friends.length; i++){
		moveFriend(hero.friends[i], x, y);
	}
}

function renderFriends(){
	for(var i = 0; i < hero.friends.length; i++){
		renderFriend(hero.friends[i]);
	}
}