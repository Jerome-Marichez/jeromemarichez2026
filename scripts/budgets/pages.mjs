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
 * Les pages mesurées. **Les six routes du site, sans exception.**
 *
 * Le site en compte six : les mesurer toutes coûte moins cher que de choisir
 * lesquelles sacrifier, et supprime la question « ce gabarit est-il protégé ». Un
 * gabarit non mesuré est un gabarit non protégé.
 *
 * Cette liste a été **remplacée le 2026-09-20** : elle visait les routes du site
 * vitrine à quatre pôles (`/services/*`, `/realisations/`, `/blog/`), retiré à la
 * demande de Jérôme MARICHEZ. Ce n'est pas une page soustraite au contrôle, c'est une
 * liste remise en face du site qui existe, et la couverture y gagne au lieu d'y perdre.
 *
 * **Aucun seuil n'a été touché** à cette occasion : le plancher de performance reste à
 * 80, les trois autres catégories à 95.
 */
export const PAGES = [
  {
    id: 'accueil',
    chemin: '/',
    pourquoi:
      'le gabarit le plus lourd : le titre qui se révèle caractère par caractère et le ' +
      'mug animé en continu. Si une régression de performance existe, elle est ici',
  },
  {
    id: 'a-propos',
    chemin: '/a-propos/',
    pourquoi:
      'gabarit de prose longue, plus les certifications. La seule page dont un champ ' +
      "peut être vide (`annee: null` sur Google Ads) : son rendu sans année se contrôle ici",
  },
  {
    id: 'parcours',
    chemin: '/parcours/',
    pourquoi:
      "gabarit d'entrées riches répétées : trois expériences, chacune avec ses " +
      'réalisations, sa stack et son encadrement',
  },
  {
    id: 'projets',
    chemin: '/projets/',
    pourquoi:
      'la page la plus longue du site : une dizaine de fiches en listes de définitions. ' +
      "C'est le pire cas de poids de document et de profondeur de plan",
  },
  {
    id: 'competences',
    chemin: '/competences/',
    pourquoi:
      'le mur de stack : une région qui saigne sur toute la largeur, en flux de colonnes, ' +
      'avec soixante-et-onze entrées. Le contraste de sa typographie dense se contrôle ici',
  },
  {
    id: 'contact',
    chemin: '/contact/',
    pourquoi:
      'la page la plus dépouillée, et la seule à porter des liens sortants et des liens ' +
      "d'appel et de courriel : leurs intitulés accessibles ne sont contrôlés que là",
  },
]
