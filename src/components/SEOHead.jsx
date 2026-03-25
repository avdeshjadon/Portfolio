import { Helmet } from "react-helmet-async"

const BASE_URL = "https://avdeshjadon.dpdns.org"
const PROFILE_IMAGE = "https://avdeshjadon.dpdns.org/assets/avdeshjadon.jpeg"

export default function SEOHead({
  title = "Avdesh Jadon | Software Tester & Full Stack Developer | B.Tech CSE NIT Jalandhar | Open Source Contributor",
  description = "Avdesh - Software Tester and Full Stack Developer from Dr B R Ambedkar National Institute of Technology (NIT Jalandhar), B.Tech CSE. Open Source Contributor specializing in test automation, manual testing, QA engineering, MERN stack development, React.js, Node.js, and JavaScript.",
  keywords = "Avdesh Jadon, Software Tester, QA Engineer, SDET, Full Stack Developer, MERN Stack Developer, JavaScript Developer, React.js Developer, Node.js Developer, Test Automation Engineer",
  canonicalPath = "/",
  ogType = "website",
  image = PROFILE_IMAGE,
}) {
  const canonicalUrl = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Avdesh Jadon - Software Tester & Full Stack Developer" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Avdesh Jadon - Software Tester and Full Stack Developer" />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@avdeshjadon" />
      <meta name="twitter:creator" content="@avdeshjadon" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Avdesh Jadon - Software Tester and Full Stack Developer" />
      <meta name="twitter:domain" content="avdeshjadon.dpdns.org" />
    </Helmet>
  )
}
