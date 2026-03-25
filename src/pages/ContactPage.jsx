import SEOHead from "../components/SEOHead"
import Contact from "../components/Contact"

export default function ContactPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="Contact Avdesh Jadon | Hire a Software Tester & Full Stack Developer"
        description="Get in touch with Avdesh Jadon for software testing, full stack development, freelance projects, and open source collaboration. Available for full-time, internship, remote, and freelance opportunities."
        keywords="Contact Avdesh Jadon, Hire Software Tester, Hire Full Stack Developer, Freelance Developer India, Software Testing Services, Web Development Services, QA Engineer Contact, React Developer Hire, Node.js Developer"
        canonicalPath="/contact"
      />
      <Contact />
    </div>
  )
}
