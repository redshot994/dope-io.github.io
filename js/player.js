//Player
var hero = {
	speed: 150, // movement in pixels per second
	height: 30,
	width: 30,
	size: 20,
	accMax: 2,
	accRate: 0.5,
	ax: 0,
	ay: 0,
	friends: new Array(),
	vx: 0,
	vy: 0,
	friction: 0.97,
	maxVel: 2,
	shootCoolDown: 0,
	delay: 40
};

function renderPlayer(){
	//player
	ctx.fillStyle = "rgb(150, 255, 150)";
	ctx.strokeStyle = "rgb(60, 60, 60)";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.arc(hero.x, hero.y, hero.size, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	renderFriends();
}

function playerCanShoot(player){
	return player.shootCoolDown == 0;
}

function playerShootBullet(player, angle){
	if(playerCanShoot(player)){
		bullets.push(new bullet(player.x, player.y, 8, 5, angle, 50));
		player.shootCoolDown = player.delay;
	}
	for(var i = 0; i < hero.friends.length; i++){
		friendShootBullet(player.friends[i], angle);
	}
}

function playerCoolDown(player){
	if(player.shootCoolDown > 0){
		player.shootCoolDown--;
	}
	for(var i = 0; i < hero.friends.length; i++){
		friendCoolDown(player.friends[i]);
	}
}

function updatePlayerPosition(player){
	//update velocity
	if(player.vx < player.maxVel && player.vx > -player.maxVel){
    	player.vx += player.ax;
	}
    if(player.vy < player.maxVel && player.vy > -player.maxVel){
    	player.vy += player.ay;
	}
	//console.log(player.vy);

    //cheat's friction
    player.vx *= player.friction;
    player.vy *= player.friction;

    //update position
    movePlayer(player, player.vx, player.vy);
    updateFriends();
}

function isInsidePlayer(player, x, y){
	var r = player.size * 2;
	var dx = Math.abs(x - player.x);
	if(dx > r){
		return false;
	}
	var dy = Math.abs(y - player.y);
	if(dy > r){
		return false;
	}
	if(dx + dy <= r){
		return true;
	}
	return (dx*dx + dy*dy <= r * r);
}

function acceleratePlayer(x, y, player, modifier){
	if(x != 0){
		if(Math.abs(player.ax) < player.accMax * modifier){
			player.ax += x * player.accRate * modifier;
		}
	}
	else{
		if(Math.abs(player.ay) < player.accMax * modifier){
			player.ay += y * player.accRate * modifier;
		}
	}
}

function decceleratePlayer(x, player){
	if(x){
		player.ax = 0;
	}
	else{
		player.ay = 0;
	}
}

function movePlayer(player, x, y){
	player.x += x;
	player.y += y;
}

function updateFriends(){
	for(var i = 0; i < hero.friends.length; i++){
		//console.log(hero.friends[i].x);
		updateFriendPosition(hero.friends[i]);
	}
}

function renderFriends(){
	for(var i = 0; i < hero.friends.length; i++){
		renderFriend(hero.friends[i]);
	}
}