import React, { useEffect } from "react";

export default function ThemeToggle({ theme, setTheme }) {
  useEffect(() => {
    // update favicon gradient based on CSS variables
    const updateFavicon = () => {
      try {
        const style = getComputedStyle(document.documentElement);
        const color1 = style.getPropertyValue("--accent-primary").trim();
        const color2 = style.getPropertyValue("--accent-secondary").trim();

        const svg = `
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
            <defs>
              <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0' stop-color='${color1}'/>
                <stop offset='1' stop-color='${color2}'/>
              </linearGradient>
            </defs>
            <text y='.9em' font-size='90' fill='url(#g)'>AJ</text>
          </svg>
        `;
        const link = document.querySelector("link[rel='icon']");
        if (link) link.href = "data:image/svg+xml," + encodeURIComponent(svg);
      } catch (e) { /* ignore */ }
    };
    updateFavicon();
  }, [theme]);

  const toggle = () => {
    setTheme((t) => (t === "dark-theme" ? "light-theme" : "dark-theme"));
  };

  return (
    <button id="theme-toggle" aria-label="Toggle dark mode" onClick={toggle}>
      <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: document.documentElement.classList.contains("dark-theme") ? "none" : "block" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 008.25-4.5z"/>
      </svg>
      <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: document.documentElement.classList.contains("dark-theme") ? "block" : "none" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
      </svg>
    </button>
  );
}
