'use client'

// use-theme-colors.ts — jeromemarichez-fr
// Les couleurs de la scène viennent des jetons CSS, pas de constantes en dur.

import { useEffect, useState } from 'react'

export interface SceneColors {
  /** Liseré des dalles. Jeton `--cuivre-vif`. */
  arete: string
  /** Teinte du corps des dalles. Jeton `--encre`. */
  corps: string
}

const DEFAUT: SceneColors = { arete: '#b4623a', corps: '#14171a' }

/**
 * Lit `--cuivre-vif` et `--encre` sur la racine du document.
 *
 * Sans cela, la scène porterait sa propre palette et se désaccorderait du thème sombre
 * — un objet 3D teinté pour du papier chaud posé sur un fond graphite se voit
 * immédiatement. Les jetons restent la source unique de vérité, y compris en WebGL.
 */
export function useThemeColors(): SceneColors {
  const [couleurs, setCouleurs] = useState<SceneColors>(DEFAUT)

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement)
    const lire = (jeton: string, repli: string) => styles.getPropertyValue(jeton).trim() || repli

    setCouleurs({
      arete: lire('--cuivre-vif', DEFAUT.arete),
      corps: lire('--encre', DEFAUT.corps),
    })
  }, [])

  return couleurs
}
