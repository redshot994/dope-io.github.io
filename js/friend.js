function friend(x, y, size, player){
	this.x = x;
	this.y = y;
	this.size = size;
	this.player = player;
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
}

function moveFriend(friend, x, y){
	friend.x += x;
	friend.y += y;
}