import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// Shared car positions for collision detection
const carPositions = new Map()

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
      <meshBasicMaterial color="#000" wireframe transparent opacity={0.08} />
    </mesh>
  )
}

function SedanCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.4, 0.18, 0.08]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.02, 0, 0.11]}>
        <boxGeometry args={[0.18, 0.14, 0.06]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.02, 0.071, 0.11]}>
        <boxGeometry args={[0.16, 0.005, 0.04]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.02, -0.071, 0.11]}>
        <boxGeometry args={[0.16, 0.005, 0.04]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.2, 0.06, 0.05]}>
        <boxGeometry args={[0.02, 0.04, 0.03]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
      <mesh position={[0.2, -0.06, 0.05]}>
        <boxGeometry args={[0.02, 0.04, 0.03]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
      <mesh position={[-0.2, 0.06, 0.05]}>
        <boxGeometry args={[0.02, 0.03, 0.025]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
      <mesh position={[-0.2, -0.06, 0.05]}>
        <boxGeometry args={[0.02, 0.03, 0.025]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
    </group>
  )
}

function SUVCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[0.45, 0.22, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.16]}>
        <boxGeometry args={[0.32, 0.2, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.101, 0.16]}>
        <boxGeometry args={[0.28, 0.005, 0.07]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.101, 0.16]}>
        <boxGeometry args={[0.28, 0.005, 0.07]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.22]}>
        <boxGeometry args={[0.25, 0.16, 0.01]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.22, 0.08, 0.07]}>
        <boxGeometry args={[0.02, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
      <mesh position={[0.22, -0.08, 0.07]}>
        <boxGeometry args={[0.02, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
    </group>
  )
}

function SportsCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.5, 0.16, 0.06]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.05, 0, 0.08]}>
        <boxGeometry args={[0.22, 0.12, 0.04]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.06, 0, 0.08]}>
        <boxGeometry args={[0.08, 0.11, 0.035]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[-0.24, 0, 0.08]}>
        <boxGeometry args={[0.03, 0.18, 0.02]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.071]}>
        <boxGeometry args={[0.48, 0.03, 0.001]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh position={[0.25, 0.05, 0.04]}>
        <boxGeometry args={[0.02, 0.04, 0.025]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
      <mesh position={[0.25, -0.05, 0.04]}>
        <boxGeometry args={[0.02, 0.04, 0.025]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
    </group>
  )
}

function TruckCar({ color }) {
  return (
    <group>
      <mesh position={[-0.1, 0, 0.08]}>
        <boxGeometry args={[0.32, 0.2, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.18, 0, 0.1]}>
        <boxGeometry args={[0.18, 0.2, 0.18]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.18, 0.101, 0.14]}>
        <boxGeometry args={[0.14, 0.005, 0.08]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.18, -0.101, 0.14]}>
        <boxGeometry args={[0.14, 0.005, 0.08]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.1, 0, 0.145]}>
        <boxGeometry args={[0.3, 0.18, 0.01]} />
        <meshStandardMaterial color="#444" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.27, 0.07, 0.08]}>
        <boxGeometry args={[0.02, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
      <mesh position={[0.27, -0.07, 0.08]}>
        <boxGeometry args={[0.02, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
    </group>
  )
}

function MiniCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.28, 0.16, 0.08]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[0.18, 0.14, 0.06]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.071, 0.11]}>
        <boxGeometry args={[0.16, 0.005, 0.04]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.071, 0.11]}>
        <boxGeometry args={[0.16, 0.005, 0.04]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.141]}>
        <boxGeometry args={[0.16, 0.04, 0.001]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh position={[0.14, 0.05, 0.05]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
      <mesh position={[0.14, -0.05, 0.05]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
    </group>
  )
}

function BusCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.55, 0.18, 0.16]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.05, 0.091, 0.12]}>
        <boxGeometry args={[0.35, 0.005, 0.08]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.05, -0.091, 0.12]}>
        <boxGeometry args={[0.35, 0.005, 0.08]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.2, 0, 0.17]}>
        <boxGeometry args={[0.12, 0.12, 0.02]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0.091, 0.06]}>
        <boxGeometry args={[0.53, 0.005, 0.03]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh position={[0, -0.091, 0.06]}>
        <boxGeometry args={[0.53, 0.005, 0.03]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh position={[0.27, 0.06, 0.06]}>
        <boxGeometry args={[0.02, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
      <mesh position={[0.27, -0.06, 0.06]}>
        <boxGeometry args={[0.02, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffcc" />
      </mesh>
    </group>
  )
}

const carShapes = [SedanCar, SUVCar, SportsCar, TruckCar, MiniCar, BusCar]

function Car({ scrollY, carId, startX, startY, startDir, color, CarShape }) {
  const groupRef = useRef()
  const carRef = useRef()
  const gridSize = 80
  const divisions = 50
  const cellSize = gridSize / divisions
  const maxCell = divisions / 2
  
  const getRotationForDirection = (dir) => {
    if (dir === 0) return 0
    if (dir === 1) return Math.PI
    if (dir === 2) return Math.PI / 2
    if (dir === 3) return -Math.PI / 2
    return 0
  }
  
  const stateRef = useRef({
    x: startX,
    y: startY,
    direction: startDir,
    progress: 0,
    speed: 0.6 + Math.random() * 0.3,
    targetRotation: getRotationForDirection(startDir),
    currentRotation: getRotationForDirection(startDir)
  })

  // Check if a cell will collide with another car
  const willCollide = (nextX, nextY, myId) => {
    for (const [id, pos] of carPositions) {
      if (id !== myId) {
        const dist = Math.abs(pos.x - nextX) + Math.abs(pos.y - nextY)
        if (dist < 2) return true
      }
    }
    return false
  }

  // Get available directions that won't cause collision
  const getAvailableDirections = (x, y, myId, currentDir) => {
    const dirs = []
    
    // Right
    if (x + 1 < maxCell && !willCollide(x + 1, y, myId)) dirs.push(0)
    // Left  
    if (x - 1 > -maxCell && !willCollide(x - 1, y, myId)) dirs.push(1)
    // Up
    if (y + 1 < maxCell && !willCollide(x, y + 1, myId)) dirs.push(2)
    // Down
    if (y - 1 > -maxCell && !willCollide(x, y - 1, myId)) dirs.push(3)
    
    return dirs
  }

  useFrame((state, delta) => {
    if (!groupRef.current || !carRef.current) return
    
    const s = stateRef.current
    
    // Update position in shared map
    carPositions.set(carId, { x: s.x, y: s.y, dir: s.direction })
    
    // Move progress
    s.progress += delta * s.speed
    
    // When reaching next cell
    if (s.progress >= 1) {
      s.progress = 0
      
      // Move to next cell based on current direction
      if (s.direction === 0) s.x += 1
      else if (s.direction === 1) s.x -= 1
      else if (s.direction === 2) s.y += 1
      else if (s.direction === 3) s.y -= 1
      
      // Clamp to bounds
      s.x = Math.max(-maxCell + 1, Math.min(maxCell - 1, s.x))
      s.y = Math.max(-maxCell + 1, Math.min(maxCell - 1, s.y))
      
      // Update position
      carPositions.set(carId, { x: s.x, y: s.y, dir: s.direction })
      
      // Check what directions are available
      const availableDirs = getAvailableDirections(s.x, s.y, carId, s.direction)
      
      // Decide if we should turn
      const shouldTurn = Math.random() < 0.2 || !availableDirs.includes(s.direction)
      
      if (shouldTurn && availableDirs.length > 0) {
        // Pick a new direction, prefer not going backwards
        const oppositeDir = s.direction === 0 ? 1 : s.direction === 1 ? 0 : s.direction === 2 ? 3 : 2
        const preferredDirs = availableDirs.filter(d => d !== oppositeDir)
        
        if (preferredDirs.length > 0) {
          s.direction = preferredDirs[Math.floor(Math.random() * preferredDirs.length)]
        } else if (availableDirs.length > 0) {
          s.direction = availableDirs[Math.floor(Math.random() * availableDirs.length)]
        }
        
        s.targetRotation = getRotationForDirection(s.direction)
      } else if (availableDirs.length > 0 && !availableDirs.includes(s.direction)) {
        // Must turn - current direction blocked
        s.direction = availableDirs[Math.floor(Math.random() * availableDirs.length)]
        s.targetRotation = getRotationForDirection(s.direction)
      }
    }
    
    // Calculate smooth position
    let posX = s.x * cellSize
    let posY = s.y * cellSize
    
    // Add progress interpolation
    if (s.direction === 0) posX += s.progress * cellSize
    else if (s.direction === 1) posX -= s.progress * cellSize
    else if (s.direction === 2) posY += s.progress * cellSize
    else if (s.direction === 3) posY -= s.progress * cellSize
    
    const scrollOffset = -8 + scrollY * 0.002
    const gridRotation = -Math.PI / 2.2
    
    const targetX = posX
    const targetY = -3 + posY * Math.cos(gridRotation)
    const targetZ = scrollOffset + posY * Math.sin(gridRotation)
    
    // Smooth position
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.1
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.1
    
    // Smooth rotation
    let rotationDiff = s.targetRotation - s.currentRotation
    if (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2
    if (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2
    s.currentRotation += rotationDiff * 0.1
    carRef.current.rotation.z = s.currentRotation
  })

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2.2, 0, 0]}>
      <group ref={carRef}>
        <CarShape color={color} />
        {[[0.12, 0.09], [0.12, -0.09], [-0.12, 0.09], [-0.12, -0.09]].map(([x, y], i) => (
          <group key={i} position={[x, y, 0]}>
            <mesh>
              <cylinderGeometry args={[0.035, 0.035, 0.025, 12]} />
              <meshStandardMaterial color="#111" metalness={0.3} roughness={0.8} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.026, 8]} />
              <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.5, 0.25]} />
          <meshBasicMaterial color="#000" transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  )
}

function FloatingParticles({ scrollY }) {
  const particlesRef = useRef()
  const count = 40
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015
      particlesRef.current.position.y = -scrollY * 0.001
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#aaa" transparent opacity={0.2} />
    </points>
  )
}

const carColors = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#AA96DA', '#FF9F43', '#74B9FF', '#55E6C1',
  '#F38181', '#00D2D3', '#FF6B81', '#A29BFE', '#95E1D3', '#E056FD', '#7BED9F', '#FFA502',
]

// Spread cars in different starting positions
const startPositions = carColors.map((_, i) => {
  const row = Math.floor(i / 5)
  const col = i % 5
  return {
    x: (col - 2) * 4,
    y: (row - 1) * 4,
    dir: i % 4
  }
})

function Scene({ scrollY }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, 10]} intensity={0.3} color="#fff" />
      
      <GridPlane scrollY={scrollY} />
      <FloatingParticles scrollY={scrollY} />
      
      {carColors.map((color, i) => (
        <Car 
          key={i}
          carId={i}
          scrollY={scrollY}
          startX={startPositions[i].x}
          startY={startPositions[i].y}
          startDir={startPositions[i].dir}
          color={color}
          CarShape={carShapes[i % carShapes.length]}
        />
      ))}
    </>
  )
}

export default function ThreeBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    carPositions.clear()
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene scrollY={scrollY} />
      </Canvas>
    </div>
  )
}
