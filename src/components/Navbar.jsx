import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { TbDownload } from "react-icons/tb"
import { HiOutlineMenu, HiX } from "react-icons/hi"

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Skills", path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [hasShadow, setHasShadow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const ResumeBtn = ({ className = "" }) => (
    <motion.a href="/resume/resume.pdf" download="Avdesh_Jadon_Resume.pdf" className={`relative inline-block px-4 py-2 font-medium group ${className}`}>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black" />
      <span className="relative text-black group-hover:text-white flex items-center gap-x-3">Resume <TbDownload size={16} /></span>
    </motion.a>
  )

  return (
    <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className={`fixed lg:px-28 px-5 top-0 left-0 w-full z-50 transition-all duration-500 ${hasShadow ? "glassmorphism shadow-sm border-b border-black/5 py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className="text-2xl font-bold cursor-pointer tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Avdesh<span className="text-[#71717A]">Jadon</span>
          </Link>
        </motion.div>
        <ul className="hidden lg:flex items-center gap-x-7 font-normal">
          {navLinks.map(({ label, path }) => (
            <motion.li key={path} className="group" whileHover={{ y: -2 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
              <Link
                to={path}
                className={`transition-colors ${location.pathname.startsWith(path) && path !== "/" && path !== "/contact" ? "text-black font-medium" : location.pathname === path ? "text-black font-medium" : "text-black/70 hover:text-black"}`}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>
        <ResumeBtn className="hidden lg:inline-block" />
        <button className="lg:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <HiX /> : <HiOutlineMenu />}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="lg:hidden absolute top-full left-0 w-full glassmorphism shadow-md border-b border-black/5 p-5">
            <ul className="flex flex-col items-center gap-y-6 font-normal">
              {navLinks.map(({ label, path }) => (
                <motion.li key={path} className="w-full text-center" whileHover={{ scale: 1.05 }}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition-colors ${location.pathname.startsWith(path) && path !== "/" && path !== "/contact" ? "text-black font-medium" : location.pathname === path ? "text-black font-medium" : "text-black/80"}`}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2"><ResumeBtn /></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
