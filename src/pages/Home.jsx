import { motion } from "framer-motion"
import { IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5"
import { BiLogoGmail } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { TypeAnimation } from "react-type-animation"

const socials = [
  { Icon: BiLogoGmail, link: "mailto:theavdeshjadon@gmail.com" },
  { Icon: IoLogoLinkedin, link: "https://linkedin.com/in/avdeshjadon" },
  { Icon: IoLogoTwitter, link: "https://x.com/AvdeshJado26477" },
  { Icon: BsGithub, link: "https://github.com/avdeshjadon" }
]

export default function Home() {
  return (
    <div className="mt-20" id="home">
      <div className="flex justify-between py-10 items-center px-5 lg:px-28 lg:flex-row flex-col-reverse">
        <motion.div className="lg:w-[45%]" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <div className="text-2xl lg:text-5xl flex flex-col mt-8 lg:mt-0 gap-2 lg:gap-5 text-nowrap">
            <h2>Hello, <TypeAnimation sequence={['I am Avdesh Jadon', 1000, 'Software Tester And Developer', 1000]} speed={10} style={{ fontWeight: 600 }} repeat={Infinity} /></h2>
            <h2><span className="font-extrabold">Software</span> <span className="text-white font-extrabold" style={{ WebkitTextStroke: "1px black" }}>Developer</span></h2>
            <h2>Based In <span className="font-extrabold">India.</span></h2>
          </div>
          <p className="text-[#71717A] text-sm lg:text-base mt-5">Passionate about technology, I specialize in Web Development and Web Designing. I'm focused on building innovative solutions and continuously expanding my skills.</p>
          <div className="flex items-center gap-x-5 mt-10 lg:mt-14">
            {socials.map(({ Icon, link }, i) => (
              <motion.a key={i} href={link} target="_blank" rel="noopener noreferrer" className="bg-white p-2 lg:p-3 rounded border-2 border-black" whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }} whileTap={{ scale: 0.9 }}>
                <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
        <motion.div className="lg:w-[55%] w-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <img className="h-full w-full" src="/assets/hero-vector.svg" alt="Hero" />
        </motion.div>
      </div>
    </div>
  )
}
