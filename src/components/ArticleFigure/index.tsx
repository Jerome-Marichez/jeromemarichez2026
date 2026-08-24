// ArticleFigure/index.tsx — jeromemarichez-fr
// Une figure par article. Construite, jamais trouvée — comme les marques de pôle.
//
// Le site n'a AUCUNE image matricielle : quatre SVG en tout, et `next/image` est écarté
// délibérément (voir `@vitrine/components/CertificationList`). Une illustration d'article
// n'allait pas en introduire la première : ces figures sont du SVG rendu au serveur, elles
// pèsent quelques centaines d'octets dans le document, et le budget Lighthouse — qui ne
// tient qu'à un point — n'en sait rien.
//
// ## Ce que ces figures ont le droit de dire
//
// Exactement ce que `PoleGlyph` s'autorise, et rien de plus : **rien qui simule une
// donnée**. Le site vend la mesure ; un pictogramme qui mimerait un graphique — une courbe
// qui monte, des barres qui progressent — afficherait un chiffre inventé, ce que les règles
// de véracité du CLAUDE.md interdisent. Ce sont des FIGURES DE STRUCTURE : elles dessinent
// la forme de l'arbitrage dont l'article parle, jamais son résultat.
//
// ## La grammaire est celle des marques de pôle
//
// Elle est reprise trait pour trait, et c'est ce qui fait que le blog appartient au même
// site que l'accueil : trait plein pour ce qui est retenu, **trait tireté pour ce qui est
// écarté**, croix pour une voie fermée, point plein pour un aboutissement, trait plus
// épais pour une assise. Un lecteur qui a vu les quatre marques lit ces figures sans qu'on
// lui explique rien.
//
// Le trait tireté couvre une nuance de plus depuis la figure `liaison` : « écarté » y devient
// « annoncé, jamais emprunté » — une dépendance déclarée que rien n'importe. C'est le même
// sens au fond, un chemin qui n'a pas lieu, et le signe n'a donc pas eu à être dédoublé.
//
// Le registre, lui, diffère : une marque de pôle est carrée (32 × 32), une figure d'article
// est **couchée** (48 × 32). Une page de pôle vend, un article raconte — et une figure large
// se pose au-dessus d'un texte sans prétendre à l'insigne.
//
// La couleur n'est écrite nulle part ici : le tracé est en `currentColor`, et le module pose
// `color: var(--accent)`. Le blog n'est sous aucun `data-pole`, donc `--accent` y vaut le
// cuivre — la teinte de la maison, exactement ce que doit prendre un contenu qui n'appartient
// à aucun pôle.

import type { ArticleFigureId } from '@/interfaces/types'
import styles from './article-figure.module.css'

interface ArticleFigureProps {
  figure: ArticleFigureId
}

/**
 * La borne — « Pourquoi ce site est un export statique ».
 *
 * Trois plaques écrites, un aboutissement, puis une ligne que rien ne franchit ; au-delà,
 * tireté, ce qui n'existe plus : le serveur applicatif. C'est l'article en une forme —
 * le build produit un dossier, et ce qui tournait derrière a disparu, pas été désactivé.
 */
function Borne() {
  return (
    <>
      <path d="M6 10h13M6 16h13M6 22h13" />
      <circle cx="22.4" cy="16" fill="currentColor" r="2.4" stroke="none" />
      <path d="M28 4v24" />
      <path className={styles.ecarte} d="M33 10h9v12h-9z" />
    </>
  )
}

/**
 * L'antériorité — « Le test avant le code, même avec un agent ».
 *
 * Un axe, deux temps : le point plein est posé le premier, la boîte ouverte vient après et
 * se remplit. Dessous, tiretée et fermée d'une croix, la voie inverse — écrire le test
 * après. La figure ne dit pas qu'écrire le test après est impossible, elle dit qu'ici c'est
 * écarté, ce qui est exactement la position de l'article.
 */
function Anteriorite() {
  return (
    <>
      <path d="M4 12h26" />
      <circle cx="13" cy="12" fill="currentColor" r="2.8" stroke="none" />
      <path d="M30 7h10v10H30z" />
      <path className={styles.ecarte} d="M30 20c-3 4-8 5-13 4" />
      <path className={styles.ferme} d="M11.5 21.9l3.6 3.6M15.1 21.9l-3.6 3.6" />
    </>
  )
}

/**
 * L'appui — « Mesurer avant d'arbitrer ».
 *
 * Un fléau **strictement horizontal**, deux plateaux identiques, et la décision au sommet du
 * mât ; en dessous, l'assise épaisse et la trame de points qui la porte. Le fléau ne penche
 * d'aucun côté, et ce n'est pas un détail de dessin : une balance inclinée afficherait un
 * verdict, c'est-à-dire un chiffre que le site n'a pas. Ce qui est dessiné, c'est qu'un
 * arbitrage repose sur une collecte — jamais lequel des deux plateaux l'emporte.
 */
function Appui() {
  return (
    <>
      <path d="M8 9h32" />
      <path d="M8 9v3M40 9v3" />
      <path d="M4 12h8M36 12h8" />
      <path d="M24 6.5v15" />
      <circle cx="24" cy="5" fill="currentColor" r="2.4" stroke="none" />
      <path className={styles.assise} d="M8 22h32" />
      <path className={styles.point} d="M12 27v.01M24 27v.01M36 27v.01" />
    </>
  )
}

/**
 * Le gabarit — « J'ai open-sourcé mon plugin Claude Code ».
 *
 * À gauche, la forme : un cadre à trois compartiments, **ouvert du côté de la sortie**, parce
 * qu'un gabarit n'est pas ce qu'il produit. À droite, ce qui en sort, fermé et complet jusqu'à
 * son aboutissement — le projet qui se construit dès la génération.
 *
 * Ce qui n'est PAS dessiné : un compte. Une pile de formes produites, ou plusieurs
 * aboutissements alignés, afficherait un nombre de projets générés que personne n'a mesuré.
 * Une seule sortie, donc — la figure dit qu'il en sort quelque chose de complet, jamais
 * combien de fois.
 */
function Gabarit() {
  return (
    <>
      <path d="M16 6H4v20h12" />
      <path d="M4 12.5h9M4 19.5h9" />
      <path d="M16 16h8" />
      <path d="M24 6h12v20H24z" />
      <path d="M24 12.5h12M24 19.5h12" />
      <path d="M36 16h2.6" />
      <circle cx="41" cy="16" fill="currentColor" r="2.4" stroke="none" />
    </>
  )
}

/**
 * La liaison — « De la doc qui pilote une IA à une carte vivante de l'architecture ».
 *
 * Des ensembles séparés — des dépôts — et, plus grand qu'eux, le lieu commun où le
 * comportement partagé doit atterrir. Deux liens pleins le relient vraiment ; le troisième
 * est **tireté et n'aboutit à rien**, c'est la dépendance déclarée que rien n'importe, celle
 * que la carte de l'article a fait apparaître.
 *
 * Le lien tireté est le plus long des trois, et c'est mesuré, pas décoratif : à 2,6 unités de
 * tiret, un segment court ne rend que son amorce et se lit comme un trait plein — la même
 * correction que la croix de `anteriorite`, prise ici en allongeant le tracé plutôt qu'en
 * retirant le tiretage.
 *
 * Les blocs ne se comptent pas : ils sont là pour être reliés. Aligner un dépôt par carré
 * afficherait la taille d'un système qui n'est pas nommé dans l'article, et n'a pas à l'être.
 */
function Liaison() {
  return (
    <>
      <path d="M3 4h7v7H3z" />
      <path d="M3 21h7v7H3z" />
      <path d="M14 11.5h9v9h-9z" />
      <path d="M38 12.5h7v7h-7z" />
      <path d="M10 9l4 4M10 23l4-4" />
      <path className={styles.ecarte} d="M23 16h15" />
    </>
  )
}

const TRACES: Record<ArticleFigureId, () => React.JSX.Element> = {
  borne: Borne,
  anteriorite: Anteriorite,
  appui: Appui,
  gabarit: Gabarit,
  liaison: Liaison,
}

/**
 * Décor, jamais information.
 *
 * La figure est `aria-hidden` et ne porte rien que l'article ne dise déjà en toutes lettres,
 * juste à côté : son titre et son chapô sont du texte. Un lecteur d'écran ne perd donc rien
 * à ne pas la rencontrer, et la couleur n'est nulle part le seul porteur d'information
 * (WCAG 1.1.1 et 1.4.1). C'est aussi ce qui autorise à la répéter à l'identique sur la carte
 * de la liste : un décor peut se répéter, une information non.
 *
 * Le dimensionnement est CSS, et il peut l'être : cette figure est toujours **racine dans du
 * HTML**, jamais imbriquée dans un autre `<svg>` — le cas où seuls les attributs `width` et
 * `height` sont honorés (issue #102, `docs/frontend-practices.md`). Elle n'a donc pas la prop
 * `taille` de `PoleGlyph`, et n'en aura pas tant qu'elle ne sera pas imbriquée.
 */
export function ArticleFigure({ figure }: ArticleFigureProps) {
  const Trace = TRACES[figure]

  return (
    <svg
      aria-hidden="true"
      className={styles.figure}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
      viewBox="0 0 48 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Trace />
    </svg>
  )
}
