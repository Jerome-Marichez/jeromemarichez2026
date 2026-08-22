// src/app/services/data/page.tsx — jeromemarichez-fr
// Routage seul : la page est composée par le gabarit commun aux quatre pôles.

import type { Metadata } from 'next'
import { StructuredData } from '@/@shared/components/StructuredData'
import { buildPageMetadata } from '@/@shared/seo/page-metadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/@shared/seo/structured-data'
import { PAGE_DATA } from '@/@vitrine/contenu/data'
import { findPole } from '@/@vitrine/services/find-pole'
import { PolePageView } from '@/@vitrine/views/PolePageView'

const { pole, suites } = findPole('data')

export const metadata: Metadata = buildPageMetadata(PAGE_DATA)

export default function PolePage() {
  return (
    <>
      <PolePageView page={PAGE_DATA} pole={pole} suites={suites} />
      <StructuredData
        schemas={[
          buildServiceSchema({
            nom: pole.nom,
            description: PAGE_DATA.meta.description,
            route: pole.route,
          }),
          buildBreadcrumbSchema([{ nom: pole.nom, route: pole.route }]),
        ]}
      />
    </>
  )
}
