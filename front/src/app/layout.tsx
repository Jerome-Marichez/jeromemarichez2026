// src/app/layout.tsx — jeromemarichez2026
// pages/app ne fait QUE le routage : les sections d'écran vivent dans src/views/.
// Ce layout se contente d'assembler le socle de @shared et de l'appliquer à
// toutes les routes.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/@shared/components/JsonLd'
import { SiteFooter } from '@/@shared/components/SiteFooter'
import { SiteHeader } from '@/@shared/components/SiteHeader'
import { SkipLink } from '@/@shared/components/SkipLink'
import { MAIN_CONTENT_ID } from '@/@shared/config/navigation'
import { buildRootMetadata, buildSiteStructuredData } from '@/@shared/seo'
import '@/@shared/styles/globals.css'

/**
 * Socle SEO de tout le site : `metadataBase`, gabarit de titre, Open Graph et carte
 * Twitter par défaut. Les pages n'écrivent jamais ces balises elles-mêmes — elles
 * déclarent leur titre, leur description et leur chemin via `buildPageMetadata`, qui en
 * dérive leur canonique. Voir docs/seo.md.
 */
export const metadata: Metadata = buildRootMetadata()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Premier élément focusable du document, avant l'en-tête. */}
        <SkipLink targetId={MAIN_CONTENT_ID} />
        <SiteHeader />
        {/* `tabIndex={-1}` rend la cible focusable sans l'ajouter à l'ordre de
            tabulation : le lien d'évitement déplace ainsi le focus, et pas
            seulement le défilement. */}
        <main id={MAIN_CONTENT_ID} tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        {/* Données structurées du site entier (Person + ProfessionalService) : elles
            décrivent l'auteur et l'activité, pas une page en particulier — d'où leur
            place dans le layout et non dans une page. */}
        <JsonLd data={buildSiteStructuredData()} />
      </body>
    </html>
  )
}
