// mesure-lighthouse.mjs — jeromemarichez-fr
//
// Mesure Lighthouse d'une page servie, et verdict par rapport aux planchers bloquants
// et aux cibles déclarés dans `scripts/budgets/pages.mjs`.
//
// Le navigateur est fourni par l'appelant : lancer un Chrome par page coûterait plus
// cher que la mesure elle-même, et ferait diverger les conditions d'exécution entre
// deux pages du même rapport.

import lighthouse from 'lighthouse'
import { evaluerScores, SEUILS_LIGHTHOUSE } from './pages.mjs'

/**
 * Profil de mesure. Mobile émulé et réseau bridé : c'est le cas défavorable, celui que
 * PageSpeed Insights applique par défaut et celui sur lequel un prospect jugera le site.
 * Mesurer en desktop sans bridage donnerait des scores flatteurs qui ne protègent de rien.
 */
const CONFIGURATION = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 1.75,
      disabled: false,
    },
    throttlingMethod: 'simulate',
    // Le site est servi en local : la latence réseau mesurée n'a aucun sens, seule la
    // simulation en a. Les valeurs sont celles du préréglage « slow 4G » de Lighthouse.
    throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 },
  },
}

/**
 * Lighthouse est instable de quelques points d'une exécution à l'autre. On garde la
 * **médiane** de plusieurs passes plutôt qu'une mesure unique : un budget qui échoue au
 * hasard une fois sur cinq se fait désactiver en une semaine.
 */
const PASSES = Number(process.env.BUDGET_PASSES ?? 3)

const mediane = (valeurs) => {
  const triees = [...valeurs].sort((a, b) => a - b)
  return triees[Math.floor(triees.length / 2)]
}

/**
 * Mesure une page et rend `{ id, url, scores, echecs }`.
 * `echecs` liste les catégories sous leur seuil — vide signifie budget tenu.
 *
 * @param {{ page: object, url: string, portDebogage: number }} contexte
 */
export async function mesurerPage({ page, url, portDebogage }) {
  const passes = []
  for (let index = 0; index < PASSES; index += 1) {
    const resultat = await lighthouse(
      url,
      { port: portDebogage, output: 'json', logLevel: 'error' },
      CONFIGURATION,
    )
    if (!resultat?.lhr) throw new Error(`Lighthouse n'a rien rendu pour ${url}`)
    passes.push(resultat.lhr)
  }

  const scores = {}
  for (const categorie of Object.keys(SEUILS_LIGHTHOUSE)) {
    const brut = passes.map((lhr) => Math.round((lhr.categories[categorie]?.score ?? 0) * 100))
    scores[categorie] = mediane(brut)
  }

  // Le verdict bloquant est calculé par `evaluerScores` : la même fonction, pure, qu'on
  // peut soumettre à un jeu de scores fictif pour vérifier qu'elle refuse encore.
  const echecs = evaluerScores(scores)

  // Les audits en échec de la catégorie performance : sans eux, un budget rouge dit
  // « c'est trop lent » sans jamais dire pourquoi, et personne ne le corrige.
  const dernier = passes[passes.length - 1]
  const coupables = Object.values(dernier.audits)
    .filter(
      (audit) => audit.score !== null && audit.score < 0.9 && audit.details?.type !== 'debugdata',
    )
    .map((audit) => ({ id: audit.id, titre: audit.title, valeur: audit.displayValue ?? '' }))
    .slice(0, 8)

  return { url, scores, echecs, coupables, page }
}
