window.addEventListener("load", function () {
  let canvas = document.querySelector("#canvas");
  let c = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let innerHeight = canvas.height;
  let innerWidth = canvas.width;

  let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    innerHeight = canvas.height;
    innerWidth = canvas.width;
  });

  window.addEventListener("dblclick", setup);

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("touchmove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function randFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function Ball(x, y, r, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = 0.05;
    this.vx = vx;
    this.vy = vy;
    this.g = 1;
    this.f = 0.91;
    this.color = color;

    this.draw = (lastP) => {
      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.stroke();
      c.closePath();
    };

    this.update = () => {
      this.x += this.vx;
      this.y += this.vy;

      if (this.y + this.r + this.vy > canvas.height) {
        this.vy = -this.vy * this.f;
      } else {
        this.vy += this.g;
      }

      if (this.x + this.r + this.vx > canvas.width || this.x - this.r < 0) {
        this.vx = -this.vx;
      }

      this.draw();
    };
  }

  let balls;

  function setup() {
    balls = [];
    for (let i = 0; i < 1000; i++) {
      let randR = randFromRange(10, 30);
      let randX = randFromRange(randR, canvas.width - randR);
      let randY = Math.random() * (canvas.height - randR);
      let randVY = randFromRange(-2, 2);
      let randVX = randFromRange(-2, 2);
      let randColor = `rgba(
        ${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)},
        ${Math.random()}
      )`;

      balls.push(new Ball(randX, randY, randR, randVX, randVY, randColor));
    }
  }

  function loop() {
    requestAnimationFrame(loop);

    c.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
      ball.update();
    });
  }

  setup();
  loop();
});
