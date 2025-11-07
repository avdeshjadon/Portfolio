import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Modal from "./components/Modal";
import Notifications from "./components/Notifications";
import WaterFlow from "./components/WaterFlow";
import { CONFIG } from "./data";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark-theme" : "light-theme"));
  const [modalProject, setModalProject] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // set copyright year (keeps parity with previous behavior)
    const el = document.getElementById("copyright-year");
    if (el) el.textContent = new Date().getFullYear();
  }, []);

  const showToast = (msg, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
  };

  const openProject = (key) => {
    const p = CONFIG.projects[key];
    if (p) setModalProject(p);
  };
  const closeProject = () => setModalProject(null);

  return (
    <>
      <div id="preloader" aria-hidden="true" style={{ display: "none" }} />
      <Notifications items={toasts} />
      <Header socials={CONFIG.socials} theme={theme} setTheme={setTheme} />
      <main>
        <Hero onPopupClick={(target) => {
          const anchor = document.getElementById(target);
          if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
        }} />
        <section id="about" aria-labelledby="about-title">
          <h2 className="section-title" id="about-title">About Me</h2>
          <div className="cards">
            <article className="card tilt">
              <div className="title">Innovation Driven</div>
              <div className="desc">Passionate about exploring cutting-edge technologies and pushing the limits of what's possible in web development. Always staying ahead of the curve with emerging trends like AI integration and Web3.</div>
            </article>
            <article className="card tilt">
              <div className="title">Problem Solver</div>
              <div className="desc">Transforming complex challenges into elegant, scalable solutions. I thrive on finding creative approaches that balance functionality with exceptional user experience, ensuring code is maintainable and performant.</div>
            </article>
            <article className="card tilt">
              <div className="title">Design Focused</div>
              <div className="desc">Bridging the gap between design and development with pixel-perfect implementations and smooth, engaging animations that bring interfaces to life.</div>
            </article>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-title">
          <h2 className="section-title" id="skills-title">My Skills</h2>
          <div className="skills-grid">
            <div className="skill">HTML5</div>
            <div className="skill">CSS3</div>
            <div className="skill">JavaScript (ES6+)</div>
            <div className="skill">React</div>
            <div className="skill">Node.js</div>
            <div className="skill">Express.js</div>
            <div className="skill">MongoDB</div>
            <div className="skill">SQL</div>
            <div className="skill">Git</div>
            <div className="skill">Figma</div>
            <div className="skill">UI/UX Design</div>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-title">
          <h2 className="section-title" id="projects-title">Featured Work</h2>
          <Projects projects={CONFIG.projects} onOpen={openProject} />
        </section>

        <section id="contact" aria-labelledby="contact-title">
          <h2 className="section-title" id="contact-title">Let's Connect</h2>
          <div className="cards">
            <div className="card tilt">
              <div className="title">Send a Message</div>
              <form id="contactForm" action="https://formspree.io/f/xvgbjbjq" method="POST" style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const fd = new FormData(form);
                  const obj = {};
                  fd.forEach((v,k)=> obj[k]=v);
                  try {
                    const res = await fetch(form.action, { method: form.method, headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(obj) });
                    if (res.ok) {
                      showToast("Message sent successfully", "success");
                      form.reset();
                    } else showToast("Failed to send message", "error");
                  } catch (err) {
                    showToast("Failed to send message", "error");
                  }
                }}>
                <div className="form-row">
                  <div className="form-group">
                    <input name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <input name="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" name="subject" placeholder="Enter a subject" required />
                </div>
                <div className="form-group">
                  <textarea name="message" rows="4" placeholder="Tell me about your project or inquiry..." required></textarea>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  <button className="cta" type="submit">Send Message</button>
                  <button className="cta" type="button" onClick={() => { navigator.clipboard?.writeText(CONFIG.email); showToast("Email copied", "success"); }} style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}>Copy Email</button>
                </div>
              </form>
            </div>
            <div className="card tilt">
              <div className="title">Connect & Collaborate</div>
              <div className="desc" style={{ marginBottom: 24, textAlign: "justify" }}>
                ✨ I’m always excited to collaborate on innovative projects that push boundaries and make a real impact — whether it’s building clever AI-powered tools, designing nifty automation systems, developing full-stack applications, or experimenting with quirky creative tech ideas. Feel free to reach out via email or connect on social media.
              </div>
            </div>
          </div>
        </section>
      </main>

      <button id="back-to-top" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>&uarr;</button>

      <footer>
        <div className="footer-bottom">
          <p>© <span id="copyright-year">2025</span> Avdesh Jadon. All Rights Reserved.</p>

          {/* social icons in footer */}
          <div className="footer-socials" aria-label="Social links">
            {CONFIG.socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                {/* svg stored as string in CONFIG; inject as HTML */
                }
                <span dangerouslySetInnerHTML={{ __html: s.icon }} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <Modal project={modalProject} onClose={closeProject} />
      <WaterFlow />
    </>
  );
}
