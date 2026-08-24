// format-contact-counter.ts — jeromemarichez-fr
// Le compteur de caractères du message de contact, rendu en français.

import { formatNumberFr } from './format-number-fr'

/**
 * Rend l'état du compteur : ce qui reste, ou ce qui dépasse.
 *
 * Le champ n'est pas borné par `maxLength`, et ce n'est pas un oubli : un `maxLength`
 * tronque un texte collé sans le dire, ce qui est exactement le piège que le formulaire
 * doit éviter. Le visiteur peut donc dépasser, il le voit, et la validation le lui dit en
 * toutes lettres au moment où il ouvre le mail.
 *
 * Le nombre passe par `formatNumberFr`, le même formateur que les messages du schéma :
 * sans lui, la même limite s'écrirait « 1 500 » sous le champ et « 1500 » dans l'erreur,
 * à deux centimètres d'écart.
 */
export function formatContactCounter(longueur: number, maximum: number): string {
  const ecart = maximum - longueur

  if (ecart < 0) {
    return `${formatNumberFr(-ecart)} caractères de trop`
  }

  return `${formatNumberFr(ecart)} caractères restants sur ${formatNumberFr(maximum)}`
}
