'use client'

// ChainCanvas/index.tsx — jeromemarichez-fr
// L'enveloppe de la scène des quatre dalles : sa place réservée, et sa mise en pause.

import { useMotionPaused } from '../../hooks/use-motion-paused'
import styles from './chain-canvas.module.css'
import { SlabScene } from './SlabScene'

interface ChainCanvasProps {
  /** Ce que la scène représente. Documenté dans le DOM, jamais annoncé — c'est un décor. */
  description: string
}

/**
 * Décor, jamais information.
 *
 * La scène ne porte aucun contenu que le texte de la page ne dise déjà : elle est
 * masquée aux technologies d'assistance, et son absence — mouvement réduit, animation
 * figée depuis la page — ne retire rien à la compréhension.
 *
 * Il ne reste qu'une seule raison de rendre ce composant côté client : lire le choix
 * « animation figée » pour le passer à la scène (WCAG 2.2.2). Plus de chargement
 * différé à orchestrer, plus de détection de WebGL, plus de seuil de largeur — la scène
 * est du SVG rendu au serveur, qui coûte le même prix sur un téléphone et sur un poste
 * de travail, et qui s'affiche donc désormais partout.
 */
export function ChainCanvas({ description }: ChainCanvasProps) {
  const fige = useMotionPaused()

  return (
    <div aria-hidden="true" className={styles.conteneur}>
      <span className={styles.substitut}>{description}</span>
      <SlabScene fige={fige} />
    </div>
  )
}
