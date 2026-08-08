// ContactView.tsx — jeromemarichez2026
// Vue de la page « /contact » : elle assemble les sections et leur fournit les données.
// C'est le seul endroit de la page qui lit le contenu ; les sections, elles, sont pures
// et ne connaissent que leurs props (docs/design.md — « Pur par défaut »).
//
// AUCUN FORMULAIRE — arbitrage de Jérôme MARICHEZ du 2026-08-08. Il n'y a donc ici ni
// état, ni gestionnaire d'événement, ni appel réseau : la page est du HTML statique de
// bout en bout, comme le reste du site, et aucun composant n'a besoin de `_notPure/`.
import { JsonLd } from '@/@shared/components/JsonLd'
import { buildContactStructuredData } from '@/@shared/seo'
import { contactPage, identite } from '@/content'
import { resoudreProfils } from '@/services/profils.service'
import { Coordonnees } from './sections/Coordonnees'
import { Entete } from './sections/Entete'
import { Rgpd } from './sections/Rgpd'
import { SansFormulaire } from './sections/SansFormulaire'

/**
 * Ordre des sections — c'est le raisonnement de la page :
 *
 * 1. à qui on écrit, et la promesse du site rappelée à l'endroit où elle se vérifie
 *    (`Entete`, seul `h1`) — un seul interlocuteur, c'est lui qui lit et qui répond ;
 * 2. comment le joindre, tout de suite (`Coordonnees`). C'est ce que le visiteur est venu
 *    chercher : rien ne le précède ;
 * 3. pourquoi il n'y a pas de formulaire (`SansFormulaire`) — l'absence est expliquée,
 *    pas subie ;
 * 4. ce qu'il advient des données (`Rgpd`).
 *
 * La résolution des profils a lieu ici, au rendu serveur donc au BUILD : une référence
 * qui ne désignerait aucune URL publique fait échouer la compilation, au lieu de publier
 * une page de contact à laquelle il manque une coordonnée sans que personne ne le voie.
 */
export function ContactView() {
  const profils = resoudreProfils(contactPage.coordonnees.profils, identite.profilsPublics)

  return (
    <>
      <Entete contenu={contactPage.entete} />
      <Coordonnees contact={identite.contact} contenu={contactPage.coordonnees} profils={profils} />
      <SansFormulaire contenu={contactPage.sansFormulaire} />
      <Rgpd contenu={contactPage.rgpd} />
      {/* Donnée structurée propre à la page : la `ContactPage`, rattachée par `@id` au
          `Person` du layout racine. Aucun `ContactPoint` — voir le commentaire de
          `buildContactStructuredData`. */}
      <JsonLd data={buildContactStructuredData()} />
    </>
  )
}
