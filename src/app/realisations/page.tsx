// src/app/realisations/page.tsx — jeromemarichez-fr
// Routage seul : la liste est composée dans src/views/RealisationsIndexView.

import type { Metadata } from 'next'
import { StructuredData } from '@/components/StructuredData'
import { REALISATIONS_INDEX } from '@/contenu/realisations/realisations-index'
import { toRealisationRoute } from '@/routes'
import { buildPageMetadata } from '@/seo/page-metadata'
import { buildBreadcrumbSchema, buildCollectionPageSchema } from '@/seo/structured-data'
import { groupRealisationsByCadre, listRealisations } from '@/services/find-realisation'
import { RealisationsIndexView } from '@/views/RealisationsIndexView'

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
