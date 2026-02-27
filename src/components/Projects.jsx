import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TbExternalLink, TbX } from "react-icons/tb"
import { BsGithub } from "react-icons/bs"

const projects = [
  { 
    id: 1, 
    title: "Jmac Visualizer", 
    category: "System Tool", 
    description: "Interactive sunburst chart to visualize and clean up your Mac's filesystem.", 
    features: ["Interactive chart", "Filesystem map", "Drill-down", "1-click delete"], 
    tech: ["Python", "React", "Open Source"], 
    codeUrl: "https://github.com/avdeshjadon/JmacVisualizer" 
  },
  { 
    id: 2, 
    title: "WebIn", 
    category: "Browser Extension", 
    description: "Retro-styled draggable floating overlay for quick access to your favorite web tools.", 
    features: ["Draggable UI", "Overlay Dashboard", "Cross-site access", "Retro styling"], 
    tech: ["JavaScript", "HTML/CSS", "Extension API"], 
    codeUrl: "https://github.com/avdeshjadon/WebIn" 
  },
  { 
    id: 3, 
    title: "Cookies Extractor", 
    category: "Browser Extension", 
    description: "Extract, view, copy, and insert cookies from any website with a modern interface.", 
    features: ["Cookie extraction", "Insert cookies", "Modern UI", "Copy to clipboard"], 
    tech: ["JavaScript", "HTML", "CSS"], 
    codeUrl: "https://github.com/avdeshjadon/Cookies" 
  },
  { 
    id: 4, 
    title: "Panda Login", 
    category: "Web UI", 
    description: "Cute, responsive login & signup page with animated panda UI.", 
    features: ["Animated Panda", "Login/Signup", "Responsive", "Pure Frontend"], 
    tech: ["HTML", "CSS", "JS"], 
    liveUrl: "https://avdeshjadon.github.io/PandaLogin-SignUpPage/", 
    codeUrl: "https://github.com/avdeshjadon/PandaLogin-SignUpPage" 
  }
]

const Card = ({ project, onSelect }) => (
  <motion.div className="flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[380px] cursor-pointer group" onClick={() => onSelect(project)} whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
    <div className="h-full bg-white rounded-2xl border border-black/10 p-5 sm:p-6 relative transition-shadow duration-300 hover:shadow-lg">
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[100px] font-light text-black/[0.03] select-none">{String(project.id).padStart(2, "0")}</div>
      <div className="relative">
        <div className="flex justify-between"><span className="text-[10px] font-normal tracking-widest uppercase text-black/40">{project.category}</span><span className="text-xs font-mono text-black/20">{String(project.id).padStart(2, "0")}</span></div>
        <h3 className="text-lg sm:text-xl font-medium mt-3">{project.title}</h3>
        <p className="text-black/50 text-sm mt-3 line-clamp-3 font-light">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">{project.tech.map(t => <span key={t} className="px-2.5 py-1 text-[11px] font-light bg-black/[0.04] rounded-md text-black/60">{t}</span>)}</div>
        <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center">
          <span className="text-black/40 group-hover:text-black text-sm font-light">View Details →</span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2 rounded-full bg-black text-white"><TbExternalLink size={14} /></a>}
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2 rounded-full border border-black/20 hover:bg-black hover:text-white"><BsGithub size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

const Modal = ({ project, onClose }) => project && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm" onClick={onClose}>
    <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-lg glassmorphism rounded-2xl shadow-2xl p-6 relative border border-white/50" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black hover:text-white transition-colors"><TbX size={16} /></button>
      <span className="text-[10px] font-normal tracking-widest uppercase text-black/40">{project.category}</span>
      <h2 className="text-xl font-medium mt-2 mb-3">{project.title}</h2>
      <p className="text-black/60 text-sm mb-6 font-light">{project.description}</p>
      <h4 className="text-[10px] font-normal tracking-widest uppercase text-black/40 mb-3">Features</h4>
      <div className="grid grid-cols-2 gap-2 mb-6">{project.features.map(f => <div key={f} className="flex items-center gap-2 p-2.5 rounded-lg bg-black/[0.03]"><div className="w-1 h-1 rounded-full bg-black/30" /><span className="text-xs text-black/60 font-light">{f}</span></div>)}</div>
      <h4 className="text-[10px] font-normal tracking-widest uppercase text-black/40 mb-3">Stack</h4>
      <div className="flex flex-wrap gap-2 mb-6">{project.tech.map(t => <span key={t} className="px-3 py-1.5 text-xs bg-black/90 text-white rounded-md font-light shadow-sm">{t}</span>)}</div>
      <div className="flex gap-3">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black/90 hover:bg-black text-white text-sm font-normal shadow-md transition-all"><TbExternalLink size={16} />Live</a>}
        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-black/80 text-black/80 text-sm font-normal hover:bg-black hover:text-white hover:border-black transition-all"><BsGithub size={16} />Code</a>
      </div>
    </motion.div>
  </motion.div>
)

export default function Projects() {
  const [selected, setSelected] = useState(null)

  useEffect(() => { document.body.style.overflow = selected ? "hidden" : "" }, [selected])

  return (
    <>
      <section className="bg-[#FAFAFA] py-16 lg:py-24" id="projects">
        <div className="px-5 lg:px-28 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="text-[10px] font-normal tracking-widest uppercase text-black/40 block mb-2">Selected Work</span>
              <h2 className="text-2xl lg:text-4xl font-medium">Projects</h2>
            </div>
            <p className="text-black/40 text-sm max-w-xs font-light">Swipe to explore my work.</p>
          </div>
        </div>
        
        <div className="px-5 lg:px-28">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-5 lg:gap-6 pb-4 pr-5">
              {projects.map(p => <Card key={p.id} project={p} onSelect={setSelected} />)}
              <a href="https://github.com/avdeshjadon" target="_blank" className="flex-shrink-0 w-[150px] flex flex-col items-center justify-center gap-3 text-black/30 hover:text-black group">
                <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center group-hover:bg-black group-hover:text-white"><BsGithub size={24} /></div>
                <span className="text-xs text-center">More on<br />GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>{selected && <Modal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  )
}
