'use client'

// ChainCanvas/index.tsx — jeromemarichez-fr
// Enveloppe de chargement de la scène WebGL, et son repli.

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { hasWebGl } from '../../glass/support'
import { useInViewport } from '../../hooks/use-in-viewport'
import { useMotionPaused } from '../../hooks/use-motion-paused'
import styles from './chain-canvas.module.css'
import { SlabFallback } from './SlabFallback'

/**
 * `three` et `@react-three/fiber` pèsent plusieurs centaines de kilo-octets : ils sont
 * chargés en différé, sans rendu serveur, et seulement quand la scène approche du
 * viewport. Le repli SVG tient la place entre-temps, donc l'échange ne coûte aucun CLS.
 */
const ChainScene = dynamic(() => import('../../three/ChainScene').then((m) => m.ChainScene), {
  ssr: false,
  loading: () => <SlabFallback />,
})

/** En dessous, la scène n'est jamais montée : le budget mobile ne paie pas le WebGL. */
const LARGEUR_MINIMALE = 1024

interface ChainCanvasProps {
  /** Ce que la scène représente. Documenté dans le DOM, jamais annoncé — c'est un décor. */
  description: string
}

/**
 * Décor, jamais information.
 *
 * La scène ne porte aucun contenu que le texte de la page ne dise déjà : elle est
 * masquée aux technologies d'assistance, et son absence — mouvement réduit, pas de
 * WebGL, écran étroit, mode économie de données, JavaScript coupé — ne retire rien à
 * la compréhension. C'est la condition pour qu'une scène 3D soit acceptable sur un
 * site qui vend de l'accessibilité tenue.
 */
export function ChainCanvas({ description }: ChainCanvasProps) {
  const conteneur = useRef<HTMLDivElement>(null)
  const visible = useInViewport(conteneur)
  const fige = useMotionPaused()
  const [capable, setCapable] = useState(false)

  useEffect(() => {
    setCapable(window.innerWidth >= LARGEUR_MINIMALE && !isSaveData() && hasWebGl())
  }, [])

  const rendVolume = capable && visible

  return (
    <div aria-hidden="true" className={styles.conteneur} data-liquid-ignore ref={conteneur}>
      <span className={styles.substitut}>{description}</span>
      {rendVolume ? <ChainScene fige={fige} /> : <SlabFallback />}
    </div>
  )
}

/** Mode économie de données : on ne télécharge pas 180 ko pour un décor. */
function isSaveData(): boolean {
  const connexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return connexion?.saveData === true
}
