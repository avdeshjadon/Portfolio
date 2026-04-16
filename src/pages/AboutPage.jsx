import SEOHead from "../components/SEOHead"
import About from "../components/About"

export default function AboutPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="About Avdesh Jadon | Software Tester & Full Stack Developer | NIT Jalandhar"
        description="Learn about Avdesh Jadon — a dedicated Software Tester and Full-Stack Developer at NIT Jalandhar. Specializing in test automation, manual testing, MERN stack development, React.js, Node.js. Passionate about quality assurance, building robust web applications, and open source."
        keywords="About Avdesh Jadon, Avdesh Jadon biography, Avdesh Jadon NIT Jalandhar, Avdesh Jadon background, Software Tester, Full Stack Developer, QA Engineer, B.Tech CSE, Test Automation, MERN Stack, Open Source Contributor, avdeshjadon"
        canonicalPath="/about"
      />
      <About />
    </div>
  )
}
