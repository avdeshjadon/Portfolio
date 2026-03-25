import SEOHead from "../components/SEOHead"
import Projects from "../components/Projects"

export default function ProjectsPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="Projects by Avdesh Jadon | Web Apps, Browser Extensions & Open Source"
        description="Explore projects by Avdesh Jadon - Practice Typing app, Jmac Visualizer, WebIn browser extension, Cookies Extractor, and more. Built with React, Python, JavaScript. Open source contributions and full stack web applications."
        keywords="Avdesh Jadon Projects, Practice Typing App, Jmac Visualizer, WebIn Extension, Cookies Extractor, Panda Login, React Projects, Python Projects, JavaScript Projects, Open Source, Browser Extensions, Web Applications, GitHub Projects"
        canonicalPath="/projects"
      />
      <Projects />
    </div>
  )
}
