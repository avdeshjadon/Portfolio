import React, { useEffect, useRef } from "react";

function WaterDrop(x, y, colors) {
  this.x = x; this.y = y;
  this.vx = (Math.random() - 0.5) * 0.6;
  this.vy = Math.random() * 1.5 + 0.8;
  this.size = Math.random() * 3 + 2;
  this.alpha = 1;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.life = Math.random() * 40 + 60;
}
WaterDrop.prototype.update = function() {
  this.x += this.vx; this.y += this.vy; this.alpha -= 1 / this.life;
};
WaterDrop.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
  ctx.shadowBlur = 20;
  ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
  ctx.fill();
};

export default function WaterFlow() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:100;";
    document.body.appendChild(canvas);
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d");
    const colors = [{ r: 230, g: 180, b: 255 }, { r: 255, g: 170, b: 220 }, { r: 200, g: 150, b: 255 }];

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const onMouseMove = (e) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    const onDown = () => (mouseRef.current.isDown = true);
    const onUp = () => (mouseRef.current.isDown = false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const count = mouseRef.current.isDown ? 2 : 1;
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new WaterDrop(mouseRef.current.x || canvas.width/2, mouseRef.current.y || canvas.height/2, colors));
      }
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0.05) particlesRef.current.splice(i, 1);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return null;
}
