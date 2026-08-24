// rapport.mjs — jeromemarichez-fr
//
// Mise en forme des résultats de budget. Un budget qui échoue doit dire **lequel** et
// **sur quelle page** : un « échec » sans chiffre se contourne, un chiffre se corrige.
//
// Trois états, pas deux : le plancher de performance (80) n'est pas la cible (95), et un
// 85 qui s'afficherait comme un 97 laisserait filer une dérive jusqu'au jour où elle
// bloque. Ce qui passe le plancher sans atteindre la cible se lit d'un coup d'œil.

import { CIBLES_LIGHTHOUSE, classerScore, SEUILS_LIGHTHOUSE } from './pages.mjs'

const CATEGORIES = Object.keys(SEUILS_LIGHTHOUSE)
const ETIQUETTES = {
  performance: 'Perf',
  accessibility: 'A11y',
  'best-practices': 'Bonnes prat.',
  seo: 'SEO',
}

// Une marque par état. `~` se distingue de `✓` sans crier comme `✗` : le score passe, il
// ne se célèbre pas.
const MARQUES = { tenu: '✓', sousCible: '~', echec: '✗' }

const cadrer = (texte, largeur) => String(texte).padEnd(largeur)

export function afficherTableauLighthouse(resultats) {
  const largeurId = Math.max(12, ...resultats.map((r) => r.page.id.length))
  const entete = [cadrer('Page', largeurId), ...CATEGORIES.map((c) => cadrer(ETIQUETTES[c], 12))]
  console.log(`\n${entete.join(' │ ')}`)
  console.log('─'.repeat(entete.join(' │ ').length))
  for (const resultat of resultats) {
    const cellules = CATEGORIES.map((categorie) => {
      const score = resultat.scores[categorie]
      return cadrer(`${MARQUES[classerScore(categorie, score)]} ${score}`, 12)
    })
    console.log([cadrer(resultat.page.id, largeurId), ...cellules].join(' │ '))
  }
  const bornes = CATEGORIES.map((c) =>
    SEUILS_LIGHTHOUSE[c] === CIBLES_LIGHTHOUSE[c]
      ? `${ETIQUETTES[c]} ≥ ${SEUILS_LIGHTHOUSE[c]}`
      : `${ETIQUETTES[c]} ≥ ${SEUILS_LIGHTHOUSE[c]} (cible ${CIBLES_LIGHTHOUSE[c]})`,
  )
  console.log(`\nPlanchers bloquants : ${bornes.join(', ')}`)
  console.log('Lecture : ✓ à la cible │ ~ passe le plancher, sous la cible │ ✗ sous le plancher')
  afficherSousCible(resultats)
}

/**
 * Les scores qui passent sans atteindre la cible. Ils ne font pas échouer le budget, et
 * c'est précisément pour ça qu'ils doivent être nommés : personne ne relit un tableau
 * vert.
 */
function afficherSousCible(resultats) {
  const sous = resultats.flatMap((resultat) =>
    CATEGORIES.filter(
      (categorie) => classerScore(categorie, resultat.scores[categorie]) === 'sousCible',
    ).map((categorie) => ({
      page: resultat.page.id,
      categorie,
      score: resultat.scores[categorie],
    })),
  )
  if (sous.length === 0) return
  console.log('\nSous la cible, plancher tenu — à corriger, pas à oublier :')
  for (const { page, categorie, score } of sous) {
    console.log(
      `  ~ ${page} — ${ETIQUETTES[categorie]} : ${score}, cible ${CIBLES_LIGHTHOUSE[categorie]}` +
        ` (plancher ${SEUILS_LIGHTHOUSE[categorie]})`,
    )
  }
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
