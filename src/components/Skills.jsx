import { motion } from "framer-motion"
import { FaJs, FaReact, FaNodeJs, FaPython, FaDatabase, FaJava, FaGitAlt, FaGithub, FaDocker } from "react-icons/fa"
import { BiLogoPostgresql } from "react-icons/bi"
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri"
import { SiC, SiCplusplus, SiJunit5, SiApachejmeter } from "react-icons/si"

const skills = [
  { name: "C", icon: <SiC size={40} /> },
  { name: "C++", icon: <SiCplusplus size={40} /> },
  { name: "Java", icon: <FaJava size={40} /> },
  { name: "Python", icon: <FaPython size={40} /> },
  { name: "JavaScript", icon: <FaJs size={40} /> },
  { name: "React", icon: <FaReact size={40} /> },
  { name: "Next.js", icon: <RiNextjsFill size={40} /> },
  { name: "Tailwind", icon: <RiTailwindCssFill size={40} /> },
  { name: "Node.js", icon: <FaNodeJs size={40} /> },
  { name: "SQL", icon: <FaDatabase size={40} /> },
  { name: "PostgreSQL", icon: <BiLogoPostgresql size={40} /> },
  { name: "MongoDB", icon: <FaDatabase size={40} /> },
  { name: "JUnit", icon: <SiJunit5 size={40} /> },
  { name: "JMeter", icon: <SiApachejmeter size={40} /> },
  { name: "Git", icon: <FaGitAlt size={40} /> },
  { name: "GitHub", icon: <FaGithub size={40} /> },
  { name: "Docker", icon: <FaDocker size={40} /> },
]

export default function Skills() {
  return (
    <div className="mt-3 lg:mt-16 pb-10 lg:pb-16 px-5 lg:px-16 mx-auto max-w-[1400px]" id="skills">
      <motion.h2 className="text-2xl lg:text-3xl text-center font-light" initial={{ opacity: 0, y: -15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} viewport={{ once: true }}>
        My <span className="font-medium">Skills</span>
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6 text-sm lg:text-base font-normal mt-7 lg:mt-16 justify-center place-items-center">
        {skills.map((skill, i) => (
          <motion.div key={skill.name} className="border hover:bg-black hover:text-white transition-all duration-300 cursor-pointer border-black rounded p-3 h-28 w-28 lg:h-36 lg:w-36 flex flex-col items-center justify-center gap-3 lg:gap-4" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 }} viewport={{ once: true, margin: "-30px" }}>
            {skill.icon}
            <p>{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
