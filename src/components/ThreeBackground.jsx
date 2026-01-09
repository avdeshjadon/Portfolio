import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function GridPlane({ scrollY }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = -8 + scrollY * 0.002
      meshRef.current.rotation.x = -Math.PI / 2.2 + Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -3, -8]} rotation={[-Math.PI / 2.2, 0, 0]}>
      <planeGeometry args={[80, 80, 50, 50]} />
      <meshBasicMaterial color="#000" wireframe transparent opacity={0.2} />
    </mesh>
  )
}

function Scene({ scrollY }) {
  return (
    <>
      <GridPlane scrollY={scrollY} />
    </>
  )
}

export default function ThreeBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene scrollY={scrollY} />
      </Canvas>
    </div>
  )
}
