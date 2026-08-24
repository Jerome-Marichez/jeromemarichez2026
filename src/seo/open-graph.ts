// open-graph.ts — jeromemarichez-fr
// Le socle Open Graph du site, et la raison pour laquelle chaque page doit le répéter.
//
// Next fusionne les métadonnées de segments **en surface** : dès qu'une page exporte un
// objet `openGraph`, celui-ci **remplace** intégralement celui du layout — il ne le
// complète pas. Une page qui déclare seulement `openGraph: { url }` perd donc
// `og:site_name`, `og:locale` et `og:image` : partagée sur un réseau, elle sort en lien
// nu, sans visuel ni nom de site.
//
// Ce module est la parade recommandée par Next lui-même : sortir les champs communs dans
// une constante et l'étaler dans chaque segment qui surcharge `openGraph`. Les deux
// constructeurs de `page-metadata.ts` le font, et ce sont eux que toutes les pages
// appellent — une route ajoutée demain hérite donc du socle sans y penser.

import type { Metadata } from 'next'
import { SITE_IDENTITY, SITE_PROMESSE } from './site'

/**
 * Dimensions de la vignette de partage.
 *
 * `src/app/opengraph-image.tsx` dessine à ces dimensions et les métadonnées les
 * annoncent : une seule déclaration, donc aucune dérive possible entre l'image
 * réellement produite et ce que les réseaux croient recevoir.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 }

/** Type MIME de la vignette, imposé par `ImageResponse`. */
export const OG_IMAGE_TYPE = 'image/png'

/**
 * Texte alternatif de la vignette. Il dit l'identité et la promesse, parce que c'est
 * tout ce qu'un lecteur d'écran obtiendra de l'image.
 */
export const OG_IMAGE_ALT = `${SITE_IDENTITY.nom}, ${SITE_IDENTITY.titre.toLowerCase()} à ${SITE_IDENTITY.ville}. ${SITE_PROMESSE}`

/**
 * Adresse servie par `src/app/opengraph-image.tsx`.
 *
 * L'export statique écrit l'image à ce chemin exact, sans extension ni barre finale. Le
 * `trailingSlash` de `next.config.mjs` ne la menace pas : Next n'applique cette règle
 * qu'à `openGraph.url`, jamais aux images — celles-ci sont seulement résolues contre
 * `metadataBase`. L'URL annoncée tombe donc bien sur le fichier produit.
 */
export const OG_IMAGE_PATH = '/opengraph-image'

/**
 * Champs Open Graph vrais pour n'importe quelle page du site : l'identité, la langue et
 * le visuel de partage. Tout le reste — `url` en tête — est propre à la page et vient
 * s'ajouter par-dessus.
 *
 * `type` vaut `website` par défaut ; un article le remplace par `article`.
 */
export const SITE_OPEN_GRAPH = {
  type: 'website',
  locale: 'fr_FR',
  siteName: SITE_IDENTITY.nom,
  images: [
    {
      url: OG_IMAGE_PATH,
      width: OG_IMAGE_SIZE.width,
      height: OG_IMAGE_SIZE.height,
      alt: OG_IMAGE_ALT,
      type: OG_IMAGE_TYPE,
    },
  ],
} satisfies NonNullable<Metadata['openGraph']>
