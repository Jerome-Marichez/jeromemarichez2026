'use client'

// MagneticAction/index.tsx — jeromemarichez-fr
// Le bouton d'action qui se laisse attirer par le pointeur.

import { type PointerEvent, type ReactNode, useCallback, useEffect, useRef } from 'react'
import { calculerDecalageAimant } from '@/utils/aimant'
import { useMotionPaused } from '../../hooks/use-motion-paused'
import styles from './magnetic-action.module.css'

interface MagneticActionProps {
  href: string
  children: ReactNode
  /** Classes d'apparence de l'appelant. Elles ne doivent jamais poser de `transform`. */
  className?: string
}

/**
 * Un lien d'action qui suit le pointeur de quelques pixels, et rien d'autre.
 *
 * Trois garde-fous, chacun pour une raison distincte :
 *
 * - **`transform` seul.** Aucune propriété de mise en page n'est touchée : la cible de
 *   clic ne se déplace pas, rien ne se recalcule, et le geste tient 60 images par
 *   seconde. Le décalage est borné à `PORTEE_AIMANT`, il ne peut pas déborder du bouton.
 * - **Souris uniquement.** Au doigt, il n'y a pas de survol : l'attraction n'arriverait
 *   qu'après l'appui, comme un bouton qui recule quand on le presse.
 * - **Coupé avec le reste du mouvement.** `useMotionPaused` couvre la préférence
 *   système et le `MotionToggle` de la page. Le décalage déjà posé est relâché à
 *   l'instant où l'un des deux bascule, sans quoi le bouton resterait figé de travers.
 *
 * Le décalage passe par deux variables CSS écrites directement sur le nœud, jamais par
 * l'état React : une position de pointeur change à chaque image, et re-rendre un arbre
 * React à 60 Hz pour déplacer un bouton de six pixels coûterait plus que l'effet.
 */
export function MagneticAction({ href, children, className }: MagneticActionProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const fige = useMotionPaused()

  const relacher = useCallback(() => {
    const node = ref.current
    if (!node) return
    node.style.removeProperty('--aimant-x')
    node.style.removeProperty('--aimant-y')
  }, [])

  useEffect(() => {
    if (fige) relacher()
  }, [fige, relacher])

  const suivre = (evenement: PointerEvent<HTMLAnchorElement>) => {
    const node = ref.current
    if (!node || fige || evenement.pointerType !== 'mouse') return

    const [x, y] = calculerDecalageAimant(
      node.getBoundingClientRect(),
      evenement.clientX,
      evenement.clientY,
    )
    node.style.setProperty('--aimant-x', `${x}px`)
    node.style.setProperty('--aimant-y', `${y}px`)
  }

  return (
    <a
      className={className ? `${styles.aimant} ${className}` : styles.aimant}
      href={href}
      onPointerCancel={relacher}
      onPointerLeave={relacher}
      onPointerMove={suivre}
      ref={ref}
    >
      {children}
    </a>
  )
}
