// src/app/layout.tsx — jeromemarichez2026
// pages/app ne fait QUE le routage : les sections d'écran vivent dans src/views/.
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Jérôme Marichez — Ingénieur logiciel à Lille',
  description:
    'Ingénierie web, data & IA, SEO/SEA. Un seul interlocuteur pour vos projets digitaux, sans sous-traitance.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
