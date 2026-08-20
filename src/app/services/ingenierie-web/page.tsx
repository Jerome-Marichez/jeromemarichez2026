// src/app/services/ingenierie-web/page.tsx — jeromemarichez-fr
// Routage seul : la page est composée par le gabarit commun aux trois pôles.

import type { Metadata } from 'next'
import { StructuredData } from '@/@shared/components/StructuredData'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/@shared/seo/structured-data'
import { PAGE_INGENIERIE_WEB } from '@/@vitrine/contenu/ingenierie-web'
import { findPole } from '@/@vitrine/services/find-pole'
import { PolePageView } from '@/@vitrine/views/PolePageView'

const { pole, suivant } = findPole('ingenierie-web')

export const metadata: Metadata = {
  title: PAGE_INGENIERIE_WEB.meta.title,
  description: PAGE_INGENIERIE_WEB.meta.description,
  alternates: { canonical: pole.route },
}

export default function PolePage() {
  return (
    <>
      <PolePageView page={PAGE_INGENIERIE_WEB} pole={pole} suivant={suivant} />
      <StructuredData
        schemas={[
          buildServiceSchema({
            nom: pole.nom,
            description: PAGE_INGENIERIE_WEB.meta.description,
            route: pole.route,
          }),
          buildBreadcrumbSchema({ nom: pole.nom, route: pole.route }),
        ]}
      />
    </>
  )
}
