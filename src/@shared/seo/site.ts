// site.ts — jeromemarichez-fr
// Constantes d'identité du site, source unique pour les métadonnées et le JSON-LD.

/** Origine canonique. Sert aux URL absolues des métadonnées, du sitemap et du JSON-LD. */
export const SITE_URL = 'https://jeromemarichez.fr'

/** Identité publiée. Reprise à l'identique des CV de référence. */
export const SITE_IDENTITY = {
  nom: 'Jérôme Marichez',
  titre: 'Ingénieur logiciel',
  ville: 'Lille',
  region: 'Hauts-de-France',
  pays: 'FR',
  email: 'jeromemarichez@ik.me',
  github: 'https://github.com/Jerome-Marichez',
  linkedin: 'https://www.linkedin.com/in/jerome-marichez-31948712b',
} as const

/**
 * Promesse centrale du site. Elle apparaît dans les métadonnées de la page d'accueil
 * comme dans le contenu : c'est le même engagement, il ne se reformule pas d'un
 * support à l'autre.
 *
 * Ce qu'elle engage : un interlocuteur unique et une responsabilité unique. Ce qu'elle
 * n'engage pas — et n'a plus le droit d'engager : l'absence totale de tiers. Sur un
 * projet dont la taille le demande, des prestataires peuvent venir en renfort ; ils
 * sont choisis, cadrés et couverts par le même interlocuteur (section « renforts »
 * de l'accueil).
 */
export const SITE_PROMESSE =
  'Un seul interlocuteur pour vos projets digitaux, du cadrage au run. ' +
  'Celui qui cadre est celui qui code, qui mesure et qui exploite — et qui répond de tout.'

/** Rayon d'intervention réellement couvert. */
export const SITE_ZONE = ['Lille', 'Hauts-de-France', 'France'] as const
