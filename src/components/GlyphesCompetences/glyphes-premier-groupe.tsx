import type { ReactElement } from 'react'

/**
 * Les cinq premiers glyphes du mur de stack, dessinés à la main sur une
 * grille de 24 unités : traits fins, aucun aplat, dans le vocabulaire du site
 * (voir `docs/design.md`, « Ce que le site refuse » : aucun glyphe unicode,
 * aucune icône de bibliothèque).
 *
 * Chaque fonction ne rend que les formes internes : le `<svg>` porteur des
 * attributs communs (`viewBox`, `stroke`, `aria-hidden`) vit dans `index.tsx`.
 */

/** Front & design system : une fenêtre, bandeau de titre séparé par un filet. */
function GlypheFrontDesignSystem(): ReactElement {
  return (
    <>
      <rect x="3" y="4" width="18" height="16" />
      <line x1="3" y1="8.5" x2="21" y2="8.5" />
    </>
  )
}

/** Back & architecture : trois niveaux empilés, la pile serveur. */
function GlypheBackArchitecture(): ReactElement {
  return (
    <>
      <rect x="4" y="4" width="16" height="4" />
      <rect x="4" y="10" width="16" height="4" />
      <rect x="4" y="16" width="16" height="4" />
    </>
  )
}

/** Qualité & tests : une case cochée. */
function GlypheQualiteTests(): ReactElement {
  return (
    <>
      <rect x="4" y="4" width="16" height="16" />
      <path d="M8 12.5 L10.8 15.5 L16.5 8.5" />
    </>
  )
}

/** IA augmentée : trois nœuds reliés, le graphe d'agents. */
function GlypheIaAugmentee(): ReactElement {
  return (
    <>
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="5.5" cy="18" r="2" />
      <circle cx="18.5" cy="18" r="2" />
      <line x1="10.6" y1="7" x2="6.9" y2="16.3" />
      <line x1="13.4" y1="7" x2="17.1" y2="16.3" />
      <line x1="7.5" y1="18" x2="16.5" y2="18" />
    </>
  )
}

/** Data & IA : un cylindre de base de données. */
function GlypheDataIa(): ReactElement {
  return (
    <>
      <ellipse cx="12" cy="6.5" rx="8" ry="2.8" />
      <path d="M4 6.5 V17.5 A8 2.8 0 0 0 20 17.5 V6.5" />
      <path d="M4 12 A8 2.8 0 0 0 20 12" />
    </>
  )
}

export const glyphesPremierGroupe: Record<string, () => ReactElement> = {
  'Front & design system': GlypheFrontDesignSystem,
  'Back & architecture': GlypheBackArchitecture,
  'Qualité & tests': GlypheQualiteTests,
  'IA augmentée': GlypheIaAugmentee,
  'Data & IA': GlypheDataIa,
}
