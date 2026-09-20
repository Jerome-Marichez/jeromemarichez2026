// .storybook/theme-media.ts — jeromemarichez-fr
//
// Forcer le thème d'une story sans toucher au CSS du site.
//
// Le site n'a pas de bascule de thème : tout son thème sombre tient dans quatre règles
// `@media (prefers-color-scheme: dark)` (`globals.css`, `poles.css`, `verre.css`,
// `lavis.css`). Un catalogue qui ne montrerait qu'une des deux ambiances rendrait
// invisible la moitié du travail de contraste.
//
// La solution retenue réécrit au runtime le `mediaText` de ces règles via le CSSOM :
// `all` pour que la règle s'applique toujours (sombre forcé), `not all` pour qu'elle ne
// s'applique jamais (clair forcé), et la valeur d'origine pour rendre la main au système.
// Aucun jeton n'est dupliqué, aucun fichier du site n'est modifié, et une teinte ajoutée
// demain au thème sombre est prise en compte sans rien changer ici.

/** Les trois positions du contrôle de thème de la barre d'outils. */
export type Theme = 'auto' | 'clair' | 'sombre'

const CONDITION = 'prefers-color-scheme'

/**
 * Le `mediaText` d'origine de chaque règle, retenu à la première réécriture.
 *
 * Une `WeakMap` plutôt qu'un tableau : Vite remplace les feuilles de style à chaud, et
 * une liste figée retiendrait des règles mortes tout en manquant les nouvelles.
 */
const origines = new WeakMap<CSSMediaRule, string>()

/**
 * Les règles média du document qui portent sur le thème.
 *
 * Une feuille servie par un autre domaine lève à la lecture de `cssRules` : le cas est
 * absorbé plutôt que propagé, sinon une seule feuille inaccessible priverait le
 * catalogue de sa bascule.
 */
function reglesDeTheme(): CSSMediaRule[] {
  const trouvees: CSSMediaRule[] = []
  for (const feuille of Array.from(document.styleSheets)) {
    let regles: CSSRuleList
    try {
      regles = feuille.cssRules
    } catch {
      continue
    }
    for (const regle of Array.from(regles)) {
      if (regle instanceof CSSMediaRule && regle.conditionText.includes(CONDITION)) {
        trouvees.push(regle)
      }
    }
  }
  return trouvees
}

/** Le `mediaText` à poser sur une règle de thème sombre, selon la position choisie. */
function cible(theme: Theme, origine: string): string {
  if (theme === 'sombre') return 'all'
  if (theme === 'clair') return 'not all'
  return origine
}

/**
 * Applique le thème demandé à tout le document.
 *
 * Retourne le `color-scheme` à poser sur l'enveloppe de la story : `globals.css` déclare
 * `color-scheme: light dark` sur `:root`, ce qui laisserait les contrôles de formulaire
 * et le fond du canevas suivre le système même quand les jetons, eux, ont basculé.
 */
export function appliquerTheme(theme: Theme): string {
  for (const regle of reglesDeTheme()) {
    let origine = origines.get(regle)
    if (origine === undefined) {
      origine = regle.media.mediaText
      origines.set(regle, origine)
    }
    const voulu = cible(theme, origine)
    if (regle.media.mediaText !== voulu) regle.media.mediaText = voulu
  }
  if (theme === 'sombre') return 'dark'
  if (theme === 'clair') return 'light'
  return 'light dark'
}
