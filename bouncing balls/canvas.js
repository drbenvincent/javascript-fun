let height = 400
let width = 600
let n_balls = 200

var canvas = document.querySelector("canvas");
canvas.height = height;
canvas.width = width;

var context = document.querySelector("canvas").getContext("2d");

class Ball {
    constructor(x, y, radius) {
        this.color = "#008000";
        this.radius = radius;
        this.speed = Math.random() * 2 + 0.1;
        this.direction = Math.random() * Math.PI * 2;
        this.x = x;
        this.y = y;
        this.dx = Math.cos(this.direction) * this.speed
        this.dy = Math.sin(this.direction) * this.speed
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
    move(width, height) {
        this.x += this.dx;
        this.y += this.dy;
        // check collision with left or right
        if (this.x - this.radius < 0) {
            this.x = 0 + this.radius
            this.dx = -this.dx
        } else if (this.x + this.radius > width) {
            this.x = width - this.radius
            this.dx = -this.dx
        }
        // check collision with top or bottom
        if (this.y - this.radius < 0) {
            this.y = 0 + this.radius
            this.dy = -this.dy
        } else if (this.y + this.radius > height) {
            this.y = height - this.radius
            this.dy = -this.dy
        }
    }
}

function loop() {
    window.requestAnimationFrame(loop)

    // redraw/wipe canvas
    context.canvas.height = height;
    context.canvas.width = width;

    //update balls
    for (let index = 0; index < balls.length; index++) {
        balls[index].move(width, height)

    }
    // draw balls
    for (let index = 0; index < balls.length; index++) {
        balls[index].draw()
    }
    // ball.move(width, height)
    // ball.draw()

    // update text
    document.getElementById("message_id").innerText = "N = " + n_balls;
}

// Create many balls
var balls = new Array();
for (let index = 0; index < n_balls; index++) {
    balls.push(new Ball(100, 100, 5))
}

loop()