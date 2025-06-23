'use client'

import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AsciiRenderer, Text3D, Center, useTexture } from '@react-three/drei'
import { useRef, useMemo, Suspense, useEffect, useState } from 'react'

function Tunnel() {
  const mesh = useRef<THREE.Mesh>(null!)

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [new THREE.Vector3(0, 0, 10), new THREE.Vector3(0, 0, -100)],
      false,
      'catmullrom',
      0.5,
    )
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.position.z = (time * 5) % 20
    }
  })

  return (
    <mesh ref={mesh}>
      <tubeGeometry args={[curve, 100, 2, 8, false]} />
      <meshBasicMaterial wireframe color="#8A2BE2" />
    </mesh>
  )
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      0.5 + state.mouse.x / 8,
      0.075,
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      1 + state.mouse.y / 8,
      0.075,
    )
  })
  return null
}

function AnimatedText() {
  const textRef = useRef<THREE.Group>(null!)
  const matcap = useTexture('/textures/matcap_metallic_grey.png')
  const { viewport } = useThree()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const animationState = useRef({
    vx: (Math.random() > 0.5 ? 1 : -1) * 1.5,
    vy: (Math.random() > 0.5 ? 1 : -1) * 1.5,
  })

  useFrame((state, delta) => {
    if (!textRef.current) return

    const { width, height } = viewport
    const textBounds = new THREE.Box3().setFromObject(textRef.current)
    const textWidth = textBounds.max.x - textBounds.min.x
    const textHeight = textBounds.max.y - textBounds.min.y

    textRef.current.position.x += animationState.current.vx * delta
    textRef.current.position.y += animationState.current.vy * delta

    const boundsMultiplier = isMobile ? 1.4 : 1.0
    const xBounds = (width / 2 - textWidth / 2) * boundsMultiplier
    const yBounds = (height / 2 - textHeight / 2) * boundsMultiplier

    if (
      textRef.current.position.x >= xBounds ||
      textRef.current.position.x <= -xBounds
    ) {
      animationState.current.vx *= -1
      textRef.current.position.x = THREE.MathUtils.clamp(
        textRef.current.position.x,
        -xBounds,
        xBounds,
      )
    }
    if (
      textRef.current.position.y >= yBounds ||
      textRef.current.position.y <= -yBounds
    ) {
      animationState.current.vy *= -1
      textRef.current.position.y = THREE.MathUtils.clamp(
        textRef.current.position.y,
        -yBounds,
        yBounds,
      )
    }
  })

  const textSize = isMobile ? 1.521 : 1.95
  const textHeight = isMobile ? 0.3042 : 0.39
  const bevelThickness = isMobile ? 0.0507 : 0.065
  const bevelSize = isMobile ? 0.02535 : 0.0325

  return (
    <group ref={textRef}>
      <Center>
        <Text3D
          font="/fonts/GeistMono_Bold.json"
          size={textSize}
          height={textHeight}
          curveSegments={10}
          bevelEnabled
          bevelThickness={bevelThickness}
          bevelSize={bevelSize}
          bevelOffset={0}
          bevelSegments={4}
        >
          vibetunnel
          <meshMatcapMaterial matcap={matcap} />
        </Text3D>
      </Center>
    </group>
  )
}

function SafeAsciiRenderer() {
  const [renderAscii, setRenderAscii] = useState(false)
  
  useEffect(() => {
    // Delay ASCII renderer initialization to ensure canvas is ready
    const timer = setTimeout(() => {
      setRenderAscii(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (!renderAscii) return null
  
  try {
    return (
      <AsciiRenderer
        fgColor="#39FF14"
        bgColor="transparent"
        resolution={0.2}
        characters=" .:-+*=%@#"
        invert
      />
    )
  } catch (error) {
    console.error('AsciiRenderer error:', error)
    return null
  }
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedText />
      <Tunnel />
      <Rig />
      <SafeAsciiRenderer />
    </>
  )
}

export function VibetunnelScene() {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
