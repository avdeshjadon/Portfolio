import { motion } from "framer-motion"
import { IoLogoLinkedin, IoLogoTwitter, IoLogoInstagram } from "react-icons/io5"
import { BiLogoGmail } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { TypeAnimation } from "react-type-animation"
import ThreeBackground from "./ThreeBackground"

const socials = [
  { Icon: BiLogoGmail, link: "mailto:theavdeshjadon@gmail.com", label: "Email" },
  { Icon: IoLogoLinkedin, link: "https://linkedin.com/in/avdeshjadon", label: "LinkedIn" },
  { Icon: IoLogoTwitter, link: "https://x.com/AvdeshJado26477", label: "Twitter" },
  { Icon: IoLogoInstagram, link: "https://instagram.com/__avdeshhere", label: "Instagram" },
  { Icon: BsGithub, link: "https://github.com/avdeshjadon", label: "GitHub" },
]

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } }
}
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export default function Home() {
  return (
    <section className="mt-20 relative" id="home" aria-label="Hero section">
      <div className="hidden lg:block"><ThreeBackground /></div>
      <div className="flex justify-between py-10 items-center px-5 lg:px-28 lg:flex-row flex-col-reverse relative z-10">
        <motion.div
          className="lg:w-[45%]"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeUp} className="text-2xl lg:text-4xl flex flex-col mt-8 lg:mt-0 gap-2 lg:gap-5 text-nowrap font-light">
            <h1>Hello, <TypeAnimation sequence={['', 500, 'I am Avdesh Jadon', 2000]} speed={10} deletionSpeed={50} style={{ fontWeight: 400 }} repeat={Infinity} /></h1>
            <h2><span className="font-medium">Software</span> <span className="text-white font-medium" style={{ WebkitTextStroke: "1px black" }}>Developer</span></h2>
            <h2>Based In <span className="font-medium">India.</span></h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-[#71717A] text-sm lg:text-base mt-5 font-light leading-relaxed">Passionate about technology, I specialize in Web Development and Web Designing. I'm focused on building innovative solutions and continuously expanding my skills.</motion.p>
          <motion.div variants={fadeUp} className="flex items-center gap-x-5 mt-10 lg:mt-14">
            {socials.map(({ Icon, link, label }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={label}
                className="p-2 lg:p-3 rounded border-2 border-black transition-colors duration-300"
                whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="lg:w-[55%] w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <img className="h-full w-full" src="/assets/hero-vector.svg" alt="Avdesh Jadon - Software Developer illustration" loading="eager" />
        </motion.div>
      </div>
    </section>
  )
}
