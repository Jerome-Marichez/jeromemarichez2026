// src/app/services/sea-ux/page.tsx — jeromemarichez-fr
// Routage seul : la page est composée par le gabarit commun aux quatre pôles.

import type { Metadata } from 'next'
import { StructuredData } from '@/components/StructuredData'
import { PAGE_SEA_UX } from '@/contenu/sea-ux'
import { buildPageMetadata } from '@/seo/page-metadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/seo/structured-data'
import { findPole } from '@/services/find-pole'
import { PolePageView } from '@/views/PolePageView'

const { pole, suites } = findPole('sea-ux')

export const metadata: Metadata = buildPageMetadata(PAGE_SEA_UX)

export default function PolePage() {
  return (
    <>
      <PolePageView page={PAGE_SEA_UX} pole={pole} suites={suites} />
      <StructuredData
        schemas={[
          buildServiceSchema({
            nom: pole.nom,
            description: PAGE_SEA_UX.meta.description,
            route: pole.route,
          }),
          buildBreadcrumbSchema([{ nom: pole.nom, route: pole.route }]),
        ]}
      />
    </>
  )
}
