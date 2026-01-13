import { motion } from "framer-motion"
import { FaJs, FaReact, FaNodeJs, FaPython, FaDatabase, FaJava } from "react-icons/fa"
import { BiLogoPostgresql } from "react-icons/bi"
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri"
import { CgFigma } from "react-icons/cg"

const skills = [
  { name: "JavaScript", icon: <FaJs size={50} /> },
  { name: "React", icon: <FaReact size={50} /> },
  { name: "Node.js", icon: <FaNodeJs size={50} /> },
  { name: "Python", icon: <FaPython size={50} /> },
  { name: "MongoDB", icon: <FaDatabase size={50} /> },
  { name: "Java", icon: <FaJava size={50} /> },
  { name: "Postgresql", icon: <BiLogoPostgresql size={50} /> },
  { name: "Next.js", icon: <RiNextjsFill size={50} /> },
  { name: "Tailwind", icon: <RiTailwindCssFill size={50} /> },
  { name: "Figma", icon: <CgFigma size={50} /> },
]

export default function Skills() {
  return (
    <div className="mt-3 lg:mt-16 pb-10 lg:pb-16 px-5 lg:px-28" id="skills">
      <motion.h2 className="text-2xl lg:text-4xl text-center" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        My <span className="font-extrabold">Skills</span>
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 text-lg font-bold mt-7 lg:mt-16 place-items-center gap-y-6 lg:gap-y-12">
        {skills.map((skill, i) => (
          <motion.div key={skill.name} className="bg-white border-2 hover:bg-black hover:text-white transition-all cursor-pointer border-black rounded p-3 h-36 w-36 lg:h-44 lg:w-44 flex flex-col items-center justify-center gap-5" initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
            {skill.icon}
            <p>{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
