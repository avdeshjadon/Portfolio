import { Helmet } from "react-helmet-async"

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL = "https://avdeshjadon.dpdns.org"
const PROFILE_IMAGE = `${BASE_URL}/assets/avdeshjadon.jpeg`
const SITE_NAME = "Avdesh Jadon - Software Tester & Full Stack Developer"
const PERSON_ID = `${BASE_URL}/#person`
const WEBSITE_ID = `${BASE_URL}/#website`
const PERSON_NAME = "Avdesh Jadon"
const PERSON_EMAIL = "theavdeshjadon@gmail.com"
const PERSON_PHONE = "+91-6201979695"
const TWITTER_HANDLE = "@AvdeshJado26477"
const LAST_MODIFIED = "2026-05-01"

// All profile images — every one needs to rank in Google Images

const ALL_IMAGES = [
  {
    url: `${BASE_URL}/assets/avdeshjadon.jpeg`,
    name: "Avdesh Jadon Official Profile Photo",
    caption: "Official profile photo of Avdesh Jadon, Software Tester and Full Stack Developer from NIT Jalandhar",
    representativeOfPage: true,
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-official-profile.jpg`,
    name: "Avdesh Jadon Official Professional Profile",
    caption: "Avdesh Jadon official professional profile — B.Tech CSE, NIT Jalandhar",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-developer-portfolio-main.jpg`,
    name: "Avdesh Jadon Developer Portfolio Main Photo",
    caption: "Avdesh Jadon main developer portfolio photo — Full Stack Developer",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-nit-jalandhar-cse.jpg`,
    name: "Avdesh Jadon NIT Jalandhar CSE",
    caption: "Avdesh Jadon, B.Tech Computer Science student at NIT Jalandhar",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-software-developer-full-stack.jpg`,
    name: "Avdesh Jadon Full Stack Software Developer",
    caption: "Avdesh Jadon as a Full Stack Software Developer — MERN Stack expert",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-qa-automation-engineer.jpg`,
    name: "Avdesh Jadon QA Automation Engineer",
    caption: "Avdesh Jadon as a QA and Test Automation Engineer — Selenium, Cypress, Jest",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-professional-headshot.jpg`,
    name: "Avdesh Jadon Professional Headshot",
    caption: "Professional headshot photo of Avdesh Jadon — Software Developer, India",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-software-tester-nitj.jpg`,
    name: "Avdesh Jadon Software Tester NIT Jalandhar",
    caption: "Avdesh Jadon as a Software Tester from NIT Jalandhar — Manual and Automated Testing",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-mern-stack-developer.jpg`,
    name: "Avdesh Jadon MERN Stack Developer",
    caption: "Avdesh Jadon as a MERN Stack Developer — MongoDB, Express, React, Node.js",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-javascript-expert.jpg`,
    name: "Avdesh Jadon JavaScript Expert Developer",
    caption: "Avdesh Jadon as a JavaScript expert and web developer",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-coding-expert.jpg`,
    name: "Avdesh Jadon Coding Expert",
    caption: "Avdesh Jadon as a coding expert and competitive programmer",
  },
  {
    url: `${BASE_URL}/assets/profiles/avdesh-jadon-web-designer-india.jpg`,
    name: "Avdesh Jadon Web Designer India",
    caption: "Avdesh Jadon as a Web Designer from India",
  },
]

// All social/platform profiles — sameAs is the backbone of Knowledge Panel

const SAME_AS = [
  "https://github.com/avdeshjadon",
  "https://linkedin.com/in/avdeshjadon",
  "https://www.linkedin.com/in/avdeshjadon",
  "https://x.com/AvdeshJado26477",
  "https://twitter.com/AvdeshJado26477",
  "https://instagram.com/__avdeshhere",
  "https://www.instagram.com/__avdeshhere",
  "https://www.geeksforgeeks.org/profile/theavdeshjadon",
  "https://www.geeksforgeeks.org/profile/thakuravdeshjadon",
  "https://dev.to/avdeshjadon",
  "https://www.hackerrank.com/avdeshjadon",
  "https://leetcode.com/avdeshjadon",
  "https://www.codechef.com/users/avdeshjadon",
  "https://codolio.com/profile/avdeshjadon",
  BASE_URL,
]

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const buildImageObject = ({ url, name, caption, representativeOfPage = false }, index) => ({
  "@type": "ImageObject",
  "@id": `${BASE_URL}/#image-${index}`,
  "url": url,
  "contentUrl": url,
  "name": name,
  "caption": caption,
  "description": caption,
  "author": { "@id": PERSON_ID },
  "creator": { "@id": PERSON_ID },
  "copyrightHolder": { "@id": PERSON_ID },
  "copyrightYear": "2026",
  "creditText": PERSON_NAME,
  "license": `${BASE_URL}/license`,
  "acquireLicensePage": `${BASE_URL}/contact`,
  "inLanguage": "en",
  ...(representativeOfPage ? { "representativeOfPage": true } : {}),
})

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

const buildPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  "name": PERSON_NAME,
  "alternateName": [
    "avdeshjadon",
    "Avdesh",
    "Thakur Avdesh Jadon",
    "Avdesh Jadon NIT Jalandhar",
    "Avdesh Jadon Developer",
    "Avdesh Jadon Tester",
    "Avdesh Jadon NITJ",
    "Avdesh Jadon CSE",
    "Avdesh Jadon Full Stack",
    "Avdesh Jadon MERN",
    "Avdesh Jadon QA",
    "Avdesh Jadon SDET",
    "Avdesh Jadon Open Source",
  ],
  "givenName": "Avdesh",
  "familyName": "Jadon",
  "additionalName": "Thakur",
  "honorificPrefix": "Mr.",
  "gender": "Male",
  "nationality": { "@type": "Country", "name": "India" },
  "description": "Avdesh Jadon is a Software Tester and Full Stack Developer from NIT Jalandhar (Dr B R Ambedkar National Institute of Technology Jalandhar). B.Tech CSE student, MERN stack expert, test automation engineer (Selenium, Cypress, Jest), and open source contributor. Available for internships, freelance, and full-time roles.",
  "url": BASE_URL,
  "email": PERSON_EMAIL,
  "telephone": PERSON_PHONE,
  "image": ALL_IMAGES.map(buildImageObject),
  "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/` },
  "sameAs": SAME_AS,
  "jobTitle": [
    "Software Tester",
    "Full Stack Developer",
    "QA Engineer",
    "SDET",
    "MERN Stack Developer",
    "Test Automation Engineer",
    "Open Source Contributor",
  ],
  "worksFor": { "@type": "Organization", "name": "Freelance / Self-Employed" },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Dr B R Ambedkar National Institute of Technology Jalandhar",
    "alternateName": ["NIT Jalandhar", "NITJ", "Dr B R Ambedkar NIT Jalandhar"],
    "url": "https://www.nitj.ac.in",
    "sameAs": [
      "https://en.wikipedia.org/wiki/Dr._B._R._Ambedkar_National_Institute_of_Technology_Jalandhar",
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jalandhar",
      "addressRegion": "Punjab",
      "addressCountry": "IN",
      "postalCode": "144027",
    },
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jalandhar",
    "addressRegion": "Punjab",
    "addressCountry": "IN",
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": PERSON_PHONE,
      "contactType": "professional",
      "email": PERSON_EMAIL,
      "availableLanguage": ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${BASE_URL}/contact`,
      "availableLanguage": ["English", "Hindi"],
    },
  ],
  "knowsAbout": [
    "Software Testing", "Manual Testing", "Test Automation",
    "Selenium WebDriver", "Cypress", "Jest", "JUnit", "JMeter",
    "Full Stack Development", "MERN Stack",
    "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js",
    "MongoDB", "Express.js", "PostgreSQL",
    "Python", "Java", "C++", "C",
    "Git", "GitHub", "Docker", "AWS",
    "API Testing", "Postman", "JIRA",
    "Quality Assurance", "Open Source", "Agile",
    "Web Design", "Software Architecture",
    "Data Structures and Algorithms", "Competitive Programming",
    "RESTful APIs", "GraphQL", "CI/CD", "DevOps",
  ],
  "knowsLanguage": [
    { "@type": "Language", "name": "English", "alternateName": "en" },
    { "@type": "Language", "name": "Hindi", "alternateName": "hi" },
  ],
  "hasOccupation": [
    {
      "@type": "Occupation",
      "name": "Software Tester",
      "description": "Experienced in manual and automated testing, test case design, bug tracking, and QA using Selenium, Cypress, Jest, JUnit, and JIRA.",
      "skills": "Test Automation, Manual Testing, Selenium, Cypress, Jest, JUnit, JIRA, API Testing, Regression Testing, JMeter, Performance Testing",
      "occupationLocation": { "@type": "Country", "name": "India" },
    },
    {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "description": "Building web applications with MERN stack, responsive design, REST APIs, and modern JavaScript frameworks.",
      "skills": "React.js, Next.js, Node.js, MongoDB, Express.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, REST APIs, GraphQL",
      "occupationLocation": { "@type": "Country", "name": "India" },
    },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software Services by Avdesh Jadon",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Software Testing & QA Automation",
          "description": "Manual testing, automated testing (Selenium, Cypress), API testing (Postman), performance testing (JMeter)",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full Stack Web Development",
          "description": "MERN stack apps with React.js, Node.js, MongoDB, Express.js, REST APIs",
        },
      },
    ],
  },
  "award": ["Open Source Contributor", "NIT Jalandhar B.Tech CSE Student"],
})

const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  "name": SITE_NAME,
  "alternateName": ["Avdesh Jadon Portfolio", "avdeshjadon", "Avdesh Jadon Official Website"],
  "url": BASE_URL,
  "description": "Official portfolio of Avdesh Jadon — Software Tester, Full Stack Developer, B.Tech CSE at NIT Jalandhar. Open Source Contributor.",
  "author": { "@id": PERSON_ID },
  "publisher": { "@id": PERSON_ID },
  "creator": { "@id": PERSON_ID },
  "inLanguage": "en",
  "copyrightYear": "2026",
  "copyrightHolder": { "@id": PERSON_ID },
  "dateCreated": "2024-01-01",
  "dateModified": LAST_MODIFIED,
  "image": buildImageObject(ALL_IMAGES[0], 0),
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/assets/favicon.svg`,
    "width": "512",
    "height": "512",
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
})

const buildWebPageSchema = ({ title, description, canonicalUrl, image, pageType, canonicalPath }) => ({
  "@context": "https://schema.org",
  "@type": pageType,
  "@id": `${canonicalUrl}#webpage`,
  "name": title,
  "description": description,
  "url": canonicalUrl,
  "inLanguage": "en",
  "dateModified": LAST_MODIFIED,
  "datePublished": "2024-01-01",
  "isPartOf": { "@type": "WebSite", "@id": WEBSITE_ID, "name": SITE_NAME, "url": BASE_URL },
  "about": { "@id": PERSON_ID },
  "author": { "@id": PERSON_ID },
  "creator": { "@id": PERSON_ID },
  "publisher": { "@id": PERSON_ID },
  "copyrightHolder": { "@id": PERSON_ID },
  "copyrightYear": "2026",
  "image": buildImageObject(ALL_IMAGES[0], 0),
  "primaryImageOfPage": buildImageObject(ALL_IMAGES[0], 0),
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Avdesh Jadon - Home", "item": BASE_URL },
      ...(canonicalPath !== "/"
        ? [{ "@type": "ListItem", "position": 2, "name": title.split("|")[0].trim(), "item": canonicalUrl }]
        : []),
    ],
  },
  "potentialAction": { "@type": "ReadAction", "target": [canonicalUrl] },
})

const buildImageGallerySchema = () => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": `${BASE_URL}/#gallery`,
  "name": "Avdesh Jadon - Official Photo Gallery",
  "description": "Official photos and images of Avdesh Jadon, Software Tester and Full Stack Developer from NIT Jalandhar",
  "url": BASE_URL,
  "author": { "@id": PERSON_ID },
  "creator": { "@id": PERSON_ID },
  "copyrightHolder": { "@id": PERSON_ID },
  "copyrightYear": "2026",
  "inLanguage": "en",
  "image": ALL_IMAGES.map(buildImageObject),
  "associatedMedia": ALL_IMAGES.map(buildImageObject),
})

const buildProfilePageSchema = ({ title, description, canonicalUrl }) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${canonicalUrl}#profilepage`,
  "name": title,
  "description": description,
  "url": canonicalUrl,
  "dateCreated": "2024-01-01",
  "dateModified": LAST_MODIFIED,
  "inLanguage": "en",
  "about": { "@id": PERSON_ID },
  "mainEntity": { "@id": PERSON_ID },
  "author": { "@id": PERSON_ID },
  "image": buildImageObject(ALL_IMAGES[0], 0),
  "isPartOf": { "@id": WEBSITE_ID },
})

const buildSocialLinksSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Avdesh Jadon - All Social & Professional Profiles",
  "description": "Complete list of all official social media and professional profiles of Avdesh Jadon",
  "author": { "@id": PERSON_ID },
  "numberOfItems": 10,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": { "@type": "WebPage", "name": "Avdesh Jadon GitHub", "url": "https://github.com/avdeshjadon", "description": "Avdesh Jadon's GitHub — open source projects and contributions" } },
    { "@type": "ListItem", "position": 2, "item": { "@type": "WebPage", "name": "Avdesh Jadon LinkedIn", "url": "https://linkedin.com/in/avdeshjadon", "description": "Avdesh Jadon's LinkedIn — professional network" } },
    { "@type": "ListItem", "position": 3, "item": { "@type": "WebPage", "name": "Avdesh Jadon Instagram", "url": "https://instagram.com/__avdeshhere", "description": "Avdesh Jadon's Instagram profile" } },
    { "@type": "ListItem", "position": 4, "item": { "@type": "WebPage", "name": "Avdesh Jadon Twitter / X", "url": "https://x.com/AvdeshJado26477", "description": "Avdesh Jadon's X (Twitter) profile" } },
    { "@type": "ListItem", "position": 5, "item": { "@type": "WebPage", "name": "Avdesh Jadon GeeksforGeeks", "url": "https://www.geeksforgeeks.org/profile/theavdeshjadon", "description": "Avdesh Jadon's GeeksforGeeks profile" } },
    { "@type": "ListItem", "position": 6, "item": { "@type": "WebPage", "name": "Avdesh Jadon LeetCode", "url": "https://leetcode.com/avdeshjadon", "description": "Avdesh Jadon's LeetCode competitive programming profile" } },
    { "@type": "ListItem", "position": 7, "item": { "@type": "WebPage", "name": "Avdesh Jadon HackerRank", "url": "https://www.hackerrank.com/avdeshjadon", "description": "Avdesh Jadon's HackerRank profile" } },
    { "@type": "ListItem", "position": 8, "item": { "@type": "WebPage", "name": "Avdesh Jadon CodeChef", "url": "https://www.codechef.com/users/avdeshjadon", "description": "Avdesh Jadon's CodeChef competitive programming profile" } },
    { "@type": "ListItem", "position": 9, "item": { "@type": "WebPage", "name": "Avdesh Jadon Dev.to", "url": "https://dev.to/avdeshjadon", "description": "Avdesh Jadon's Dev.to blog and articles" } },
    { "@type": "ListItem", "position": 10, "item": { "@type": "WebPage", "name": "Avdesh Jadon Codolio", "url": "https://codolio.com/profile/avdeshjadon", "description": "Avdesh Jadon's Codolio developer profile" } },
  ],
})

const buildArticleSchema = ({ title, description, canonicalUrl, article }) => {
  if (!article) return null
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    "headline": title,
    "description": description,
    "url": canonicalUrl,
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || LAST_MODIFIED,
    "author": { "@id": PERSON_ID },
    "creator": { "@id": PERSON_ID },
    "publisher": {
      "@id": WEBSITE_ID,
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/assets/favicon.svg` },
    },
    "image": buildImageObject(ALL_IMAGES[0], 0),
    "inLanguage": "en",
    "isPartOf": { "@id": WEBSITE_ID },
    "about": { "@id": PERSON_ID },
    "keywords": article.tags?.join(", ") || "",
    "articleSection": article.section || "Technology",
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function SEOHead({
  title = `${PERSON_NAME} | Software Tester & Full Stack Developer | B.Tech CSE NIT Jalandhar | Open Source Contributor`,
  description = `${PERSON_NAME} - Software Tester and Full Stack Developer from Dr B R Ambedkar National Institute of Technology (NIT Jalandhar), B.Tech CSE. Expert in test automation (Selenium, Cypress, Jest), MERN stack (React.js, Node.js, MongoDB), JavaScript, Python. Open Source Contributor. Available for internships, freelance, and full-time roles. Contact: ${PERSON_EMAIL}`,
  keywords = "Avdesh Jadon, avdeshjadon, Avdesh Jadon portfolio, Avdesh Jadon NIT Jalandhar, Avdesh Jadon developer, Avdesh Jadon software tester, Avdesh Jadon GitHub, Avdesh Jadon LinkedIn, Avdesh Jadon Instagram, Avdesh Jadon GeeksforGeeks, Avdesh Jadon LeetCode, Avdesh Jadon HackerRank, Avdesh Jadon CodeChef, Avdesh Jadon Codolio, Avdesh Jadon resume, Avdesh Jadon contact, Avdesh Jadon photos, Avdesh Jadon profile pic, Thakur Avdesh Jadon, Software Tester, Full Stack Developer, QA Engineer, SDET, MERN Stack Developer, React Developer, Node.js Developer, JavaScript Developer, Test Automation Engineer, NIT Jalandhar, B.Tech CSE, Open Source Contributor, Web Developer India",
  canonicalPath = "/",
  ogType = "website",
  image = PROFILE_IMAGE,
  article = null,
  pageType = "WebPage",
}) {
  const canonicalUrl = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`
  const isHomePage = canonicalPath === "/"
  const isArticle = !!article

  return (
    <Helmet>
      {/* ── TITLE ──────────────────────────────────────────────────────────── */}
      <title>{title}</title>

      {/* ── CORE META ──────────────────────────────────────────────────────── */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="subject" content={`${PERSON_NAME} - Software Tester and Full Stack Developer`} />
      <meta name="topic" content="Software Development, Software Testing, Full Stack Development, MERN Stack" />
      <meta name="classification" content="Portfolio, Technology, Software Development" />
      <meta name="category" content="Technology" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="1 days" />
      <meta name="language" content="English" />
      <meta name="content-language" content="en-IN" />

      {/* ── AUTHOR ─────────────────────────────────────────────────────────── */}
      <meta name="author" content={PERSON_NAME} />
      <meta name="creator" content={PERSON_NAME} />
      <meta name="publisher" content={PERSON_NAME} />
      <meta name="owner" content={PERSON_NAME} />
      <meta name="designer" content={PERSON_NAME} />
      <meta name="copyright" content={`© 2026 ${PERSON_NAME}. All rights reserved.`} />
      <meta name="reply-to" content={PERSON_EMAIL} />

      {/* ── ROBOTS ─────────────────────────────────────────────────────────── */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot-news" content="index, follow" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="slurp" content="index, follow" />
      <meta name="yandex" content="index, follow" />
      <meta name="baiduspider" content="index, follow" />

      {/* ── GEO ────────────────────────────────────────────────────────────── */}
      <meta name="geo.region" content="IN-PB" />
      <meta name="geo.placename" content="Jalandhar, Punjab, India" />
      <meta name="geo.position" content="31.3260;75.5762" />
      <meta name="ICBM" content="31.3260, 75.5762" />

      {/* ── CANONICAL & ALTERNATES ─────────────────────────────────────────── */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={canonicalUrl} hreflang="en" />
      <link rel="alternate" href={canonicalUrl} hreflang="en-in" />
      <link rel="alternate" href={canonicalUrl} hreflang="en-us" />
      <link rel="alternate" href={canonicalUrl} hreflang="x-default" />

      {/* ── OPEN GRAPH ─────────────────────────────────────────────────────── */}
      <meta property="og:type" content={isArticle ? "article" : ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="en_US" />
      {/* Primary image */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:alt" content={`${PERSON_NAME} - Software Tester and Full Stack Developer`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />

      {/* All additional profile images */}

      {ALL_IMAGES.slice(1).map((img) => (
        <meta key={img.url} property="og:image" content={img.url} />
      ))}

      {/* Profile OG */}

      <meta property="profile:first_name" content="Avdesh" />
      <meta property="profile:last_name" content="Jadon" />
      <meta property="profile:username" content="avdeshjadon" />
      <meta property="profile:gender" content="male" />

      {/* ── ARTICLE META ───────────────────────────────────────────────────── */}

      <meta property="article:author" content="https://linkedin.com/in/avdeshjadon" />
      <meta property="article:publisher" content={BASE_URL} />
      {isArticle && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime || LAST_MODIFIED} />
          <meta property="article:section" content={article.section || "Technology"} />
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* ── TWITTER CARD ───────────────────────────────────────────────────── */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${PERSON_NAME} - ${title.split("|")[0].trim()}`} />
      <meta name="twitter:domain" content="avdeshjadon.dpdns.org" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:label1" content="Role" />
      <meta name="twitter:data1" content="Software Tester & Full Stack Developer" />
      <meta name="twitter:label2" content="College" />
      <meta name="twitter:data2" content="NIT Jalandhar" />

      {/* ── PRELOAD CRITICAL IMAGES ─────────────────────────────────────────── */}

      <link rel="preload" as="image" href={image} />
      <link rel="preload" as="image" href={`${BASE_URL}/assets/profiles/avdesh-jadon-official-profile.jpg`} />

      {/* ── JSON-LD: Person (Knowledge Panel anchor) ───────────────────────── */}

      <script type="application/ld+json">{JSON.stringify(buildPersonSchema())}</script>

      {/* ── JSON-LD: WebSite (Sitelinks Search Box) ────────────────────────── */}
      <script type="application/ld+json">{JSON.stringify(buildWebSiteSchema())}</script>

      {/* ── JSON-LD: WebPage / page-specific type ──────────────────────────── */}

      <script type="application/ld+json">
        {JSON.stringify(buildWebPageSchema({ title, description, canonicalUrl, image, pageType, canonicalPath }))}
      </script>

      {/* ── JSON-LD: ImageGallery (Google Images signal) ───────────────────── */}

      <script type="application/ld+json">{JSON.stringify(buildImageGallerySchema())}</script>

      {/* ── JSON-LD: Social profiles ItemList ──────────────────────────────── */}

      <script type="application/ld+json">{JSON.stringify(buildSocialLinksSchema())}</script>

      {/* ── JSON-LD: ProfilePage (home only — strongest Knowledge Panel signal) */}

      {isHomePage && (
        <script type="application/ld+json">
          {JSON.stringify(buildProfilePageSchema({ title, description, canonicalUrl }))}
        </script>
      )}

      {/* ── JSON-LD: BlogPosting (article pages only) ──────────────────────── */}

      {isArticle && (
        <script type="application/ld+json">
          {JSON.stringify(buildArticleSchema({ title, description, canonicalUrl, article }))}
        </script>
      )}
    </Helmet>
  )
}