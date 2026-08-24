'use client'

// use-in-viewport.ts — jeromemarichez-fr
// Dit si un élément est entré dans le viewport, une bonne fois pour toutes.

import { type RefObject, useEffect, useState } from 'react'

/**
 * Marge de déclenchement des filets qui se tracent (charnières, fil transverse).
 *
 * Négative, à l'inverse du défaut du hook : ici on ne cherche pas à amorcer en avance,
 * on veut que le trait parte quand la section est franchement entrée dans l'écran. Un
 * tracé lancé 200 px trop tôt s'achève avant d'être vu — c'est le même défaut que celui
 * qu'on corrige, à une échelle près.
 */
export const MARGE_TRACE = '-10%'

/**
 * Passe à `true` au premier croisement et n'en repart pas.
 *
 * Sert à ne déclencher un effet qu'au moment où le visiteur arrive réellement dessus :
 * les filets qui se tracent le long de la page. Le sens unique est délibéré — un
 * observateur qui repasserait à `false` en sortie ferait rejouer chaque tracé à chaque
 * remontée, ce qui transformerait une ponctuation en clignotement.
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
