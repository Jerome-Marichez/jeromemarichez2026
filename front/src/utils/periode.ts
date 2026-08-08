// periode.ts — jeromemarichez2026
// Utilitaire transverse : mettre en forme une période d'années. Pur, sans état, sans
// métier — convention `src/utils/` du CLAUDE.md.
//
// Aucun texte éditorial ici : seul le séparateur typographique l'est, et il ne dit rien
// que les deux années ne disent déjà.

/**
 * Tiret demi-cadratin encadré d'espaces insécables.
 *
 * Le demi-cadratin est le signe français d'un intervalle, et les espaces insécables
 * empêchent la période de se couper en fin de ligne — « 2019 » d'un côté, « – 2022 » de
 * l'autre se lirait comme une date isolée.
 */
const SEPARATEUR = ' – '

/**
 * Met en forme une période : `2019, 2022` → « 2019 – 2022 ».
 *
 * Une période d'un seul millésime rend l'année seule : « 2022 – 2022 » ferait croire à
 * une durée là où il n'y en a pas.
 *
 * Lève si la fin précède le début plutôt que d'afficher une période impossible : sur une
 * page de parcours, une date est une affirmation comme une autre.
 */
export function formaterPeriode(anneeDebut: number, anneeFin: number): string {
  if (anneeFin < anneeDebut) {
    throw new Error(`Période impossible : ${anneeDebut} – ${anneeFin} finit avant de commencer.`)
  }
  if (anneeFin === anneeDebut) return String(anneeDebut)
  return `${anneeDebut}${SEPARATEUR}${anneeFin}`
}
