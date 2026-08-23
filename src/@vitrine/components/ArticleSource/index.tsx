// ArticleSource/index.tsx — jeromemarichez-fr
// « Ce texte a d'abord paru ailleurs » — la seule mention de republication du site.
//
// Un article du blog peut reprendre un post déjà publié sur un réseau. Le taire reviendrait
// à s'attribuer la primeur d'un texte republié, ce qui est exactement le genre d'affirmation
// que les règles de véracité du CLAUDE.md interdisent.
//
// **Aucune URL n'est devinée.** Un seul article publié porte une source à ce jour. Les autres
// n'ont pas de post d'origine — ou en ont un dont l'adresse n'a pas été fournie, et c'est le
// cas de l'article sur le générateur de projets : il se publie donc sans source. Dans les deux
// cas ce composant n'est pas rendu, et la fiche n'a ni ligne vide ni filet orphelin. C'est la
// même règle que les justificatifs de certification : tant que l'adresse n'a pas été fournie
// par Jérôme MARICHEZ, rien n'est publié.

import type { IArticleSource } from '@/interfaces/IArticleSource'
import type { ArticleSourceReseau } from '@/interfaces/types'
import styles from './article-source.module.css'

interface ArticleSourceProps {
  source: IArticleSource
}

/**
 * Le nom du réseau, écrit une fois pour tout le site.
 *
 * Recopier « LinkedIn » dans chaque article aurait suffi à voir apparaître un « Linkedin »
 * au troisième — et une capitale fausse sur un nom de marque se lit comme de la négligence.
 */
const LIBELLES_RESEAU: Record<ArticleSourceReseau, string> = {
  linkedin: 'LinkedIn',
}

/**
 * La marque du lien sortant : une flèche qui quitte son cadre.
 *
 * Elle est dessinée plutôt qu'écrite en caractère (« ↗ ») pour deux raisons : le glyphe
 * manque à plusieurs polices système et s'y remplace par un rectangle, et son dessin varie
 * assez d'une fonte à l'autre pour ne plus faire série avec les figures du site. Tracé en
 * `currentColor`, elle prend donc la couleur du lien sans qu'un module la nomme.
 */
function MarqueExterne() {
  return (
    <svg
      aria-hidden="true"
      className={styles.marque}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 3H3v10h10V9" />
      <path d="M9.5 2.5H14v4.5M14 2.5L7.5 9" />
    </svg>
  )
}

/**
 * La publication d'origine, en note de fin d'article.
 *
 * **Le caractère externe du lien ne repose pas sur la couleur** (WCAG 1.4.1) : il est porté
 * par trois choses qui survivent chacune à la disparition des deux autres — le soulignement
 * du lien, la flèche sortante dessinée à sa suite, et le texte « nouvel onglet » énoncé aux
 * technologies d'assistance mais retiré du flux visuel, où la flèche le dit déjà.
 *
 * `rel="noopener noreferrer"` : `noopener` interdit à la page ouverte de reprendre la main
 * sur celle-ci par `window.opener`, `noreferrer` lui retire l'adresse d'où vient le visiteur.
 * Les deux sont posées à l'identique sur le lien de justificatif d'une certification — un
 * lien sortant du site est traité pareil partout, ou il finit par ne l'être nulle part.
 */
export function ArticleSource({ source }: ArticleSourceProps) {
  return (
    <p className={styles.source}>
      Ce texte a d’abord paru sur{' '}
      <a className={styles.lien} href={source.url} rel="noopener noreferrer" target="_blank">
        {LIBELLES_RESEAU[source.reseau]}
        <MarqueExterne />
        <span className={styles.horsEcran}> (nouvel onglet)</span>
      </a>
    </p>
  )
}
