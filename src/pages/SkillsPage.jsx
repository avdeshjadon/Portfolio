import SEOHead from "../components/SEOHead"
import Skills from "../components/Skills"

export default function SkillsPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="Skills of Avdesh Jadon | React, Node.js, Python, Java, Testing, DevOps"
        description="Technical skills of Avdesh Jadon — C, C++, Java, Python, JavaScript, React, Next.js, Node.js, Tailwind CSS, SQL, PostgreSQL, MongoDB, JUnit, JMeter, Git, GitHub, Docker. Full Stack Developer and Software Tester at NIT Jalandhar."
        keywords="Avdesh Jadon skills, Avdesh Jadon tech stack, React Developer, Node.js Developer, JavaScript, Python, Java, C++, MongoDB, PostgreSQL, Docker, Git, JUnit, JMeter, Full Stack Skills, Software Testing Skills, avdeshjadon"
        canonicalPath="/skills"
      />
      <Skills />
    </div>
  )
}
