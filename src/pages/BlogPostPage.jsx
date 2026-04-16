import { useParams, Link } from "react-router-dom"
import SEOHead from "../components/SEOHead"
import { motion } from "framer-motion"
import { blogs } from "../data/blogs"
import { BsArrowLeft, BsClock, BsTag, BsArrowRight } from "react-icons/bs"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

export default function BlogPostPage() {
  const { slug } = useParams()
  const blogIndex = blogs.findIndex(b => b.slug === slug)
  const blog = blogs[blogIndex]

  // Find next/prev blogs for navigation
  const prevBlog = blogIndex > 0 ? blogs[blogIndex - 1] : null
  const nextBlog = blogIndex < blogs.length - 1 ? blogs[blogIndex + 1] : null

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center mt-20">
        <motion.div {...fadeUp()} className="text-center">
          <h1 className="text-4xl font-medium mb-4 text-black">404</h1>
          <p className="text-black/50 mb-6 font-light">This blog post doesn't exist yet.</p>
          <Link to="/blog" className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-black/80 transition-all duration-300 text-sm">
            Browse all articles
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mt-28 mb-20 min-h-[60vh]">
      <SEOHead
        title={`${blog.title} | Avdesh Jadon`}
        description={blog.summary}
        keywords={`${blog.title}, Avdesh Jadon blog, ${blog.category}, avdeshjadon`}
        canonicalPath={`/blog/${blog.slug}`}
        ogType="article"
      />

      {/* Back link */}
      <div className="px-5 lg:px-28 mb-8">
        <motion.div {...fadeUp()}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-black transition-all duration-300 group font-light"
          >
            <BsArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </motion.div>
      </div>

      {/* Article header */}
      <motion.header {...fadeUp(0.05)} className="px-5 lg:px-28 mb-12 lg:mb-16 pb-8 lg:pb-10 border-b border-black/8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-widest uppercase font-medium bg-black text-white rounded-full">
              <BsTag size={10} />
              {blog.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-black/40 font-light">
              <BsClock size={10} />
              {blog.readTime}
            </span>
            <span className="text-[11px] text-black/30 font-light">{blog.date}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-base lg:text-lg text-black/55 leading-relaxed font-light">
            {blog.intro}
          </p>

          {/* Author tag */}
          <div className="flex items-center gap-3 mt-8">
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">AJ</div>
            <div>
              <p className="text-sm font-medium text-black">Avdesh Jadon</p>
              <p className="text-[11px] text-black/40 font-light">Software Tester & Full Stack Developer</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Table of contents */}
      <motion.div {...fadeUp(0.1)} className="px-5 lg:px-28 mb-12">
        <div className="max-w-3xl">
          <div className="rounded-xl border border-black/8 p-5 lg:p-6">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-black/40 font-normal mb-4">Table of Contents</h3>
            <nav className="space-y-2">
              {blog.content.map((section, idx) => (
                <a
                  key={idx}
                  href={`#section-${idx}`}
                  className="block text-sm text-black/50 hover:text-black transition-colors duration-300 font-light hover:translate-x-1 transform"
                >
                  {section.heading}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Article body */}
      <article className="px-5 lg:px-28">
        <div className="max-w-3xl">
          {blog.content.map((section, idx) => (
            <motion.div
              key={idx}
              id={`section-${idx}`}
              {...fadeUp(0.12 + idx * 0.03)}
              className="mb-12 lg:mb-14 scroll-mt-24"
            >
              <h2 className="text-xl lg:text-2xl font-medium text-black mb-5 pb-3 border-b border-black/6">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="mb-4 text-base text-black/65 leading-[1.85] font-light">
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </article>

      {/* Author card at bottom */}
      <motion.div {...fadeUp(0.2)} className="px-5 lg:px-28 mt-8 mb-12">
        <div className="max-w-3xl rounded-2xl border border-black/8 p-6 lg:p-8 flex flex-col sm:flex-row items-start gap-5">
          <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-lg font-medium flex-shrink-0">AJ</div>
          <div>
            <p className="text-base font-medium text-black mb-1">Written by Avdesh Jadon</p>
            <p className="text-sm text-black/45 font-light leading-relaxed mb-3">Software Tester & Full Stack Developer at NIT Jalandhar. I write about testing, React, and building better software.</p>
            <div className="flex gap-3">
              <a href="https://github.com/avdeshjadon" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 border border-black/15 rounded-md hover:bg-black hover:text-white transition-all duration-300">GitHub</a>
              <a href="https://linkedin.com/in/avdeshjadon" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 border border-black/15 rounded-md hover:bg-black hover:text-white transition-all duration-300">LinkedIn</a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Prev / Next navigation */}
      <motion.div {...fadeUp(0.25)} className="px-5 lg:px-28">
        <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-black/8">
          {prevBlog ? (
            <Link
              to={`/blog/${prevBlog.slug}`}
              className="group rounded-xl border border-black/8 p-4 lg:p-5 hover:border-black/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="text-[10px] tracking-widest uppercase text-black/30 flex items-center gap-1 mb-2">
                <BsArrowLeft size={10} /> Previous
              </span>
              <p className="text-sm font-medium text-black/70 group-hover:text-black transition-colors duration-300 line-clamp-1">
                {prevBlog.title}
              </p>
            </Link>
          ) : <div />}
          {nextBlog ? (
            <Link
              to={`/blog/${nextBlog.slug}`}
              className="group rounded-xl border border-black/8 p-4 lg:p-5 hover:border-black/20 transition-all duration-300 hover:-translate-y-0.5 text-right"
            >
              <span className="text-[10px] tracking-widest uppercase text-black/30 flex items-center justify-end gap-1 mb-2">
                Next <BsArrowRight size={10} />
              </span>
              <p className="text-sm font-medium text-black/70 group-hover:text-black transition-colors duration-300 line-clamp-1">
                {nextBlog.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      </motion.div>
    </div>
  )
}
