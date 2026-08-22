// format-date.ts — jeromemarichez-fr
// Une date `AAAA-MM-JJ` rendue lisible en français.

/**
 * Formateur construit une seule fois : `Intl.DateTimeFormat` est coûteux à instancier
 * et la liste d'articles l'appellerait à chaque ligne.
 *
 * `timeZone: 'UTC'` n'est pas un détail. Une chaîne `AAAA-MM-JJ` est interprétée comme
 * minuit UTC ; la formater dans un fuseau situé à l'ouest de Greenwich afficherait la
 * veille. Un article publié le 1er du mois passerait au mois précédent selon la machine
 * qui construit le site.
 */
const FORMAT_FR = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** Rend `2026-08-21` sous la forme `21 août 2026`. */
export function formatDateFr(dateIso: string): string {
  return FORMAT_FR.format(new Date(`${dateIso}T00:00:00Z`))
}
