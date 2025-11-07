import { useEffect } from "react";

export default function WaterFlow() {
  useEffect(() => {
    // create trail element
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    document.body.appendChild(trail);

    // base styles (inlined so component works without extra CSS changes)
    const s = trail.style;
    s.position = "fixed";
    s.pointerEvents = "none";
    s.zIndex = "9998";
    s.width = "180px";
    s.height = "180px";
    s.borderRadius = "50%";
    s.transform = "translate(-50%, -50%) scale(1)";
    s.filter = "blur(36px) saturate(120%)";
    s.background = "radial-gradient(circle at 40% 35%, rgba(99,102,241,0.28), rgba(236,72,153,0.08) 40%, rgba(0,0,0,0) 70%)";
    s.opacity = "0.65";
    s.transition = "opacity 260ms ease";

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: mouse.x, y: mouse.y };
    const lerp = (a, b, f) => a + (b - a) * f;
    let rafId;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // increase visibility while moving
      trail.style.opacity = "0.85";
    };
    const onLeave = () => {
      trail.style.opacity = "0.0";
    };

    const loop = () => {
      pos.x = lerp(pos.x, mouse.x, 0.18);
      pos.y = lerp(pos.y, mouse.y, 0.18);
      trail.style.left = `${pos.x}px`;
      trail.style.top = `${pos.y}px`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", () => (trail.style.opacity = "0.65"));

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (trail.parentNode) trail.parentNode.removeChild(trail);
    };
  }, []);

  return null;
}
