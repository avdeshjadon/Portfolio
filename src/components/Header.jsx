import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ socials = [], theme, setTheme }) {
  return (
    <header id="siteHeader" role="banner">
      <a href="#home" className="logo" aria-label="Avdesh Jadon - Go to home">
        <div className="mark">
          {/* ...existing SVG mark... */}
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8.5 16.5L12 7L15.5 16.5M14 14.5H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14.5V18.5C12 19.5 11 20 10 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="name">Avdesh Jadon</div>
      </a>

      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="header-actions">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}
