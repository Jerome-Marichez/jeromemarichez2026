// src/app/layout.tsx — jeromemarichez2026
// pages/app ne fait QUE le routage : les sections d'écran vivent dans src/views/.
import type { ReactNode } from 'react'

export const metadata = {
  title: 'jeromemarichez2026',
  description: 'Site portfolio et vitrine de services de Jérôme Marichez, ingénieur logiciel à Lille : ingénierie web, data & IA, SEO/SEA.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
