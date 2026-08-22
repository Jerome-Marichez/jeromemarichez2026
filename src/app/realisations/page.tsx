// src/app/realisations/page.tsx — jeromemarichez-fr
// Routage seul : la liste est composée dans src/@vitrine/views/RealisationsIndexView.

import type { Metadata } from 'next'
import { StructuredData } from '@/@shared/components/StructuredData'
import { toRealisationRoute } from '@/@shared/routes'
import { buildPageMetadata } from '@/@shared/seo/page-metadata'
import { buildBreadcrumbSchema, buildCollectionPageSchema } from '@/@shared/seo/structured-data'
import { REALISATIONS_INDEX } from '@/@vitrine/contenu/realisations/realisations-index'
import { groupRealisationsByCadre, listRealisations } from '@/@vitrine/services/find-realisation'
import { RealisationsIndexView } from '@/@vitrine/views/RealisationsIndexView'

export const metadata: Metadata = buildPageMetadata(REALISATIONS_INDEX)

export default function RealisationsPage() {
  const groupes = groupRealisationsByCadre()

  return (
    <>
      <RealisationsIndexView groupes={groupes} index={REALISATIONS_INDEX} />
      <StructuredData
        schemas={[
          buildCollectionPageSchema({
            nom: REALISATIONS_INDEX.titre,
            description: REALISATIONS_INDEX.meta.description,
            route: REALISATIONS_INDEX.route,
            // L'inventaire suit l'ordre déclaré des fiches, pas celui des groupes : une
            // `ItemList` est une liste, elle ne porte pas la hiérarchie de la page.
            elements: listRealisations().map((realisation) => ({
              titre: realisation.titre,
              route: toRealisationRoute(realisation.slug),
            })),
          }),
          buildBreadcrumbSchema([
            { nom: REALISATIONS_INDEX.titre, route: REALISATIONS_INDEX.route },
          ]),
        ]}
      />
    </>
  )
}
