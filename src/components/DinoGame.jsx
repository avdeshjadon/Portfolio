import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Constants ──────────────────────────────────────────────────────────────
const CANVAS_W = 800
const CANVAS_H = 220
const GROUND_Y = 175
const GRAVITY = 0.65
const JUMP_FORCE = -12.5
const INITIAL_SPEED = 4.5
const MAX_SPEED = 12
const SPEED_INCREMENT = 0.001

// ─── Fixed Light Theme Colors ───────────────────────────────────────────────
const COLORS = {
  bg: '#fafafa',
  runner: '#1a1a1a',
  runnerAccent: '#3a3a3a',
  obstacle: '#2a2a2a',
  obstacleAccent: '#555',
  ground: '#bbb',
  groundLine: '#999',
  cloud: 'rgba(0,0,0,0.04)',
  particle: '#aaa',
  text: '#1a1a1a',
  textMuted: '#71717A',
  scoreBg: '#1a1a1a',
  scoreText: '#fafafa',
  trail: 'rgba(26,26,26,0.08)',
}

// ─── Runner character (geometric cube with face) ────────────────────────────
function drawRunner(ctx, x, y, size, rotation, isJumping, isDucking, isDead, frame) {
  ctx.save()
  const cx = x + size / 2
  const cy = y + size / 2

  ctx.translate(cx, cy)
  ctx.rotate(rotation)

  const s = isDucking ? size * 0.6 : size

  // Shadow under character
  ctx.fillStyle = 'rgba(0,0,0,0.08)'
  ctx.beginPath()
  ctx.ellipse(0, s / 2 + 4, s * 0.5, 3, 0, 0, Math.PI * 2)
  ctx.fill()

  // Main body — rounded square
  ctx.fillStyle = COLORS.runner
  ctx.beginPath()
  ctx.roundRect(-s / 2, -s / 2, s, s, isDucking ? 4 : 6)
  ctx.fill()

  // Inner shine — top left
  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  ctx.beginPath()
  ctx.roundRect(-s / 2 + 3, -s / 2 + 3, s * 0.35, s * 0.25, 3)
  ctx.fill()

  // Eyes
  const eyeOffY = isDucking ? 0 : -2
  const eyeSize = isDucking ? 3 : 4

  if (isDead) {
    // X eyes
    ctx.strokeStyle = COLORS.bg
    ctx.lineWidth = 2
    // Left X
    ctx.beginPath()
    ctx.moveTo(-6, eyeOffY - 3); ctx.lineTo(-2, eyeOffY + 3)
    ctx.moveTo(-2, eyeOffY - 3); ctx.lineTo(-6, eyeOffY + 3)
    ctx.stroke()
    // Right X
    ctx.beginPath()
    ctx.moveTo(2, eyeOffY - 3); ctx.lineTo(6, eyeOffY + 3)
    ctx.moveTo(6, eyeOffY - 3); ctx.lineTo(2, eyeOffY + 3)
    ctx.stroke()
  } else {
    ctx.fillStyle = COLORS.bg
    // Left eye
    ctx.beginPath()
    ctx.roundRect(-7, eyeOffY - eyeSize / 2, eyeSize, eyeSize, 1)
    ctx.fill()
    // Right eye
    ctx.beginPath()
    ctx.roundRect(3, eyeOffY - eyeSize / 2, eyeSize, eyeSize, 1)
    ctx.fill()

    // Pupils — look forward when running
    ctx.fillStyle = COLORS.runner
    const pupilOff = isJumping ? -1 : 1
    ctx.fillRect(-6 + pupilOff, eyeOffY - 1, 2, 2)
    ctx.fillRect(4 + pupilOff, eyeOffY - 1, 2, 2)
  }

  // Mouth
  if (!isDucking) {
    ctx.strokeStyle = COLORS.bg
    ctx.lineWidth = 1.5
    ctx.beginPath()
    if (isDead) {
      // Sad mouth
      ctx.arc(0, 8, 4, Math.PI * 1.2, Math.PI * 1.8)
    } else if (isJumping) {
      // Excited open mouth
      ctx.arc(0, 6, 3, 0, Math.PI)
    } else {
      // Smile
      ctx.arc(0, 5, 3.5, 0.1, Math.PI - 0.1)
    }
    ctx.stroke()
  }

  // Tiny legs (when grounded)
  if (!isJumping && !isDead) {
    ctx.fillStyle = COLORS.runner
    const legOffset = Math.sin(frame * 0.4) * 3
    // Left leg
    ctx.fillRect(-5, s / 2, 4, 5 + legOffset)
    ctx.fillRect(-6, s / 2 + 4 + legOffset, 5, 2)
    // Right leg
    ctx.fillRect(2, s / 2, 4, 5 - legOffset)
    ctx.fillRect(1, s / 2 + 4 - legOffset, 5, 2)
  }

  ctx.restore()
}

// ─── Obstacle: Geometric spike pillars in various sizes ──────────────────
function drawObstacle(ctx, obs) {
  const x = obs.x
  const y = GROUND_Y

  // Draw a single spike pillar
  const drawPillar = (px, w, h) => {
    // Main pillar body
    ctx.fillStyle = COLORS.obstacle
    ctx.beginPath()
    ctx.roundRect(px, y - h, w, h, [3, 3, 0, 0])
    ctx.fill()

    // Top spike triangle
    ctx.beginPath()
    ctx.moveTo(px - 2, y - h)
    ctx.lineTo(px + w / 2, y - h - Math.min(12, h * 0.3))
    ctx.lineTo(px + w + 2, y - h)
    ctx.closePath()
    ctx.fill()

    // Inner accent line
    ctx.strokeStyle = COLORS.bg
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(px + w / 2, y - h - Math.min(6, h * 0.15))
    ctx.lineTo(px + w / 2, y - 4)
    ctx.stroke()

    // Horizontal notch marks
    ctx.lineWidth = 1
    const notchCount = Math.floor(h / 14)
    for (let i = 1; i <= notchCount; i++) {
      const ny = y - i * 14
      ctx.beginPath()
      ctx.moveTo(px + 2, ny)
      ctx.lineTo(px + w - 2, ny)
      ctx.stroke()
    }

    // Base shadow
    ctx.fillStyle = 'rgba(0,0,0,0.06)'
    ctx.beginPath()
    ctx.ellipse(px + w / 2, y + 2, w * 0.6, 2.5, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  if (obs.size === 'short') {
    // Short single pillar — easy to jump
    drawPillar(x, 12, 24)
  } else if (obs.size === 'medium') {
    // Medium pillar
    drawPillar(x, 14, 38)
  } else if (obs.size === 'tall') {
    // Tall single pillar — need good timing
    drawPillar(x, 16, 54)
  } else if (obs.size === 'double') {
    // Double cluster — two pillars side by side
    drawPillar(x, 12, 36)
    drawPillar(x + 20, 10, 26)
  } else if (obs.size === 'wide') {
    // Wide low block — three short pillars clustered
    drawPillar(x, 10, 22)
    drawPillar(x + 14, 12, 30)
    drawPillar(x + 30, 10, 20)
  }
}

// ─── Cloud ──────────────────────────────────────────────────────────────────
function drawCloud(ctx, x, y) {
  ctx.fillStyle = COLORS.cloud
  ctx.beginPath()
  ctx.ellipse(x, y, 22, 9, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(x + 18, y - 4, 15, 8, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(x - 16, y + 2, 13, 7, 0, 0, Math.PI * 2)
  ctx.fill()
}

// ─── Particle ───────────────────────────────────────────────────────────────
class Particle {
  constructor(x, y, vx, vy, size, life) {
    this.x = x; this.y = y
    this.vx = vx ?? -(Math.random() * 2 + 0.5)
    this.vy = vy ?? -(Math.random() * 1.5 + 0.5)
    this.life = life ?? 1
    this.decay = Math.random() * 0.03 + 0.02
    this.size = size ?? Math.random() * 3 + 1
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.06
    this.life -= this.decay
  }
  draw(ctx) {
    ctx.globalAlpha = this.life * 0.5
    ctx.fillStyle = COLORS.particle
    ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.globalAlpha = 1
  }
}

// ─── Trail ring (jump trail) ────────────────────────────────────────────────
class TrailRing {
  constructor(x, y) {
    this.x = x; this.y = y
    this.radius = 4
    this.maxRadius = 16
    this.life = 1
  }
  update() {
    this.radius += 0.8
    this.life -= 0.05
  }
  draw(ctx) {
    if (this.life <= 0) return
    ctx.globalAlpha = this.life * 0.15
    ctx.strokeStyle = COLORS.runner
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.globalAlpha = 1
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function DinoGame() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const gameRef = useRef(null)
  const animFrameRef = useRef(null)
  const [gameState, setGameState] = useState('idle') // idle | playing | dead
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('cubeRunnerHS') || '0') } catch { return 0 }
  })

  const RUNNER_SIZE = 26

  // ─── Initialize game state ─────────────────────────────────────────────
  const initGame = useCallback(() => {
    gameRef.current = {
      runner: {
        x: 60, y: GROUND_Y - RUNNER_SIZE,
        vy: 0, grounded: true, ducking: false,
        rotation: 0, targetRotation: 0,
        squash: 1, stretch: 1,
      },
      obstacles: [],
      clouds: [
        { x: 150, y: 28 }, { x: 380, y: 48 }, { x: 600, y: 22 }, { x: 750, y: 55 },
      ],
      particles: [],
      trails: [],
      groundOffset: 0,
      speed: INITIAL_SPEED,
      score: 0,
      distance: 0,
      frameCount: 0,
      shakeX: 0, shakeY: 0,
      shakeIntensity: 0,
      nextObstacleDist: 350,
      flash: 0,
      lastMilestone: 0,
    }
  }, [])

  // ─── Collision detection ──────────────────────────────────────────────
  const checkCollision = useCallback((runner, obs) => {
    const pad = 5
    const rs = runner.ducking ? RUNNER_SIZE * 0.6 : RUNNER_SIZE
    const r1 = {
      x: runner.x + pad,
      y: runner.y + (RUNNER_SIZE - rs) + pad,
      w: RUNNER_SIZE - pad * 2,
      h: rs - pad * 2
    }

    // Hitboxes per obstacle size
    const hitboxes = {
      short:  { x: obs.x + 1, y: GROUND_Y - 24 - 8, w: 10, h: 24 + 8 },
      medium: { x: obs.x + 1, y: GROUND_Y - 38 - 10, w: 12, h: 38 + 10 },
      tall:   { x: obs.x + 1, y: GROUND_Y - 54 - 10, w: 14, h: 54 + 10 },
      double: { x: obs.x, y: GROUND_Y - 36 - 8, w: 30, h: 36 + 8 },
      wide:   { x: obs.x, y: GROUND_Y - 30 - 8, w: 40, h: 30 + 8 },
    }
    const r2 = hitboxes[obs.size] || hitboxes.medium

    return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x &&
           r1.y < r2.y + r2.h && r1.y + r1.h > r2.y
  }, [])

  // ─── Vibration helper ───────────────────────────────────────────────────
  const vibrate = useCallback((pattern) => {
    if (navigator.vibrate) navigator.vibrate(pattern)
  }, [])

  // ─── Render frame ─────────────────────────────────────────────────────
  const renderFrame = useCallback((ctx, g, isDead) => {
    const { shakeX, shakeY } = g
    ctx.save()
    ctx.translate(shakeX, shakeY)

    // Background
    ctx.fillStyle = COLORS.bg
    ctx.fillRect(-10, -10, CANVAS_W + 20, CANVAS_H + 20)

    // Flash effect on milestone
    if (g.flash > 0) {
      ctx.fillStyle = `rgba(0,0,0,${g.flash / 600})`
      ctx.fillRect(-10, -10, CANVAS_W + 20, CANVAS_H + 20)
    }

    // Clouds
    g.clouds.forEach(c => drawCloud(ctx, c.x, c.y))

    // Distant mountains / hills silhouette
    ctx.fillStyle = 'rgba(0,0,0,0.025)'
    ctx.beginPath()
    ctx.moveTo(0, GROUND_Y)
    for (let i = 0; i <= CANVAS_W; i += 80) {
      const h = 20 + Math.sin((i + g.groundOffset * 0.3) * 0.01) * 15 +
                Math.sin((i + g.groundOffset * 0.3) * 0.023) * 10
      ctx.lineTo(i, GROUND_Y - h)
    }
    ctx.lineTo(CANVAS_W, GROUND_Y)
    ctx.closePath()
    ctx.fill()

    // Ground line
    ctx.strokeStyle = COLORS.groundLine
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, GROUND_Y + 1)
    ctx.lineTo(CANVAS_W, GROUND_Y + 1)
    ctx.stroke()

    // Ground texture (pebbles & dashes)
    ctx.fillStyle = COLORS.ground
    const offset = g.groundOffset
    for (let i = -1; i < CANVAS_W / 18 + 2; i++) {
      const px = i * 18 - (offset % 18)
      ctx.fillRect(px, GROUND_Y + 5, 4 + (i % 3) * 3, 1.2)
      if (i % 3 === 0) {
        ctx.beginPath()
        ctx.arc(px + 8, GROUND_Y + 12, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
      if (i % 5 === 0) {
        ctx.fillRect(px + 3, GROUND_Y + 17, 2.5, 0.8)
      }
    }

    // Trail rings
    g.trails.forEach(t => t.draw(ctx))

    // Particles
    g.particles.forEach(p => p.draw(ctx))

    // Motion trail behind runner
    if (!isDead && g.speed > 6) {
      const trailAlpha = Math.min(0.08, (g.speed - 6) * 0.01)
      ctx.globalAlpha = trailAlpha
      const r = g.runner
      for (let i = 1; i <= 3; i++) {
        ctx.fillStyle = COLORS.runner
        const ts = r.ducking ? RUNNER_SIZE * 0.6 : RUNNER_SIZE
        ctx.beginPath()
        ctx.roundRect(r.x - i * 8, r.y + (RUNNER_SIZE - ts), RUNNER_SIZE, ts, 4)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // Obstacles
    g.obstacles.forEach(obs => {
      drawObstacle(ctx, obs)
    })

    // Runner
    const r = g.runner
    drawRunner(
      ctx, r.x, r.y, RUNNER_SIZE,
      r.rotation, !r.grounded, r.ducking, isDead,
      g.frameCount
    )

    // Score display
    ctx.fillStyle = COLORS.text
    ctx.font = '600 13px "Sora", monospace'
    ctx.textAlign = 'right'
    ctx.fillText(String(g.score).padStart(5, '0'), CANVAS_W - 16, 26)

    // High score
    if (highScore > 0) {
      ctx.globalAlpha = 0.4
      ctx.font = '500 11px "Sora", monospace'
      ctx.fillText(`HI ${String(highScore).padStart(5, '0')}`, CANVAS_W - 80, 26)
      ctx.globalAlpha = 1
    }

    // Game over overlay — subtle, keeps game scene visible
    if (isDead) {
      // Very light semi-transparent overlay so scene shows through
      ctx.fillStyle = 'rgba(250,250,250,0.35)'
      ctx.fillRect(-10, -10, CANVAS_W + 20, CANVAS_H + 20)

      // Text background pill for readability
      ctx.fillStyle = 'rgba(26,26,26,0.9)'
      ctx.beginPath()
      ctx.roundRect(CANVAS_W / 2 - 110, CANVAS_H / 2 - 32, 220, 55, 8)
      ctx.fill()

      ctx.fillStyle = '#fafafa'
      ctx.font = '700 15px "Sora", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('G A M E   O V E R', CANVAS_W / 2, CANVAS_H / 2 - 10)

      ctx.font = '400 10px "Sora", sans-serif'
      ctx.fillStyle = 'rgba(250,250,250,0.6)'
      ctx.fillText('Press SPACE to restart', CANVAS_W / 2, CANVAS_H / 2 + 10)
    }

    ctx.restore()
  }, [highScore])

  // ─── Game loop ────────────────────────────────────────────────────────
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const g = gameRef.current
    if (!g) return

    g.frameCount++
    g.speed = Math.min(MAX_SPEED, g.speed + SPEED_INCREMENT)

    // Runner physics
    const runner = g.runner
    if (!runner.grounded) {
      runner.vy += GRAVITY
      runner.y += runner.vy

      // Duck in air = fast fall
      if (runner.ducking) runner.vy += GRAVITY * 0.4

      // Spin while jumping
      runner.rotation += 0.08

      // Jump trail rings
      if (g.frameCount % 4 === 0) {
        g.trails.push(new TrailRing(runner.x + RUNNER_SIZE / 2, runner.y + RUNNER_SIZE / 2))
      }

      const landY = GROUND_Y - RUNNER_SIZE
      if (runner.y >= landY) {
        runner.y = landY
        runner.vy = 0
        runner.grounded = true
        runner.rotation = 0

        // Landing particles — dust burst
        for (let i = 0; i < 8; i++) {
          g.particles.push(new Particle(
            runner.x + Math.random() * RUNNER_SIZE,
            GROUND_Y - 2,
            (Math.random() - 0.5) * 3,
            -(Math.random() * 2 + 0.5),
            Math.random() * 3 + 1,
          ))
        }
        // Screen micro-shake on landing
        g.shakeIntensity = Math.max(g.shakeIntensity, 2)
        vibrate([15, 5, 10])
      }
    } else {
      const targetY = GROUND_Y - (runner.ducking ? RUNNER_SIZE * 0.6 : RUNNER_SIZE)
      runner.y += (targetY - runner.y) * 0.3
      runner.rotation *= 0.8 // smooth back to 0
    }

    // Running dust
    if (runner.grounded && g.frameCount % 5 === 0) {
      g.particles.push(new Particle(runner.x + 8, GROUND_Y - 1))
    }

    // Update particles
    g.particles = g.particles.filter(p => { p.update(); return p.life > 0 })

    // Update trails
    g.trails = g.trails.filter(t => { t.update(); return t.life > 0 })

    // Ground scroll
    g.groundOffset = (g.groundOffset + g.speed)

    // Clouds
    g.clouds.forEach(c => {
      c.x -= g.speed * 0.2
      if (c.x < -50) { c.x = CANVAS_W + 60 + Math.random() * 100; c.y = Math.random() * 50 + 15 }
    })

    // Score
    g.distance += g.speed
    g.score = Math.floor(g.distance / 10)
    setScore(g.score)

    // Milestone flash
    const milestone = Math.floor(g.score / 100)
    if (milestone > g.lastMilestone && g.score > 0) {
      g.lastMilestone = milestone
      g.flash = 15
      vibrate([40, 30, 40, 30, 60])
    }
    if (g.flash > 0) g.flash--

    // Continuous subtle vibration pulse while running (every ~2 seconds)
    if (g.frameCount % 120 === 0) {
      vibrate(8)
    }

    // Near-miss vibration: if an obstacle passes very close
    g.obstacles.forEach(obs => {
      const passX = runner.x + RUNNER_SIZE + 5
      if (obs.x > passX - g.speed && obs.x <= passX) {
        vibrate([5, 5, 10])
      }
    })

    // Spawn obstacles
    g.nextObstacleDist -= g.speed
    if (g.nextObstacleDist <= 0) {
      const minGap = Math.max(220, 380 - g.speed * 10)
      g.nextObstacleDist = minGap + Math.random() * 180

      // Pick a random size from the pool
      const sizes = ['short', 'medium', 'medium', 'tall', 'double', 'wide']
      const size = sizes[Math.floor(Math.random() * sizes.length)]
      g.obstacles.push({ type: 'ground', x: CANVAS_W + 30, size })
    }

    // Update obstacles & check collision
    let dead = false
    g.obstacles = g.obstacles.filter(obs => {
      obs.x -= g.speed
      if (checkCollision(runner, obs)) dead = true
      return obs.x > -60
    })

    // Handle death
    if (dead) {
      g.shakeIntensity = 12
      vibrate([100, 30, 100, 30, 60, 30, 200])

      // Explosion particles
      for (let i = 0; i < 25; i++) {
        g.particles.push(new Particle(
          runner.x + RUNNER_SIZE / 2,
          runner.y + RUNNER_SIZE / 2,
          (Math.random() - 0.5) * 10,
          -(Math.random() * 8 + 1),
          Math.random() * 5 + 2,
          1.5,
        ))
      }

      setGameState('dead')
      const hs = Math.max(g.score, highScore)
      setHighScore(hs)
      try { localStorage.setItem('cubeRunnerHS', String(hs)) } catch {}
      renderFrame(ctx, g, true)
      return
    }

    // Screen shake decay
    if (g.shakeIntensity > 0) {
      g.shakeX = (Math.random() - 0.5) * g.shakeIntensity
      g.shakeY = (Math.random() - 0.5) * g.shakeIntensity
      g.shakeIntensity *= 0.82
      if (g.shakeIntensity < 0.2) g.shakeIntensity = 0
    } else {
      g.shakeX = 0; g.shakeY = 0
    }

    renderFrame(ctx, g, false)
    animFrameRef.current = requestAnimationFrame(gameLoop)
  }, [checkCollision, highScore, vibrate, renderFrame])

  // ─── Render idle screen ───────────────────────────────────────────────
  const renderIdle = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = COLORS.bg
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    // Clouds
    drawCloud(ctx, 150, 28)
    drawCloud(ctx, 420, 50)
    drawCloud(ctx, 680, 22)

    // Hills
    ctx.fillStyle = 'rgba(0,0,0,0.025)'
    ctx.beginPath()
    ctx.moveTo(0, GROUND_Y)
    for (let i = 0; i <= CANVAS_W; i += 80) {
      const h = 20 + Math.sin(i * 0.01) * 15 + Math.sin(i * 0.023) * 10
      ctx.lineTo(i, GROUND_Y - h)
    }
    ctx.lineTo(CANVAS_W, GROUND_Y)
    ctx.closePath()
    ctx.fill()

    // Ground
    ctx.strokeStyle = COLORS.groundLine
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, GROUND_Y + 1)
    ctx.lineTo(CANVAS_W, GROUND_Y + 1)
    ctx.stroke()

    // Ground texture
    ctx.fillStyle = COLORS.ground
    for (let i = 0; i < CANVAS_W / 18 + 1; i++) {
      const px = i * 18
      ctx.fillRect(px, GROUND_Y + 5, 4 + (i % 3) * 3, 1.2)
      if (i % 3 === 0) {
        ctx.beginPath()
        ctx.arc(px + 8, GROUND_Y + 12, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Runner standing idle
    drawRunner(ctx, 60, GROUND_Y - RUNNER_SIZE, RUNNER_SIZE, 0, false, false, false, 0)

    // Instructions
    ctx.fillStyle = COLORS.text
    ctx.font = '600 14px "Sora", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Press SPACE to start', CANVAS_W / 2, CANVAS_H / 2 - 10)

    ctx.font = '400 10px "Sora", sans-serif'
    ctx.fillStyle = COLORS.textMuted
    ctx.fillText('SPACE = Jump  ·  Arrow Down = Duck', CANVAS_W / 2, CANVAS_H / 2 + 10)

    // High score
    if (highScore > 0) {
      ctx.font = '500 11px "Sora", monospace'
      ctx.textAlign = 'right'
      ctx.fillStyle = COLORS.textMuted
      ctx.fillText(`HI ${String(highScore).padStart(5, '0')}`, CANVAS_W - 16, 26)
    }
  }, [highScore])

  // ─── Start game ──────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    initGame()
    setGameState('playing')
    setScore(0)
    vibrate(20)
    animFrameRef.current = requestAnimationFrame(gameLoop)
  }, [initGame, gameLoop, vibrate])

  // ─── Key handler ──────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (gameState === 'idle' || gameState === 'dead') {
          startGame()
          return
        }
        if (gameState === 'playing' && gameRef.current) {
          const runner = gameRef.current.runner
          if (runner.grounded) {
            runner.vy = JUMP_FORCE
            runner.grounded = false
            runner.ducking = false
            vibrate([15, 10, 8])
            // Jump burst particles
            for (let i = 0; i < 5; i++) {
              gameRef.current.particles.push(new Particle(
                runner.x + RUNNER_SIZE / 2,
                GROUND_Y - 2,
                (Math.random() - 0.5) * 2,
                -(Math.random() + 0.5),
              ))
            }
          }
        }
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault()
        if (gameState === 'playing' && gameRef.current) {
          gameRef.current.runner.ducking = true
        }
      }
    }
    const onKeyUp = (e) => {
      if (e.code === 'ArrowDown' && gameState === 'playing' && gameRef.current) {
        gameRef.current.runner.ducking = false
      }
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [gameState, startGame, vibrate])

  // ─── Touch handler for mobile ─────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onTouch = (e) => {
      e.preventDefault()
      if (gameState === 'idle' || gameState === 'dead') {
        startGame()
        return
      }
      if (gameState === 'playing' && gameRef.current) {
        const runner = gameRef.current.runner
        if (runner.grounded) {
          runner.vy = JUMP_FORCE
          runner.grounded = false
          runner.ducking = false
          vibrate([15, 10, 8])
        }
      }
    }

    canvas.addEventListener('touchstart', onTouch, { passive: false })
    return () => canvas.removeEventListener('touchstart', onTouch)
  }, [gameState, startGame, vibrate])

  // ─── Render on state change ────────────────────────────────────────────
  useEffect(() => {
    if (gameState === 'idle') {
      renderIdle()
    } else if (gameState === 'dead') {
      // Redraw the death frame so canvas isn't blank
      const canvas = canvasRef.current
      if (!canvas || !gameRef.current) return
      const ctx = canvas.getContext('2d')
      renderFrame(ctx, gameRef.current, true)
    }
  }, [gameState, renderIdle, renderFrame])

  // ─── Cleanup ──────────────────────────────────────────────────────────
  useEffect(() => {
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current) }
  }, [])

  // ─── Canvas DPR setup (once on mount) ─────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = CANVAS_W * dpr
    canvas.height = CANVAS_H * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    renderIdle()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="lg:px-28 px-5 mt-12 lg:mt-20 mb-8 lg:mb-16"
    >
      {/* Section Header */}
      <div className="text-center mb-5">
        <p className="text-[#71717A] text-[10px] lg:text-xs font-light tracking-[0.2em] uppercase mb-1.5">
          Take a break
        </p>
        <h3 className="text-base lg:text-lg font-medium text-[#1a1a1a]">
          Cube Runner
        </h3>
        <p className="text-[#71717A] text-[10px] font-light mt-0.5">
          A quick game while you&apos;re here
        </p>
      </div>

      {/* Game Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-lg overflow-hidden outline-none"
        style={{
          border: '1px solid rgba(0,0,0,0.08)',
          background: COLORS.bg,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
        tabIndex={-1}
      >
        <canvas
          ref={canvasRef}
          className="outline-none"
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: `${CANVAS_W}/${CANVAS_H}`,
            display: 'block',
            cursor: gameState === 'playing' ? 'none' : 'pointer',
          }}
        />

        {/* Score badge */}
        {gameState !== 'idle' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-2 left-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full z-20"
            style={{
              background: COLORS.scoreBg,
              color: COLORS.scoreText,
            }}
          >
            {score > highScore && score > 0 ? 'NEW BEST' : `BEST ${highScore}`}
          </motion.div>
        )}
      </div>

      {/* Mobile hint */}
      <p className="text-center text-[#71717A] text-[10px] font-light mt-2.5 lg:hidden">
        Tap to jump
      </p>
    </motion.div>
  )
}
