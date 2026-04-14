import { motion } from "framer-motion";

const fadeIn = (direction = "up", delay = 0) => ({
  initial: {
    opacity: 0,
    x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    y: direction === "up" ? 25 : direction === "down" ? -25 : 0,
  },
  whileInView: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  viewport: { once: true, margin: "-60px" },
});

export default function About() {
  return (
    <section
      className="px-5 lg:px-28 py-10 lg:py-16 flex justify-between gap-8 flex-col lg:flex-row"
      id="about"
      aria-label="About me"
    >
      <motion.div className="lg:w-1/2" {...fadeIn("left")}>
        <img src="/assets/about-me.svg" alt="About Avdesh Jadon - Software Developer and Tester illustration" loading="lazy" />
      </motion.div>
      <motion.div className="lg:w-1/2" {...fadeIn("right", 0.15)}>
        <h2 className="lg:text-3xl text-2xl mt-4 lg:mt-0 font-light">
          About <span className="font-medium">Me</span>
        </h2>
        <motion.p {...fadeIn("up", 0.2)} className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-6 font-light leading-relaxed">
          I am a dedicated Software Tester and Full-Stack Developer, driven by a
          deep passion for building high-quality, reliable, and scalable web
          applications. I love bridging the gap between seamless user
          experiences and robust, bug-free software.
        </motion.p>
        <motion.p {...fadeIn("up", 0.3)} className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-4 font-light leading-relaxed">
          While my core expertise lies in Software Testing and Quality
          Assurance—ensuring every product meets the highest standards of
          performance—I am equally proficient in Full-Stack Web Development. I
          enjoy taking an idea from a blank canvas to a fully deployed,
          interactive application.
        </motion.p>
        <motion.p {...fadeIn("up", 0.4)} className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-4 font-light leading-relaxed">
          My tech journey kicked off in 2023, and I have rapidly expanded my
          skill set to encompass both sides of the software lifecycle. On the
          development front, I build responsive, cutting-edge web apps utilizing
          modern technologies like React, Next.js, and TypeScript. On the
          testing side, I employ comprehensive testing methodologies to
          guarantee flawless execution.
        </motion.p>
        <motion.p {...fadeIn("up", 0.5)} className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-4 font-light leading-relaxed">
          I believe that knowing how to break an application makes you a better
          builder, and knowing how to build one makes you a sharper tester. This
          unique dual perspective allows me to architect solutions that are not
          only beautiful but extremely resilient.
        </motion.p>
      </motion.div>
    </section>
  );
}
