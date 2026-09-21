import type { ReactElement } from 'react'

/**
 * Les quatre derniers glyphes du mur de stack. Voir `glyphes-premier-groupe.tsx`
 * pour la règle commune : formes internes seulement, le `<svg>` porteur vit
 * dans `index.tsx`.
 */

/** Cloud & exploitation : un nuage, tracé en une seule forme. */
function GlypheCloudExploitation(): ReactElement {
  return <path d="M7.5 17.5h9.2a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.6 1.5A3.2 3.2 0 0 0 7.5 17.5Z" />
}

/** Gestion de projet & AMOA : une planche à pince, trois lignes de suivi. */
function GlypheGestionProjetAmoa(): ReactElement {
  return (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" />
      <rect x="9" y="2.5" width="6" height="3" />
      <line x1="8" y1="10.5" x2="16" y2="10.5" />
      <line x1="8" y1="14.5" x2="16" y2="14.5" />
      <line x1="8" y1="18.5" x2="13" y2="18.5" />
    </>
  )
}

/** Encadrement & pilotage : deux personnes, l'équipe coordonnée. */
function GlypheEncadrementPilotage(): ReactElement {
  return (
    <>
      <circle cx="9" cy="7" r="2.5" />
      <path d="M4 19 a5 5 0 0 1 10 0" />
      <circle cx="17.5" cy="9.5" r="2" />
      <path d="M13.8 19 a4 4 0 0 1 7.7 -1.2" />
    </>
  )
}

/** Acquisition & mesure : trois barres ascendantes sur une ligne de base. */
function GlypheAcquisitionMesure(): ReactElement {
  return (
    <>
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="14" width="3" height="6" />
      <rect x="11" y="10" width="3" height="10" />
      <rect x="16" y="5" width="3" height="15" />
    </>
  )
}

export const glyphesSecondGroupe: Record<string, () => ReactElement> = {
  'Cloud & exploitation': GlypheCloudExploitation,
  'Gestion de projet & AMOA': GlypheGestionProjetAmoa,
  'Encadrement & pilotage': GlypheEncadrementPilotage,
  'Acquisition & mesure': GlypheAcquisitionMesure,
}
