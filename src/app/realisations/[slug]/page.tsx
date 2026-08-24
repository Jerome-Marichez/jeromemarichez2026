// src/app/realisations/[slug]/page.tsx — jeromemarichez-fr
// Routage seul : la fiche est composée dans src/@vitrine/views/RealisationView.

import type { Metadata } from 'next'
import { StructuredData } from '@/components/StructuredData'
import { REALISATIONS_INDEX } from '@/contenu/realisations/realisations-index'
import { toRealisationRoute } from '@/routes'
import { buildPageMetadata } from '@/seo/page-metadata'
import { buildBreadcrumbSchema, buildRealisationSchema } from '@/seo/structured-data'
import { findRealisation, listRealisations } from '@/services/find-realisation'
import { RealisationView } from '@/views/RealisationView'

interface RealisationPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Obligatoire sous `output: 'export'` : sans cette liste, le build n'a aucune page à
 * écrire pour ce segment et il échoue. Elle est dérivée des fiches, jamais tenue à la
 * main — une fiche publiée devient une page servie sans autre geste.
 */
export function generateStaticParams(): { slug: string }[] {
  return listRealisations().map((realisation) => ({ slug: realisation.slug }))
}

/**
 * Aucune URL hors de cette liste n'est servie. C'est déjà la conséquence de l'export
 * statique ; l'écrire noir sur blanc évite qu'un futur passage au rendu serveur ouvre
 * silencieusement `/realisations/<n-importe-quoi>` sur une page générée à la volée.
 */
export const dynamicParams = false

/**
 * `buildPageMetadata`, et **pas** `buildArticleMetadata` : celui-ci exige une date de
 * publication et une date de modification. Une réalisation n'est pas datée — ce qui la
 * situe dans le temps, c'est la période du poste sous lequel elle a été menée, et cette
 * période appartient au contenu de la fiche. Lui inventer une date pour satisfaire un
 * constructeur reviendrait à publier un fait faux dans `og:published_time`.
 */
export async function generateMetadata({ params }: RealisationPageProps): Promise<Metadata> {
  const { slug } = await params
  const { realisation } = findRealisation(slug)

  return buildPageMetadata({ meta: realisation.meta, route: toRealisationRoute(slug) })
}

export default async function RealisationPage({ params }: RealisationPageProps) {
  const { slug } = await params
  const { realisation, autres } = findRealisation(slug)
  // Une seule dérivation de la route, partagée par le JSON-LD et le fil d'Ariane : c'est
  // ce qui garantit qu'ils désignent la page réellement servie.
  const route = toRealisationRoute(realisation.slug)

  return (
    <>
      <RealisationView autres={autres} index={REALISATIONS_INDEX} realisation={realisation} />
      <StructuredData
        schemas={[
          buildRealisationSchema({
            titre: realisation.titre,
            chapo: realisation.chapo,
            route,
            collectionRoute: REALISATIONS_INDEX.route,
          }),
          buildBreadcrumbSchema([
            { nom: REALISATIONS_INDEX.titre, route: REALISATIONS_INDEX.route },
            { nom: realisation.titre, route },
          ]),
        ]}
      />
    </>
  )
}
