var canvas = document.querySelector("canvas");
canvas.height = 400;
canvas.width = 600;

var context = document.querySelector("canvas").getContext("2d");

class Ball {
    constructor(x, y, radius) {
        this.color = "#008000";
        this.direction = Math.random() * Math.PI * 2;
        this.radius = radius;
        this.speed = Math.random() * 1 + 0.1;
        this.x = x;
        this.y = y;
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
    move() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
    }
}

// make new ball
var ball = new Ball(100, 100, 5);

// draw ball
// context.fillStyle = ball.color;
// context.beginPath();
// context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
// context.fill();
//ball.draw()

function loop() {
    window.requestAnimationFrame(loop)

    // redraw/wipe canvas
    context.canvas.height = 400;
    context.canvas.width = 600;

    ball.move()
    ball.draw()
}

loop()