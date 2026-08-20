// settings.ts — jeromemarichez-fr
// Réglages du verre réfractant, au même endroit pour tout le site.

/**
 * Sélecteur unique des surfaces de verre.
 *
 * liquidGL impose que **toutes les lentilles partagent le même z-index** : le sélecteur
 * est donc unique et la valeur de z-index est posée une seule fois, dans
 * `glass-surface.css`. Une surface qui s'écarterait de cette classe casserait
 * l'empilement de toutes les autres.
 */
export const GLASS_TARGET = '.glass-surface'

/**
 * Largeur de viewport en deçà de laquelle le verre WebGL n'est pas activé.
 *
 * Deux raisons, pas une : Safari devient instable dès qu'une lentille dépasse la moitié
 * de la largeur ou de la hauteur du viewport — ce qui est le cas de toute carte pleine
 * largeur sur mobile — et le coût GPU d'une capture plein document n'a aucune
 * contrepartie sur un petit écran. En dessous, le repli `backdrop-filter` s'applique.
 */
export const MIN_GLASS_VIEWPORT = 1024

/**
 * Réglages de rendu.
 *
 * `resolution` est volontairement en dessous du défaut (2.0) : la capture couvre tout
 * le document, et sa taille en mémoire GPU croît avec le carré de ce facteur. Les
 * documents longs finissent par dépasser la limite de texture du GPU — c'est la panne
 * la plus courante de cette bibliothèque.
 */
export const LIQUID_GL_OPTIONS = {
  resolution: 1.5,
  refraction: 0.02,
  aberration: 0.04,
  bevelDepth: 0.07,
  bevelWidth: 0.18,
  frost: 3,
  shadow: true,
  specular: true,
  reveal: 'fade',
  tilt: false,
  magnify: 1,
} as const
