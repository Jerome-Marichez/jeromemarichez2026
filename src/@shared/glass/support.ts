// support.ts — jeromemarichez-fr
// Conditions d'activation du verre réfractant.

/**
 * Dit si le verre WebGL peut être activé sur ce poste et à cette taille d'écran.
 *
 * Le test WebGL est fait ici plutôt que laissé à liquidGL : sa propre détection
 * applique un repli en styles **en ligne** (`background` et `backdrop-filter` en dur,
 * teintés pour un fond sombre) qui écrase la feuille de styles du site et casse le
 * thème clair. Mieux vaut ne pas l'amorcer du tout et garder le repli maison.
 *
 * @param minViewport largeur minimale, en pixels CSS.
 */
export function supportsLiquidGlass(minViewport: number): boolean {
  if (typeof window === 'undefined') return false
  if (window.innerWidth < minViewport) return false
  return hasWebGl()
}

/**
 * Dit si un contexte WebGL est obtenable.
 *
 * Exporté parce que la scène de la chaîne pose exactement la même question : deux
 * sondes séparées créeraient deux canvas jetables et deux contextes à chaque montage.
 */
export function hasWebGl(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}
