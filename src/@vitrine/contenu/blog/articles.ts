// articles.ts — jeromemarichez-fr
// La liste des articles publiés. Source unique du blog.
//
// Tout le blog part d'ici : la liste, les pages d'articles générées au build, le
// sitemap et les données structurées. Un article retiré de ce tableau disparaît
// partout — il n'y a pas de second endroit à mettre à jour.
//
// L'ORDRE DE CE TABLEAU N'EST PAS L'ORDRE D'AFFICHAGE : le classement par date est une
// règle métier, elle vit dans `@vitrine/services/find-article`.

import type { IArticle } from '@/interfaces/IArticle'
import { ARTICLE_EXPORT_STATIQUE } from './export-statique'
import { ARTICLE_GENERATEUR_DE_PROJETS } from './generateur-de-projets'
import { ARTICLE_MESURER_AVANT_ARBITRER } from './mesurer-avant-arbitrer'
import { ARTICLE_RISQUE_DE_L_ENDROIT } from './risque-de-l-endroit'
import { ARTICLE_TEST_AVANT_CODE } from './test-avant-code'

export const ARTICLES: IArticle[] = [
  ARTICLE_EXPORT_STATIQUE,
  ARTICLE_TEST_AVANT_CODE,
  ARTICLE_MESURER_AVANT_ARBITRER,
  ARTICLE_GENERATEUR_DE_PROJETS,
  ARTICLE_RISQUE_DE_L_ENDROIT,
]
