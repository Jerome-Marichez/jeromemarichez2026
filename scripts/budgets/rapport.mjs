// rapport.mjs — jeromemarichez-fr
//
// Mise en forme des résultats de budget. Un budget qui échoue doit dire **lequel** et
// **sur quelle page** : un « échec » sans chiffre se contourne, un chiffre se corrige.

import { SEUILS_LIGHTHOUSE } from './pages.mjs'

const CATEGORIES = Object.keys(SEUILS_LIGHTHOUSE)
const ETIQUETTES = {
  performance: 'Perf',
  accessibility: 'A11y',
  'best-practices': 'Bonnes prat.',
  seo: 'SEO',
}

const cadrer = (texte, largeur) => String(texte).padEnd(largeur)

export function afficherTableauLighthouse(resultats) {
  const largeurId = Math.max(12, ...resultats.map((r) => r.page.id.length))
  const entete = [cadrer('Page', largeurId), ...CATEGORIES.map((c) => cadrer(ETIQUETTES[c], 12))]
  console.log(`\n${entete.join(' │ ')}`)
  console.log('─'.repeat(entete.join(' │ ').length))
  for (const resultat of resultats) {
    const cellules = CATEGORIES.map((categorie) => {
      const score = resultat.scores[categorie]
      const marque = score < SEUILS_LIGHTHOUSE[categorie] ? '✗' : '✓'
      return cadrer(`${marque} ${score}`, 12)
    })
    console.log([cadrer(resultat.page.id, largeurId), ...cellules].join(' │ '))
  }
  console.log(
    `\nSeuils (CLAUDE.md) : ${CATEGORIES.map((c) => `${ETIQUETTES[c]} ≥ ${SEUILS_LIGHTHOUSE[c]}`).join(', ')}`,
  )
}

export function afficherEchecsLighthouse(resultats) {
  for (const resultat of resultats.filter((r) => r.echecs.length > 0)) {
    console.log(`\nBudget dépassé — ${resultat.page.id} (${resultat.url})`)
    for (const echec of resultat.echecs) {
      console.log(`  ✗ ${ETIQUETTES[echec.categorie]} : ${echec.obtenu} < ${echec.seuil}`)
    }
    if (resultat.coupables.length > 0) {
      console.log('  Audits en échec :')
      for (const audit of resultat.coupables) {
        console.log(`    · ${audit.titre}${audit.valeur ? ` — ${audit.valeur}` : ''} (${audit.id})`)
      }
    }
  }
}

export function afficherAxe(resultats) {
  console.log('\nAccessibilité — axe-core (part mécanisable de WCAG AA, pas un audit RGAA)')
  for (const resultat of resultats) {
    const bloquantes = resultat.bloquantes.length
    const mineures = resultat.mineures.length
    const marque = bloquantes === 0 ? '✓' : '✗'
    console.log(
      `  ${marque} ${resultat.url} — ${bloquantes} bloquante(s), ${mineures} mineure(s)/modérée(s)`,
    )
    for (const violation of [...resultat.bloquantes, ...resultat.mineures]) {
      const gravite = resultat.bloquantes.includes(violation) ? '✗' : '·'
      console.log(
        `      ${gravite} [${violation.impact}] ${violation.regle} : ${violation.description}` +
          ` — ${violation.occurrences} occurrence(s), ex. ${violation.exemple}`,
      )
    }
  }
}
