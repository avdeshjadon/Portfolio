import { useState } from 'react'
import Home from './pages/Home'
import Skills from './components/Skills'
import Navbar from './components/Navbar'
import About from './components/About'
import Footer from './components/Footer'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CustomCursor from './utils/CursorAnimation'
import Loader from './components/Loader'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
      <Loader onLoadComplete={() => setIsLoading(false)} />
      <div className={`font-sora scroll-smooth overflow-x-hidden transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <CustomCursor />
        <Navbar />
        <Home />
        <Skills />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
