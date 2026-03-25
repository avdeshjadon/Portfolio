import SEOHead from "../components/SEOHead"
import Skills from "../components/Skills"

export default function SkillsPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="Skills of Avdesh Jadon | Programming Languages, Frameworks & Tools"
        description="Technical skills of Avdesh Jadon - C, C++, Java, Python, JavaScript, React, Next.js, Node.js, Tailwind CSS, SQL, PostgreSQL, MongoDB, JUnit, JMeter, Git, GitHub, Docker. Full Stack Developer and Software Tester."
        keywords="Avdesh Jadon Skills, Programming Languages, React Developer, Node.js Developer, JavaScript, Python, Java, C++, MongoDB, PostgreSQL, Docker, Git, JUnit, JMeter, Full Stack Skills, Software Testing Skills"
        canonicalPath="/skills"
      />
      <Skills />
    </div>
  )
}
