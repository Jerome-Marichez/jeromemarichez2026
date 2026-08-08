// contact.ts — jeromemarichez2026
// Entité éditoriale : les coordonnées directes de Jérôme MARICHEZ.
//
// Ces coordonnées sont celles de Jérôme lui-même, déjà diffusées sur ses trois CV de
// référence, et leur publication a été demandée explicitement le 2026-08-08. Aucune
// donnée de tiers n'entre ici, et rien ne s'y ajoute sans arbitrage : ni adresse
// postale, ni horaires, ni délai de réponse, ni fourchette tarifaire — autant
// d'informations qu'un site de prestation est tenté d'afficher et qui, faute d'être
// établies, seraient inventées.

/**
 * Coordonnées directes, uniques et publiques.
 *
 * Elles vivent ici, dans le contenu typé, et **nulle part ailleurs** : ni dans un
 * composant, ni dans un `mailto:` écrit à la main, ni dans le JSON-LD. Une coordonnée
 * dupliquée dans le rendu est une coordonnée qui devient fausse le jour où elle change,
 * sans qu'aucun test ne s'en aperçoive.
 */
export interface IContact {
  /** Adresse e-mail publique. Validée comme e-mail par le schéma, pas comme chaîne. */
  readonly email: string
  /**
   * Téléphone au **format national français**, groupé par paires : `0X XX XX XX XX`.
   *
   * C'est la forme lisible par un humain, et la seule stockée. Le format international
   * E.164 attendu par schema.org et par un lien `tel:` en est **dérivé**
   * (`utils/telephone.ts`) plutôt que saisi une seconde fois : deux écritures du même
   * numéro finissent toujours par diverger.
   */
  readonly telephone: string
}
