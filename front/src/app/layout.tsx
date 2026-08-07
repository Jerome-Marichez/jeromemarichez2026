// src/app/layout.tsx — jeromemarichez2026
// pages/app ne fait QUE le routage : les sections d'écran vivent dans src/views/.
// Ce layout se contente d'assembler le socle de @shared et de l'appliquer à
// toutes les routes.
import type { ReactNode } from 'react'
import { SiteFooter } from '@/@shared/components/SiteFooter'
import { SiteHeader } from '@/@shared/components/SiteHeader'
import { SkipLink } from '@/@shared/components/SkipLink'
import { MAIN_CONTENT_ID } from '@/@shared/config/navigation'
import '@/@shared/styles/globals.css'

export const metadata = {
  title: 'Jérôme Marichez — Ingénieur logiciel à Lille',
  description:
    'Ingénierie web, data & IA, SEO/SEA. Un seul interlocuteur pour vos projets digitaux, sans sous-traitance.',
}

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
      </body>
    </html>
  )
}
