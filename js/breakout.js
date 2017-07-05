class Breakout {
    constructor() {
        this.canvas = document.getElementById("root");
        this.ctx = this.canvas.getContext("2d");

        this.color = "tomato";
        this.ballRadius = 10;
        this.ballX = this.canvas.width / 2;
        this.ballY = this.canvas.height - 30;
        this.dx = 2;
        this.dy = -2;

        this.paddleHeight = 10;
        this.paddleWidth = 75;
        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
        this.paddleSpeed = 4;

        this.rightPressed = false;
        this.leftPressed = false;

        this.brick = {
            rowCount: 2,
            columnCount: 6,
            width: 75,
            height: 20,
            padding: 10,
            offsetTop: 30,
            offsetLeft: 35
        };
        this.brickArray = this.createBrickArray();

        this.score = document.getElementById("score");
        this.gameover = false;

        this.draw = this.draw.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);

        this.keyUpHandler = this.keyUpHandler.bind(this);

        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("keydown", this.keyDownHandler, false);

        setInterval(this.draw, 10);
    }

    draw() {
        this.clearCanvas();
        this.drawCircle();
        this.drawBricks();
        this.detectBrickCollision();
        this.drawPaddle();
        this.bounceCircle();
        this.movePaddle();
        if (!this.gameover) {
            this.moveCircle();
        }
    }

    detectBrickCollision() {
        for (let column = 0; column < this.brick.columnCount; column++) {
            for (let row = 0; row < this.brick.rowCount; row++) {
                let brick = this.brickArray[column][row];

                if (
                    !brick.hit &&
                    this.ballX + this.ballRadius > brick.x &&
                    this.ballX - this.ballRadius < brick.x + this.brick.width &&
                    this.ballY + this.ballRadius > brick.y &&
                    this.ballY - this.ballRadius < brick.y + this.brick.height
                ) {
                    this.dy = -this.dy;
                    brick.hit = true;
                    this.score.innerText = parseInt(this.score.innerText) + 1;
                }
            }
        }
    }

    drawBricks() {
        for(let column = 0; column < this.brick.columnCount; column++) {
            for(let row = 0; row < this.brick.rowCount; row++) {
                if (!this.brickArray[column][row].hit) {
                    this.brickArray[column][row].x = (column * (this.brick.width + this.brick.padding)) + this.brick.offsetLeft;
                    this.brickArray[column][row].y = (row * (this.brick.height + this.brick.padding)) + this.brick.offsetTop;
                    this.ctx.beginPath();
                    this.ctx.rect(this.brickArray[column][row].x, this.brickArray[column][row].y, this.brick.width, this.brick.height);
                    this.ctx.fillStyle = "cornflowerblue";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

    createBrickArray() {
        let brickArray = [];
        for (let column = 0; column < this.brick.columnCount; column++) {
            brickArray[column] = [];
            for (let row = 0; row < this.brick.rowCount; row++) {
                brickArray[column][row] = {x: 0, y: 0, hit: false};
            }
        }
        return brickArray;
    }

    keyUpHandler(event) {
        if(event.keyCode === 39) {
            this.rightPressed = false;
        }
        else if(event.keyCode === 37) {
            this.leftPressed = false;
        }
    }

    keyDownHandler(event) {
        if(event.keyCode === 39) {
            this.rightPressed = true;
        }
        else if(event.keyCode === 37) {
            this.leftPressed = true;
        }
    }

    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = "blue";
        this.ctx.fill();
        this.ctx.closePath();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    movePaddle() {
        if(this.rightPressed && this.paddleX < this.canvas.width-this.paddleWidth) {
            this.paddleX += this.paddleSpeed;
        }
        else if(this.leftPressed && this.paddleX > 0) {
            this.paddleX -= this.paddleSpeed;
        }
    }

    moveCircle() {
        this.ballX += this.dx;
        this.ballY += this.dy;
    }

    bounceCircle() {
        // if hits a wall, change horizontal direction
        if(this.ballX + this.dx > this.canvas.width-this.ballRadius || this.ballX + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }

        // if hits ceiling, change vertical direction
        if(this.ballY + this.dy < this.ballRadius) {
            this.dy = -this.dy;

        // if ball is below top of paddle
        } else if (this.ballY + this.dy > this.canvas.height - this.ballRadius - this.paddleHeight) {

            // if ball is aligned with the width of the paddle, change vertical direction
            if(this.ballX > this.paddleX && this.ballX < this.paddleX + this.paddleWidth) {
                this.dy = -this.dy;
            }
        }

        // if ball gets below middle of the paddle
        if (this.ballY + this.dy > this.canvas.height - this.ballRadius - (this.paddleHeight / 2)) {
            this.endGame();
        }
    }

    endGame() {
        this.score.innerText = "GAME OVER";
        this.score.addEventListener("click", () => document.location.reload(), false);
        this.gameover = true;
    }

    drawCircle() {
        this.ctx.beginPath();
        this.ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export { Breakout };
