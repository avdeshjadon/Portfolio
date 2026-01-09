import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onLoadComplete }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const name = "AVDESH JADON"

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => onLoadComplete(), 800)
          }, 400)
          return 100
        }
        return Math.min(prev + Math.random() * 8 + 2, 100)
      })
    }, 100)
    return () => clearInterval(interval)
  }, [onLoadComplete])

  const filledLetters = Math.floor((progress / 100) * name.length)

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div className="fixed inset-0 z-50 flex" exit={{ transition: { duration: 0.8 } }}>
          {/* Left panel */}
          <motion.div
            className="w-1/2 bg-white flex items-center justify-end pr-4"
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="text-right">
              {name.split('').slice(0, Math.ceil(name.length / 2)).map((letter, i) => (
                <motion.span
                  key={i}
                  className={`text-4xl lg:text-7xl font-bold inline-block ${letter === ' ' ? 'w-4' : ''}`}
                  style={{
                    color: i < filledLetters ? '#000' : '#e5e5e5',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right panel */}
          <motion.div
            className="w-1/2 bg-white flex items-center justify-start pl-4"
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="text-left">
              {name.split('').slice(Math.ceil(name.length / 2)).map((letter, i) => {
                const actualIndex = Math.ceil(name.length / 2) + i
                return (
                  <motion.span
                    key={i}
                    className={`text-4xl lg:text-7xl font-bold inline-block ${letter === ' ' ? 'w-4' : ''}`}
                    style={{
                      color: actualIndex < filledLetters ? '#000' : '#e5e5e5',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                )
              })}
            </div>
          </motion.div>


        </motion.div>
      )}
    </AnimatePresence>
  )
}
