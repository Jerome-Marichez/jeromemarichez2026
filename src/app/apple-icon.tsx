// src/app/apple-icon.tsx — jeromemarichez-fr
// L'icône d'écran d'accueil iOS, dessinée au build.
//
// Même marque que `icon.svg` — cuivre plein, monogramme papier — mais sans coins
// arrondis : iOS applique son propre masque, et un rayon dessiné ici se verrait
// deux fois. Apple n'accepte pas de SVG, d'où ce rendu en PNG.

import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// `output: 'export'` exige que les routes de métadonnées soient déclarées statiques.
export const dynamic = 'force-static'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#8f4520',
        color: '#f2efe8',
        fontSize: 96,
        fontWeight: 700,
        letterSpacing: -2,
      }}
    >
      JM
    </div>,
    size,
  )
}
