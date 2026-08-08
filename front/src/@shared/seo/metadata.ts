// metadata.ts — jeromemarichez2026
// Construction des métadonnées Next.js : le point d'entrée que chaque page consomme.
//
// L'intention est qu'aucune page n'écrive jamais ses balises elle-même. Une page
// déclare son titre, sa description et son chemin ; la canonique, l'Open Graph et la
// carte Twitter en découlent mécaniquement. C'est ce qui rend la règle SEO du CLAUDE.md
// tenable dans la durée : il n'y a rien à réinventer, donc rien à oublier.
import type { Metadata } from 'next'
import { identite } from '@/content'
import { type PageSeoInput, pageSeoSchema } from '@/schemas/page-seo.schema'
import {
  absoluteUrl,
  applyTitleTemplate,
  siteLocale,
  siteName,
  siteOrigin,
  siteTitle,
  titleTemplate,
} from './site'

/**
 * Métadonnées du layout racine, héritées par toutes les routes.
 *
 * Porte les deux réglages qui ne se déclarent qu'une fois pour tout le site :
 * `metadataBase` (origine de résolution des URL relatives) et le gabarit de titre.
 */
export function buildRootMetadata(): Metadata {
  const description = identite.descriptionSite
  const url = absoluteUrl('/')
  return {
    metadataBase: siteOrigin,
    title: { default: siteTitle, template: titleTemplate },
    description,
    // Canonique de l'accueil. Next.js remplace `alternates` en bloc dès qu'une page
    // fille en déclare : toute page passant par `buildPageMetadata` écrase donc cette
    // valeur par la sienne. Une page qui l'oublierait hériterait de la canonique de
    // l'accueil — c'est précisément ce que la règle SEO du CLAUDE.md interdit.
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: siteLocale,
      siteName,
      title: siteTitle,
      description,
      url,
    },
    twitter: { card: 'summary_large_image', title: siteTitle, description },
    applicationName: siteName,
    authors: [{ name: identite.nom }],
    creator: identite.nom,
    publisher: identite.nom,
    robots: { index: true, follow: true },
    // Empêche les navigateurs mobiles de transformer un nombre du contenu (une date, un
    // budget cité en preuve) en lien téléphonique.
    formatDetection: { telephone: false, email: false, address: false },
  }
}

/**
 * Métadonnées d'une page : titre, description, canonique, Open Graph, carte Twitter.
 *
 * L'entrée est validée par Zod. Les pages étant prérendues, un titre trop long ou un
 * chemin mal formé échoue AU BUILD — le défaut n'atteint jamais la production.
 */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const { title, description, path, absoluteTitle } = pageSeoSchema.parse(input)
  const url = absoluteUrl(path)
  // Le gabarit est appliqué à la main pour l'Open Graph et Twitter : Next.js ne
  // l'applique qu'à la balise `<title>`. Le titre partagé reste ainsi le même dans
  // l'onglet du navigateur et dans l'aperçu de partage.
  const fullTitle = absoluteTitle ? title : applyTitleTemplate(title)
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: siteLocale,
      siteName,
      title: fullTitle,
      description,
      url,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  }
}
