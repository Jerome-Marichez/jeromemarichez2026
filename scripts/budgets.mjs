// budgets.mjs — jeromemarichez-fr
//
// Rend **exécutables** les deux promesses que le site affiche : Lighthouse ≥ 95 sur les
// quatre catégories, et accessibilité WCAG AA. Une commande, un code de sortie, et le
// nom de ce qui ne passe pas.
//
//   node scripts/budgets.mjs            (ou : make budgets)
//   node scripts/budgets.mjs perf       (ou : make budget-perf)
//   node scripts/budgets.mjs a11y       (ou : make budget-a11y)
//
// Le site est un export statique : le harnais commun (`scripts/harnais-statique.mjs`,
// partagé avec `make test-e2e`) construit `out/` si besoin, le sert et l'arrête. Ici, il
// ne reste que la mesure.
//
// Règle 8 du `CLAUDE.md` : le vert s'obtient par un site qui tient ses budgets, jamais
// par un seuil qu'on abaisse. Aucun `|| true`, aucune catégorie exemptée, aucune page
// retirée de la liste pour faire passer la CI.

import puppeteer from 'puppeteer'
import { analyserPage } from './budgets/mesure-axe.mjs'
import { mesurerPage } from './budgets/mesure-lighthouse.mjs'
import { PAGES } from './budgets/pages.mjs'
import {
  afficherAxe,
  afficherEchecsLighthouse,
  afficherTableauLighthouse,
} from './budgets/rapport.mjs'
import { avecSiteServi, lancer } from './harnais-statique.mjs'

const PORT_DEBOGAGE = Number(process.env.BUDGET_PORT_CDP ?? 9222)

const MODES = new Set(['perf', 'a11y', 'tout'])

function lireMode() {
  const argument = process.argv[2] ?? 'tout'
  if (!MODES.has(argument)) {
    throw new Error(`Mode inconnu « ${argument} » — attendu : ${[...MODES].join(', ')}`)
  }
  return argument
}

/**
 * Un seul Chrome pour toute la campagne : Lighthouse s'y connecte par le port de
 * débogage, axe par l'API puppeteer. Deux navigateurs mesureraient deux sites.
 */
function ouvrirNavigateur() {
  return puppeteer.launch({
    headless: true,
    args: [
      `--remote-debugging-port=${PORT_DEBOGAGE}`,
      // Indispensable en CI (conteneur sans namespaces utilisateur). N'affaiblit rien
      // ici : le seul contenu chargé est l'export statique servi en local.
      '--no-sandbox',
      '--disable-dev-shm-usage',
    ],
  })
}

async function mesurerPerformance({ url }) {
  const resultats = []
  for (const page of PAGES) {
    const cible = `${url}${page.chemin}`
    console.log(`Lighthouse — ${page.id} (${page.pourquoi})…`)
    // Lighthouse pilote lui-même l'onglet via CDP : on lui passe le port, pas un onglet.
    resultats.push(await mesurerPage({ page, url: cible, portDebogage: PORT_DEBOGAGE }))
  }
  afficherTableauLighthouse(resultats)
  afficherEchecsLighthouse(resultats)
  return resultats.every((resultat) => resultat.echecs.length === 0)
}

async function mesurerAccessibilite({ navigateur, url }) {
  const resultats = []
  for (const page of PAGES) {
    const cible = `${url}${page.chemin}`
    console.log(`axe-core — ${page.id}…`)
    resultats.push(await analyserPage({ navigateur, url: cible }))
  }
  afficherAxe(resultats)
  return resultats.every((resultat) => resultat.bloquantes.length === 0)
}

async function main() {
  const mode = lireMode()

  return avecSiteServi(async ({ url }) => {
    const navigateur = await ouvrirNavigateur()
    try {
      const verdicts = []
      if (mode === 'a11y' || mode === 'tout') {
        verdicts.push(['accessibilité (axe)', await mesurerAccessibilite({ navigateur, url })])
      }
      if (mode === 'perf' || mode === 'tout') {
        verdicts.push(['performance (Lighthouse)', await mesurerPerformance({ url })])
      }

      console.log('')
      for (const [nom, tenu] of verdicts) {
        console.log(`${tenu ? '✓' : '✗'} Budget ${nom} : ${tenu ? 'tenu' : 'DÉPASSÉ'}`)
      }
      return verdicts.every(([, tenu]) => tenu) ? 0 : 1
    } finally {
      await navigateur.close()
    }
  })
}

lancer('budgets', main)
