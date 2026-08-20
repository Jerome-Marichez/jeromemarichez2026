// src/app/layout.tsx — jeromemarichez-fr
// pages/app ne fait QUE le routage : les sections d'écran vivent dans src/views/.

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/@shared/components/SiteFooter'
import { SiteHeader } from '@/@shared/components/SiteHeader'
import { SkipLink } from '@/@shared/components/SkipLink'
import { StructuredData } from '@/@shared/components/StructuredData'
import { SITE_IDENTITY, SITE_PROMESSE, SITE_URL } from '@/@shared/seo/site'
import { buildPersonSchema, buildProfessionalServiceSchema } from '@/@shared/seo/structured-data'
import { FONT_VARIABLES } from '@/@shared/typography/fonts'
import './globals.css'
import './glass-surface.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_IDENTITY.nom} — ${SITE_IDENTITY.titre} à ${SITE_IDENTITY.ville}`,
    template: `%s — ${SITE_IDENTITY.nom}`,
  },
  description: SITE_PROMESSE,
  authors: [{ name: SITE_IDENTITY.nom, url: SITE_URL }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_IDENTITY.nom,
    url: SITE_URL,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={FONT_VARIABLES} lang="fr">
      <body>
        <SkipLink />
        <div aria-hidden="true" className="fond-atelier" />
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <StructuredData
          schemas={[buildPersonSchema(), buildProfessionalServiceSchema(SITE_PROMESSE)]}
        />
      </body>
    </html>
  )
}
