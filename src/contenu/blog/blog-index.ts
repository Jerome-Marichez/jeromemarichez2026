// blog-index.ts (jeromemarichez-fr)
// L'en-tête éditoriale de la liste d'articles. Les articles, eux, viennent d'articles.ts.

import type { IBlogIndex } from '@/interfaces/IBlogIndex'
import { ROUTES } from '@/routes'

/**
 * Le libellé « Blog » est repris à l'identique dans la navigation, le fil d'Ariane, le
 * titre de la page et l'URL. Un nom plus éditorial aurait mieux sonné, mais il aurait
 * forcé le visiteur à faire le lien lui-même entre quatre formulations du même endroit.
 */
export const BLOG_INDEX: IBlogIndex = {
  route: ROUTES.blog,
  titre: 'Blog',
  meta: {
    title: 'Blog : notes d’ingénierie, de data et de mesure',
    description:
      'Notes courtes sur des décisions techniques réelles : ce que j’ai tranché, sur quel ' +
      'critère, et ce que ça a coûté. Ni veille, ni tutoriel.',
  },
  chapo:
    'Des notes courtes sur des décisions réelles : ce que j’ai tranché, sur quel critère, ' +
    'et ce que ça a coûté. Pas de veille, pas de tutoriel : ce que je ne pratique pas ' +
    'moi-même n’a rien à faire ici.',
}
