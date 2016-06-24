function friend(x, y, size, player, accRate){
	this.x = x;
	this.y = y;
	this.size = size;
	this.player = player;

	this.bulletSize = 5;
	this.shootCoolDown = 0;
	this.shootDelay = 100;
	this.bulletSpeed = 8;
	this.bulletRange = 50;
	//console.log(this.maxVel);
	//console.log(this.ax);
}

function renderFriend(friend){
	//friend
	ctx.fillStyle = "rgb(150, 255, 150)";
	ctx.strokeStyle = "rgb(60, 60, 60)";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.arc(friend.x, friend.y, friend.size, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	//console.log(friend.x + " - " + friend.y);
}

function friendCanShoot(friend){
	return friend.shootCoolDown == 0;
}

function friendShootBullet(friend, angle){
	if(friendCanShoot(friend)){
		bullets.push(new bullet(friend.x, friend.y, friend.bulletSize, friend.bulletSpeed, angle, friend.bulletRange));
		friend.shootCoolDown = friend.shootDelay;
	}
}

function friendCoolDown(friend){
	if(friend.shootCoolDown > 0){
		friend.shootCoolDown--;
	}
}

function isInsideFriend(friend, x, y){
	var r = friend.size * 2.5;
	var dx = Math.abs(x - friend.x);
	if(dx > r){
		return false;
	}
	var dy = Math.abs(y - friend.y);
	if(dy > r){
		return false;
	}
	if(dx + dy <= r){
		return true;
	}
	return (dx*dx + dy*dy <= r * r);
}

function friendSpaceOut(friend, x, y, av, angleToPlayer){
	var newX = friend.x + x;
	var newY = friend.y + x;
	for(var i = 0; i < friend.player.friends.length; i++){
		if(friend.player.friends[i] != friend && isInsideFriend(friend.player.friends[i], newX, newY)){
			var angleToOther = Math.atan2(friend.x - (friend.player.friends[i].x), 
				- (friend.y - (friend.player.friends[i].y))) * (180/Math.PI) - 90;
			var moveX = av * Math.cos(angleToOther * Math.PI / 180);
			var moveY = av * Math.sin(angleToOther * Math.PI / 180);
			friend.x += moveX;
			friend.y += moveY;
		}
	}
	if(isInsidePlayer(friend.player, newX, newY)){
		friend.x -= x*3;
		friend.y -= y*3;
	}
}

function moveToPlayer(angle, friend){
	var av = Math.max(Math.abs(friend.player.vx), Math.abs(friend.player.vy));
	var moveX = av * Math.cos(angle * Math.PI / 180);
	var moveY = av * Math.sin(angle * Math.PI / 180);
	friendSpaceOut(friend, moveX, moveY, av, angle)
	friend.x += moveX;
	friend.y += moveY;
}

function updateFriendPosition(friend){
    var angleToPlayer = Math.atan2(friend.x - (friend.player.x), - (friend.y - (friend.player.y))) * (180/Math.PI);

    moveToPlayer(angleToPlayer + 90, friend);
}




