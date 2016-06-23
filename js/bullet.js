function bullet(x, y, size, speed, angle, range){
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;
	this.angle = angle;
	this.range = range;
}

function renderBullet(bullet, ctx){
	ctx.fillStyle = "rgb(255, 150, 150)";
	ctx.strokeStyle = "rgb(60, 60, 60)";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function moveBullet(bullet){
	bullet.x += bullet.speed * Math.cos(bullet.angle * Math.PI / 180);
	bullet.y += bullet.speed * Math.sin(bullet.angle * Math.PI / 180);
}