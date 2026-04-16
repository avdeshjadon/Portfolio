import SEOHead from "../components/SEOHead"
import Projects from "../components/Projects"

export default function ProjectsPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="Projects by Avdesh Jadon | Web Apps, Browser Extensions & Open Source"
        description="Explore projects by Avdesh Jadon — Practice Typing app, Jmac Visualizer, WebIn browser extension, Cookies Extractor, Panda Login. Built with React, Python, JavaScript. Open source contributions on GitHub."
        keywords="Avdesh Jadon projects, Avdesh Jadon GitHub projects, Practice Typing App, Jmac Visualizer, WebIn Extension, Cookies Extractor, Panda Login, React Projects, Python Projects, JavaScript Projects, Open Source, Browser Extensions, avdeshjadon"
        canonicalPath="/projects"
      />
      <Projects />
    </div>
  )
}
