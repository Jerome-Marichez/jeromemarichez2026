// src/app/layout.tsx — jeromemarichez-fr
// pages/app ne fait QUE le routage : les sections d'écran vivent dans src/views/.

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/@shared/components/SiteFooter'
import { SiteHeader } from '@/@shared/components/SiteHeader'
import { SkipLink } from '@/@shared/components/SkipLink'
import { StructuredData } from '@/@shared/components/StructuredData'
import { SITE_OPEN_GRAPH } from '@/@shared/seo/open-graph'
import { SITE_IDENTITY, SITE_PROMESSE, SITE_THEME_COLORS, SITE_URL } from '@/@shared/seo/site'
import { buildPersonSchema, buildProfessionalServiceSchema } from '@/@shared/seo/structured-data'
import { FONT_VARIABLES } from '@/@shared/typography/fonts'
import './globals.css'
// Après `globals.css`, et pas avant : les deux fichiers s'appuient sur ses jetons
// (`--cuivre`, `--encre`, `--verre-lueur`). Ils n'en sont séparés que par la limite de
// 300 lignes du projet.
import './poles.css'
import './verre.css'
import './glass-surface.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_IDENTITY.nom} — ${SITE_IDENTITY.titre} à ${SITE_IDENTITY.ville}`,
    template: `%s — ${SITE_IDENTITY.nom}`,
  },
  description: SITE_PROMESSE,
  authors: [{ name: SITE_IDENTITY.nom, url: SITE_URL }],
  // Ni `alternates.canonical` ni `openGraph.url` ici : hérités, ils désignent l'accueil
  // depuis n'importe quelle page. Chaque page pose les siens (@shared/seo/page-metadata).
  //
  // Ce socle ne suffit pas à lui seul : Next fusionne les métadonnées de segments en
  // surface, donc toute page qui exporte un `openGraph` remplace celui-ci en entier.
  // C'est pourquoi les constructeurs de `page-metadata` l'étalent à leur tour — et
  // pourquoi il vit dans `open-graph.ts` plutôt qu'écrit à la main ici.
  openGraph: SITE_OPEN_GRAPH,
  robots: { index: true, follow: true },
}

/**
 * `globals.css` déclare `color-scheme: light dark` : le site suit le thème du système
 * sans bascule manuelle. `theme-color` doit donc en faire autant, sinon la barre du
 * navigateur mobile reste sur une seule des deux ambiances.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SITE_THEME_COLORS.clair },
    { media: '(prefers-color-scheme: dark)', color: SITE_THEME_COLORS.sombre },
  ],
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
