// tarif.ts — jeromemarichez2026
// Utilitaire transverse : mise en forme d'un montant tarifaire. Pur, sans état, sans
// métier — convention `src/utils/` du CLAUDE.md.
//
// Ce module est le SEUL endroit du dépôt qui transforme un `Montant` en texte affichable.
// Ce n'est pas une commodité, c'est la seconde moitié de la garantie portée par le
// typage : `Montant` interdit d'ÉCRIRE un chiffre sans sa mention fiscale, et cette
// fonction interdit de l'AFFICHER sans elle — les deux sortent d'un seul et même gabarit,
// inséparables. La fonction qui met en forme les euros n'est volontairement pas exportée :
// il n'existe aucun moyen d'obtenir « 1 200 € » tout seul.
import type { Montant, Periodicite } from '../interfaces/types'

/**
 * Texte d'un montant, prêt à afficher.
 *
 * Type marqué : seule `formaterMontant` en produit. Un composant qui déclare recevoir un
 * `MontantAffichable` ne peut donc pas se voir passer un prix écrit à la main dans du
 * JSX — la chaîne littérale `'300 à 1 200 €'` ne compile pas à cette place, faute de
 * marque. C'est ce qui étend la garantie « jamais de montant sans mention fiscale »
 * jusqu'au rendu, au lieu de l'arrêter à la donnée.
 */
export type MontantAffichable = string & { readonly __montantAffichable: true }

/** Le seul point du dépôt qui appose la marque. */
function marquer(texte: string): MontantAffichable {
  // Unique `as` du module, et sa raison d'être : une marque n'a de valeur que si un seul
  // endroit peut la produire. Ce n'est pas le cast d'une donnée externe que le CLAUDE.md
  // proscrit — la chaîne vient d'être construite deux lignes plus haut.
  return texte as MontantAffichable
}

/** Prestation comprise dans une autre. Accord au féminin : « la mise en place … incluse ». */
const LIBELLE_INCLUS = 'Incluse'

/** Rythme d'un montant chiffré, dit à la suite du prix : « … TTC, une seule fois ». */
const MODALITE_CHIFFREE: Record<Periodicite, string> = {
  'une-seule-fois': 'une seule fois',
  mensuel: 'par mois',
}

/** Rythme d'un montant non chiffré, qui ouvre la phrase : « Forfait mensuel, sur devis ». */
const LIBELLE_FORFAIT: Record<Periodicite, string> = {
  'une-seule-fois': 'Forfait unique',
  mensuel: 'Forfait mensuel',
}

/**
 * Groupe les milliers par espaces : `1200` → `1 200`.
 *
 * Espace ordinaire, et non fine insécable : c'est la graphie déjà employée par le contenu
 * publié (« 100 000 € » dans les preuves du parcours), et un caractère invisible se
 * perdrait au premier copier-coller d'un rédacteur.
 */
function grouperMilliers(euros: number): string {
  return String(euros).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/**
 * Met en forme un montant tarifaire, mention fiscale comprise.
 *
 * Les trois cas de la grille validée par Jérôme MARICHEZ (2026-08-08) :
 *
 * - `inclus` → « Incluse » ;
 * - `fourchette` → « 300 à 1 200 € TTC, une seule fois, selon le périmètre » ;
 * - `sur-devis` → « Forfait mensuel, sur devis ».
 *
 * La mention fiscale est collée au chiffre, dans la même chaîne : elle ne peut pas être
 * reléguée en note de bas de page par une mise en page, ni oubliée par un rendu partiel.
 */
export function formaterMontant(montant: Montant): MontantAffichable {
  switch (montant.nature) {
    case 'inclus':
      return marquer(LIBELLE_INCLUS)
    case 'fourchette': {
      const { minimum, maximum, mentionFiscale, periodicite, variableSelon } = montant
      const prix = `${grouperMilliers(minimum)} à ${grouperMilliers(maximum)} € ${mentionFiscale}`
      return marquer(`${prix}, ${MODALITE_CHIFFREE[periodicite]}, selon ${variableSelon}`)
    }
    case 'sur-devis':
      return marquer(`${LIBELLE_FORFAIT[montant.periodicite]}, sur devis`)
  }
}
