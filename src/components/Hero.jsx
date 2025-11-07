import React, { useEffect, useRef, useState } from "react";

export default function Hero({ onPopupClick }) {
  const nameRef = useRef(null);

  // New refs/state for interactive image + popups
  const wrapperRef = useRef(null);
  const heroImgRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const [activePopup, setActivePopup] = useState(""); // "", "top-left", "top-right", ...

  useEffect(() => {
    const headline = nameRef.current;
    if (!headline || !headline.textContent) return;
    const text = headline.textContent;
    headline.innerHTML = "";
    text.split("").forEach((char, i) => {
      const s = document.createElement("span");
      s.className = "char";
      s.textContent = char === " " ? "\u00A0" : char;
      s.style.setProperty("--char-delay", `${i * 50}ms`);
      headline.appendChild(s);
    });
    setTimeout(() => headline.classList.add("animated"), 800);
  }, []);

  useEffect(() => {
    // IntersectionObserver to add .inview to reveal cards/testimonials/projects
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            o.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-50px 0px -50px 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".card, .project-card, .testimonial").forEach((el) => {
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const heroImg = heroImgRef.current;
    if (!wrapper || !heroImg) return;

    const originalSrc = heroImg.getAttribute("src") || "/images/avdesh.png";
    let currentImage = originalSrc;

    const setImageAndPopup = (imgName, popupClass) => {
      if (currentImage !== imgName) {
        heroImg.src = imgName;
        currentImage = imgName;
      }
      setActivePopup(popupClass);
    };

    const handleMove = (e) => {
      // throttle via rAF
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        clearTimeout(leaveTimeoutRef.current);

        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const isUp = e.clientY < centerY;
        const isDown = e.clientY > centerY;
        const isLeft = e.clientX < centerX;
        const isRight = e.clientX > centerX;

        let img = originalSrc;
        let popup = "";

        if (isUp && isLeft) {
          img = "/images/avdesh-up-left.png";
          popup = "top-left";
        } else if (isUp && isRight) {
          img = "/images/avdesh-up-right.png";
          popup = "top-right";
        } else if (isDown && isLeft) {
          img = "/images/avdesh-down-left.png";
          popup = "bottom-left";
        } else if (isDown && isRight) {
          img = "/images/avdesh-down-right.png";
          popup = "bottom-right";
        }

        setImageAndPopup(img, popup);
      });
    };

    const handleLeave = () => {
      // small delay then revert
      leaveTimeoutRef.current = setTimeout(() => {
        heroImg.src = originalSrc;
        setActivePopup("");
        currentImage = originalSrc;
      }, 80);
    };

    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", handleLeave);

    // ensure popup hover keeps image (clear leave)
    const popups = wrapper.querySelectorAll(".hero-popup");
    popups.forEach((p) => {
      p.addEventListener("mouseenter", () => clearTimeout(leaveTimeoutRef.current));
      p.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseleave", handleLeave);
      popups.forEach((p) => {
        p.removeEventListener("mouseenter", () => clearTimeout(leaveTimeoutRef.current));
        p.removeEventListener("mouseleave", handleLeave);
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  return (
    <section className="hero" id="home" aria-labelledby="heroName">
      <div className="hero-image-wrapper" ref={wrapperRef}>
        <img
          ref={heroImgRef}
          src="/images/avdesh.png"
          alt="A sticker-style photo of Avdesh Jadon"
          className="hero-image"
        />
        <div className="hero-glow" />
        <div
          className={`hero-popup top-left ${activePopup === "top-left" ? "active" : ""}`}
          data-target="projects"
          onClick={() => onPopupClick("projects")}
        >
          <div className="thinking-bubbles">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-3"></div>
          </div>
          <div className="bubble bubble-4"></div>
          <div className="main-bubble">
            <span className="popup-text">Projects</span>
          </div>
        </div>
        <div
          className={`hero-popup top-right ${activePopup === "top-right" ? "active" : ""}`}
          data-target="skills"
          onClick={() => onPopupClick("skills")}
        >
          <div className="thinking-bubbles">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-3"></div>
          </div>
          <div className="bubble bubble-4"></div>
          <div className="main-bubble">
            <span className="popup-text">Skills</span>
          </div>
        </div>
        <div
          className={`hero-popup bottom-left ${activePopup === "bottom-left" ? "active" : ""}`}
          data-target="about"
          onClick={() => onPopupClick("about")}
        >
          <div className="thinking-bubbles">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-3"></div>
          </div>
          <div className="bubble bubble-4"></div>
          <div className="main-bubble">
            <span className="popup-text">About</span>
          </div>
        </div>
        <div
          className={`hero-popup bottom-right ${activePopup === "bottom-right" ? "active" : ""}`}
          data-target="contact"
          onClick={() => onPopupClick("contact")}
        >
          <div className="thinking-bubbles">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-3"></div>
          </div>
          <div className="bubble bubble-4"></div>
          <div className="main-bubble">
            <span className="popup-text">Contact</span>
          </div>
        </div>
      </div>

      <div className="hero-left">
        <div className="eyebrow">SOFTWARE DEVELOPER • FULL STACK DEVELOPER</div>
        <h1 id="heroName" ref={nameRef}>
          Avdesh Jadon
        </h1>
        <div className="sub">
          Crafting digital experiences that push the boundaries of web technology. Specializing in performance-driven applications with stunning visual appeal.
        </div>
        <a href="#contact" className="cta">
          <span>Let's Create Magic ✨</span>
        </a>
      </div>
    </section>
  );
}
