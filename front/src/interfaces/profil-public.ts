// profil-public.ts — jeromemarichez2026
// Entités éditoriales : la RÉFÉRENCE à un profil public, et le profil une fois résolu.
//
// Pourquoi deux entités plutôt qu'une. `identite.profilsPublics` ne porte que des URL
// vérifiées — c'est volontaire, un `sameAs` erroné rattache l'identité du site à un
// tiers. Mais une URL ne dit pas comment s'appelle le réseau qui l'héberge, et la page
// de contact doit l'afficher. Plutôt que d'écrire « LinkedIn » dans le rendu (du texte
// éditorial dans du JSX) ou de recopier l'URL dans un second fichier (deux vérités qui
// divergeront), le contenu de la page déclare une RÉFÉRENCE — un nom et un hôte — que
// `services/profils.service.ts` rapproche de l'URL réelle au moment du rendu.
//
// Même mécanique que `IReferencePreuve` : la résolution a lieu au build, et une
// référence qui ne désigne aucun profil fait échouer la compilation.

/** Référence à un profil public, déclarée par le contenu d'une page. */
export interface IReferenceProfil {
  readonly cle: string
  /** Nom du réseau, tel qu'il s'affiche : « LinkedIn ». */
  readonly nom: string
  /**
   * Hôte exact de l'URL du profil, comparé à `new URL(url).hostname`.
   *
   * Un hôte et non un fragment de chaîne : `includes('linkedin')` accepterait
   * `https://linkedin.attaquant.example`, une comparaison d'hôte non.
   */
  readonly hote: string
}

/** Un profil public résolu : son nom d'affichage et l'URL vérifiée qui le porte. */
export interface IProfilResolu {
  readonly cle: string
  readonly nom: string
  readonly url: string
  /**
   * L'URL débarrassée de son protocole : `www.linkedin.com/in/jerome-marichez-31948712b`.
   *
   * C'est ce que voit le visiteur, et c'est donc aussi le nom accessible du lien. Il est
   * DÉRIVÉ de l'URL et non écrit : un libellé rédigé à la main (« Mon profil ») ne dirait
   * pas où le lien mène, et un lien nommé « LinkedIn » répéterait son étiquette sans rien
   * ajouter. La forme affichée reste vérifiable d'un coup d'œil — c'est le seul lien de
   * la page qui sorte du site.
   */
  readonly libelle: string
}
