'use client'

// MotionToggle/index.tsx — jeromemarichez-fr
// Le bouton qui fige l'animation.

import { useSyncExternalStore } from 'react'
import { useReducedMotion } from '../../hooks/use-reduced-motion'
import { motionStore } from '../../motion/motion-store'
import styles from './motion-toggle.module.css'

/**
 * Mécanisme de mise en pause au sens WCAG 2.2.2.
 *
 * Il n'est **pas** masqué quand `prefers-reduced-motion` est déjà actif : dans ce cas
 * il indique simplement que le mouvement est déjà coupé, et reste utilisable — un
 * utilisateur peut vouloir le réactiver pour cette page seulement.
 *
 * `aria-pressed` porte l'état : c'est un interrupteur, pas une action ponctuelle, et un
 * lecteur d'écran doit pouvoir annoncer sa position sans avoir à interpréter le libellé.
 */
export function MotionToggle() {
  const fige = useSyncExternalStore(
    motionStore.subscribe,
    motionStore.getSnapshot,
    motionStore.getServerSnapshot,
  )
  const reduced = useReducedMotion()
  const actif = fige || reduced

  return (
    <button
      aria-pressed={actif}
      className={styles.bouton}
      onClick={() => motionStore.toggle()}
      type="button"
    >
      <span aria-hidden="true" className={styles.temoin} data-fige={actif} />
      {actif ? 'Animation figée' : "Figer l'animation"}
      {reduced && !fige ? <span className={styles.precision}> (réglage système)</span> : null}
    </button>
  )
}
