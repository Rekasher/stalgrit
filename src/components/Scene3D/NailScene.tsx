"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"

type NailProps = {
  pos: [number, number, number]
  rot: [number, number, number]
  speed: number
  mat: THREE.MeshStandardMaterial
}

function Nail({ pos, rot, speed, mat }: NailProps) {
  const ref = useRef<THREE.Group>(null!)
  const base = pos[1]

  useFrame(({ clock }) => {
    ref.current.rotation.x += speed * 0.007
    ref.current.rotation.z += speed * 0.004
    ref.current.position.y =
      base + Math.sin(clock.elapsedTime * speed * 0.4 + pos[0]) * 0.4
  })

  return (
    <group ref={ref} position={pos} rotation={rot}>
      <mesh material={mat} position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.1, 16]} />
      </mesh>
      <mesh material={mat}>
        <cylinderGeometry args={[0.068, 0.056, 2.9, 8]} />
      </mesh>
      <mesh material={mat} position={[0, -1.6, 0]}>
        <coneGeometry args={[0.07, 0.32, 8]} />
      </mesh>
    </group>
  )
}

const NAILS = [
  { pos: [-7,  1,  -12] as [number,number,number], rot: [ 0.3,  0.5,  0.2] as [number,number,number], speed: 0.40 },
  { pos: [ 5, -2,   -8] as [number,number,number], rot: [-0.2,  1.2,  0.6] as [number,number,number], speed: 0.30 },
  { pos: [-3, -4,  -15] as [number,number,number], rot: [ 1.0,  0.3, -0.4] as [number,number,number], speed: 0.50 },
  { pos: [ 9,  3,  -14] as [number,number,number], rot: [ 0.1, -0.8,  1.0] as [number,number,number], speed: 0.25 },
  { pos: [ 1,  5,  -10] as [number,number,number], rot: [-0.5,  0.2,  0.3] as [number,number,number], speed: 0.35 },
  { pos: [-9, -1,  -11] as [number,number,number], rot: [ 0.7, -0.3,  0.8] as [number,number,number], speed: 0.45 },
  { pos: [ 4, -5,   -9] as [number,number,number], rot: [-1.2,  0.6, -0.2] as [number,number,number], speed: 0.28 },
  { pos: [-6,  5,  -13] as [number,number,number], rot: [ 0.4,  1.0, -0.6] as [number,number,number], speed: 0.38 },
  { pos: [ 7,  2,  -11] as [number,number,number], rot: [-0.3,  0.4,  1.2] as [number,number,number], speed: 0.32 },
  { pos: [ 2, -1,  -16] as [number,number,number], rot: [ 0.8, -0.5,  0.4] as [number,number,number], speed: 0.42 },
  { pos: [-11, 2,  -17] as [number,number,number], rot: [ 1.5,  0.7, -0.3] as [number,number,number], speed: 0.22 },
  { pos: [12, -4,  -13] as [number,number,number], rot: [-0.6,  1.3,  0.5] as [number,number,number], speed: 0.36 },
]

function NailCloud() {
  const ref = useRef<THREE.Group>(null!)
  const { pointer } = useThree()

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.72, 0.72, 0.78),
        metalness: 0.97,
        roughness: 0.13,
      }),
    []
  )

  useFrame(() => {
    ref.current.rotation.y +=
      (pointer.x * 0.25 - ref.current.rotation.y) * 0.04
    ref.current.rotation.x +=
      (-pointer.y * 0.12 - ref.current.rotation.x) * 0.04
  })

  return (
    <group ref={ref}>
      {NAILS.map((n, i) => (
        <Nail key={i} pos={n.pos} rot={n.rot} speed={n.speed} mat={mat} />
      ))}
    </group>
  )
}

export default function NailScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 70 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 4]} intensity={4} color="#10b981" />
      <pointLight position={[-10, -5, 3]} intensity={2.5} color="#d1fae5" />
      <pointLight position={[0, -10, 2]} intensity={1.5} color="#ffffff" />
      <Environment preset="city" />
      <NailCloud />
    </Canvas>
  )
}
