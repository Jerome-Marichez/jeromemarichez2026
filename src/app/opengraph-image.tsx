// src/app/opengraph-image.tsx — jeromemarichez-fr
// La vignette de partage, dessinée au build.
//
// Elle reprend la direction « L'Établi » de `globals.css` — papier chaud, encre
// graphite, un seul accent cuivre — dans son ambiance claire : une image de partage
// est figée, elle ne peut pas suivre le thème du lecteur.
//
// Les couleurs sont écrites en dur : `ImageResponse` rend hors du navigateur, sans
// feuille de style, donc sans variable CSS à résoudre. Elles suivent `globals.css`.

import { ImageResponse } from 'next/og'
import { SITE_IDENTITY, SITE_PROMESSE } from '@/@shared/seo/site'
import { POLES_NAV } from '@/@vitrine/contenu/poles-nav'

export const alt = `${SITE_IDENTITY.nom}, ${SITE_IDENTITY.titre.toLowerCase()} à ${SITE_IDENTITY.ville}. ${SITE_PROMESSE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// `output: 'export'` exige que les routes de métadonnées soient déclarées statiques.
export const dynamic = 'force-static'

const PAPIER = '#f7f5f0'
const PAPIER_CREUX = '#ede9e0'
const ENCRE = '#14171a'
const ENCRE_DOUCE = '#4a5157'
const CUIVRE = '#8f4520'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '68px 76px',
        backgroundColor: PAPIER,
        backgroundImage: `linear-gradient(160deg, ${PAPIER} 0%, ${PAPIER_CREUX} 100%)`,
        borderLeft: `18px solid ${CUIVRE}`,
        color: ENCRE,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ display: 'flex', width: 54, height: 3, backgroundColor: CUIVRE }} />
        <div style={{ display: 'flex', fontSize: 25, letterSpacing: 3, color: ENCRE_DOUCE }}>
          JEROMEMARICHEZ.FR
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, letterSpacing: -1 }}>
          {SITE_IDENTITY.nom}
        </div>
        <div style={{ display: 'flex', marginTop: 14, fontSize: 42, color: CUIVRE }}>
          {SITE_IDENTITY.titre} à {SITE_IDENTITY.ville}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 30,
            maxWidth: 890,
            fontSize: 30,
            lineHeight: 1.4,
            color: ENCRE_DOUCE,
          }}
        >
          {SITE_PROMESSE}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        {POLES_NAV.map((pole) => (
          <div
            key={pole.id}
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: 999,
              border: `2px solid ${CUIVRE}`,
              fontSize: 26,
              color: CUIVRE,
            }}
          >
            {pole.nom}
          </div>
        ))}
      </div>
    </div>,
    size,
  )
}
