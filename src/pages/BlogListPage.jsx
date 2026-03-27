import { Link } from "react-router-dom"
import SEOHead from "../components/SEOHead"
import { motion } from "framer-motion"
import { blogs } from "../data/blogs"

export default function BlogListPage() {
  return (
    <div className="mt-32 mb-20 container mx-auto px-5 lg:px-28 min-h-[60vh]">
      <SEOHead
        title="Blog | Avdesh Jadon"
        description="Read the latest articles on web development, software testing, and tech roadmaps by Avdesh Jadon."
        canonicalPath="/blog"
      />
      <div className="animate-fade-in transition-all duration-700 ease-in-out">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
          Blog
        </h1>
        <p className="text-base lg:text-lg text-black/60 mb-12 max-w-2xl font-light">
          Thoughts, learnings, and detailed roadmaps on full stack development and software automation testing.
        </p>

        <div className="flex flex-col gap-8">
          {blogs.map((blog, idx) => (
            <Link to={`/blog/${blog.slug}`} key={idx} className="group block border-b border-black/10 pb-8 transition-all duration-500 ease-out hover:border-black/30">
              <div className="transition-all duration-500 ease-out group-hover:translate-x-2">
                <div className="text-xs tracking-wider uppercase mb-2 text-black/40">{blog.date}</div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-3 text-black transition-colors duration-300 group-hover:text-[#4a6cf7]">{blog.title}</h2>
                <p className="text-base text-black/70 mb-4 max-w-3xl leading-relaxed font-light">{blog.summary}</p>
                <div className="text-black/80 font-medium text-sm flex items-center gap-2 group-hover:text-[#4a6cf7] transition-colors duration-300">
                  Read Article <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
