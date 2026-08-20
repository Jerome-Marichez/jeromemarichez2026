'use client'

// ChainScene.tsx — jeromemarichez-fr
// Trois dalles de verre alignées dans le même axe : la thèse du site en volume.
//
// Chargée uniquement par `ChainCanvas`, jamais importée ailleurs — c'est ce qui garde
// `three` et `@react-three/fiber` hors du chemin critique.

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Color, type Group, type ShaderMaterial } from 'three'
import { buildSlabGeometry, SLAB_PLACEMENTS } from './slab-geometry'
import {
  SLAB_CORE_COLOR,
  SLAB_EDGE_COLORS,
  SLAB_FRAGMENT_SHADER,
  SLAB_VERTEX_SHADER,
} from './slab-shader'
import { useScrollProgress } from './use-scroll-progress'

const ROTATION_BASE = -0.18
const ROTATION_AMPLITUDE = 0.34

function Slabs({ fige }: { fige: boolean }) {
  const groupe = useRef<Group>(null)
  const materiaux = useRef<ShaderMaterial[]>([])
  const geometrie = useMemo(buildSlabGeometry, [])
  const progression = useScrollProgress()
  const { invalidate } = useThree()

  useEffect(() => {
    const geo = geometrie
    return () => geo.dispose()
  }, [geometrie])

  const uniforms = useMemo(
    () =>
      SLAB_PLACEMENTS.map((placement) => ({
        uEdgeColor: { value: new Color(SLAB_EDGE_COLORS[placement.index]) },
        uCoreColor: { value: new Color(SLAB_CORE_COLOR) },
        uTime: { value: 0 },
        uIndex: { value: placement.index },
      })),
    [],
  )

  useFrame((state, delta) => {
    if (!groupe.current) return

    const cible = ROTATION_BASE + progression.current * ROTATION_AMPLITUDE
    groupe.current.rotation.y += (cible - groupe.current.rotation.y) * 0.08
    groupe.current.rotation.x = 0.05 + Math.sin(state.clock.elapsedTime * 0.565) * 0.035

    if (fige) return
    for (const materiau of materiaux.current) {
      const temps = materiau?.uniforms.uTime
      if (temps) temps.value += delta
    }
    invalidate()
  })

  return (
    <group ref={groupe}>
      {SLAB_PLACEMENTS.map((placement) => (
        <mesh geometry={geometrie} key={placement.index} position={placement.position}>
          <shaderMaterial
            depthWrite={false}
            fragmentShader={SLAB_FRAGMENT_SHADER}
            ref={(node) => {
              if (node) materiaux.current[placement.index] = node
            }}
            side={2}
            transparent
            uniforms={uniforms[placement.index]}
            vertexShader={SLAB_VERTEX_SHADER}
          />
        </mesh>
      ))}
    </group>
  )
}

interface ChainSceneProps {
  /** Rend une image fixe : le temps n'avance plus, seule la pose reste. */
  fige?: boolean
}

export function ChainScene({ fige = false }: ChainSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 38 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
    >
      <Slabs fige={fige} />
    </Canvas>
  )
}
