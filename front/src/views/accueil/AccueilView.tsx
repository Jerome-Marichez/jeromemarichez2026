// AccueilView.tsx — jeromemarichez2026
// Vue de la page d'accueil : elle assemble les sections et leur fournit les données.
// C'est le seul endroit de la page qui lit le contenu ; les sections, elles, sont
// pures et ne connaissent que leurs props (docs/design.md — « Pur par défaut »).
import { accueil, offres } from '@/content'
import { resoudrePreuves } from '@/services/preuves.service'
import { Accroche } from './sections/Accroche'
import { AppelContact } from './sections/AppelContact'
import { Offres } from './sections/Offres'
import { Preuves } from './sections/Preuves'

/**
 * Ordre des sections : la promesse, ce qui est vendu, ce qui le rend crédible, puis
 * l'action attendue. C'est l'ordre du tableau de positionnement du README, et celui
 * de la navigation principale — les offres avant le parcours, le contact en dernier.
 *
 * La résolution des preuves a lieu ici, au rendu du serveur, donc au build : une
 * référence cassée fait échouer la compilation au lieu de produire une page en ligne
 * portant une affirmation sans preuve.
 */
export function AccueilView() {
  const preuves = resoudrePreuves(accueil.preuves.references, offres)

  return (
    <>
      <Accroche contenu={accueil.accroche} />
      <Offres contenu={accueil.offres} offres={offres} />
      <Preuves contenu={accueil.preuves} preuves={preuves} />
      <AppelContact contenu={accueil.contact} />
    </>
  )
}
