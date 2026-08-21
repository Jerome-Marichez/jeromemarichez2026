'use client'

// use-motion-paused.ts — jeromemarichez-fr
// Le mouvement doit-il être coupé ? Deux raisons possibles, une seule réponse.

import { useSyncExternalStore } from 'react'
import { motionStore } from '../motion/motion-store'
import { useReducedMotion } from './use-reduced-motion'

/**
 * Rend `true` si l'utilisateur a demandé moins d'animation **au niveau du système**, ou
 * s'il a figé l'animation **depuis la page**.
 *
 * Les deux sont nécessaires et ne se remplacent pas : la préférence système couvre les
 * personnes qui l'ont réglée une fois pour toutes, le contrôle de la page couvre tous
 * les autres — c'est lui qui satisfait WCAG 2.2.2.
 */
export function useMotionPaused(): boolean {
  const reduced = useReducedMotion()
  const fige = useSyncExternalStore(
    motionStore.subscribe,
    motionStore.getSnapshot,
    motionStore.getServerSnapshot,
  )

  return reduced || fige
}
