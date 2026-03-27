import { useParams, Link } from "react-router-dom"
import SEOHead from "../components/SEOHead"
import { motion } from "framer-motion"
import { blogs } from "../data/blogs"

export default function BlogPostPage() {
  const { slug } = useParams()
  const blog = blogs.find(b => b.slug === slug)

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold mb-4 text-black">Blog Not Found</h1>
        <Link to="/blog" className="text-black underline">Back to Blog List</Link>
      </div>
    )
  }

  return (
    <div className="mt-32 mb-20 container mx-auto px-5 lg:px-28 min-h-[60vh]">
      <SEOHead
        title={`${blog.title} | Avdesh Jadon`}
        description={blog.summary}
        canonicalPath={`/blog/${blog.slug}`}
      />
      <div className="animate-fade-in transition-all duration-700 ease-in-out">
        <Link to="/blog" className="text-sm font-medium text-black/40 hover:text-black mb-10 inline-block transition-all duration-300 ease-out hover:-translate-x-1">
          ← Back to Blog
        </Link>
        
        <header className="mb-12 border-b border-black/10 pb-8">
          <div className="text-xs tracking-wider uppercase text-black/40 mb-3">{blog.date}</div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-5 leading-tight text-black">{blog.title}</h1>
          <p className="text-base lg:text-lg text-black/70 leading-relaxed font-light max-w-3xl">{blog.intro}</p>
        </header>

        <article className="max-w-3xl">
          {blog.content && blog.content.map((section, idx) => (
            <div key={idx} className="mb-12 transition-all duration-500 hover:pl-2">
              <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-black">{section.heading}</h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="mb-5 text-base text-black/80 leading-relaxed text-left font-light">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </article>
      </div>
    </div>
  )
}
