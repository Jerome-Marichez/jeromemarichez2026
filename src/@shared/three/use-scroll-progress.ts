'use client'

// use-scroll-progress.ts — jeromemarichez-fr
// Avancement du défilement dans le premier écran, lu sans re-rendre React.

import { type MutableRefObject, useEffect, useRef } from 'react'

/**
 * Rend une référence dont `.current` va de 0 (haut de page) à 1 (un écran plus bas).
 *
 * La valeur vit dans une `ref` et non dans un état : un `useState` déclencherait un
 * rendu React à chaque frame de défilement, ce qui coûterait bien plus cher que la
 * scène elle-même. Le listener est `passive` et ne fait qu'une lecture, la mise à
 * jour réelle se faisant dans la boucle de rendu.
 */
export function useScrollProgress(): MutableRefObject<number> {
  const progression = useRef(0)

  useEffect(() => {
    let planifie = false

    const lire = () => {
      planifie = false
      const hauteur = window.innerHeight || 1
      progression.current = Math.min(1, Math.max(0, window.scrollY / hauteur))
    }

    const onScroll = () => {
      if (planifie) return
      planifie = true
      requestAnimationFrame(lire)
    }

    lire()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progression
}
