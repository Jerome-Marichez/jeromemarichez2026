// src/app/services/ia/page.tsx — jeromemarichez-fr
// Routage seul : la page est composée par le gabarit commun aux quatre pôles.

import type { Metadata } from 'next'
import { StructuredData } from '@/@shared/components/StructuredData'
import { buildPageMetadata } from '@/@shared/seo/page-metadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/@shared/seo/structured-data'
import { PAGE_IA } from '@/@vitrine/contenu/ia'
import { findPole } from '@/@vitrine/services/find-pole'
import { PolePageView } from '@/@vitrine/views/PolePageView'

const { pole, suites } = findPole('ia')

export const metadata: Metadata = buildPageMetadata(PAGE_IA)

export default function PolePage() {
  return (
    <>
      <PolePageView page={PAGE_IA} pole={pole} suites={suites} />
      <StructuredData
        schemas={[
          buildServiceSchema({
            nom: pole.nom,
            description: PAGE_IA.meta.description,
            route: pole.route,
          }),
          buildBreadcrumbSchema([{ nom: pole.nom, route: pole.route }]),
        ]}
      />
    </>
  )
}
