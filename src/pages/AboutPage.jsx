import SEOHead from "../components/SEOHead"
import About from "../components/About"

export default function AboutPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="About Avdesh Jadon | Software Tester & Full Stack Developer | B.Tech CSE NIT Jalandhar"
        description="Learn about Avdesh Jadon - a dedicated Software Tester and Full-Stack Developer specializing in test automation, manual testing, MERN stack development. B.Tech CSE student at Dr B R Ambedkar National Institute of Technology (NIT Jalandhar), passionate about quality assurance and building robust web applications."
        keywords="About Avdesh Jadon, Software Tester Background, Full Stack Developer Story, QA Engineer, NIT Jalandhar Student Developer, Test Automation, MERN Stack, Open Source Contributor, Quality Assurance, Web Development"
        canonicalPath="/about"
      />
      <About />
    </div>
  )
}
