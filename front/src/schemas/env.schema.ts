// env.schema.ts — jeromemarichez2026
// Schéma Zod des variables d'environnement lues par le front.
//
// Règle du projet (CLAUDE.md, « Validation des entrées — Zod ») : toute entrée externe
// est validée AVANT usage, variables d'environnement comprises. Une variable mal
// remplie doit échouer au build avec un message clair, jamais produire silencieusement
// des URL canoniques fausses en production — ce qui serait, sur ce site précisément, le
// pire des défauts.
import { z } from 'zod'

/**
 * Repli utilisable en développement : le front tourne sur le port 3000 (README.md).
 *
 * C'est bien un repli de DÉVELOPPEMENT. En production, `NEXT_PUBLIC_SITE_URL` doit être
 * renseignée (`https://jeromemarichez.fr`) : sans elle, les URL canoniques, l'Open Graph
 * et le sitemap pointeraient vers `localhost`.
 */
export const URL_SITE_DEVELOPPEMENT = 'http://localhost:3000'

/**
 * Origine absolue du site.
 *
 * - protocole restreint à `http`/`https` : `z.url()` accepte sinon `ftp:` ou `mailto:` ;
 * - barre oblique finale retirée à la validation, pour que la concaténation d'un chemin
 *   ne puisse jamais produire un `//` au milieu d'une URL canonique.
 */
const urlSiteSchema = z
  .url({
    protocol: /^https?$/,
    error: 'URL absolue attendue, protocole http ou https (ex. https://jeromemarichez.fr).',
  })
  .transform((url) => url.replace(/\/+$/, ''))

export const envSchema = z.strictObject({
  /** Domaine de production. Absente en développement : le repli ci-dessus s'applique. */
  NEXT_PUBLIC_SITE_URL: urlSiteSchema.optional(),
})

export type Env = z.infer<typeof envSchema>
