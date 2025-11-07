import React, { useEffect } from "react";

export default function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;
  return (
    <div className="modal-overlay open" id="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e)=>{ if (e.target.id==="project-modal") onClose(); }}>
      <div className="modal-content">
        <button className="modal-close" aria-label="Close modal" onClick={onClose}>&times;</button>
        <h2 id="modal-title" className="modal-title">{project.title}</h2>
        <p id="modal-desc" className="modal-desc">{project.desc}</p>
        <div id="modal-tech" className="modal-tech">{project.tech && project.tech.map((t,i)=> <div key={i} className="skill">{t}</div>)}</div>
        <div className="modal-links">
          {project.demo && <a id="modal-demo" href={project.demo} className="cta" target="_blank" rel="noopener noreferrer">Live Demo</a>}
          {project.repo && <a id="modal-repo" href={project.repo} className="cta" target="_blank" rel="noopener noreferrer">View Code</a>}
        </div>
      </div>
    </div>
  );
}
