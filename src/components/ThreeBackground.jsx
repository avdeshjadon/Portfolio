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
  const glass = <meshStandardMaterial color="#0d1b2a" metalness={0.98} roughness={0.02} envMapIntensity={1.5} />
  const bodyMat = <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} envMapIntensity={1.2} />
  const carbonMat = <meshStandardMaterial color="#141414" metalness={0.4} roughness={0.6} />
  const lightGlow = (c) => <meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.2} toneMapped={false} />
  const chrome = <meshStandardMaterial color="#f0f0f0" metalness={1} roughness={0.05} envMapIntensity={2} />
  const brakeDisc = <meshStandardMaterial color="#8B4513" metalness={0.7} roughness={0.4} />
  const tireRubber = <meshStandardMaterial color="#080808" roughness={0.95} metalness={0.1} />

  // Lamborghini Aventador SVJ Style - Extreme Detail
  if (type === 0) return (
    <group>
      {/* Main low body - aggressive wedge */}
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[0.58, 0.24, 0.075]} />
        {bodyMat}
      </mesh>
      {/* Tapered pointed nose */}
      <mesh position={[0.26, 0, 0.055]}>
        <boxGeometry args={[0.12, 0.16, 0.065]} />
        {bodyMat}
      </mesh>
      {/* Extreme rear haunches - muscular */}
      <mesh position={[-0.22, 0.07, 0.065]}>
        <boxGeometry args={[0.14, 0.09, 0.095]} />
        {bodyMat}
      </mesh>
      <mesh position={[-0.22, -0.07, 0.065]}>
        <boxGeometry args={[0.14, 0.09, 0.095]} />
        {bodyMat}
      </mesh>
      {/* Hexagonal cabin - fighter jet style */}
      <mesh position={[-0.1, 0, 0.125]}>
        <boxGeometry args={[0.22, 0.17, 0.065]} />
        {bodyMat}
      </mesh>
      {/* Roof scoop */}
      <mesh position={[-0.08, 0, 0.16]}>
        <boxGeometry args={[0.08, 0.12, 0.02]} />
        {carbonMat}
      </mesh>
      {/* Wraparound windshield */}
      <mesh position={[0.01, 0, 0.145]}>
        <boxGeometry args={[0.008, 0.15, 0.09]} />
        {glass}
      </mesh>
      {/* Side windows with B-pillar */}
      <mesh position={[-0.1, 0.086, 0.135]}>
        <boxGeometry args={[0.18, 0.004, 0.045]} />
        {glass}
      </mesh>
      <mesh position={[-0.1, -0.086, 0.135]}>
        <boxGeometry args={[0.18, 0.004, 0.045]} />
        {glass}
      </mesh>
      {/* B-pillar */}
      <mesh position={[-0.06, 0.088, 0.135]}>
        <boxGeometry args={[0.015, 0.008, 0.04]} />
        {bodyMat}
      </mesh>
      <mesh position={[-0.06, -0.088, 0.135]}>
        <boxGeometry args={[0.015, 0.008, 0.04]} />
        {bodyMat}
      </mesh>
      {/* Y-shaped LED headlights - sharp */}
      <mesh position={[0.3, 0.075, 0.06]}>
        <boxGeometry args={[0.015, 0.025, 0.015]} />
        {lightGlow("#ffffff")}
      </mesh>
      <mesh position={[0.3, -0.075, 0.06]}>
        <boxGeometry args={[0.015, 0.025, 0.015]} />
        {lightGlow("#ffffff")}
      </mesh>
      <mesh position={[0.28, 0.055, 0.065]}>
        <boxGeometry args={[0.025, 0.008, 0.008]} />
        {lightGlow("#ffffff")}
      </mesh>
      <mesh position={[0.28, -0.055, 0.065]}>
        <boxGeometry args={[0.025, 0.008, 0.008]} />
        {lightGlow("#ffffff")}
      </mesh>
      {/* Triple hexagonal taillights */}
      <mesh position={[-0.3, 0.05, 0.075]}>
        <boxGeometry args={[0.012, 0.025, 0.012]} />
        {lightGlow("#ff1a1a")}
      </mesh>
      <mesh position={[-0.3, 0, 0.075]}>
        <boxGeometry args={[0.012, 0.025, 0.012]} />
        {lightGlow("#ff1a1a")}
      </mesh>
      <mesh position={[-0.3, -0.05, 0.075]}>
        <boxGeometry args={[0.012, 0.025, 0.012]} />
        {lightGlow("#ff1a1a")}
      </mesh>
      {/* Large side air intakes - SVJ style */}
      <mesh position={[0.06, 0.12, 0.06]}>
        <boxGeometry args={[0.1, 0.012, 0.045]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.06, -0.12, 0.06]}>
        <boxGeometry args={[0.1, 0.012, 0.045]} />
        {carbonMat}
      </mesh>
      {/* Intake vanes */}
      <mesh position={[0.06, 0.12, 0.06]}>
        <boxGeometry args={[0.08, 0.002, 0.035]} />
        {chrome}
      </mesh>
      <mesh position={[0.06, -0.12, 0.06]}>
        <boxGeometry args={[0.08, 0.002, 0.035]} />
        {chrome}
      </mesh>
      {/* Rear diffuser */}
      <mesh position={[-0.3, 0, 0.045]}>
        <boxGeometry args={[0.015, 0.18, 0.015]} />
        {carbonMat}
      </mesh>
      {/* Quad exhaust tips - high mount */}
      <mesh position={[-0.3, 0.04, 0.065]}>
        <boxGeometry args={[0.018, 0.02, 0.018]} />
        {chrome}
      </mesh>
      <mesh position={[-0.3, -0.04, 0.065]}>
        <boxGeometry args={[0.018, 0.02, 0.018]} />
        {chrome}
      </mesh>
      {/* Front splitter */}
      <mesh position={[0.32, 0, 0.045]}>
        <boxGeometry args={[0.02, 0.2, 0.008]} />
        {carbonMat}
      </mesh>
      {/* Side skirts */}
      <mesh position={[0, 0.122, 0.045]}>
        <boxGeometry args={[0.4, 0.008, 0.01]} />
        {carbonMat}
      </mesh>
      <mesh position={[0, -0.122, 0.045]}>
        <boxGeometry args={[0.4, 0.008, 0.01]} />
        {carbonMat}
      </mesh>
      {/* Engine cover louvers */}
      <mesh position={[-0.18, 0, 0.11]}>
        <boxGeometry args={[0.12, 0.14, 0.005]} />
        {glass}
      </mesh>
      {/* Mirror caps */}
      <mesh position={[0.02, 0.095, 0.125]}>
        <boxGeometry args={[0.025, 0.015, 0.015]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.02, -0.095, 0.125]}>
        <boxGeometry args={[0.025, 0.015, 0.015]} />
        {bodyMat}
      </mesh>
    </group>
  )

  // Ferrari F40 LM Style - Legendary Detail
  if (type === 1) return (
    <group>
      {/* Extremely long low nose - iconic */}
      <mesh position={[0.18, 0, 0.05]}>
        <boxGeometry args={[0.38, 0.19, 0.055]} />
        {bodyMat}
      </mesh>
      {/* Pointed front tip */}
      <mesh position={[0.35, 0, 0.05]}>
        <boxGeometry args={[0.08, 0.14, 0.045]} />
        {bodyMat}
      </mesh>
      {/* Wide cabin base */}
      <mesh position={[-0.1, 0, 0.07]}>
        <boxGeometry args={[0.32, 0.26, 0.095]} />
        {bodyMat}
      </mesh>
      {/* Tapered rear deck */}
      <mesh position={[-0.28, 0, 0.09]}>
        <boxGeometry args={[0.12, 0.22, 0.075]} />
        {bodyMat}
      </mesh>
      {/* Flat roof - classic */}
      <mesh position={[-0.08, 0, 0.145]}>
        <boxGeometry args={[0.2, 0.2, 0.035]} />
        {bodyMat}
      </mesh>
      {/* Near-vertical windshield */}
      <mesh position={[0.02, 0, 0.155]}>
        <boxGeometry args={[0.008, 0.18, 0.055]} />
        {glass}
      </mesh>
      {/* Small side windows */}
      <mesh position={[-0.08, 0.101, 0.145]}>
        <boxGeometry args={[0.16, 0.004, 0.045]} />
        {glass}
      </mesh>
      <mesh position={[-0.08, -0.101, 0.145]}>
        <boxGeometry args={[0.16, 0.004, 0.045]} />
        {glass}
      </mesh>
      {/* Pop-up headlight covers - closed */}
      <mesh position={[0.32, 0.065, 0.06]}>
        <boxGeometry args={[0.025, 0.045, 0.018]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.32, -0.065, 0.06]}>
        <boxGeometry args={[0.025, 0.045, 0.018]} />
        {bodyMat}
      </mesh>
      {/* Hidden lights glow */}
      <mesh position={[0.31, 0.065, 0.06]}>
        <boxGeometry args={[0.005, 0.035, 0.015]} />
        {lightGlow("#ffffe0")}
      </mesh>
      <mesh position={[0.31, -0.065, 0.06]}>
        <boxGeometry args={[0.005, 0.035, 0.015]} />
        {lightGlow("#ffffe0")}
      </mesh>
      {/* Round taillights - classic Ferrari */}
      <mesh position={[-0.31, 0.065, 0.105]}>
        <cylinderGeometry args={[0.022, 0.022, 0.012, 12]} />
        {lightGlow("#ff0000")}
      </mesh>
      <mesh position={[-0.31, -0.065, 0.105]}>
        <cylinderGeometry args={[0.022, 0.022, 0.012, 12]} />
        {lightGlow("#ff0000")}
      </mesh>
      {/* Small round lights inside */}
      <mesh position={[-0.312, 0.065, 0.105]}>
        <cylinderGeometry args={[0.012, 0.012, 0.015, 8]} />
        {lightGlow("#ff3333")}
      </mesh>
      <mesh position={[-0.312, -0.065, 0.105]}>
        <cylinderGeometry args={[0.012, 0.012, 0.015, 8]} />
        {lightGlow("#ff3333")}
      </mesh>
      {/* Massive rear wing - iconic */}
      <mesh position={[-0.36, 0, 0.135]}>
        <boxGeometry args={[0.03, 0.28, 0.015]} />
        {carbonMat}
      </mesh>
      {/* Wing endplates */}
      <mesh position={[-0.36, 0.135, 0.12]}>
        <boxGeometry args={[0.025, 0.008, 0.04]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.36, -0.135, 0.12]}>
        <boxGeometry args={[0.025, 0.008, 0.04]} />
        {carbonMat}
      </mesh>
      {/* Wing supports */}
      <mesh position={[-0.34, 0.1, 0.11]}>
        <boxGeometry args={[0.02, 0.008, 0.035]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.34, -0.1, 0.11]}>
        <boxGeometry args={[0.02, 0.008, 0.035]} />
        {carbonMat}
      </mesh>
      {/* Large NACA ducts - F40 signature */}
      <mesh position={[0.02, 0.13, 0.075]}>
        <boxGeometry args={[0.08, 0.012, 0.04]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.02, -0.13, 0.075]}>
        <boxGeometry args={[0.08, 0.012, 0.04]} />
        {carbonMat}
      </mesh>
      {/* Rear engine cover vents */}
      <mesh position={[-0.2, 0, 0.12]}>
        <boxGeometry args={[0.15, 0.16, 0.008]} />
        {carbonMat}
      </mesh>
      {/* Louver slats */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[-0.2, -0.06 + i * 0.03, 0.125]}>
          <boxGeometry args={[0.14, 0.003, 0.005]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      ))}
      {/* Triple exhaust - center */}
      <mesh position={[-0.32, 0.025, 0.07]}>
        <boxGeometry args={[0.02, 0.018, 0.018]} />
        {chrome}
      </mesh>
      <mesh position={[-0.32, 0, 0.07]}>
        <boxGeometry args={[0.02, 0.018, 0.018]} />
        {chrome}
      </mesh>
      <mesh position={[-0.32, -0.025, 0.07]}>
        <boxGeometry args={[0.02, 0.018, 0.018]} />
        {chrome}
      </mesh>
      {/* Front spoiler lip */}
      <mesh position={[0.38, 0, 0.04]}>
        <boxGeometry args={[0.015, 0.18, 0.008]} />
        {carbonMat}
      </mesh>
      {/* Side mirrors - small */}
      <mesh position={[0.05, 0.105, 0.135]}>
        <boxGeometry args={[0.02, 0.012, 0.012]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.05, -0.105, 0.135]}>
        <boxGeometry args={[0.02, 0.012, 0.012]} />
        {bodyMat}
      </mesh>
      {/* Fuel filler cap */}
      <mesh position={[-0.05, 0.13, 0.11]}>
        <cylinderGeometry args={[0.015, 0.015, 0.005, 12]} />
        {chrome}
      </mesh>
    </group>
  )

  // McLaren P1 GTR Style - Extreme Track Detail
  if (type === 2) return (
    <group>
      {/* Teardrop monocoque body */}
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[0.56, 0.22, 0.065]} />
        {bodyMat}
      </mesh>
      {/* Pointed curved nose */}
      <mesh position={[0.27, 0, 0.05]}>
        <boxGeometry args={[0.1, 0.14, 0.05]} />
        {bodyMat}
      </mesh>
      {/* Wide rear with integrated spoiler base */}
      <mesh position={[-0.24, 0, 0.07]}>
        <boxGeometry args={[0.14, 0.22, 0.085]} />
        {bodyMat}
      </mesh>
      {/* Extreme bubble canopy - fighter jet */}
      <mesh position={[-0.08, 0, 0.135]}>
        <boxGeometry args={[0.24, 0.16, 0.075]} />
        {bodyMat}
      </mesh>
      {/* Wraparound glass - extensive */}
      <mesh position={[0.03, 0, 0.165]}>
        <boxGeometry args={[0.008, 0.14, 0.09]} />
        {glass}
      </mesh>
      <mesh position={[-0.08, 0.081, 0.16]}>
        <boxGeometry args={[0.2, 0.004, 0.065]} />
        {glass}
      </mesh>
      <mesh position={[-0.08, -0.081, 0.16]}>
        <boxGeometry args={[0.2, 0.004, 0.065]} />
        {glass}
      </mesh>
      {/* Roof scoop - massive */}
      <mesh position={[-0.06, 0, 0.185]}>
        <boxGeometry args={[0.1, 0.1, 0.025]} />
        {carbonMat}
      </mesh>
      {/* Scoop intake */}
      <mesh position={[-0.02, 0, 0.195]}>
        <boxGeometry args={[0.06, 0.06, 0.005]} />
        <meshStandardMaterial color="#080808" />
      </mesh>
      {/* Slim LED headlights */}
      <mesh position={[0.29, 0.085, 0.055]}>
        <boxGeometry args={[0.015, 0.02, 0.008]} />
        {lightGlow("#ffffff")}
      </mesh>
      <mesh position={[0.29, -0.085, 0.055]}>
        <boxGeometry args={[0.015, 0.02, 0.008]} />
        {lightGlow("#ffffff")}
      </mesh>
      {/* Daytime running light strips */}
      <mesh position={[0.28, 0.075, 0.06]}>
        <boxGeometry args={[0.02, 0.003, 0.012]} />
        {lightGlow("#ccffff")}
      </mesh>
      <mesh position={[0.28, -0.075, 0.06]}>
        <boxGeometry args={[0.02, 0.003, 0.012]} />
        {lightGlow("#ccffff")}
      </mesh>
      {/* Full width animated rear light */}
      <mesh position={[-0.29, 0, 0.105]}>
        <boxGeometry args={[0.015, 0.2, 0.008]} />
        {lightGlow("#ff2222")}
      </mesh>
      {/* Light segments */}
      {[...Array(7)].map((_, i) => (
        <mesh key={i} position={[-0.292, -0.09 + i * 0.03, 0.108]}>
          <boxGeometry args={[0.008, 0.002, 0.005]} />
          {lightGlow("#ff4444")}
        </mesh>
      ))}
      {/* Massive fixed rear wing - GTR */}
      <mesh position={[-0.38, 0, 0.155]}>
        <boxGeometry args={[0.04, 0.26, 0.012]} />
        {carbonMat}
      </mesh>
      {/* Swan neck mounts */}
      <mesh position={[-0.34, 0.12, 0.135]}>
        <boxGeometry args={[0.03, 0.008, 0.035]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.34, -0.12, 0.135]}>
        <boxGeometry args={[0.03, 0.008, 0.035]} />
        {carbonMat}
      </mesh>
      {/* Wing endplates with logos */}
      <mesh position={[-0.38, 0.13, 0.145]}>
        <boxGeometry args={[0.035, 0.008, 0.03]} />
        {bodyMat}
      </mesh>
      <mesh position={[-0.38, -0.13, 0.145]}>
        <boxGeometry args={[0.035, 0.008, 0.03]} />
        {bodyMat}
      </mesh>
      {/* Dihedral door blades - signature */}
      <mesh position={[0.04, 0.115, 0.075]}>
        <boxGeometry args={[0.14, 0.008, 0.045]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.04, -0.115, 0.075]}>
        <boxGeometry args={[0.14, 0.008, 0.045]} />
        {carbonMat}
      </mesh>
      {/* Blade detail lines */}
      <mesh position={[0.04, 0.118, 0.075]}>
        <boxGeometry args={[0.12, 0.002, 0.035]} />
        {chrome}
      </mesh>
      <mesh position={[0.04, -0.118, 0.075]}>
        <boxGeometry args={[0.12, 0.002, 0.035]} />
        {chrome}
      </mesh>
      {/* Twin top-mount exhausts - GTR style */}
      <mesh position={[-0.32, 0.035, 0.095]}>
        <boxGeometry args={[0.02, 0.022, 0.022]} />
        {chrome}
      </mesh>
      <mesh position={[-0.32, -0.035, 0.095]}>
        <boxGeometry args={[0.02, 0.022, 0.022]} />
        {chrome}
      </mesh>
      {/* Exhaust heat shields */}
      <mesh position={[-0.3, 0.035, 0.09]}>
        <boxGeometry args={[0.015, 0.03, 0.015]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.3, -0.035, 0.09]}>
        <boxGeometry args={[0.015, 0.03, 0.015]} />
        {carbonMat}
      </mesh>
      {/* Front splitter with canards */}
      <mesh position={[0.33, 0, 0.04]}>
        <boxGeometry args={[0.02, 0.18, 0.008]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.32, 0.08, 0.045]}>
        <boxGeometry args={[0.015, 0.008, 0.02]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.32, -0.08, 0.045]}>
        <boxGeometry args={[0.015, 0.008, 0.02]} />
        {carbonMat}
      </mesh>
      {/* Side skirts - deep */}
      <mesh position={[0.02, 0.115, 0.04]}>
        <boxGeometry args={[0.45, 0.01, 0.012]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.02, -0.115, 0.04]}>
        <boxGeometry args={[0.45, 0.01, 0.012]} />
        {carbonMat}
      </mesh>
      {/* Rear diffuser - aggressive */}
      <mesh position={[-0.32, 0, 0.045]}>
        <boxGeometry args={[0.02, 0.2, 0.018]} />
        {carbonMat}
      </mesh>
      {/* Diffuser fins */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[-0.32, -0.06 + i * 0.04, 0.05]}>
          <boxGeometry args={[0.015, 0.003, 0.02]} />
          {carbonMat}
        </mesh>
      ))}
      {/* Telemetry antenna */}
      <mesh position={[-0.25, 0, 0.18]}>
        <boxGeometry args={[0.003, 0.003, 0.025]} />
        {chrome}
      </mesh>
    </group>
  )

  // Bugatti Chiron Super Sport Style - Luxury Detail
  if (type === 3) return (
    <group>
      {/* Wide majestic body - sculpted */}
      <mesh position={[0, 0, 0.065]}>
        <boxGeometry args={[0.54, 0.28, 0.085]} />
        {bodyMat}
      </mesh>
      {/* Iconic horseshoe grille - pronounced */}
      <mesh position={[0.24, 0, 0.065]}>
        <boxGeometry args={[0.14, 0.2, 0.075]} />
        {bodyMat}
      </mesh>
      {/* Grille center bar */}
      <mesh position={[0.3, 0, 0.065]}>
        <boxGeometry args={[0.02, 0.12, 0.065]} />
        {chrome}
      </mesh>
      {/* Grille mesh pattern simulation */}
      <mesh position={[0.28, 0.04, 0.065]}>
        <boxGeometry args={[0.015, 0.04, 0.055]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} />
      </mesh>
      <mesh position={[0.28, -0.04, 0.065]}>
        <boxGeometry args={[0.015, 0.04, 0.055]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} />
      </mesh>
      {/* Wide rear quarters - C-shape foundation */}
      <mesh position={[-0.22, 0.09, 0.085]}>
        <boxGeometry args={[0.16, 0.1, 0.11]} />
        {bodyMat}
      </mesh>
      <mesh position={[-0.22, -0.09, 0.085]}>
        <boxGeometry args={[0.16, 0.1, 0.11]} />
        {bodyMat}
      </mesh>
      {/* C-shaped side signature */}
      <mesh position={[-0.18, 0.14, 0.09]}>
        <boxGeometry args={[0.08, 0.015, 0.08]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.22, 0.1, 0.09]}>
        <boxGeometry args={[0.015, 0.08, 0.08]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.18, -0.14, 0.09]}>
        <boxGeometry args={[0.08, 0.015, 0.08]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.22, -0.1, 0.09]}>
        <boxGeometry args={[0.015, 0.08, 0.08]} />
        {carbonMat}
      </mesh>
      {/* Elegant cabin */}
      <mesh position={[-0.06, 0, 0.155]}>
        <boxGeometry args={[0.22, 0.22, 0.065]} />
        {bodyMat}
      </mesh>
      {/* Glasshouse - extensive */}
      <mesh position={[0.04, 0, 0.18]}>
        <boxGeometry args={[0.008, 0.2, 0.065]} />
        {glass}
      </mesh>
      <mesh position={[-0.06, 0.111, 0.17]}>
        <boxGeometry args={[0.18, 0.004, 0.055]} />
        {glass}
      </mesh>
      <mesh position={[-0.06, -0.111, 0.17]}>
        <boxGeometry args={[0.18, 0.004, 0.055]} />
        {glass}
      </mesh>
      {/* Quad square headlights - distinctive */}
      <mesh position={[0.29, 0.055, 0.075]}>
        <boxGeometry args={[0.012, 0.028, 0.018]} />
        {lightGlow("#ffffff")}
      </mesh>
      <mesh position={[0.29, -0.055, 0.075]}>
        <boxGeometry args={[0.012, 0.028, 0.018]} />
        {lightGlow("#ffffff")}
      </mesh>
      <mesh position={[0.29, 0.1, 0.075]}>
        <boxGeometry args={[0.012, 0.022, 0.018]} />
        {lightGlow("#ffffff")}
      </mesh>
      <mesh position={[0.29, -0.1, 0.075]}>
        <boxGeometry args={[0.012, 0.022, 0.018]} />
        {lightGlow("#ffffff")}
      </mesh>
      {/* Inner light detail */}
      <mesh position={[0.285, 0.055, 0.078]}>
        <boxGeometry args={[0.005, 0.02, 0.012]} />
        {lightGlow("#ccddff")}
      </mesh>
      <mesh position={[0.285, -0.055, 0.078]}>
        <boxGeometry args={[0.005, 0.02, 0.012]} />
        {lightGlow("#ccddff")}
      </mesh>
      {/* Full width light bar with logo space */}
      <mesh position={[-0.29, 0, 0.115]}>
        <boxGeometry args={[0.015, 0.24, 0.008]} />
        {lightGlow("#ff1a1a")}
      </mesh>
      {/* Light segments */}
      {[...Array(9)].map((_, i) => (
        <mesh key={i} position={[-0.292, -0.1 + i * 0.025, 0.118]}>
          <boxGeometry args={[0.01, 0.003, 0.005]} />
          {lightGlow("#ff4444")}
        </mesh>
      ))}
      {/* EB logo placeholder */}
      <mesh position={[-0.28, 0, 0.12]}>
        <boxGeometry args={[0.005, 0.03, 0.02]} />
        {chrome}
      </mesh>
      {/* Active rear wing - wide */}
      <mesh position={[-0.36, 0, 0.165]}>
        <boxGeometry args={[0.035, 0.28, 0.012]} />
        {bodyMat}
      </mesh>
      {/* Wing supports */}
      <mesh position={[-0.32, 0.12, 0.145]}>
        <boxGeometry args={[0.025, 0.008, 0.035]} />
        {bodyMat}
      </mesh>
      <mesh position={[-0.32, -0.12, 0.145]}>
        <boxGeometry args={[0.025, 0.008, 0.035]} />
        {bodyMat}
      </mesh>
      {/* Quad exhaust - signature */}
      <mesh position={[-0.3, 0.045, 0.075]}>
        <boxGeometry args={[0.018, 0.025, 0.022]} />
        {chrome}
      </mesh>
      <mesh position={[-0.3, -0.045, 0.075]}>
        <boxGeometry args={[0.018, 0.025, 0.022]} />
        {chrome}
      </mesh>
      <mesh position={[-0.3, 0.015, 0.075]}>
        <boxGeometry args={[0.018, 0.02, 0.022]} />
        {chrome}
      </mesh>
      <mesh position={[-0.3, -0.015, 0.075]}>
        <boxGeometry args={[0.018, 0.02, 0.022]} />
        {chrome}
      </mesh>
      {/* Exhaust surround */}
      <mesh position={[-0.28, 0, 0.07]}>
        <boxGeometry args={[0.015, 0.12, 0.015]} />
        {carbonMat}
      </mesh>
      {/* Side vents - long */}
      <mesh position={[0.04, 0.14, 0.08]}>
        <boxGeometry args={[0.12, 0.01, 0.05]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.04, -0.14, 0.08]}>
        <boxGeometry args={[0.12, 0.01, 0.05]} />
        {carbonMat}
      </mesh>
      {/* Vent slats */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0.04, 0.142, 0.075 + i * 0.012]}>
          <boxGeometry args={[0.1, 0.002, 0.003]} />
          {chrome}
        </mesh>
      ))}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0.04, -0.138, 0.075 + i * 0.012]}>
          <boxGeometry args={[0.1, 0.002, 0.003]} />
          {chrome}
        </mesh>
      ))}
      {/* Fuel cap - special */}
      <mesh position={[0.08, 0.14, 0.1]}>
        <cylinderGeometry args={[0.018, 0.018, 0.005, 16]} />
        {chrome}
      </mesh>
      <mesh position={[0.08, 0.14, 0.102]}>
        <cylinderGeometry args={[0.012, 0.012, 0.003, 12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Chrome side accent */}
      <mesh position={[0, 0.142, 0.085]}>
        <boxGeometry args={[0.5, 0.003, 0.003]} />
        {chrome}
      </mesh>
      <mesh position={[0, -0.142, 0.085]}>
        <boxGeometry args={[0.5, 0.003, 0.003]} />
        {chrome}
      </mesh>
    </group>
  )

  // Porsche 911 GT3 RS Style - Track Focused Detail
  return (
    <group>
      {/* Classic 911 flyline - timeless */}
      <mesh position={[0.06, 0, 0.055]}>
        <boxGeometry args={[0.46, 0.23, 0.065]} />
        {bodyMat}
      </mesh>
      {/* Long sloping hood - iconic */}
      <mesh position={[0.26, 0, 0.05]}>
        <boxGeometry args={[0.12, 0.17, 0.055]} />
        {bodyMat}
      </mesh>
      {/* Hood creases */}
      <mesh position={[0.18, 0.06, 0.07]}>
        <boxGeometry args={[0.15, 0.008, 0.005]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.18, -0.06, 0.07]}>
        <boxGeometry args={[0.15, 0.008, 0.005]} />
        {bodyMat}
      </mesh>
      {/* Rounded flowing rear - 911 signature */}
      <mesh position={[-0.2, 0, 0.08]}>
        <boxGeometry args={[0.12, 0.22, 0.085]} />
        {bodyMat}
      </mesh>
      {/* Wide rear fenders */}
      <mesh position={[-0.22, 0.08, 0.085]}>
        <boxGeometry args={[0.1, 0.06, 0.09]} />
        {bodyMat}
      </mesh>
      <mesh position={[-0.22, -0.08, 0.085]}>
        <boxGeometry args={[0.1, 0.06, 0.09]} />
        {bodyMat}
      </mesh>
      {/* Curved roof with gentle slope */}
      <mesh position={[-0.1, 0, 0.14]}>
        <boxGeometry args={[0.2, 0.2, 0.045]} />
        {bodyMat}
      </mesh>
      {/* Gently sloping windshield */}
      <mesh position={[0.02, 0, 0.16]}>
        <boxGeometry args={[0.008, 0.18, 0.05]} />
        {glass}
      </mesh>
      <mesh position={[-0.1, 0.101, 0.15]}>
        <boxGeometry args={[0.18, 0.004, 0.04]} />
        {glass}
      </mesh>
      <mesh position={[-0.1, -0.101, 0.15]}>
        <boxGeometry args={[0.18, 0.004, 0.04]} />
        {glass}
      </mesh>
      {/* Classic round headlights - LED rings */}
      <mesh position={[0.29, 0.065, 0.06]}>
        <boxGeometry args={[0.015, 0.038, 0.02]} />
        {lightGlow("#ffffff")}
      </mesh>
      <mesh position={[0.29, -0.065, 0.06]}>
        <boxGeometry args={[0.015, 0.038, 0.02]} />
        {lightGlow("#ffffff")}
      </mesh>
      {/* Inner light detail - 4-point LED */}
      <mesh position={[0.285, 0.055, 0.065]}>
        <boxGeometry args={[0.005, 0.008, 0.008]} />
        {lightGlow("#ccffff")}
      </mesh>
      <mesh position={[0.285, 0.075, 0.065]}>
        <boxGeometry args={[0.005, 0.008, 0.008]} />
        {lightGlow("#ccffff")}
      </mesh>
      <mesh position={[0.285, -0.055, 0.065]}>
        <boxGeometry args={[0.005, 0.008, 0.008]} />
        {lightGlow("#ccffff")}
      </mesh>
      <mesh position={[0.285, -0.075, 0.065]}>
        <boxGeometry args={[0.005, 0.008, 0.008]} />
        {lightGlow("#ccffff")}
      </mesh>
      {/* Full width rear light bar - modern */}
      <mesh position={[-0.26, 0, 0.11]}>
        <boxGeometry args={[0.015, 0.22, 0.008]} />
        {lightGlow("#ff3333")}
      </mesh>
      {/* Light segments */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[-0.262, -0.09 + i * 0.026, 0.113]}>
          <boxGeometry args={[0.008, 0.003, 0.004]} />
          {lightGlow("#ff5555")}
        </mesh>
      ))}
      {/* Porsche lettering space */}
      <mesh position={[-0.24, 0, 0.115]}>
        <boxGeometry args={[0.005, 0.08, 0.005]} />
        {chrome}
      </mesh>
      {/* Massive swan neck wing - GT3 RS */}
      <mesh position={[-0.32, 0, 0.145]}>
        <boxGeometry args={[0.04, 0.24, 0.01]} />
        {carbonMat}
      </mesh>
      {/* Wing endplates with louvers */}
      <mesh position={[-0.32, 0.12, 0.135]}>
        <boxGeometry args={[0.035, 0.008, 0.025]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.32, -0.12, 0.135]}>
        <boxGeometry args={[0.035, 0.008, 0.025]} />
        {carbonMat}
      </mesh>
      {/* Endplate louvers */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-0.32, 0.12, 0.13 + i * 0.008]}>
          <boxGeometry args={[0.03, 0.002, 0.003]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      ))}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-0.32, -0.12, 0.13 + i * 0.008]}>
          <boxGeometry args={[0.03, 0.002, 0.003]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      ))}
      {/* Wing supports - swan neck style */}
      <mesh position={[-0.29, 0.1, 0.125]}>
        <boxGeometry args={[0.025, 0.008, 0.035]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.29, -0.1, 0.125]}>
        <boxGeometry args={[0.025, 0.008, 0.035]} />
        {carbonMat}
      </mesh>
      {/* NACA ducts on rear fenders */}
      <mesh position={[-0.15, 0.115, 0.095]}>
        <boxGeometry args={[0.06, 0.008, 0.025]} />
        {carbonMat}
      </mesh>
      <mesh position={[-0.15, -0.115, 0.095]}>
        <boxGeometry args={[0.06, 0.008, 0.025]} />
        {carbonMat}
      </mesh>
      {/* Side intakes - functional */}
      <mesh position={[0.04, 0.12, 0.075]}>
        <boxGeometry args={[0.1, 0.008, 0.035]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.04, -0.12, 0.075]}>
        <boxGeometry args={[0.1, 0.008, 0.035]} />
        {carbonMat}
      </mesh>
      {/* Intake slats */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[0.04, 0.122, 0.065 + i * 0.01]}>
          <boxGeometry args={[0.08, 0.002, 0.002]} />
          {chrome}
        </mesh>
      ))}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[0.04, -0.118, 0.065 + i * 0.01]}>
          <boxGeometry args={[0.08, 0.002, 0.002]} />
          {chrome}
        </mesh>
      ))}
      {/* Center twin exhaust - sport */}
      <mesh position={[-0.27, 0.02, 0.065]}>
        <boxGeometry args={[0.018, 0.018, 0.018]} />
        {chrome}
      </mesh>
      <mesh position={[-0.27, -0.02, 0.065]}>
        <boxGeometry args={[0.018, 0.018, 0.018]} />
        {chrome}
      </mesh>
      {/* Exhaust tips detail */}
      <mesh position={[-0.272, 0.02, 0.07]}>
        <boxGeometry args={[0.012, 0.012, 0.005]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.272, -0.02, 0.07]}>
        <boxGeometry args={[0.012, 0.012, 0.005]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Front spoiler lip */}
      <mesh position={[0.33, 0, 0.04]}>
        <boxGeometry args={[0.02, 0.16, 0.008]} />
        {carbonMat}
      </mesh>
      {/* Side skirts - RS style */}
      <mesh position={[0.04, 0.118, 0.04]}>
        <boxGeometry args={[0.45, 0.01, 0.012]} />
        {carbonMat}
      </mesh>
      <mesh position={[0.04, -0.118, 0.04]}>
        <boxGeometry args={[0.45, 0.01, 0.012]} />
        {carbonMat}
      </mesh>
      {/* Rear diffuser */}
      <mesh position={[-0.28, 0, 0.05]}>
        <boxGeometry args={[0.02, 0.18, 0.015]} />
        {carbonMat}
      </mesh>
      {/* RS badge area */}
      <mesh position={[-0.22, 0.115, 0.1]}>
        <boxGeometry args={[0.03, 0.008, 0.015]} />
        {carbonMat}
      </mesh>
      {/* Mirror caps - sporty */}
      <mesh position={[0.04, 0.11, 0.145]}>
        <boxGeometry args={[0.025, 0.015, 0.018]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.04, -0.11, 0.145]}>
        <boxGeometry args={[0.025, 0.015, 0.018]} />
        {bodyMat}
      </mesh>
    </group>
  )
}

function Car({ carId, startX, startY, startDir, color, type }) {
  const groupRef = useRef(), carRef = useRef()
  const cellSize = 80 / 50, maxCell = 25
  const getRotation = (d) => [0, Math.PI, Math.PI / 2, -Math.PI / 2][d] || 0
  
  // Materials for wheels
  const brakeDisc = <meshStandardMaterial color="#8B4513" metalness={0.7} roughness={0.4} />
  const chrome = <meshStandardMaterial color="#f0f0f0" metalness={1} roughness={0.05} />

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
        {/* Ultra-realistic wheels with detailed rims */}
        {[[0.15, 0.11], [0.15, -0.11], [-0.15, -0.11], [-0.15, 0.11]].map(([x, y], i) => (
          <group key={i} position={[x, y, 0.025]}>
            {/* Tire with sidewall */}
            <mesh>
              <cylinderGeometry args={[0.045, 0.045, 0.04, 20]} />
              <meshStandardMaterial color="#080808" roughness={0.95} metalness={0.05} />
            </mesh>
            {/* Tire sidewall bulge */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.048, 0.048, 0.025, 20]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
            </mesh>
            {/* Brake disc - visible behind rim */}
            <mesh position={[0, 0, 0.008]}>
              <cylinderGeometry args={[0.032, 0.032, 0.005, 16]} />
              {brakeDisc}
            </mesh>
            {/* Brake caliper */}
            <mesh position={[0.025, 0, 0.012]}>
              <boxGeometry args={[0.015, 0.025, 0.012]} />
              <meshStandardMaterial color="#cc0000" metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Outer rim barrel */}
            <mesh position={[0, 0, 0.018]}>
              <cylinderGeometry args={[0.03, 0.03, 0.015, 16]} />
              <meshStandardMaterial color="#d0d0d0" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* Rim lip */}
            <mesh position={[0, 0, 0.025]}>
              <cylinderGeometry args={[0.032, 0.032, 0.005, 16]} />
              <meshStandardMaterial color="#e8e8e8" metalness={1} roughness={0.05} />
            </mesh>
            {/* Multi-spoke design */}
            {[...Array(7)].map((_, j) => {
              const angle = (j / 7) * Math.PI * 2
              const spokeX = Math.cos(angle) * 0.018
              const spokeY = Math.sin(angle) * 0.018
              return (
                <mesh key={j} position={[spokeX, spokeY, 0.028]} rotation={[0, 0, angle]}>
                  <boxGeometry args={[0.022, 0.004, 0.003]} />
                  <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.15} />
                </mesh>
              )
            })}
            {/* Center cap */}
            <mesh position={[0, 0, 0.032]}>
              <cylinderGeometry args={[0.008, 0.008, 0.004, 12]} />
              {chrome}
            </mesh>
            {/* Lug nuts */}
            {[...Array(5)].map((_, j) => {
              const angle = (j / 5) * Math.PI * 2 + 0.3
              const nutX = Math.cos(angle) * 0.012
              const nutY = Math.sin(angle) * 0.012
              return (
                <mesh key={j} position={[nutX, nutY, 0.034]}>
                  <cylinderGeometry args={[0.003, 0.003, 0.003, 6]} />
                  <meshStandardMaterial color="#a0a0a0" metalness={0.8} />
                </mesh>
              )
            })}
          </group>
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

// Realistic supercar colors - metallic paints
const colors = [
  '#D4AF37',  // Gold metallic
  '#C0C0C0',  // Silver metallic  
  '#DC143C',  // Ferrari Red
  '#1a1a2e',  // Midnight Black
  '#FF4500',  // Lamborghini Orange
  '#00CED1',  // Electric Blue
  '#FFFFFF',  // Pearl White
  '#32CD32',  // Lime Green
  '#FFD700',  // Yellow Gold
  '#FF1493',  // Hot Pink
  '#4169E1',  // Royal Blue
  '#800080',  // Purple
]
const starts = colors.map((_, i) => ({ x: ((i % 4) - 2) * 5, y: (Math.floor(i / 4) - 1) * 5, dir: i % 4 }))

export default function ThreeBackground() {
  useEffect(() => {
    carPositions.clear()
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[15, 15, 8]} intensity={1.5} castShadow />
        <directionalLight position={[-10, 10, 5]} intensity={0.8} color="#e8f4ff" />
        <pointLight position={[-15, -10, 8]} intensity={0.6} color="#ffffff" />
        <pointLight position={[10, -5, 5]} intensity={0.4} color="#fff8e7" />
        <spotLight position={[0, 25, 12]} angle={0.4} penumbra={0.6} intensity={1} />
        <spotLight position={[8, 0, 8]} angle={0.5} penumbra={0.4} intensity={0.5} color="#ccddff" />
        <GridPlane />
        <Particles />
        {colors.map((c, i) => <Car key={i} carId={i} startX={starts[i].x} startY={starts[i].y} startDir={starts[i].dir} color={c} type={i % 5} />)}
      </Canvas>
    </div>
  )
}
