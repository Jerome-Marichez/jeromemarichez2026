// metadonnees.ts — jeromemarichez2026
// Métadonnées d'une page d'offre, dérivées de l'offre elle-même.
//
// Vit ici plutôt que dans `app/` : les trois fichiers de route ne font QUE du routage
// (CLAUDE.md — « pages/app ne fait que le routage »). Vit ici plutôt que dans
// `@shared/seo/` : c'est un usage du module SEO, pas une extension du module SEO — le
// jour où une quatrième famille de pages naîtra, elle n'aura rien à hériter de celle-ci.
import type { Metadata } from 'next'
import { cheminOffre } from '@/@shared/config/routes'
import { buildPageMetadata } from '@/@shared/seo'
import type { IOffre } from '@/interfaces/offre'
import { LONGUEUR_MAX_DESCRIPTION } from '@/schemas/page-seo.schema'
import { extraireDescription } from '@/utils/extrait'

/**
 * Titre, description et canonique d'une page d'offre.
 *
 * Les trois valeurs sont DÉRIVÉES de l'offre : son titre, son accroche, sa clé. Rien
 * n'est écrit ici, donc rien ne peut diverger du contenu — et une quatrième offre
 * obtient ses métadonnées sans qu'une ligne change.
 *
 * `title` reste suffixé par le gabarit du layout (« Ingénierie Web — Jérôme Marichez ») :
 * `absoluteTitle` est réservé à l'accueil, seul titre qui porte déjà l'identité complète.
 *
 * LIMITE ASSUMÉE, à porter devant Jérôme MARICHEZ (voir la PR de l'issue #22) : `IOffre`
 * ne porte pas de description SEO propre. Celle-ci est donc l'accroche, tronquée sur un
 * mot lorsqu'elle dépasse la borne — deux des trois la dépassent. C'est le choix de ne
 * rien inventer : une description écrite pour l'occasion aurait été du texte éditorial
 * non relu contre les règles de véracité, et libre de promettre autre chose que l'offre.
 */
export function metadonneesOffre(offre: IOffre): Metadata {
  return buildPageMetadata({
    title: offre.titre,
    description: extraireDescription(offre.accroche, LONGUEUR_MAX_DESCRIPTION),
    path: cheminOffre(offre.cle),
  })
}
