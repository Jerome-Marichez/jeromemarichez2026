// slab-geometry.ts — jeromemarichez-fr
// La dalle : un rectangle arrondi extrudé avec un vrai biseau.

import { ExtrudeGeometry, Shape } from 'three'

const LARGEUR = 1.7
const HAUTEUR = 2.35
const RAYON = 0.09

/**
 * Construit la géométrie d'une dalle, biseau compris.
 *
 * Le biseau n'est pas cosmétique : c'est la seule surface dont la normale s'écarte
 * franchement de l'axe de vue, donc la seule que le Fresnel du shader allume. Sans
 * lui, les trois dalles seraient trois voiles plats.
 *
 * Environ 600 triangles. La géométrie est construite **une fois** et partagée par les
 * trois maillages — trois appels de dessin, un seul programme, aucune texture.
 */
export function buildSlabGeometry(): ExtrudeGeometry {
  const contour = new Shape()
  const x = -LARGEUR / 2
  const y = -HAUTEUR / 2

  contour.moveTo(x + RAYON, y)
  contour.lineTo(x + LARGEUR - RAYON, y)
  contour.quadraticCurveTo(x + LARGEUR, y, x + LARGEUR, y + RAYON)
  contour.lineTo(x + LARGEUR, y + HAUTEUR - RAYON)
  contour.quadraticCurveTo(x + LARGEUR, y + HAUTEUR, x + LARGEUR - RAYON, y + HAUTEUR)
  contour.lineTo(x + RAYON, y + HAUTEUR)
  contour.quadraticCurveTo(x, y + HAUTEUR, x, y + HAUTEUR - RAYON)
  contour.lineTo(x, y + RAYON)
  contour.quadraticCurveTo(x, y, x + RAYON, y)

  return new ExtrudeGeometry(contour, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.022,
    bevelSegments: 2,
    curveSegments: 8,
  })
}

/** Décalage des trois dalles : même axe, profondeurs différentes. */
export const SLAB_PLACEMENTS = [
  { position: [0, 0, 0], index: 0 },
  { position: [0.42, -0.14, -0.9], index: 1 },
  { position: [0.84, -0.28, -1.8], index: 2 },
] as const
