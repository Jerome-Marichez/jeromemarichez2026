// maillon-chaine.ts — jeromemarichez2026
// Entité éditoriale : un maillon de la chaîne racontée par la page d'accueil.
import type { CleOffre } from './types'

/**
 * Un maillon de la chaîne — le site, la donnée structurée et l'entrepôt, le taggage,
 * le SEA.
 *
 * `sortie` est le champ structurant : un maillon ne se décrit pas par ce qu'il
 * contient mais par CE QU'IL PRODUIT, c'est-à-dire par ce dont le maillon suivant a
 * besoin pour exister. C'est ce qui fait lire la page comme un enchaînement et non
 * comme un catalogue (README.md — « La chaîne, et les deux points d'entrée »).
 *
 * `illustration` porte le fil rouge e-commerce. Ce scénario est ILLUSTRATIF : il ne
 * décrit aucun client et aucune mission réelle. Le maillon ne dit donc jamais « chez
 * un client », et la section qui l'affiche porte l'avertissement correspondant en
 * texte visible (CLAUDE.md — « Règles de véracité du contenu »).
 */
export interface IMaillonChaine {
  /** Clé stable, unique dans la chaîne. Sert de clé de rendu de liste. */
  readonly cle: string
  readonly titre: string
  /** Ce que je fais à cette étape, à la première personne. */
  readonly role: string
  /** Déclinaison du fil rouge e-commerce. Scénario illustratif, jamais un cas client. */
  readonly illustration: string
  /**
   * Étiquette de `sortie`, propre au maillon : les trois premiers passent la main au
   * suivant, le dernier rend une décision au lecteur. Porter l'étiquette par la donnée
   * évite au rendu de traiter le dernier maillon comme un cas particulier.
   */
  readonly libelleSortie: string
  /** Ce que l'étape produit — et donc ce dont la suivante part. */
  readonly sortie: string
  /** Offres qui couvrent ce maillon. Au moins une ; l'entrepôt en couvre deux. */
  readonly offres: readonly CleOffre[]
}
