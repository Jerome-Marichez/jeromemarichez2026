// pages.mjs — jeromemarichez-fr
//
// Ce que les budgets mesurent, et à partir de quel chiffre ils échouent.
// Source unique : `scripts/budgets.mjs`, la doc et la CI lisent ces valeurs, personne
// ne les recopie.
//
// **Les seuils viennent du `CLAUDE.md` et de ses arbitrages**, pas d'un ajustement de
// confort décidé au moment où un contrôle passe au rouge. La règle 8 du `CLAUDE.md`
// interdit d'abaisser un seuil pour faire passer la CI : c'est la page qu'on corrige,
// jamais le budget. Un budget qu'on rabote en douce ne protège plus de rien.
//
// Une révision de seuil par le propriétaire du projet n'est pas ce geste-là, à une
// condition : qu'elle soit écrite, datée et attribuée, pour qu'on la distingue six mois
// plus tard d'une régression maquillée. C'est le cas du plancher de performance
// ci-dessous, et de lui seul. Ce qui reste interdit sans condition : un `|| true`, une
// catégorie exemptée du contrôle, une page retirée de la liste mesurée.

/**
 * Seuil **bloquant**, par catégorie Lighthouse : sous cette valeur, le budget échoue et
 * rien ne se livre. Les quatre catégories sont contrôlées, aucune n'est exemptée.
 *
 * Le plancher de **performance est à 80 depuis le 2026-08-24** : « Pour le LCP
 * j'autorise 80/100 mais pas moins » (arbitrage de Jérôme MARICHEZ, issue #146). Les
 * trois autres catégories ne bougent pas et restent à 95 : une performance tolérée à 82
 * n'excuse aucune régression d'accessibilité, de bonnes pratiques ou de SEO.
 */
export const SEUILS_LIGHTHOUSE = {
  performance: 80,
  accessibility: 95,
  'best-practices': 95,
  seo: 95,
}

/**
 * Ce qu'on **vise**, par catégorie. « Mais pas moins » dit que 80 est un plancher, pas
 * une cible : le site vend la performance tenue, et un score qui passe le plancher sans
 * atteindre 95 doit se voir dans le rapport au lieu de se confondre avec un score
 * confortable. Un écart entre la cible et le plancher ne bloque pas, il signale.
 */
export const CIBLES_LIGHTHOUSE = {
  performance: 95,
  accessibility: 95,
  'best-practices': 95,
  seo: 95,
}

/**
 * Les trois états d'un score, dans l'ordre de gravité. `echec` seul fait échouer le
 * budget ; `sousCible` passe le plancher mais reste sous la cible ; `tenu` est le score
 * confortable.
 *
 * @param {string} categorie
 * @param {number} score
 * @returns {'echec' | 'sousCible' | 'tenu'}
 */
export function classerScore(categorie, score) {
  if (score < SEUILS_LIGHTHOUSE[categorie]) return 'echec'
  if (score < CIBLES_LIGHTHOUSE[categorie]) return 'sousCible'
  return 'tenu'
}

/**
 * Le verdict bloquant d'une page : la liste des catégories sous leur plancher, vide
 * quand le budget est tenu. Fonction pure, sans Lighthouse ni navigateur, pour qu'on
 * puisse lui soumettre un jeu de scores et vérifier qu'elle refuse encore ce qu'elle
 * doit refuser.
 *
 * @param {Record<string, number>} scores
 */
export function evaluerScores(scores) {
  return Object.entries(SEUILS_LIGHTHOUSE)
    .filter(([categorie, seuil]) => scores[categorie] < seuil)
    .map(([categorie, seuil]) => ({ categorie, obtenu: scores[categorie], seuil }))
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
    id: 'article-avec-source',
    chemin: '/blog/de-la-doc-qui-pilote-une-ia-a-une-carte-de-l-architecture/',
    pourquoi:
      "variante du gabarit d'article : la note de publication d'origine et son lien sortant " +
      'en target=_blank. Ajoutée avec le premier article qui en porte une (issue #109) — le ' +
      "composant existait depuis l'issue #108, mais aucune page mesurée ne le rendait, donc " +
      "son contraste et l'intitulé de son lien n'étaient contrôlés nulle part. C'est aussi " +
      'la seule page mesurée qui rende une LISTE de prose (`IArticleSection.liste`, issue ' +
      '#121) : ses puces et leur contraste sont contrôlés ici, et nulle part ailleurs',
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
