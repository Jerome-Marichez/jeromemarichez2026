// telephone.ts — jeromemarichez2026
// Utilitaire transverse : formats d'un numéro de téléphone français. Pur, sans état,
// sans métier — convention `src/utils/` du CLAUDE.md.
//
// Un numéro s'écrit de deux façons selon le lecteur : « 07 71 65 15 88 » pour un humain,
// « +33771651588 » (E.164) pour schema.org, pour un lien `tel:` et pour n'importe quel
// automate. Le contenu typé ne stocke que la première ; la seconde est dérivée ici. Le
// jour où le numéro change, il change à un seul endroit.

/**
 * Numéro français au format national, groupé par paires : `0X XX XX XX XX`.
 *
 * Le motif refuse `00` en tête (aucun opérateur français n'attribue ce préfixe), impose
 * les quatre paires et les espaces qui les séparent. Il est la référence commune de la
 * validation (`schemas/contact.schema.ts`) et de la conversion ci-dessous : un format et
 * son contrôle ne peuvent pas diverger s'ils sont écrits une seule fois.
 */
export const TELEPHONE_NATIONAL_FR = /^0[1-9](?: \d{2}){4}$/

/** Indicatif téléphonique de la France, cohérent avec `identite.codePays` (`FR`). */
export const INDICATIF_FRANCE = '+33'

/**
 * Convertit un numéro français national en E.164 : `07 71 65 15 88` → `+33771651588`.
 *
 * Le `0` initial est un **préfixe national d'acheminement** : il n'appartient pas au
 * numéro et disparaît derrière l'indicatif pays, il n'est donc pas simplement « enlevé
 * des espaces ». Un numéro qui ne respecte pas le format national lève une erreur plutôt
 * que de produire une chaîne plausible mais injoignable — c'est précisément le genre de
 * valeur qu'un JSON-LD publierait sans que personne ne s'en aperçoive.
 *
 * Volontairement limité à la France : le site n'a qu'un numéro, et un convertisseur
 * international générique serait du code non couvert par un besoin réel.
 */
export function telephoneVersE164(telephoneNational: string): string {
  if (!TELEPHONE_NATIONAL_FR.test(telephoneNational)) {
    throw new Error(
      `Numéro français attendu au format « 0X XX XX XX XX », reçu : « ${telephoneNational} ».`,
    )
  }
  const chiffres = telephoneNational.replace(/ /g, '')
  return `${INDICATIF_FRANCE}${chiffres.slice(1)}`
}
