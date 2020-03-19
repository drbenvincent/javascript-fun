// SIMULATION OPTIONS
let height = 500
let width = 800
let n_balls = 250

// Overall status counts
let n_susceptible = n_balls
let n_infected = 0
let n_recovered = 0

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
        this.radius = 4;
        this.speed = Math.random() * 0.7 + 0.0;
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
        n_infected += 1
        n_susceptible -= 1
    }
    progressDisease() {
        if (this.state == "infected" && Math.random() < 0.001) {
            // console.log("recovered")
            this.recovers()
        }
    }
    recovers() {
        this.state = "recovered"
        this.color = "green"
        n_recovered += 1
        n_infected -= 1
    }
}


class Population {
    constructor(n_balls) {
        this.n_balls = n_balls;
        // create balls
        this.balls = new Array();
        for (let index = 0; index < this.n_balls; index++) {
            this.balls.push(new Ball())
        }
        // infect patient zero
        this.balls[0].infected()
    }
    update() {
        // move and progress disease
        for (let index = 0; index < this.n_balls; index++) {
            this.balls[index].move(width, height)
            this.balls[index].progressDisease()
        }

        // check for intersection
        for (var i = 0; i < this.n_balls; i++) {
            for (var j = i + 1; j < this.n_balls; j++) {
                if (this.balls[i].intersects(this.balls[j])) {
                    // console.log(i + "intersects with" + j)
                    this.interaction(i, j)
                }
            }
        }
    }
    draw() {
        for (let index = 0; index < this.n_balls; index++) {
            this.balls[index].draw()
        }
    }
    interaction(i, j) {
        if (this.balls[i].state == "infected" && this.balls[j].state == "suceptible") {
            this.balls[j].infected()
        }
        if (this.balls[j].state == "infected" && this.balls[i].state == "suceptible") {
            this.balls[i].infected()
        }
    }
}


function loop() {
    if (n_infected != 0) {
        window.requestAnimationFrame(loop)
    }


    // redraw/wipe canvas
    context.canvas.height = height;
    context.canvas.width = width;

    population.update();
    population.draw();

    // update text
    document.getElementById("message_id").innerText = "S = " + n_susceptible + "; I = " + n_infected + "; R = " + n_recovered;
}


population = new Population(n_balls);

loop()