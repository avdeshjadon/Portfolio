# 🚀 Avdesh Jadon — Portfolio (React / Vite)

This repository now runs as a React application bootstrapped with Vite. The original static site has been ported into a modern, component-driven structure while keeping the original visual identity and animations (hero crossfade, popups, cards reveal).  

Quick summary
- Tech: React 18, Vite
- UI: CSS in `style.css` (kept from original)
- Animations: smooth crossfade hero images, popup bubbles, intersection reveal, optional WaterFlow canvas effect (React component)
- Legacy: `script.js` and `particles.js` are kept as small deprecation stubs (logic moved to `/src`)

Getting started

1. Install
   - Node 16+ recommended
   - Run:
     npm install

2. Dev server
   npm run dev
   - Open http://localhost:5173 (or the port shown by Vite)

3. Build / Preview
   npm run build
   npm run preview

Environment
- Example env file: `.env.example`
- Copy and edit:
  cp .env.example .env.local
- Public env variables must be prefixed with `VITE_` to be available in the client.
- Useful variables (from `.env.example`):
  - VITE_SITE_TITLE
  - VITE_APP_EMAIL
  - VITE_FORM_ENDPOINT
  - VITE_RESUME_PATH
  - VITE_PORT

Assets (place these in the repository root `public/` or project root served by Vite)
- /resume.pdf — résumé file used by the floating download button (or update VITE_RESUME_PATH)
- /images/avdesh.png
- /images/avdesh-up-left.png
- /images/avdesh-up-right.png
- /images/avdesh-down-left.png
- /images/avdesh-down-right.png
- /images/cursor.png (optional custom cursor used by CSS)

Notes about behavior
- Hero image crossfade: implemented with two stacked <img> layers to ensure smooth transitions. Ensure directional images exist to avoid flicker.
- Popups: show based on cursor quadrant relative to the hero image; popups stay visible while hovered.
- Cards / projects / testimonials: now reveal using an IntersectionObserver (class `.inview`).
- WaterFlow/particles: ported to React component (`src/components/WaterFlow.jsx`). Legacy `particles.js` is a stub.
- Legacy scripts: `script.js` retained as a short stub for compatibility but main logic is in `/src`.

Git
- .gitignore added to ignore node_modules, dist, and .env files. Do not commit sensitive env files.

Deployment
- Static build produced in `dist/` by `npm run build`. Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages). If using GitHub Pages, configure the build/deploy pipeline to build then publish `dist/`.

Troubleshooting
- If Vite complains about missing plugin, run:
  npm install
  npm ls @vitejs/plugin-react
- If directional images flash on first hover, ensure images are present and the server serves them; you can pre-warm by visiting the pages or preloading images in App.

Contributing / Notes
- The project intentionally uses client-safe env variables (VITE_ prefix). Do not store secrets in client env files.
- If you want the resume button moved into the React header or to add an animated SVG icon for the download button, open an issue or send instructions; it's a small change.

Contact
- Email: hello@avdeshjadon.com (also available via contact form configured with VITE_FORM_ENDPOINT)

Enjoy — GitHub Copilot helped port this repo to React & Vite for smoother development and better UX.
