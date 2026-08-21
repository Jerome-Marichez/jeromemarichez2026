'use client'

// use-in-viewport.ts — jeromemarichez-fr
// Dit si un élément est entré dans le viewport, une bonne fois pour toutes.

import { type RefObject, useEffect, useState } from 'react'

/**
 * Passe à `true` au premier croisement et n'en repart pas.
 *
 * Sert à ne payer le coût d'une dépendance lourde — ici la scène WebGL — que si le
 * visiteur descend réellement jusqu'à elle. Un observateur qui repasserait à `false`
 * en sortie ferait démonter puis remonter le contexte WebGL au fil du défilement,
 * ce qui coûte bien plus cher que de le laisser vivre.
 *
 * @param margin marge de déclenchement, pour amorcer le chargement juste avant que
 *   l'élément ne devienne visible.
 */
export function useInViewport(ref: RefObject<Element | null>, margin = '200px'): boolean {
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || seen) return

    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setSeen(true)
      },
      { rootMargin: margin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, seen, margin])

  return seen
}
