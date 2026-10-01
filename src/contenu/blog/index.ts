// index.ts (jeromemarichez-fr)
// La liste des articles publies, du plus recent au plus ancien. Source unique du
// blog : la liste, les pages generees au build et le sitemap en dependent tous.
//
// Cinq articles ne justifient ni service de tri ni CMS : l'ordre s'ecrit ici, a la
// main, une fois pour toutes. `carte-de-l-architecture` et `plugin-claude-code`
// partagent la meme date de publication (2026-08-23) ; a egalite, le plugin est place
// en premier car c'est le plus recent des deux a avoir ete ecrit pour ce site.

import type { IArticle } from '@/interfaces/IArticle'
import { ARTICLE_CARTE_DE_L_ARCHITECTURE } from './carte-de-l-architecture'
import { ARTICLE_EXPORT_STATIQUE } from './export-statique'
import { ARTICLE_MESURER_AVANT_ARBITRER } from './mesurer-avant-arbitrer'
import { ARTICLE_PLUGIN_CLAUDE_CODE } from './plugin-claude-code'
import { ARTICLE_TEST_AVANT_CODE } from './test-avant-code'

export const articles: IArticle[] = [
  ARTICLE_PLUGIN_CLAUDE_CODE,
  ARTICLE_CARTE_DE_L_ARCHITECTURE,
  ARTICLE_EXPORT_STATIQUE,
  ARTICLE_TEST_AVANT_CODE,
  ARTICLE_MESURER_AVANT_ARBITRER,
]
