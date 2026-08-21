// src/app/services/sea-ux/page.tsx — jeromemarichez-fr
// Routage seul : la page est composée par le gabarit commun aux trois pôles.

import type { Metadata } from 'next'
import { StructuredData } from '@/@shared/components/StructuredData'
import { buildPageMetadata } from '@/@shared/seo/page-metadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/@shared/seo/structured-data'
import { PAGE_SEA_UX } from '@/@vitrine/contenu/sea-ux'
import { findPole } from '@/@vitrine/services/find-pole'
import { PolePageView } from '@/@vitrine/views/PolePageView'

const { pole, suivant } = findPole('sea-ux')

export const metadata: Metadata = buildPageMetadata(PAGE_SEA_UX)

export default function PolePage() {
  return (
    <>
      <PolePageView page={PAGE_SEA_UX} pole={pole} suivant={suivant} />
      <StructuredData
        schemas={[
          buildServiceSchema({
            nom: pole.nom,
            description: PAGE_SEA_UX.meta.description,
            route: pole.route,
          }),
          buildBreadcrumbSchema({ nom: pole.nom, route: pole.route }),
        ]}
      />
    </>
  )
}
