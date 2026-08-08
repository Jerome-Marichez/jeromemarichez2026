// types.ts — jeromemarichez2026
// UNIQUEMENT des alias de types (unions, utilitaires, primitives nommées).
// Les entités métier sont des interfaces (IXxx) dans des fichiers dédiés de ce dossier.
// Convention : docs/architecture.md.

/**
 * Clé stable d'une offre de service. Sert d'identifiant et de segment d'URL.
 *
 * `sea` — et non `seo-sea` : le référencement naturel n'est pas une prestation vendue
 * (arbitrage de Jérôme MARICHEZ, 2026-08-08). Ce qui relevait du « SEO technique » est
 * devenu une propriété du livrable d'Ingénierie Web, sous l'axe « Livré SEO-ready ».
 */
export type CleOffre = 'ingenierie-web' | 'data-ia' | 'sea'

/** Niveau de diplôme, tel qu'inscrit sur les CV de référence. */
export type NiveauFormation = 'Bac +3' | 'Bac +5'

/**
 * Format d'un fichier image servi par le site.
 *
 * Union fermée et non `string` : c'est elle qui garantit qu'une déclinaison déclarée
 * dans le contenu correspond à un fichier réellement présent dans `front/public/`. Un
 * format ajouté au contenu sans que les fichiers existent produirait des `<source>` en
 * 404 — silencieuses, puisque le navigateur passe simplement à la suivante.
 *
 * L'ordre de déclaration n'a aucun sens ici : c'est `IImageIllustration.formats` qui
 * porte l'ordre de préférence, du plus efficace au repli.
 */
export type FormatImage = 'webp' | 'jpg'

/**
 * Justificatif officiel d'une certification.
 *
 * Union discriminée volontaire : la variante `a-fournir` ne porte **aucune** propriété
 * `url`. Lire `justificatif.url` sans avoir narrowé sur `statut === 'disponible'` est
 * donc une erreur de compilation, et il devient impossible d'afficher un lien mort ou
 * inventé. Tant qu'une URL n'a pas été fournie par Jérôme MARICHEZ, la certification
 * reste en `a-fournir`. Règle : CLAUDE.md, « Règles de véracité du contenu ».
 */
export type Justificatif =
  | { readonly statut: 'disponible'; readonly url: string }
  | { readonly statut: 'a-fournir' }

/**
 * Mention fiscale accompagnant un montant publié.
 *
 * Union à un seul membre, volontairement : l'arbitrage rendu par Jérôme MARICHEZ le
 * 2026-08-08 est **toutes taxes comprises**. Publier du hors taxes serait un second
 * arbitrage commercial, pas une saisie de contenu — il passerait donc par une
 * modification explicite de ce type, relue en revue de PR, et non par la main d'un
 * rédacteur pressé.
 */
export type MentionFiscale = 'TTC'

/**
 * Rythme auquel une ligne tarifaire est due.
 *
 * Ni la fréquence ni son libellé ne sont laissés au texte libre : « une seule fois » et
 * « forfait mensuel » sont des engagements commerciaux au même titre que le montant,
 * et un rendu qui les oublierait laisserait croire à un abonnement là où il n'y a qu'un
 * paiement — ou l'inverse.
 */
export type Periodicite = 'une-seule-fois' | 'mensuel'

/**
 * Montant d'une ligne tarifaire : trois cas, et un seul porte des chiffres.
 *
 * Union discriminée bâtie sur le même principe que `Justificatif` ci-dessus — la
 * garantie vient du modèle, pas de la vigilance du prochain rédacteur :
 *
 * - `fourchette` est la **seule** variante à porter des nombres, et `mentionFiscale` y
 *   est **obligatoire** : écrire un montant sans sa mention n'est pas un oubli de
 *   rédaction, c'est une erreur de compilation (TS2741). Un prix sans mention fiscale
 *   est ambigu, et l'ambiguïté se paie au premier échange avec un prospect ;
 * - `inclus` et `sur-devis` ne portent **aucune** propriété `mentionFiscale` : l'écrire
 *   là où il n'y a aucun montant à taxer ne compile pas davantage (TS2353), et le
 *   `z.strictObject` du schéma la rejetterait aussi au chargement ;
 * - lire `montant.minimum` sans avoir narrowé sur `nature === 'fourchette'` est une
 *   erreur de compilation : un rendu ne peut pas afficher un chiffre qui n'existe pas.
 *
 * Le rendu, lui, ne compose jamais ces champs à la main : `utils/tarif.ts` est le seul
 * point qui transforme un `Montant` en texte, et il émet toujours le chiffre et sa
 * mention d'un seul tenant.
 */
export type Montant =
  | { readonly nature: 'inclus' }
  | {
      readonly nature: 'fourchette'
      /** Borne basse, en euros. Entière et positive. */
      readonly minimum: number
      /** Borne haute, en euros. Strictement supérieure à `minimum` (schéma Zod). */
      readonly maximum: number
      readonly mentionFiscale: MentionFiscale
      readonly periodicite: Periodicite
      /**
       * Ce qui fait varier le prix entre les deux bornes, au génitif : « le périmètre ».
       *
       * Obligatoire : une fourchette qui ne dit pas ce qui la fait varier laisse le
       * prospect deviner de quel côté il tombera.
       */
      readonly variableSelon: string
    }
  | { readonly nature: 'sur-devis'; readonly periodicite: Periodicite }
