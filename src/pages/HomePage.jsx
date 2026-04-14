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
        title="Avdesh Jadon | Software Tester & Full Stack Developer | B.Tech CSE NIT Jalandhar | Open Source Contributor"
        description="Avdesh - Software Tester and Full Stack Developer from Dr B R Ambedkar National Institute of Technology (NIT Jalandhar), B.Tech CSE. Open Source Contributor specializing in test automation, manual testing, QA engineering, MERN stack development, React.js, Node.js, and JavaScript. Student developer passionate about building quality software and contributing to open source communities."
        keywords="Avdesh Jadon, Software Tester, QA Engineer, SDET, Full Stack Developer, MERN Stack Developer, JavaScript Developer, React.js Developer, Node.js Developer, Test Automation Engineer, Selenium, Cypress, Jest, TestNG, Manual Testing, Automation Testing, API Testing, Postman, MongoDB, Express.js, Git, GitHub, CI/CD, Jenkins, Docker, AWS, Agile Testing, Software Quality Assurance, NIT Jalandhar Student, B.Tech CSE"
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
