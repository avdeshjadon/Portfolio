import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onLoadComplete }) {
  const [isComplete, setIsComplete] = useState(false)
  const name = "AVDESH JADON".split("")

  useEffect(() => {
    // Simplified timer instead of progress tracking
    const timer = setTimeout(() => {
      setIsComplete(true)
      setTimeout(onLoadComplete, 1000)
    }, 2000) // 2 seconds total loading time before exit triggers

    return () => clearTimeout(timer)
  }, [onLoadComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#111] font-sans"
          initial={{ y: 0 }}
          exit={{ y: '-100vh', transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
        >
          {/* Main Title Container */}
          <div className="overflow-hidden flex items-center justify-center px-4">
            {name.map((char, index) => (
              <motion.span
                key={index}
                className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em] md:tracking-[0.2em] inline-block ${char === " " ? "w-4 md:w-8" : ""}`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: index * 0.03 } }}
                transition={{
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: index * 0.05 // Stagger effect for reveal
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
