import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function GridPlane() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -Math.PI / 2.2 + Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })
  return (
    <mesh ref={ref} position={[0, -3, -8]} rotation={[-Math.PI / 2.2, 0, 0]}>
      <planeGeometry args={[80, 80, 50, 50]} />
      <meshBasicMaterial color="#000" wireframe transparent opacity={0.08} />
    </mesh>
  )
}

function Particles() {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(40 * 3)
    for (let i = 0; i < 40; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={40} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.025} color="#aaa" transparent opacity={0.2} />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <GridPlane />
        <Particles />
      </Canvas>
    </div>
  )
}
