import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onLoadComplete }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const name = "AVDESH JADON"
  const half = Math.ceil(name.length / 2)
  const animationRef = useRef(null)

  useEffect(() => {
    // Ultra-smooth requestAnimationFrame update
    let start = performance.now()
    const duration = 2500 // 2.5 seconds total loading time
    
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - start
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      
      // Add a non-linear ease-in-out effect for the loading
      const easeProgress = newProgress < 50 
        ? 2 * newProgress * newProgress / 100 
        : -100 + (4 - 2 * newProgress / 100) * newProgress;

      setProgress(easeProgress)

      if (newProgress >= 100) {
        setTimeout(() => { 
          setIsComplete(true)
          setTimeout(onLoadComplete, 800) 
        }, 400)
      } else {
        animationRef.current = requestAnimationFrame(updateProgress)
      }
    }

    animationRef.current = requestAnimationFrame(updateProgress)
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [onLoadComplete])

  const TextBlock = ({ text }) => {
    // Crucial fix: as soon as progress hits 100, drop all complex SVG background clips
    // and rely entirely on native color. This prevents subpixel rendering artifacts during framer-motion splits.
    const isFilled = progress >= 100;
    
    // Wave Math: Instead of directly using progress (0-100%), we expand the scale slightly 
    // to map from -20% (wave fully below text) to 120% (wave fully above text).
    // This perfectly handles the wave crests overshooting the character bounds!
    const fillPosition = -20 + (progress * 1.4);

    return (
      <div className="relative inline-block text-4xl lg:text-7xl font-bold tracking-wider leading-none align-bottom overflow-visible">
        {/* Background gray text */}
        <div className="text-[#e5e5e5] whitespace-nowrap">
          {text}
        </div>
        
        {/* Ocean waves effect using background-clip: text */}
        <div 
          className="absolute top-0 left-0 w-full h-full whitespace-nowrap"
          style={isFilled ? {
            // When full, strictly revert to normal unclipped solid text!
            color: '#000',
            WebkitTextFillColor: '#000',
            transform: 'translateZ(0)' // keep sliding smooth
          } : {
            // While filling, run the wave clip
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000000' d='M 0,100 C 40,90 60,110 100,100 C 140,90 160,110 200,100 L 200,200 L 0,200 Z'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 200%',
            backgroundRepeat: 'repeat-x',
            backgroundPositionY: `${fillPosition}%`,
            animation: 'wave-horizontal 1.5s linear infinite',
            transform: 'translateZ(0)'
          }}
        >
          {text}
        </div>
        {!isFilled && (
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes wave-horizontal {
              0% { background-position-x: 0px; }
              100% { background-position-x: -150px; }
            }
          `}} />
        )}
      </div>
    )
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div className="fixed inset-0 z-50 flex font-sans" exit={{ transition: { duration: 0.8 } }}>
          <motion.div className="w-1/2 bg-white flex items-center justify-end pr-3" exit={{ x: '-100%' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
            <TextBlock text={name.slice(0, half)} />
          </motion.div>
          <motion.div className="w-1/2 bg-white flex items-center justify-start pl-3" exit={{ x: '100%' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
            <TextBlock text={name.slice(half)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
