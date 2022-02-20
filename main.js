import { Player, Ball, contain, Text, hitTestRectangle } from "./utils.js";
// init canvas
let canvas = document.getElementById('canvas');
canvas.style.background = "#27ae60";
canvas.setAttribute("width", "512");
canvas.setAttribute("height", "512");
let ctx = canvas.getContext('2d');

// create entity
let stage = { x: 0, y: 0, width: canvas.width, height: canvas.height }; 

let ball = Ball(15, "#ecf0f1");
ball.x = canvas.width/2 - ball.r;
ball.y = canvas.height/2 - ball.r;

let player1 = Player(1, "#d35400", 150, 20);
player1.y = canvas.height - player1.h;

let player2 = Player(2, "#2980b9", 150, 20);
let text = Text("hello my little world!", "#f1c40f");

// loop
gameloop();
function gameloop() {
	requestAnimationFrame(gameloop);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	// UI
	text.content = `Score p1 ${player1.score} - p2 ${player2.score}`
	text.draw(ctx);
	// logic
	ball.x += ball.vx;
	ball.y += ball.vy;
	player1.x += player1.vx;
	// AI
	if (ball.y < stage.width/2) {
		if (ball.x > player2.x) player2.x += player2.speed;
		if (ball.x < player2.x) player2.x -= player2.speed;
	}
	// ball players collision
	let hit = hitTestRectangle(ball, player1);
	if (hit) { 
		ball.y -= 5;
		ball.vy *= -1;
	}
	let hit2 = hitTestRectangle(ball, player2);
	if (hit2) {
		ball.y += 5;
		ball.vy *= -1;
	}
	// stage collision
	contain(player1, stage);
	contain(player2, stage);
	let bCol = contain(ball, stage, true);
	if (bCol === "bottom") {
		// alert("point!");
		player2.score++;
		ball.x = canvas.width/2 - ball.r;
		ball.y = canvas.height/2 - ball.r;
	};
	if (bCol === "top") {
		// alert("point!");
		player1.score++;
		ball.x = canvas.width/2 - ball.r;
		ball.y = canvas.height/2 - ball.r;
	};
	// draw
	ball.draw(ctx);
	player1.draw(ctx);
	player2.draw(ctx);
}

// keyboard events
window.addEventListener("keydown", e => {
	if (e.key === "a") player1.vx = -player1.speed;
	if (e.key === "d") player1.vx = player1.speed;
})
window.addEventListener("keyup", e => {
	if (e.key === "a") player1.vx = 0;
	if (e.key === "d") player1.vx = 0;
})