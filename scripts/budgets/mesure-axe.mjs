// mesure-axe.mjs — jeromemarichez-fr
//
// Contrôle d'accessibilité automatisé (axe-core, Deque) sur une page servie.
//
// **Ce contrôle ne vaut pas un audit RGAA.** axe-core ne détecte mécaniquement qu'une
// partie des critères — Deque annonce environ 57 % des problèmes WCAG sur ses propres
// mesures, et la littérature du domaine retient plutôt un tiers en pratique. Tout ce
// qui demande un jugement — pertinence d'une alternative textuelle, ordre de lecture,
// cohérence d'un intitulé de lien, utilisabilité au clavier d'un composant riche — reste
// hors de portée. Le détail et la part manuelle sont dans `docs/accessibility.md`.
//
// Ce que ce contrôle garantit, précisément : aucune régression sur la part mécanisable.
// C'est un filet, pas un certificat.

import { AxePuppeteer } from '@axe-core/puppeteer'
import { ETIQUETTES_AXE, IMPACTS_BLOQUANTS } from './pages.mjs'

/**
 * Analyse une page et rend `{ url, bloquantes, mineures }`.
 * Une violation bloquante (`critical` ou `serious`) fait échouer le budget.
 *
 * @param {{ navigateur: object, url: string }} contexte
 */
export async function analyserPage({ navigateur, url }) {
  const onglet = await navigateur.newPage()
  try {
    // `networkidle0` : les polices et la scène animée doivent être en place, sinon on
    // audite un état intermédiaire que personne ne voit jamais.
    await onglet.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })

    const resultat = await new AxePuppeteer(onglet).withTags(ETIQUETTES_AXE).analyze()

    const decrire = (violation) => ({
      regle: violation.id,
      impact: violation.impact,
      description: violation.help,
      occurrences: violation.nodes.length,
      exemple: violation.nodes[0]?.target?.join(' ') ?? '',
      aide: violation.helpUrl,
    })

    return {
      url,
      bloquantes: resultat.violations
        .filter((v) => IMPACTS_BLOQUANTS.includes(v.impact))
        .map(decrire),
      mineures: resultat.violations
        .filter((v) => !IMPACTS_BLOQUANTS.includes(v.impact))
        .map(decrire),
    }
  } finally {
    await onglet.close()
  }
}
