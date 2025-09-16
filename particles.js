"use strict";

class WaterDrop {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = Math.random() * 1.5 + 0.8;
    this.size = Math.random() * 3 + 2;
    this.alpha = 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.life = Math.random() * 40 + 60;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1 / this.life;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
    ctx.shadowBlur = 20;
    ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
    ctx.fill();
  }
}

class WaterFlow {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: 0, y: 0, isDown: false };

    this.colors = [
      { r: 230, g: 180, b: 255 },
      { r: 255, g: 170, b: 220 },
      { r: 200, g: 150, b: 255 },
    ];

    this.init();
  }

  init() {
    this.canvas.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 100;
    `;
    document.body.appendChild(this.canvas);
    this.onResize();

    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("mousedown", () => (this.mouse.isDown = true));
    window.addEventListener("mouseup", () => (this.mouse.isDown = false));

    this.loop();
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  createParticles() {
    const count = this.mouse.isDown ? 2 : 1;
    for (let i = 0; i < count; i++) {
      this.particles.push(
        new WaterDrop(this.mouse.x, this.mouse.y, this.colors)
      );
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.createParticles();

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.draw(this.ctx);
      if (p.alpha <= 0.05) this.particles.splice(i, 1);
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}

new WaterFlow();
