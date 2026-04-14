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
    const handleScroll = () => setHasShadow(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  const ResumeBtn = ({ className = "" }) => (
    <motion.a
      href="/resume/resume.pdf"
      download="Avdesh_Jadon_Resume.pdf"
      className={`relative inline-block px-4 py-2 font-medium group ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black transition-colors duration-300 group-hover:bg-black" />
      <span className="relative text-black group-hover:text-white flex items-center gap-x-3 transition-colors duration-300">Resume <TbDownload size={16} /></span>
    </motion.a>
  )

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed lg:px-28 px-5 top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        hasShadow
          ? "glassmorphism shadow-sm border-b border-black/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            className="text-2xl font-bold cursor-pointer tracking-wider"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Avdesh<span className="text-[#71717A]">Jadon</span>
          </Link>
        </motion.div>

        <ul className="hidden lg:flex items-center gap-x-8 font-normal">
          {navLinks.map(({ label, path }) => (
            <motion.li
              key={path}
              className="relative"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                to={path}
                className={`transition-colors duration-300 ${
                  isActive(path)
                    ? "text-black font-medium"
                    : "text-black/50 hover:text-black"
                }`}
              >
                {label}
              </Link>
              {/* Active indicator dot */}
              {isActive(path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.li>
          ))}
        </ul>

        <ResumeBtn className="hidden lg:inline-block" />

        <motion.button
          className="lg:hidden text-2xl p-1"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden absolute top-full left-0 w-full glassmorphism shadow-md border-b border-black/5"
          >
            <ul className="flex flex-col items-center gap-y-5 font-normal py-6 px-5">
              {navLinks.map(({ label, path }, i) => (
                <motion.li
                  key={path}
                  className="w-full text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition-colors duration-300 ${
                      isActive(path)
                        ? "text-black font-medium"
                        : "text-black/60"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2">
                <ResumeBtn />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
