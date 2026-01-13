import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { TbExternalLink, TbX } from "react-icons/tb"
import { BsGithub } from "react-icons/bs"

const projects = [
  { id: 1, title: "QA Dashboard", category: "Analytics", description: "Dashboard for tracking test runs and bug trends.", features: ["Run analytics", "Bug trends", "Release readiness", "Team metrics"], tech: ["React", "Chart.js", "Tailwind"], liveUrl: "#", codeUrl: "#" },
  { id: 2, title: "E-Commerce UI", category: "Web App", description: "Modern storefront with product listing and checkout.", features: ["Product grid", "Cart flow", "Mobile-first", "Payment ready"], tech: ["React", "Redux", "Stripe"], liveUrl: "#", codeUrl: "#" },
  { id: 3, title: "Bug Tracker", category: "Productivity", description: "Lightweight issue tracker with kanban board.", features: ["Kanban board", "Priority tags", "Assignees", "Sprint view"], tech: ["React", "DnD Kit", "Zustand"], liveUrl: "#", codeUrl: "#" },
  { id: 4, title: "Portfolio Template", category: "Design", description: "Minimal portfolio with smooth animations.", features: ["Clean layout", "Smooth motion", "Fast load", "SEO ready"], tech: ["Vite", "Tailwind", "Framer"], liveUrl: "#", codeUrl: "#" },
  { id: 5, title: "API Status Page", category: "DevOps", description: "Status page showing uptime and incidents.", features: ["Uptime graph", "Incidents", "Services", "Alerts"], tech: ["React", "WebSocket", "D3.js"], liveUrl: "#", codeUrl: "#" },
  { id: 6, title: "Test Case Library", category: "QA Tools", description: "Organize test suites with powerful search.", features: ["Test suites", "Cases", "Notes", "Reports"], tech: ["React", "Markdown", "Search"], liveUrl: "#", codeUrl: "#" },
]

const Card = ({ project, onSelect }) => (
  <motion.div className="flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[380px] cursor-pointer group" onClick={() => onSelect(project)} whileHover={{ y: -4 }}>
    <div className="h-full bg-white rounded-2xl border border-black/10 p-5 sm:p-6 relative">
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[120px] font-black text-black/[0.03] select-none">{String(project.id).padStart(2, "0")}</div>
      <div className="relative">
        <div className="flex justify-between"><span className="text-[10px] font-semibold tracking-widest uppercase text-black/40">{project.category}</span><span className="text-xs font-mono text-black/20">{String(project.id).padStart(2, "0")}</span></div>
        <h3 className="text-xl sm:text-2xl font-bold mt-3">{project.title}</h3>
        <p className="text-black/50 text-sm mt-3 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">{project.tech.map(t => <span key={t} className="px-2.5 py-1 text-[11px] bg-black/[0.04] rounded-md text-black/60">{t}</span>)}</div>
        <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center">
          <span className="text-black/40 group-hover:text-black text-sm">View Details →</span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100">
            <a href={project.liveUrl} onClick={e => e.stopPropagation()} className="p-2 rounded-full bg-black text-white"><TbExternalLink size={14} /></a>
            <a href={project.codeUrl} onClick={e => e.stopPropagation()} className="p-2 rounded-full border border-black/20 hover:bg-black hover:text-white"><BsGithub size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

const Modal = ({ project, onClose }) => project && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-xl" onClick={onClose}>
    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 relative" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black hover:text-white"><TbX size={16} /></button>
      <span className="text-[10px] font-semibold tracking-widest uppercase text-black/40">{project.category}</span>
      <h2 className="text-2xl font-bold mt-2 mb-3">{project.title}</h2>
      <p className="text-black/50 text-sm mb-6">{project.description}</p>
      <h4 className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-3">Features</h4>
      <div className="grid grid-cols-2 gap-2 mb-6">{project.features.map(f => <div key={f} className="flex items-center gap-2 p-2.5 rounded-lg bg-black/[0.02]"><div className="w-1 h-1 rounded-full bg-black/30" /><span className="text-xs text-black/60">{f}</span></div>)}</div>
      <h4 className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-3">Stack</h4>
      <div className="flex flex-wrap gap-2 mb-6">{project.tech.map(t => <span key={t} className="px-3 py-1.5 text-xs bg-black text-white rounded-md">{t}</span>)}</div>
      <div className="flex gap-3">
        <a href={project.liveUrl} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white text-sm font-semibold"><TbExternalLink size={16} />Live</a>
        <a href={project.codeUrl} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-black text-sm font-semibold hover:bg-black hover:text-white"><BsGithub size={16} />Code</a>
      </div>
    </motion.div>
  </motion.div>
)

export default function Projects() {
  const containerRef = useRef(null), cardsRef = useRef(null)
  const [selected, setSelected] = useState(null), [range, setRange] = useState(0)

  useEffect(() => {
    const calc = () => cardsRef.current && setRange(Math.max(0, cardsRef.current.scrollWidth - window.innerWidth + 100))
    setTimeout(calc, 100)
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const x = useTransform(smooth, [0, 1], [0, -range])

  useEffect(() => { document.body.style.overflow = selected ? "hidden" : "" }, [selected])

  return (
    <>
      <section ref={containerRef} className="relative bg-[#FAFAFA]" id="projects" style={{ height: `${100 + Math.ceil(range / 3)}px` }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">
          <div className="px-5 lg:px-28 pt-24 lg:pt-28 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div><span className="text-[10px] font-semibold tracking-widest uppercase text-black/40 block mb-2">Selected Work</span><h2 className="text-3xl lg:text-5xl font-bold">Projects</h2></div>
              <p className="text-black/40 text-sm max-w-xs">Scroll to explore my work.</p>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-black/30 mb-2"><span>01</span><span>{String(projects.length).padStart(2, "0")}</span></div>
            <div className="relative h-[2px] bg-black/10 rounded-full"><motion.div className="absolute h-full bg-black rounded-full" style={{ width: useTransform(smooth, [0, 1], ["0%", "100%"]) }} /></div>
          </div>
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div ref={cardsRef} className="flex gap-5 lg:gap-6 pl-5 lg:pl-28 pr-[50vw]" style={{ x }}>
              {projects.map(p => <Card key={p.id} project={p} onSelect={setSelected} />)}
              <a href="https://github.com/avdeshjadon" target="_blank" className="flex-shrink-0 w-[200px] flex flex-col items-center justify-center gap-3 text-black/30 hover:text-black group">
                <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center group-hover:bg-black group-hover:text-white"><BsGithub size={24} /></div>
                <span className="text-xs text-center">More on<br />GitHub</span>
              </a>
            </motion.div>
          </div>
          <div className="pb-8 flex justify-center text-black/20"><span className="text-[9px] tracking-widest uppercase">Scroll ↓</span></div>
        </div>
      </section>
      <AnimatePresence>{selected && <Modal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  )
}
