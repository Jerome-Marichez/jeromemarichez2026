// AccueilView.tsx — jeromemarichez2026
// Vue de la page d'accueil : elle assemble les sections et leur fournit les données.
// C'est le seul endroit de la page qui lit le contenu ; les sections, elles, sont
// pures et ne connaissent que leurs props (docs/design.md — « Pur par défaut »).
import { accueil, offres } from '@/content'
import { resoudreMaillons } from '@/services/chaine.service'
import { resoudrePreuves } from '@/services/preuves.service'
import { Accroche } from './sections/Accroche'
import { AppelContact } from './sections/AppelContact'
import { Chaine } from './sections/Chaine'
import { Offres } from './sections/Offres'
import { PointsEntree } from './sections/PointsEntree'
import { Pourquoi } from './sections/Pourquoi'
import { Preuves } from './sections/Preuves'

/**
 * Ordre des sections — c'est le raisonnement de la page, pas une mise en page :
 *
 * 1. la promesse (`Accroche`, seul `h1`) ;
 * 2. la chaîne qu'elle recouvre, illustrée de bout en bout (`Chaine`) ;
 * 3. où le visiteur y entre, selon qu'il part de zéro ou non (`PointsEntree`) ;
 * 4. d'où vient la promesse, depuis l'expérience vécue (`Pourquoi`) ;
 * 5. les trois pôles, atteignables (`Offres`) ;
 * 6. ce qui les rend crédibles (`Preuves`) ;
 * 7. l'action attendue (`AppelContact`).
 *
 * Les deux résolutions ont lieu ici, au rendu du serveur, donc au build : une
 * référence de preuve cassée ou une clé d'offre inconnue fait échouer la compilation
 * au lieu de produire une page en ligne portant une affirmation sans preuve ou un
 * maillon rattaché à une offre qui n'existe pas.
 */
export function AccueilView() {
  const maillons = resoudreMaillons(accueil.chaine.maillons, offres)
  const preuves = resoudrePreuves(accueil.preuves.references, offres)
  const preuvesPourquoi = resoudrePreuves(accueil.pourquoi.references, offres)

  return (
    <>
      <Accroche contenu={accueil.accroche} />
      <Chaine contenu={accueil.chaine} maillons={maillons} />
      <PointsEntree contenu={accueil.pointsEntree} />
      <Pourquoi contenu={accueil.pourquoi} preuves={preuvesPourquoi} />
      <Offres contenu={accueil.offres} offres={offres} />
      <Preuves contenu={accueil.preuves} preuves={preuves} />
      <AppelContact contenu={accueil.contact} />
    </>
  )
}
