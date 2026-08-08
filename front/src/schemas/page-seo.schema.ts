// page-seo.schema.ts — jeromemarichez2026
// Schéma Zod de la description SEO d'une page, consommée par
// `@shared/seo/metadata.ts`. Le type d'entrée est dérivé du schéma (z.input), jamais
// écrit à la main. Convention : CLAUDE.md, « Validation des entrées — Zod ».
//
// Les pages étant prérendues, ce schéma s'exécute AU BUILD : un titre trop long ou un
// chemin mal formé casse la compilation, il n'atteint pas la production.
import { z } from 'zod'

/**
 * Longueur maximale d'une meta description, exportée parce qu'elle sert AILLEURS.
 *
 * Les pages d'offre dérivent leur description de l'accroche de l'offre et doivent donc
 * connaître la borne à laquelle elles seront jugées. Écrire « 160 » une seconde fois
 * dans le code de dérivation aurait créé deux vérités : celle qui coupe et celle qui
 * refuse. Un jour où l'une bouge sans l'autre, le build casse sur des pages valides —
 * ou pire, laisse passer une description tronquée pour rien.
 */
export const LONGUEUR_MAX_DESCRIPTION = 160

export const pageSeoSchema = z.strictObject({
  /**
   * Part du titre propre à la page. Le gabarit du layout ajoute « — Jérôme Marichez » :
   * la borne à 60 caractères porte donc sur la part propre, pour que le titre complet
   * reste sous le seuil de troncature des moteurs.
   */
  title: z.string().min(3).max(60),
  /** Meta description : bornée pour les mêmes raisons que `descriptionSite`. */
  description: z.string().min(50).max(LONGUEUR_MAX_DESCRIPTION),
  /**
   * Chemin absolu de la page depuis la racine du site, sans domaine, sans paramètre et
   * sans barre oblique finale — `/` pour l'accueil, `/services/sea` sinon.
   *
   * La forme est contrainte parce que l'URL canonique en découle directement : deux
   * écritures d'un même chemin produiraient deux canoniques concurrentes pour une seule
   * page, c'est-à-dire exactement le problème que la canonique doit résoudre.
   */
  path: z
    .string()
    .regex(
      /^\/$|^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/,
      'Chemin absolu en minuscules attendu, sans barre finale (ex. « / » ou « /services/sea »).',
    ),
  /**
   * Le titre REMPLACE le gabarit du layout au lieu d'être suffixé par lui.
   *
   * Cas de la page d'accueil : son titre porte déjà l'identité complète
   * (« Jérôme Marichez — Ingénieur logiciel à Lille »). Le gabarit la répéterait
   * (« … — Jérôme Marichez »), ce qui gaspille la largeur utile du résultat de
   * recherche. Reste faux partout ailleurs : une page intérieure a tout intérêt à
   * porter le nom du site.
   */
  absoluteTitle: z.boolean().default(false),
})

export type PageSeoInput = z.input<typeof pageSeoSchema>
export type PageSeoValide = z.infer<typeof pageSeoSchema>
