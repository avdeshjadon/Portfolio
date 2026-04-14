import { Helmet } from "react-helmet-async"

const BASE_URL = "https://avdeshjadon.dpdns.org"
const PROFILE_IMAGE = "https://avdeshjadon.dpdns.org/assets/avdeshjadon.jpeg"
const SITE_NAME = "Avdesh Jadon - Software Tester & Full Stack Developer"

export default function SEOHead({
  title = "Avdesh Jadon | Software Tester & Full Stack Developer | B.Tech CSE NIT Jalandhar | Open Source Contributor",
  description = "Avdesh Jadon - Software Tester and Full Stack Developer from Dr B R Ambedkar National Institute of Technology (NIT Jalandhar), B.Tech CSE. Open Source Contributor specializing in test automation, manual testing, QA engineering, MERN stack development, React.js, Node.js, and JavaScript.",
  keywords = "Avdesh Jadon, Software Tester, QA Engineer, SDET, Full Stack Developer, MERN Stack Developer, JavaScript Developer, React.js Developer, Node.js Developer, Test Automation Engineer",
  canonicalPath = "/",
  ogType = "website",
  image = PROFILE_IMAGE,
  article = null,
}) {
  const canonicalUrl = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Avdesh Jadon - Software Tester and Full Stack Developer" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@AvdeshJado26477" />
      <meta name="twitter:creator" content="@AvdeshJado26477" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Avdesh Jadon - Software Tester and Full Stack Developer" />

      {/* LinkedIn specific */}
      <meta property="article:author" content="https://linkedin.com/in/avdeshjadon" />

      {/* Article metadata for blog posts */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Per-page JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "url": canonicalUrl,
          "inLanguage": "en",
          "isPartOf": {
            "@type": "WebSite",
            "name": SITE_NAME,
            "url": BASE_URL
          },
          "about": {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            "name": "Avdesh Jadon",
            "url": BASE_URL,
            "sameAs": [
              "https://github.com/avdeshjadon",
              "https://linkedin.com/in/avdeshjadon",
              "https://x.com/AvdeshJado26477"
            ]
          }
        })}
      </script>
    </Helmet>
  )
}
