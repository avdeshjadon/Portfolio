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

// Sedan car shape
function SedanCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.4, 0.18, 0.08]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.02, 0, 0.11]}>
        <boxGeometry args={[0.18, 0.14, 0.06]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.18, 0, 0.05]}>
        <boxGeometry args={[0.02, 0.1, 0.03]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh position={[-0.18, 0, 0.05]}>
        <boxGeometry args={[0.02, 0.08, 0.03]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
    </group>
  )
}

// SUV car shape
function SUVCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[0.45, 0.22, 0.12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 0, 0.15]}>
        <boxGeometry args={[0.3, 0.2, 0.08]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.2, 0, 0.07]}>
        <boxGeometry args={[0.02, 0.14, 0.04]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
    </group>
  )
}

// Sports car shape
function SportsCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.5, 0.16, 0.06]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[-0.05, 0, 0.08]}>
        <boxGeometry args={[0.2, 0.12, 0.04]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.22, 0, 0.04]}>
        <boxGeometry args={[0.02, 0.12, 0.03]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
    </group>
  )
}

// Truck shape
function TruckCar({ color }) {
  return (
    <group>
      <mesh position={[-0.08, 0, 0.08]}>
        <boxGeometry args={[0.3, 0.2, 0.14]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.18, 0, 0.1]}>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.26, 0, 0.1]}>
        <boxGeometry args={[0.02, 0.12, 0.06]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
    </group>
  )
}

// Mini car shape
function MiniCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.28, 0.16, 0.08]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.16, 0.14, 0.06]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0, 0.05]}>
        <boxGeometry args={[0.02, 0.1, 0.03]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
    </group>
  )
}

// Bus shape
function BusCar({ color }) {
  return (
    <group>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.55, 0.18, 0.16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.25, 0, 0.1]}>
        <boxGeometry args={[0.02, 0.12, 0.08]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh position={[0.1, 0.09, 0.12]}>
        <boxGeometry args={[0.08, 0.01, 0.06]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      <mesh position={[-0.1, 0.09, 0.12]}>
        <boxGeometry args={[0.08, 0.01, 0.06]} />
        <meshBasicMaterial color="#333" />
      </mesh>
    </group>
  )
}

const carShapes = [SedanCar, SUVCar, SportsCar, TruckCar, MiniCar, BusCar]

function Car({ scrollY, startDelay, color, CarShape }) {
  const groupRef = useRef()
  const gridSize = 80
  const divisions = 50
  const cellSize = gridSize / divisions
  
  const stateRef = useRef({
    x: 0,
    y: 0,
    direction: Math.floor(Math.random() * 4),
    progress: 0,
    speed: 1.5 + Math.random() * 0.8,
    startTime: startDelay
  })

  useFrame((state) => {
    if (!groupRef.current) return
    
    const s = stateRef.current
    const time = state.clock.elapsedTime
    
    if (time < s.startTime) {
      groupRef.current.visible = false
      return
    }
    
    groupRef.current.visible = true
    s.progress += 0.02 * s.speed
    
    if (s.progress >= 1) {
      s.progress = 0
      
      if (s.direction === 0) s.x += 1
      else if (s.direction === 1) s.x -= 1
      else if (s.direction === 2) s.y += 1
      else if (s.direction === 3) s.y -= 1
      
      const maxCell = divisions / 2
      if (s.x >= maxCell || s.x <= -maxCell || s.y >= maxCell || s.y <= -maxCell || Math.random() < 0.25) {
        const possibleDirs = []
        if (s.x < maxCell) possibleDirs.push(0)
        if (s.x > -maxCell) possibleDirs.push(1)
        if (s.y < maxCell) possibleDirs.push(2)
        if (s.y > -maxCell) possibleDirs.push(3)
        s.direction = possibleDirs[Math.floor(Math.random() * possibleDirs.length)]
      }
      
      s.x = Math.max(-maxCell, Math.min(maxCell, s.x))
      s.y = Math.max(-maxCell, Math.min(maxCell, s.y))
    }
    
    let posX = s.x * cellSize
    let posY = s.y * cellSize
    
    if (s.direction === 0) posX = (s.x + s.progress) * cellSize
    else if (s.direction === 1) posX = (s.x - s.progress) * cellSize
    else if (s.direction === 2) posY = (s.y + s.progress) * cellSize
    else if (s.direction === 3) posY = (s.y - s.progress) * cellSize
    
    const scrollOffset = -8 + scrollY * 0.002
    const gridRotation = -Math.PI / 2.2
    
    groupRef.current.position.x = posX
    groupRef.current.position.y = -3 + posY * Math.cos(gridRotation)
    groupRef.current.position.z = scrollOffset + posY * Math.sin(gridRotation)
    
    if (s.direction === 0) groupRef.current.rotation.z = 0
    else if (s.direction === 1) groupRef.current.rotation.z = Math.PI
    else if (s.direction === 2) groupRef.current.rotation.z = Math.PI / 2
    else if (s.direction === 3) groupRef.current.rotation.z = -Math.PI / 2
  })

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2.2, 0, 0]} visible={false}>
      <CarShape color={color} />
      {/* Wheels for all cars */}
      <mesh position={[0.1, 0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh position={[0.1, -0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh position={[-0.1, 0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh position={[-0.1, -0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        <meshBasicMaterial color="#111" />
      </mesh>
    </group>
  )
}

const carColors = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#AA96DA', '#FF9F43', '#74B9FF', '#55E6C1',
  '#F38181', '#00D2D3', '#FF6B81', '#A29BFE', '#95E1D3', '#E056FD', '#7BED9F', '#FFA502',
]

function Scene({ scrollY }) {
  return (
    <>
      <GridPlane scrollY={scrollY} />
      {carColors.map((color, i) => (
        <Car 
          key={i} 
          scrollY={scrollY} 
          startDelay={i * 0.3} 
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
