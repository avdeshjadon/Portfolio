import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TbDownload } from "react-icons/tb"
import { HiOutlineMenu, HiX } from "react-icons/hi"

const sections = ["about", "skills", "projects", "contact"]

export default function Navbar() {
  const [hasShadow, setHasShadow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setIsOpen(false)
  }

  const ResumeBtn = ({ className = "" }) => (
    <motion.a href="/resume/resume.pdf" download="Avdesh_Jadon_Resume.pdf" className={`relative inline-block px-4 py-2 font-medium group ${className}`}>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black" />
      <span className="relative text-black group-hover:text-white flex items-center gap-x-3">Resume <TbDownload size={16} /></span>
    </motion.a>
  )

  return (
    <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={`fixed lg:px-28 px-5 top-0 left-0 w-full z-50 bg-white p-5 transition-shadow ${hasShadow ? "shadow-md" : ""}`}>
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1 whileHover={{ scale: 1.1 }} onClick={() => scrollTo("home")} className="text-2xl font-bold cursor-pointer tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Avdesh<span className="text-[#71717A]">Jadon</span>
        </motion.h1>
        <ul className="hidden lg:flex items-center gap-x-7 font-semibold">
          {sections.map((s) => (
            <motion.li key={s} className="group" whileHover={{ scale: 1.1 }}>
              <button onClick={() => scrollTo(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
              <span className="w-0 transition-all duration-300 group-hover:w-full h-[2px] bg-black flex" />
            </motion.li>
          ))}
        </ul>
        <ResumeBtn className="hidden lg:inline-block" />
        <button className="lg:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <HiX /> : <HiOutlineMenu />}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.3 }} className="lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow">
            <button className="absolute top-5 right-5 text-2xl" onClick={() => setIsOpen(false)}><HiX /></button>
            <ul className="flex flex-col items-start ml-16 mt-28 gap-y-6 font-semibold">
              {sections.map((s) => (
                <motion.li key={s} className="border-b" whileHover={{ scale: 1.1 }}>
                  <button onClick={() => scrollTo(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
                </motion.li>
              ))}
              <ResumeBtn />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
