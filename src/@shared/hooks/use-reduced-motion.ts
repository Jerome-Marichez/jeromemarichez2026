'use client'

// use-reduced-motion.ts — jeromemarichez-fr
// Lit `prefers-reduced-motion` et suit ses changements.
//
// Le site vend de l'accessibilité tenue (RGAA / WCAG AA) : les deux surfaces animées
// — la scène WebGL et le verre réfractant — se coupent réellement quand l'utilisateur
// a demandé moins de mouvement, elles ne se contentent pas de ralentir.

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Rend `true` quand l'utilisateur demande moins d'animation.
 *
 * Vaut `false` au premier rendu, y compris côté serveur : le rendu statique ne connaît
 * pas la préférence du visiteur. Les composants animés doivent donc démarrer dans un
 * état inerte et ne s'animer qu'après montage, pour ne jamais afficher une animation
 * l'espace d'une frame à quelqu'un qui l'a désactivée.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    setReduced(media.matches)

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}
