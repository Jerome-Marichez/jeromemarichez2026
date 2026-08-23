// pages.mjs — jeromemarichez-fr
//
// Ce que les budgets mesurent, et à partir de quel chiffre ils échouent.
// Source unique : `scripts/budgets.mjs`, la doc et la CI lisent ces valeurs, personne
// ne les recopie.
//
// **Les seuils viennent du `CLAUDE.md`** (« Lighthouse ≥ 95 sur les 4 catégories »),
// pas d'un arbitrage de confort. Les abaisser pour faire passer un contrôle est
// explicitement interdit par la règle 8 du `CLAUDE.md` : c'est la page qu'on corrige,
// jamais le budget. Un budget qu'on rabote ne protège plus de rien.

/**
 * Seuil minimal, par catégorie Lighthouse. Les quatre catégories sont contrôlées :
 * une accessibilité à 100 n'excuse pas une performance à 80.
 */
export const SEUILS_LIGHTHOUSE = {
  performance: 95,
  accessibility: 95,
  'best-practices': 95,
  seo: 95,
}

/**
 * Niveaux d'impact axe qui font échouer le contrôle. `minor` et `moderate` sont
 * rapportés mais ne bloquent pas : ce sont souvent des recommandations contextuelles,
 * et un contrôle qui crie à tout propos finit par être ignoré.
 */
export const IMPACTS_BLOQUANTS = ['critical', 'serious']

/**
 * Règles axe activées : les référentiels WCAG 2.x niveaux A et AA, plus les bonnes
 * pratiques d'axe. Le RGAA s'appuie sur WCAG AA — mais axe n'en couvre qu'une part
 * (voir `docs/accessibility.md`) : ce contrôle ne vaut pas audit RGAA.
 */
export const ETIQUETTES_AXE = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
  'best-practice',
]

/**
 * Les pages mesurées. Trois familles, parce qu'un site ne se juge pas sur son accueil :
 * les gabarits diffèrent (scène animée, sections de pôle, corps d'article long), et
 * c'est justement là que les régressions se logent.
 *
 * Ajouter un gabarit ici suffit à l'inclure partout — budgets locaux comme CI.
 */
export const PAGES = [
  {
    id: 'accueil',
    chemin: '/',
    pourquoi: 'la scène animée et le verre — le gabarit le plus lourd du site',
  },
  {
    id: 'pole-ingenierie-web',
    chemin: '/services/ingenierie-web/',
    pourquoi: 'gabarit de pôle : sections, preuves chiffrées, palette dédiée',
  },
  {
    id: 'blog',
    chemin: '/blog/',
    pourquoi:
      "gabarit de liste d'articles : cartes datées, figures construites, JSON-LD de blog. " +
      "Ajouté avec les figures d'article (issue #108) — un gabarit non mesuré est un gabarit " +
      'non protégé',
  },
  {
    id: 'article',
    chemin: '/blog/pourquoi-ce-site-est-un-export-statique/',
    pourquoi: "gabarit d'article : corps long, typographie, fil d'Ariane, JSON-LD",
  },
  {
    id: 'realisations',
    chemin: '/realisations/',
    pourquoi:
      "gabarit d'index de réalisations : groupes par cadre d'emploi, cartes, étiquettes de " +
      'pôle et JSON-LD de collection',
  },
  {
    id: 'realisation',
    chemin: '/realisations/verhoeven-parcours-achat/',
    pourquoi:
      "gabarit de fiche : cadre d'emploi en liste de définitions, chiffre et sa portée, " +
      'étapes numérotées, étiquettes de pôle',
  },
]
