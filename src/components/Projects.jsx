import React from "react";

export default function Projects({ projects = {}, onOpen }) {
  return (
    <div className="cards" aria-live="polite">
      {Object.entries(projects).map(([key, p]) => (
        <div key={key} className="project-card tilt" data-project={key} onClick={() => onOpen(key)} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==="Enter") onOpen(key); }}>
          <div className="card-content">
            <div className="title">{p.title}</div>
            <div className="desc">{p.desc}</div>
            <button className="cta view-details-btn plain" onClick={(e)=>{e.stopPropagation(); onOpen(key);}}>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}
