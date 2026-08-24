// site.ts — jeromemarichez-fr
// Constantes d'identité du site, source unique pour les métadonnées et le JSON-LD.

/** Origine canonique. Sert aux URL absolues des métadonnées, du sitemap et du JSON-LD. */
export const SITE_URL = 'https://jeromemarichez.fr'

/** Identité publiée. Reprise à l'identique des CV de référence. */
export const SITE_IDENTITY = {
  nom: 'Jérôme Marichez',
  titre: 'Ingénieur-conseil indépendant',
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
 * sont choisis, cadrés et couverts par le même interlocuteur (section « Les deux
 * objections » de l'accueil, `contenu/objections.ts`).
 */
export const SITE_PROMESSE =
  'Un seul interlocuteur pour vos projets digitaux, du cadrage au run. ' +
  "Celui qui cadre est celui qui code, qui mesure et qui exploite. C'est lui qui répond de tout."

/** Rayon d'intervention réellement couvert. */
export const SITE_ZONE = ['Lille', 'Hauts-de-France', 'France'] as const

/**
 * Couleur de fond de chaque thème, reprise de `--fond` dans `src/app/globals.css`.
 *
 * Duplication assumée : `theme-color` et le manifeste sont lus par le navigateur avant
 * la moindre feuille de style, donc avant qu'une variable CSS existe. Ces deux valeurs
 * suivent `--fond` à la main si la direction artistique change.
 */
export const SITE_THEME_COLORS = {
  clair: '#f2efe8',
  sombre: '#0e1114',
} as const

/**
 * Date de dernière révision éditoriale du site, au format `AAAA-MM-JJ`.
 *
 * Elle alimente `lastModified` du sitemap — le seul champ que Google lit encore. Elle
 * est tenue à la main plutôt que dérivée de la date de build : un site reconstruit sans
 * changement de contenu n'a pas été modifié, et l'annoncer serait un signal faux.
 * À mettre à jour quand le contenu des pages change réellement.
 */
export const SITE_DERNIERE_REVISION = '2026-08-21'
