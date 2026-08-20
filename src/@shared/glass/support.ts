// support.ts — jeromemarichez-fr
// Conditions d'activation du verre réfractant.

/**
 * Résultat de la sonde WebGL, mémorisé pour la durée de la page.
 *
 * La sonde crée un canvas et lui demande un contexte. Un navigateur plafonne le nombre
 * de contextes WebGL vivants (autour de la quinzaine) et **abandonne les plus anciens**
 * quand le plafond est atteint. Sonder à chaque montage — verre réfractant d'un côté,
 * scène de la chaîne de l'autre — consommait donc des contextes qui n'étaient jamais
 * rendus, et finissait par faire perdre le sien à la scène.
 */
let sondeWebGl: boolean | undefined

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
 * Exporté parce que la scène de la chaîne pose exactement la même question. Le contexte
 * de sonde est **explicitement libéré** via `WEBGL_lose_context` : sans cela, chaque
 * appel laisse un contexte vivant derrière lui.
 */
export function hasWebGl(): boolean {
  if (sondeWebGl !== undefined) return sondeWebGl
  if (typeof document === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    const contexte = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    sondeWebGl = Boolean(contexte)

    const liberer = contexte?.getExtension('WEBGL_lose_context')
    liberer?.loseContext()
  } catch {
    sondeWebGl = false
  }

  return sondeWebGl
}
