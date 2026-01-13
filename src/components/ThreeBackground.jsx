import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const carPositions = new Map()

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

const CarBody = ({ color, type }) => {
  const glass = <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
  const body = <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
  const light = (c) => <meshBasicMaterial color={c} />

  if (type === 0) return ( // Sedan
    <group>
      <mesh position={[0, 0, 0.05]}><boxGeometry args={[0.4, 0.18, 0.08]} />{body}</mesh>
      <mesh position={[0.02, 0, 0.11]}><boxGeometry args={[0.18, 0.14, 0.06]} />{body}</mesh>
      <mesh position={[0.02, 0.071, 0.11]}><boxGeometry args={[0.16, 0.005, 0.04]} />{glass}</mesh>
      <mesh position={[0.02, -0.071, 0.11]}><boxGeometry args={[0.16, 0.005, 0.04]} />{glass}</mesh>
      <mesh position={[0.2, 0.06, 0.05]}><boxGeometry args={[0.02, 0.04, 0.03]} />{light("#ffffcc")}</mesh>
      <mesh position={[0.2, -0.06, 0.05]}><boxGeometry args={[0.02, 0.04, 0.03]} />{light("#ffffcc")}</mesh>
    </group>
  )
  if (type === 1) return ( // SUV
    <group>
      <mesh position={[0, 0, 0.07]}><boxGeometry args={[0.45, 0.22, 0.12]} />{body}</mesh>
      <mesh position={[0, 0, 0.16]}><boxGeometry args={[0.32, 0.2, 0.1]} />{body}</mesh>
      <mesh position={[0, 0.101, 0.16]}><boxGeometry args={[0.28, 0.005, 0.07]} />{glass}</mesh>
      <mesh position={[0, -0.101, 0.16]}><boxGeometry args={[0.28, 0.005, 0.07]} />{glass}</mesh>
    </group>
  )
  if (type === 2) return ( // Sports
    <group>
      <mesh position={[0, 0, 0.04]}><boxGeometry args={[0.5, 0.16, 0.06]} /><meshStandardMaterial color={color} metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[-0.05, 0, 0.08]}><boxGeometry args={[0.22, 0.12, 0.04]} /><meshStandardMaterial color={color} metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0.06, 0, 0.08]}><boxGeometry args={[0.08, 0.11, 0.035]} /><meshStandardMaterial color="#87CEEB" metalness={0.95} roughness={0.05} /></mesh>
    </group>
  )
  if (type === 3) return ( // Truck
    <group>
      <mesh position={[-0.1, 0, 0.08]}><boxGeometry args={[0.32, 0.2, 0.12]} />{body}</mesh>
      <mesh position={[0.18, 0, 0.1]}><boxGeometry args={[0.18, 0.2, 0.18]} />{body}</mesh>
      <mesh position={[0.18, 0.101, 0.14]}><boxGeometry args={[0.14, 0.005, 0.08]} />{glass}</mesh>
    </group>
  )
  return ( // Mini
    <group>
      <mesh position={[0, 0, 0.05]}><boxGeometry args={[0.28, 0.16, 0.08]} />{body}</mesh>
      <mesh position={[0, 0, 0.11]}><boxGeometry args={[0.18, 0.14, 0.06]} />{body}</mesh>
      <mesh position={[0, 0.071, 0.11]}><boxGeometry args={[0.16, 0.005, 0.04]} />{glass}</mesh>
    </group>
  )
}

function Car({ carId, startX, startY, startDir, color, type }) {
  const groupRef = useRef(), carRef = useRef()
  const cellSize = 80 / 50, maxCell = 25
  const getRotation = (d) => [0, Math.PI, Math.PI / 2, -Math.PI / 2][d] || 0

  const state = useRef({ x: startX, y: startY, dir: startDir, progress: 0, speed: 0.6 + Math.random() * 0.3, rot: getRotation(startDir) })

  useFrame((_, delta) => {
    if (!groupRef.current || !carRef.current) return
    const s = state.current
    carPositions.set(carId, { x: s.x, y: s.y })
    s.progress += delta * s.speed

    if (s.progress >= 1) {
      s.progress = 0
      s.x += [1, -1, 0, 0][s.dir]
      s.y += [0, 0, 1, -1][s.dir]
      s.x = Math.max(-maxCell + 1, Math.min(maxCell - 1, s.x))
      s.y = Math.max(-maxCell + 1, Math.min(maxCell - 1, s.y))

      if (Math.random() < 0.2) {
        const dirs = []
        if (s.x + 1 < maxCell) dirs.push(0)
        if (s.x - 1 > -maxCell) dirs.push(1)
        if (s.y + 1 < maxCell) dirs.push(2)
        if (s.y - 1 > -maxCell) dirs.push(3)
        if (dirs.length) s.dir = dirs[Math.floor(Math.random() * dirs.length)]
      }
    }

    let posX = s.x * cellSize + [s.progress, -s.progress, 0, 0][s.dir] * cellSize
    let posY = s.y * cellSize + [0, 0, s.progress, -s.progress][s.dir] * cellSize
    const rot = -Math.PI / 2.2

    groupRef.current.position.x += (posX - groupRef.current.position.x) * 0.1
    groupRef.current.position.y += (-3 + posY * Math.cos(rot) - groupRef.current.position.y) * 0.1
    groupRef.current.position.z += (-8 + posY * Math.sin(rot) - groupRef.current.position.z) * 0.1

    const target = getRotation(s.dir)
    let diff = target - s.rot
    if (diff > Math.PI) diff -= Math.PI * 2
    if (diff < -Math.PI) diff += Math.PI * 2
    s.rot += diff * 0.1
    carRef.current.rotation.z = s.rot
  })

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2.2, 0, 0]}>
      <group ref={carRef}>
        <CarBody color={color} type={type} />
        {[[0.12, 0.09], [0.12, -0.09], [-0.12, 0.09], [-0.12, -0.09]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0]}><cylinderGeometry args={[0.035, 0.035, 0.025, 12]} /><meshStandardMaterial color="#111" /></mesh>
        ))}
      </group>
    </group>
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

const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#AA96DA', '#FF9F43', '#74B9FF', '#55E6C1', '#F38181', '#00D2D3', '#FF6B81', '#A29BFE', '#95E1D3']
const starts = colors.map((_, i) => ({ x: ((i % 4) - 2) * 5, y: (Math.floor(i / 4) - 1) * 5, dir: i % 4 }))

export default function ThreeBackground() {
  useEffect(() => {
    carPositions.clear()
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <GridPlane />
        <Particles />
        {colors.map((c, i) => <Car key={i} carId={i} startX={starts[i].x} startY={starts[i].y} startDir={starts[i].dir} color={c} type={i % 5} />)}
      </Canvas>
    </div>
  )
}
