import type { IContrastRequirement } from '../interfaces/icontrast-requirement'

/**
 * Inventaire des combinaisons texte / fond et bordure / fond réellement produites
 * par les composants du socle. Chaque entrée est une promesse vérifiable : les
 * valeurs sont lues dans `@shared/styles/tokens.css` et le ratio est recalculé,
 * pour les deux thèmes.
 *
 * Ajouter une combinaison ici dès qu'un composant en introduit une nouvelle —
 * c'est ce qui empêche une régression de contraste de passer en revue.
 */
export const CONTRAST_REQUIREMENTS: readonly IContrastRequirement[] = [
  // ------------------------------------------------ Texte (WCAG 1.4.3, 4.5:1)
  {
    foreground: 'color-text',
    background: 'color-background',
    minimumRatio: 4.5,
    usage: 'texte courant sur le fond de page',
  },
  {
    foreground: 'color-text',
    background: 'color-surface',
    minimumRatio: 4.5,
    usage: 'texte courant dans une carte',
  },
  {
    foreground: 'color-text',
    background: 'color-surface-muted',
    minimumRatio: 4.5,
    usage: 'texte courant sur fond atténué (pied de page)',
  },
  {
    foreground: 'color-text',
    background: 'color-accent-soft',
    minimumRatio: 4.5,
    usage: 'texte courant sur pastille accent',
  },
  {
    foreground: 'color-text-muted',
    background: 'color-background',
    minimumRatio: 4.5,
    usage: 'texte secondaire sur le fond de page',
  },
  {
    foreground: 'color-text-muted',
    background: 'color-surface',
    minimumRatio: 4.5,
    usage: 'texte secondaire dans une carte',
  },
  {
    foreground: 'color-text-muted',
    background: 'color-surface-muted',
    minimumRatio: 4.5,
    usage: 'texte secondaire sur fond atténué',
  },
  {
    foreground: 'color-accent',
    background: 'color-background',
    minimumRatio: 4.5,
    usage: 'lien et navigation sur le fond de page',
  },
  {
    foreground: 'color-accent',
    background: 'color-surface',
    minimumRatio: 4.5,
    usage: 'lien dans une carte',
  },
  {
    foreground: 'color-accent',
    background: 'color-surface-muted',
    minimumRatio: 4.5,
    usage: 'lien sur fond atténué',
  },
  {
    foreground: 'color-accent',
    background: 'color-accent-soft',
    minimumRatio: 4.5,
    usage: 'texte accent sur pastille accent',
  },
  {
    foreground: 'color-accent-hover',
    background: 'color-background',
    minimumRatio: 4.5,
    usage: 'lien survolé sur le fond de page',
  },
  {
    foreground: 'color-accent-contrast',
    background: 'color-accent',
    minimumRatio: 4.5,
    usage: "libellé d'un lien d'action plein",
  },
  {
    foreground: 'color-accent-contrast',
    background: 'color-accent-hover',
    minimumRatio: 4.5,
    usage: "libellé d'un lien d'action plein survolé",
  },

  // ------------------------------- Composants d'interface (WCAG 1.4.11, 3:1)
  {
    foreground: 'color-border-strong',
    background: 'color-background',
    minimumRatio: 3,
    usage: "bordure d'un lien d'action secondaire sur le fond",
  },
  {
    foreground: 'color-border-strong',
    background: 'color-surface',
    minimumRatio: 3,
    usage: "bordure d'un élément interactif dans une carte",
  },
  {
    foreground: 'color-border-strong',
    background: 'color-surface-muted',
    minimumRatio: 3,
    usage: "bordure d'un élément interactif sur fond atténué",
  },
  {
    foreground: 'color-focus',
    background: 'color-background',
    minimumRatio: 3,
    usage: 'anneau de focus sur le fond de page',
  },
  {
    foreground: 'color-focus',
    background: 'color-surface',
    minimumRatio: 3,
    usage: 'anneau de focus dans une carte',
  },
  {
    foreground: 'color-focus',
    background: 'color-surface-muted',
    minimumRatio: 3,
    usage: 'anneau de focus sur fond atténué',
  },
  {
    foreground: 'color-accent',
    background: 'color-background',
    minimumRatio: 3,
    usage: "fond d'un lien d'action plein sur le fond de page",
  },
]

/**
 * Sélecteurs des deux thèmes dans `@shared/styles/tokens.css`. Les guillemets
 * doubles sont ceux que produit le formateur Biome : ils doivent correspondre
 * au fichier au caractère près, la lecture des jetons étant purement textuelle.
 */
export const THEME_SELECTORS = {
  clair: ':root',
  sombre: ':root[data-theme="dark"]',
} as const
