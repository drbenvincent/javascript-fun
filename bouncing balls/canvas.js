let height = 400
let width = 600
let n_balls = 500

var canvas = document.querySelector("canvas");
canvas.height = height;
canvas.width = width;

var context = document.querySelector("canvas").getContext("2d");

function randomNumber(start, end) {
    var diff = end - start;
    return Math.random() * diff + start;
}

class Ball {
    constructor() {
        this.radius = 3;
        this.speed = Math.random() * 0.5 + 0.0;
        this.direction = Math.random() * Math.PI * 2;
        this.x = randomNumber(10, width - 10);
        this.y = randomNumber(10, height - 10);
        this.dx = Math.cos(this.direction) * this.speed
        this.dy = Math.sin(this.direction) * this.speed
        this.state = "suceptible"
        this.color = "#cccccc";
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
    intersects(ball) {
        let d = Math.hypot(this.x - ball.x, this.y - ball.y)
        return Boolean(d < this.radius * 2)
    }
    infected() {
        this.state = "infected"
        this.color = "red"
    }
    progressDisease() {
        if (this.state == "infected" && Math.random() < 0.001) {
            console.log("recovered")
            this.recovers()
        }
    }
    recovers() {
        this.state = "recovered"
        this.color = "green"
    }
}

function interaction(ball1, ball2) {
    if (ball1.state == "infected" && ball2.state == "suceptible") {
        ball2.infected()
    }
    if (ball2.state == "infected" && ball1.state == "suceptible") {
        ball1.infected()
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
        balls[index].progressDisease()
    }

    // check for intersection
    for (var i = 0; i < n_balls; i++) {
        for (var j = i + 1; j < n_balls; j++) {
            if (balls[i].intersects(balls[j])) {
                // console.log(i + "intersects with" + j)
                interaction(balls[i], balls[j])
            }
        }
    }

    // draw balls
    for (let index = 0; index < balls.length; index++) {
        balls[index].draw()
    }

    // update text
    document.getElementById("message_id").innerText = "N = " + n_balls;
}

// Create many balls
var balls = new Array();
for (let index = 0; index < n_balls; index++) {
    balls.push(new Ball())
}

// one initial infected ball
balls[0].infected()

loop()