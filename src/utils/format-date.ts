/**
 * Formate une date ISO (AAAA-MM-JJ) en date longue francaise, ex. « 23 août 2026 ».
 *
 * Le site n'a pas de couche i18n : il est mono-langue francais, donc la locale
 * `fr-FR` est fixee explicitement plutot que laissee au systeme d'execution.
 * Sans ce choix, `toLocaleDateString()` sans argument dependrait de la machine
 * qui rend la page, ce qui romprait le rendu statique : la meme date afficherait
 * un texte different selon l'environnement de build.
 */
export function formatArticleDate(dateIso: string): string {
  const date = new Date(`${dateIso}T00:00:00Z`)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
