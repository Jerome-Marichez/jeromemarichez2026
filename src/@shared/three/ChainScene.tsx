'use client'

// ChainScene.tsx — jeromemarichez-fr
// Trois dalles de verre alignées dans le même axe : la thèse du site en volume.
//
// Chargée uniquement par `ChainCanvas`, jamais importée ailleurs — c'est ce qui garde
// `three` et `@react-three/fiber` hors du chemin critique.

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Color, type Group, type ShaderMaterial } from 'three'
import { buildSlabEdges, buildSlabGeometry, SLAB_PLACEMENTS } from './slab-geometry'
import { SLAB_ALPHA, SLAB_EDGE_TINT, SLAB_FRAGMENT_SHADER, SLAB_VERTEX_SHADER } from './slab-shader'
import { useScrollProgress } from './use-scroll-progress'
import { type SceneColors, useThemeColors } from './use-theme-colors'

const ROTATION_BASE = -0.18
const ROTATION_AMPLITUDE = 0.34

function useSlabUniforms(couleurs: SceneColors, sombre: boolean) {
  return useMemo(() => {
    const alpha = sombre ? SLAB_ALPHA.sombre : SLAB_ALPHA.clair

    return SLAB_PLACEMENTS.map((placement) => {
      const arete = new Color(couleurs.arete)
      // Les dalles 2 et 3 s'éteignent vers la couleur du corps : le cuivre reste au
      // premier plan, et la profondeur se lit sans avoir à inventer trois teintes.
      arete.lerp(new Color(couleurs.corps), 1 - SLAB_EDGE_TINT[placement.index])

      return {
        uEdgeColor: { value: arete },
        uCoreColor: { value: new Color(couleurs.corps) },
        uTime: { value: 0 },
        uIndex: { value: placement.index },
        uCoreAlpha: { value: alpha.corps },
        uEdgeAlpha: { value: alpha.arete },
      }
    })
  }, [couleurs, sombre])
}

function Slabs({ fige }: { fige: boolean }) {
  const groupe = useRef<Group>(null)
  const materiaux = useRef<ShaderMaterial[]>([])
  const geometrie = useMemo(buildSlabGeometry, [])
  const aretes = useMemo(() => buildSlabEdges(geometrie), [geometrie])
  const couleurs = useThemeColors()
  const sombre = useIsDarkTheme()
  const uniforms = useSlabUniforms(couleurs, sombre)
  const progression = useScrollProgress()

  useEffect(() => {
    return () => {
      geometrie.dispose()
      aretes.dispose()
    }
  }, [geometrie, aretes])

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
  })

  return (
    <group ref={groupe}>
      {SLAB_PLACEMENTS.map((placement) => (
        <group key={placement.index} position={placement.position}>
          <mesh geometry={geometrie}>
            <shaderMaterial
              depthWrite={false}
              fragmentShader={SLAB_FRAGMENT_SHADER}
              ref={(node) => {
                if (node) materiaux.current[placement.index] = node
              }}
              // FrontSide et non DoubleSide : le corps, le dos et les facettes du
              // biseau se superposent déjà dans chaque dalle, et les trois dalles se
              // superposent entre elles. Doubler les faces empilait une dizaine de
              // couches translucides, ce qui rendait le verre opaque.
              side={0}
              transparent
              uniforms={uniforms[placement.index]}
              vertexShader={SLAB_VERTEX_SHADER}
            />
          </mesh>

          {/* Le liseré : sans lui, une dalle vue de face n'a aucun contour et la scène
              se lit comme un aplat. C'est aussi la « feuille de cuivre » de la
              direction — ce qui tient les trois plaques ensemble. */}
          <lineSegments geometry={aretes}>
            <lineBasicMaterial
              color={uniforms[placement.index]?.uEdgeColor.value}
              opacity={sombre ? 0.5 : 0.42}
              transparent
            />
          </lineSegments>
        </group>
      ))}
    </group>
  )
}

function useIsDarkTheme(): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [])
}

interface ChainSceneProps {
  /** Rend une image fixe : le temps n'avance plus, seule la pose reste. */
  fige?: boolean
}

export function ChainScene({ fige = false }: ChainSceneProps) {
  return (
    <Canvas
      // Visée décalée sur la dalle du milieu : les trois plaques sont décalées vers
      // la droite et vers le bas, une caméra à l'origine sortait la troisième du cadre.
      camera={{ position: [0.42, -0.14, 4.8], fov: 38 }}
      dpr={[1, 1.5]}
      // `demand` fige la scène sur une seule image : c'est exactement ce qu'il faut
      // quand l'utilisateur a demandé moins de mouvement, et rien d'autre à couper.
      frameloop={fige ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
    >
      <Slabs fige={fige} />
    </Canvas>
  )
}
