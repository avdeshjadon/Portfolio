import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="px-5 lg:px-28 py-10 lg:py-16 flex justify-between gap-8 flex-col lg:flex-row" id="about">
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img src="/assets/about-me.svg" alt="About Me Illustration" />
      </motion.div>

      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl mt-4 lg:mt-0">
          About <span className="font-extrabold">Me</span>
        </h2>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-10">
          I'm a passionate **Software Tester and Developer** specializing in **Quality Assurance & Full-Stack Development**. I thrive on ensuring software reliability while building high-performing, user-friendly applications with sleek UI/UX design.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          My journey in tech started in **2015**, and since then, I've continuously evolved, taking on new challenges in both **development and testing**. Today, I build and test **cutting-edge web applications** using **Next.js, TypeScript, and modern testing frameworks**.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          Beyond coding and testing, I enjoy sharing insights on **Twitter**, engaging with the tech community, and following **industry trends**. Feel free to follow me on **Twitter** or check out my projects on **GitHub**.
        </p>
      </motion.div>
    </div>
  );
}
