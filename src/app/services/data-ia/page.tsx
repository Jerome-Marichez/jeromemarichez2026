// src/app/services/data-ia/page.tsx — jeromemarichez-fr
// Routage seul : la page est composée par le gabarit commun aux trois pôles.

import type { Metadata } from 'next'
import { StructuredData } from '@/@shared/components/StructuredData'
import { buildPageMetadata } from '@/@shared/seo/page-metadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/@shared/seo/structured-data'
import { PAGE_DATA_IA } from '@/@vitrine/contenu/data-ia'
import { findPole } from '@/@vitrine/services/find-pole'
import { PolePageView } from '@/@vitrine/views/PolePageView'

const { pole, suivant } = findPole('data-ia')

export const metadata: Metadata = buildPageMetadata(PAGE_DATA_IA)

export default function PolePage() {
  return (
    <>
      <PolePageView page={PAGE_DATA_IA} pole={pole} suivant={suivant} />
      <StructuredData
        schemas={[
          buildServiceSchema({
            nom: pole.nom,
            description: PAGE_DATA_IA.meta.description,
            route: pole.route,
          }),
          buildBreadcrumbSchema([{ nom: pole.nom, route: pole.route }]),
        ]}
      />
    </>
  )
}
