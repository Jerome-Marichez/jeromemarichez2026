// find-article.ts — jeromemarichez-fr
// Les règles qui s'appliquent à la liste des articles : ordre, recherche, date qui fait foi.
//
// Le contenu (`contenu/blog/articles.ts`) ne porte aucune de ces règles : il déclare des
// articles dans l'ordre où ils ont été écrits. Tout ce qui relève d'une décision — quel
// article passe devant, lequel on propose ensuite, quelle date publier — est ici.

import type { IArticle } from '@/interfaces/IArticle'
import { ARTICLES } from '../contenu/blog/articles'

/**
 * Nombre d'articles proposés au pied d'un article.
 *
 * Deux, et pas la liste entière : au-delà, la fin d'un article devient un sommaire et
 * cesse d'être une suite de lecture. Le lien vers la liste complète reste à côté.
 */
export const MAX_ARTICLES_LIES = 2

/**
 * Date qui fait foi pour un article : sa révision si elle existe, sa publication sinon.
 *
 * Le sitemap et le JSON-LD doivent dire la même date, sans quoi un moteur voit une page
 * modifiée qui ne se déclare pas modifiée. La règle est donc écrite une fois ici plutôt
 * que recopiée à chaque appelant.
 */
export function articleRevisionDate(article: IArticle): string {
  return article.dateRevision ?? article.datePublication
}

/**
 * Les articles, du plus récent au plus ancien.
 *
 * Le tri porte sur la date de **publication**, pas sur la révision : corriger un vieil
 * article ne doit pas le remettre en tête de liste comme s'il était neuf.
 */
export function listArticles(): IArticle[] {
  return [...ARTICLES].sort((a, b) => b.datePublication.localeCompare(a.datePublication))
}

/**
 * Rend l'article demandé et jusqu'à deux autres à lire ensuite.
 *
 * Lève sur un slug inconnu, volontairement : les slugs servis sont énumérés au build par
 * `generateStaticParams`, donc un slug absent ici est une incohérence de code, pas une
 * URL saisie par un visiteur. La masquer produirait une page vide en production.
 */
export function findArticle(slug: string): { article: IArticle; autres: IArticle[] } {
  const articles = listArticles()
  const article = articles.find((candidat) => candidat.slug === slug)

  if (!article) throw new Error(`Article inconnu : ${slug}`)

  const autres = articles.filter((candidat) => candidat.slug !== slug).slice(0, MAX_ARTICLES_LIES)

  return { article, autres }
}
