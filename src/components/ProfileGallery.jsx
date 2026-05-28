import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async"; // Assuming you use react-helmet-async or similar, but since SEOHead is custom, let's inject a standard script tag if possible, or just raw script.

export default function ProfileGallery() {
  const images = [
    { src: "/assets/avdeshjadon.jpeg", alt: "Avdesh Jadon - Software Tester & Full Stack Developer", caption: "Avdesh Jadon - Software Tester" },
    { src: "/assets/profiles/avdesh-jadon-official-profile.jpg", alt: "Avdesh Jadon - Official Professional Profile Photo", caption: "Official Profile" },
    { src: "/assets/profiles/avdesh-jadon-developer-portfolio-main.jpg", alt: "Avdesh Jadon - Portfolio Main Developer Photo", caption: "Main Portfolio Photo" },
    { src: "/assets/profiles/avdesh-jadon-nit-jalandhar-cse.jpg", alt: "Avdesh Jadon - NIT Jalandhar Computer Science Student", caption: "NIT Jalandhar CSE" },
    { src: "/assets/profiles/avdesh-jadon-software-developer-full-stack.jpg", alt: "Avdesh Jadon - Full Stack Software Developer", caption: "Full Stack Developer" },
    { src: "/assets/profiles/avdesh-jadon-qa-automation-engineer.jpg", alt: "Avdesh Jadon - QA & Test Automation Engineer", caption: "Test Automation Engineer" },
    { src: "/assets/profiles/avdesh-jadon-professional-headshot.jpg", alt: "Avdesh Jadon - Professional Headshot", caption: "Professional Headshot" },
    { src: "/assets/profiles/avdesh-jadon-software-tester-nitj.jpg", alt: "Avdesh Jadon - Software Tester from NIT Jalandhar", caption: "Software Tester NITJ" },
    { src: "/assets/profiles/avdesh-jadon-mern-stack-developer.jpg", alt: "Avdesh Jadon - MERN Stack Developer", caption: "MERN Stack Developer" },
    { src: "/assets/profiles/avdesh-jadon-javascript-expert.jpg", alt: "Avdesh Jadon - JavaScript Expert Developer", caption: "JavaScript Expert" },
    { src: "/assets/profiles/avdesh-jadon-coding-expert.jpg", alt: "Avdesh Jadon - Coding Expert", caption: "Coding Expert" },
    { src: "/assets/profiles/avdesh-jadon-web-designer-india.jpg", alt: "Avdesh Jadon - Web Designer India", caption: "Web Designer India" }
  ];

  // Create Structured Data (JSON-LD) for the Image Gallery to help Google understand the content
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Avdesh Jadon Profile Gallery",
    "description": "A collection of professional photos, headshots, and working pictures of Avdesh Jadon, a Software Tester and Full Stack Developer.",
    "author": {
      "@type": "Person",
      "name": "Avdesh Jadon"
    },
    "image": images.map(img => ({
      "@type": "ImageObject",
      "contentUrl": `https://avdeshjadon.dpdns.org${img.src}`,
      "description": img.alt,
      "name": img.caption,
      "author": {
        "@type": "Person",
        "name": "Avdesh Jadon"
      }
    }))
  };

  return (
    <section className="px-5 lg:px-28 py-10" aria-label="Avdesh Jadon Profile Gallery">
      {/* Injecting JSON-LD for rich snippet indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="mb-8">
        <h2 className="lg:text-3xl text-2xl font-light text-center">
          Profile <span className="font-medium">Gallery</span>
        </h2>
        <p className="text-center text-[#71717A] mt-3">My professional journey & snapshots</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg shadow-sm border border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 group relative"
          >
            <figure className="m-0 h-full w-full block aspect-square">
              <a href={img.src} target="_blank" rel="noopener noreferrer" title={img.alt} className="block w-full h-full">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  title={img.alt}
                  loading="lazy"
                  width="400"
                  height="400"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </a>
              {/* Using a visually hidden figcaption for maximum accessible & SEO text context */}
              <figcaption className="sr-only">
                {img.caption} - Avdesh Jadon
              </figcaption>
            </figure>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
