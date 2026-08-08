// ParcoursView.tsx — jeromemarichez2026
// Vue de la page « /parcours » : elle assemble les sections et leur fournit les données.
// C'est le seul endroit de la page qui lit le contenu ; les sections, elles, sont pures
// et ne connaissent que leurs props (docs/design.md — « Pur par défaut »).
import { JsonLd } from '@/@shared/components/JsonLd'
import { PanneauAction } from '@/@shared/components/PanneauAction'
import { buildParcoursStructuredData } from '@/@shared/seo'
import { certifications, experiences, formations, parcoursPage } from '@/content'
import { Certifications } from './sections/Certifications'
import { Entete } from './sections/Entete'
import { Experiences } from './sections/Experiences'
import { Formations } from './sections/Formations'

/**
 * Ordre des sections — c'est le raisonnement de la page, pas une mise en page :
 *
 * 1. qui parle et depuis combien de temps (`Entete`, seul `h1`) ;
 * 2. ce qui a été fait, du plus récent au plus ancien (`Experiences`) — c'est ce qui rend
 *    les trois offres crédibles, et c'est la raison d'être de la page ;
 * 3. ce qui l'atteste par un diplôme (`Formations`) ;
 * 4. ce qui l'atteste par un titre (`Certifications`) ;
 * 5. l'action attendue (`PanneauAction`).
 *
 * L'EXPÉRIENCE VIENT AVANT LES DIPLÔMES. Un prospect qui hésite achète neuf ans de
 * pratique, pas un intitulé de formation ; l'ordre inverse est celui d'un CV d'étudiant.
 *
 * AUCUN TRI N'EST FAIT ICI. `content/experiences.ts` déclare l'ordre antichronologique et
 * le dit dans son commentaire d'en-tête : le retrier au rendu créerait une seconde
 * autorité sur l'ordre d'affichage, et c'est le contenu qui fait foi (docs/architecture.md).
 */
export function ParcoursView() {
  return (
    <>
      <Entete contenu={parcoursPage.entete} />
      <Experiences experiences={experiences} titre={parcoursPage.titreExperiences} />
      <Formations formations={formations} titre={parcoursPage.titreFormations} />
      <Certifications
        certifications={certifications}
        libelleJustificatif={parcoursPage.libelleJustificatif}
        titre={parcoursPage.titreCertifications}
      />
      <PanneauAction
        action={parcoursPage.contact.action}
        id="contact"
        lead={parcoursPage.contact.lead}
        titre={parcoursPage.contact.titre}
      />
      {/* Donnée structurée propre à la page : la `ProfilePage`, rattachée par `@id` au
          `Person` que le layout racine déclare déjà — jamais une seconde description
          de la personne. */}
      <JsonLd data={buildParcoursStructuredData()} />
    </>
  )
}
