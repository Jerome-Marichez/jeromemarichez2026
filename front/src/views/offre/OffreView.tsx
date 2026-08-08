// OffreView.tsx — jeromemarichez2026
// LE GABARIT DES TROIS PAGES D'OFFRE. Un seul, trois contenus.
//
// Cette vue ne connaît aucune offre en particulier : elle reçoit une `IOffre` et
// n'en lit que des champs du modèle. C'est ce qui rend la promesse de l'issue #22
// vérifiable — ajouter une quatrième offre à `content/offres/` et déposer son fichier
// de route de six lignes lui donne sa page, sans qu'une ligne d'ici change.
import { JsonLd } from '@/@shared/components/JsonLd'
import { buildOffreStructuredData } from '@/@shared/seo'
import { grillesTarifaires, offrePage, offres } from '@/content'
import type { IOffre } from '@/interfaces/offre'
import { grouperAxesParVolet } from '@/services/axes.service'
import { resoudrePreuves } from '@/services/preuves.service'
import { Axes } from './sections/Axes'
import { Contact } from './sections/Contact'
import { Decision } from './sections/Decision'
import { Entete } from './sections/Entete'
import { Tarifs } from './sections/Tarifs'

interface IOffreViewProps {
  offre: IOffre
}

/**
 * Ordre des sections — c'est le raisonnement de la page :
 *
 * 1. ce que l'offre est (`Entete`, seul `h1` : le titre de l'offre et son accroche) ;
 * 2. ce qu'elle couvre, axe par axe, chacun portant sa preuve quand elle existe
 *    (`Axes`) ;
 * 3. ce que le client peut trancher grâce à elle (`Decision`) — la ligne éditoriale
 *    du CLAUDE.md interdit de fermer un bloc de service sur une liste d'outils ;
 * 4. ce qu'elle coûte, si et seulement si une grille est publiée (`Tarifs`) ;
 * 5. l'action attendue (`Contact`).
 *
 * La grille vient APRÈS la décision et non avant : l'argument se ferme sur ce que le
 * client décide, et le prix se lit ensuite, là où un prospect le cherche — juste avant
 * l'appel à contact.
 *
 * Les trois résolutions ont lieu ici, au rendu serveur donc au build : une référence de
 * preuve cassée fait échouer la compilation au lieu de publier une affirmation sans
 * preuve.
 */
export function OffreView({ offre }: IOffreViewProps) {
  const groupes = grouperAxesParVolet(offre.axes)

  // Toutes les offres n'ont pas de grille : Data & IA est entièrement sur devis, et
  // Ingénierie Web n'a pas d'arbitrage rendu. L'absence est une information portée par
  // le contenu (content/offres/index.ts), pas un cas d'erreur.
  const grille = grillesTarifaires.find((candidate) => candidate.offre === offre.cle)
  const [preuveTarifs] = grille ? resoudrePreuves([grille.preuve], offres) : []

  return (
    <>
      <Entete offre={offre} />
      <Axes contenu={offrePage} groupes={groupes} />
      <Decision contenu={offrePage} offre={offre} />
      {grille && preuveTarifs ? (
        <Tarifs contenu={offrePage} grille={grille} preuve={preuveTarifs} />
      ) : null}
      <Contact contenu={offrePage.contact} />
      {/* Données structurées propres à la page : le `Service` de cette offre, rattaché
          par `@id` au `ProfessionalService` que le layout racine déclare déjà. */}
      <JsonLd data={buildOffreStructuredData(offre)} />
    </>
  )
}
