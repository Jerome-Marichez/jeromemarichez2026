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
 */
export const SITE_PROMESSE =
  'Un seul interlocuteur pour vos projets digitaux, aucune sous-traitance. ' +
  'Celui qui cadre est celui qui code, qui mesure et qui exploite.'

/** Rayon d'intervention réellement couvert. */
export const SITE_ZONE = ['Lille', 'Hauts-de-France', 'France'] as const
