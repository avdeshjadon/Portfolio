import { motion } from "framer-motion";

const anim = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, margin: "-50px" },
};

export default function About() {
  return (
    <div
      className="px-5 lg:px-28 py-10 lg:py-16 flex justify-between gap-8 flex-col lg:flex-row"
      id="about"
    >
      <motion.div
        className="lg:w-1/2"
        {...anim}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <img src="/assets/about-me.svg" alt="About Me" />
      </motion.div>
      <motion.div
        className="lg:w-1/2"
        {...anim}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <h2 className="lg:text-3xl text-2xl mt-4 lg:mt-0 font-light">
          About <span className="font-medium">Me</span>
        </h2>
        <p className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-6 font-light">
          I am a dedicated Software Tester and Full-Stack Developer, driven by a
          deep passion for building high-quality, reliable, and scalable web
          applications. I love bridging the gap between seamless user
          experiences and robust, bug-free software.
        </p>
        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-4 font-light">
          While my core expertise lies in Software Testing and Quality
          Assurance—ensuring every product meets the highest standards of
          performance—I am equally proficient in Full-Stack Web Development. I
          enjoy taking an idea from a blank canvas to a fully deployed,
          interactive application.
        </p>
        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-4 font-light">
          My tech journey kicked off in 2023, and I have rapidly expanded my
          skill set to encompass both sides of the software lifecycle. On the
          development front, I build responsive, cutting-edge web apps utilizing
          modern technologies like React, Next.js, and TypeScript. On the
          testing side, I employ comprehensive testing methodologies to
          guarantee flawless execution.
        </p>
        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-4 font-light">
          I believe that knowing how to break an application makes you a better
          builder, and knowing how to build one makes you a sharper tester. This
          unique dual perspective allows me to architect solutions that are not
          only beautiful but extremely resilient.
        </p>
      </motion.div>
    </div>
  );
}
