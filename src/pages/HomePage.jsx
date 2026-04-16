import SEOHead from "../components/SEOHead"
import Home from "../components/Home"
import Skills from "../components/Skills"
import About from "../components/About"
import Projects from "../components/Projects"
import Contact from "../components/Contact"
import DinoGame from "../components/DinoGame"

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Avdesh Jadon | Software Tester & Full Stack Developer | B.Tech CSE NIT Jalandhar"
        description="Official portfolio of Avdesh Jadon — Software Tester & Full Stack Developer from NIT Jalandhar. Explore my projects in React, Node.js, Python. Open source contributor. Available for internships, freelance, and full-time opportunities. Contact me today."
        keywords="Avdesh Jadon, avdeshjadon, Avdesh Jadon portfolio, Avdesh Jadon NIT Jalandhar, Avdesh Jadon GitHub, Avdesh Jadon LinkedIn, Software Tester, Full Stack Developer, QA Engineer, SDET, MERN Stack, React Developer, Node.js Developer, JavaScript, Test Automation, Open Source, NIT Jalandhar, B.Tech CSE, Web Developer India, Avdesh Jadon resume, Avdesh Jadon developer, Avdesh Jadon projects, hire Avdesh Jadon"
        canonicalPath="/"
        ogType="profile"
      />
      <Home />
      <Skills />
      <About />
      <Projects />
      <Contact />
      <DinoGame />
    </>
  )
}
