import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { TbExternalLink, TbX } from "react-icons/tb";
import { BsGithub } from "react-icons/bs";

const projects = [
  {
    id: 1,
    title: "QA Dashboard",
    category: "Analytics",
    description: "A clean dashboard template for tracking test runs, pass rate, and bug trends with real-time analytics.",
    features: ["Run analytics", "Bug trends", "Release readiness", "Team metrics"],
    tech: ["React", "Chart.js", "Tailwind"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "E-Commerce UI",
    category: "Web App",
    description: "Modern storefront with product listing, smart filters, and seamless checkout flow.",
    features: ["Product grid", "Cart flow", "Mobile-first", "Payment ready"],
    tech: ["React", "Redux", "Stripe"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "Bug Tracker",
    category: "Productivity",
    description: "Lightweight issue tracker with kanban states, priority levels, and team assignments.",
    features: ["Kanban board", "Priority tags", "Assignees", "Sprint view"],
    tech: ["React", "DnD Kit", "Zustand"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 4,
    title: "Portfolio Template",
    category: "Design",
    description: "Minimal portfolio with smooth animations, clean typography, and blazing fast performance.",
    features: ["Clean layout", "Smooth motion", "Fast load", "SEO ready"],
    tech: ["Vite", "Tailwind", "Framer"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 5,
    title: "API Status Page",
    category: "DevOps",
    description: "Status page showing uptime metrics, incident history, and service health overview.",
    features: ["Uptime graph", "Incidents", "Services", "Alerts"],
    tech: ["React", "WebSocket", "D3.js"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 6,
    title: "Test Case Library",
    category: "QA Tools",
    description: "Organize test suites, test cases, and execution notes with powerful search and filters.",
    features: ["Test suites", "Cases", "Notes", "Reports"],
    tech: ["React", "Markdown", "Search"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

const ProjectCard = ({ project, index, onSelect }) => (
  <motion.div
    className="relative flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[380px] cursor-pointer group"
    onClick={() => onSelect(project)}
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="relative h-full bg-white rounded-2xl border border-black/10 overflow-hidden p-5 sm:p-6">
      {/* Background number */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[120px] sm:text-[140px] font-black text-black/[0.03] leading-none select-none pointer-events-none">
        {String(project.id).padStart(2, "0")}
      </div>

      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/40">
            {project.category}
          </span>
          <span className="text-xs font-mono text-black/20">
            {String(project.id).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-black mt-3 leading-tight">
          {project.title}
        </h3>

        <p className="text-black/50 text-sm leading-relaxed mt-3 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] font-medium bg-black/[0.04] rounded-md text-black/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-black/40 group-hover:text-black transition-colors text-sm">
            <span>View Details</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full bg-black text-white"
            >
              <TbExternalLink className="w-3.5 h-3.5" />
            </motion.a>
            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full border border-black/20 text-black/50 hover:bg-black hover:text-white transition-colors"
            >
              <BsGithub className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black hover:text-white transition-colors"
        >
          <TbX className="w-4 h-4" />
        </button>

        <div className="p-6">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/40">
            {project.category}
          </span>
          <h2 className="text-2xl font-bold text-black mt-2 mb-3">{project.title}</h2>
          <p className="text-black/50 text-sm leading-relaxed mb-6">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/40 mb-3">
              Features
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2 p-2.5 rounded-lg bg-black/[0.02]">
                  <div className="w-1 h-1 rounded-full bg-black/30" />
                  <span className="text-xs text-black/60">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/40 mb-3">
              Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 text-xs font-medium bg-black text-white rounded-md">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white text-sm font-semibold"
            >
              <TbExternalLink className="w-4 h-4" />
              Live
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-black text-black text-sm font-semibold hover:bg-black hover:text-white transition-colors"
            >
              <BsGithub className="w-4 h-4" />
              Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Calculate how much horizontal scroll is needed
  useEffect(() => {
    const calculateRange = () => {
      if (cardsRef.current) {
        const scrollWidth = cardsRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Add padding for last card visibility
        setScrollRange(Math.max(0, scrollWidth - viewportWidth + 100));
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(calculateRange, 100);
    window.addEventListener("resize", calculateRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateRange);
    };
  }, []);

  // Track scroll progress within this section
  // offset: start start = when section top hits viewport top (progress = 0)
  // offset: end end = when section bottom hits viewport bottom (progress = 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for horizontal movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform vertical scroll to horizontal movement
  // Start from 0 (showing first card) and move left (negative) to show more cards
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  // Progress indicator position
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const circlePosition = useTransform(smoothProgress, (v) => `calc(${v * 100}% - ${v * 16}px)`);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <>
      {/* 
        Container height = 100vh (visible) + extra scroll space for horizontal cards
        The extra space is calculated based on scroll range needed
      */}
      <section
        ref={containerRef}
        className="relative bg-[#FAFAFA]"
        id="projects"
        style={{ height: `${100 + Math.ceil(scrollRange / 2)}px` }}
      >
        {/* Sticky wrapper - stays fixed while scrolling through the section */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header - Fixed at top */}
            <div className="flex-shrink-0 px-5 lg:px-28 pt-24 lg:pt-28 pb-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-black/40 block mb-2">
                    Selected Work
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-black">Projects</h2>
                </div>
                <p className="text-black/40 text-sm max-w-xs">
                  Scroll to explore my recent work and experiments.
                </p>
              </div>

              {/* Progress bar with circle */}
              <div className="max-w-full">
                <div className="flex justify-between text-[10px] font-mono text-black/30 mb-2">
                  <span>01</span>
                  <span>{String(projects.length).padStart(2, "0")}</span>
                </div>
                <div className="relative h-[2px] bg-black/10 rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-black rounded-full"
                    style={{ width: progressWidth }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full shadow-sm"
                    style={{ left: circlePosition }}
                  />
                </div>
              </div>
            </div>

            {/* Cards container - Horizontally scrolling */}
            <div className="flex-1 flex items-center overflow-hidden">
              <motion.div
                ref={cardsRef}
                className="flex items-center gap-5 lg:gap-6 pl-5 lg:pl-28 pr-[50vw]"
                style={{ x }}
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onSelect={setSelectedProject}
                  />
                ))}

                {/* End card - GitHub link */}
                <div className="flex-shrink-0 w-[200px] flex items-center justify-center pr-10">
                  <a
                    href="https://github.com/avdeshjadon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 text-black/30 hover:text-black transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <BsGithub className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-center">
                      More on
                      <br />
                      GitHub
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.div
              className="flex-shrink-0 pb-8 flex justify-center"
              style={{
                opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [1, 0.5, 0.5, 0]),
              }}
            >
              <div className="flex flex-col items-center gap-1 text-black/20">
                <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
