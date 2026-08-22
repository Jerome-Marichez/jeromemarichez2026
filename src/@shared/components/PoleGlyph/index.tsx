// PoleGlyph/index.tsx — jeromemarichez-fr
// Une marque dessinée par pôle. Produite, jamais trouvée.
//
// Le site n'a AUCUNE photographie utilisable — ni portrait, ni capture de projet
// autorisée, ni logo client. Tout visuel est donc construit, et il est construit en SVG
// rendu au serveur : quatre marques coûtent ici moins de 700 octets dans le document,
// là où la moindre image matricielle ferait tomber un budget qui ne tient qu'à un point.
//
// ## Ce que ces marques ont le droit de dire
//
// Rien qui simule une donnée. Le site vend la mesure : un pictogramme qui mimerait un
// graphique — une courbe qui monte, des barres qui progressent — afficherait un chiffre
// inventé, ce que les règles de véracité du CLAUDE.md interdisent. Aucune de ces quatre
// marques ne porte de valeur ; ce sont des FIGURES DE STRUCTURE, pas des visualisations.
//
// L'IA n'est pas non plus dessinée par le pictogramme attendu — le nœud à trois entrées,
// autrement dit le neurone. C'est le cliché exact que l'issue #84 écarte, et il dirait
// en plus quelque chose de faux : le pôle IA promet que « la réponse n'est pas toujours
// un modèle ». Sa marque est donc un embranchement dont une branche est retenue et
// l'autre écartée — la promesse, littéralement.
//
// ## Les deux sœurs partagent une grammaire
//
// `ia` et `sea-ux` sont deux suites PARALLÈLES de la donnée, jamais deux étapes
// (CLAUDE.md). Leurs marques le disent au trait : même poids, même nombre de tracés, et
// la MÊME convention — le trait plein est ce qui est retenu, le trait tireté ce qui est
// écarté. Deux figures de décision de rang égal. Donner à l'une une figure plus riche
// qu'à l'autre aurait réintroduit dans le dessin l'ordre que le modèle nie.
//
// La couleur n'est écrite nulle part ici : le tracé est en `currentColor`, et le module
// pose `color: var(--accent)`. Sous le `data-pole` de sa plaque, chaque marque prend donc
// la teinte de son pôle sans qu'aucun composant ne nomme une couleur (voir `poles.css`).

import type { PoleId } from '@/interfaces/types'
import styles from './pole-glyph.module.css'

interface PoleGlyphProps {
  pole: PoleId
}

/** Le socle : trois dalles portées par deux montants, sur une assise plus épaisse. */
function Socle() {
  return (
    <>
      <path d="M6 9h20M6 15.5h20M6 22h20" />
      <path d="M12 9v13M22 9v13" />
      <path className={styles.appui} d="M5 26.5h22" />
    </>
  )
}

/**
 * Le passage obligé : une trame de neuf points, dont la rangée médiane est un canal
 * traversé de part en part. Ce qui vient d'en haut y passe, et rien ne le contourne.
 */
function Passage() {
  return (
    <>
      <path d="M4 16h24" />
      <circle cx="16" cy="16" fill="currentColor" r="2.6" stroke="none" />
      <path
        className={styles.point}
        d="M8 6.5v.01M16 6.5v.01M24 6.5v.01M8 25.5v.01M16 25.5v.01M24 25.5v.01"
      />
      <path className={styles.point} d="M8 11.2v.01M24 11.2v.01M8 20.8v.01M24 20.8v.01" />
    </>
  )
}

/** Une suite : deux voies s'ouvrent, une seule est retenue. Le trait tireté est écartée. */
function Embranchement() {
  return (
    <>
      <path d="M4 16h7" />
      <path d="M11 16c5 0 4-8 9-8h6" />
      <path className={styles.ecarte} d="M11 16c5 0 4 8 9 8h6" />
      <circle cx="27.5" cy="8" fill="currentColor" r="2.4" stroke="none" />
      <path className={styles.ecarte} d="M25.6 22.1l3.8 3.8M29.4 22.1l-3.8 3.8" />
    </>
  )
}

/** L'autre suite : un parcours à quatre paliers, dont un est supprimé. Même convention. */
function Parcours() {
  return (
    <>
      <path d="M5 7h22" />
      <path d="M8 14h16" />
      <path className={styles.ecarte} d="M11 21h10" />
      <path d="M13 28h6" />
      <circle cx="16" cy="28" fill="currentColor" r="2.4" stroke="none" />
    </>
  )
}

const TRACES: Record<PoleId, () => React.JSX.Element> = {
  'ingenierie-web': Socle,
  data: Passage,
  ia: Embranchement,
  'sea-ux': Parcours,
}

/**
 * Décor, jamais information.
 *
 * La marque est `aria-hidden` et ne porte rien que la plaque ne dise déjà en toutes
 * lettres : le nom du pôle, sa place et sa promesse sont du texte, juste à côté. Un
 * lecteur d'écran ne perd donc rien à ne pas la rencontrer, et la couleur n'est jamais
 * le seul porteur d'information (WCAG 1.4.1).
 */
export function PoleGlyph({ pole }: PoleGlyphProps) {
  const Trace = TRACES[pole]

  return (
    <svg
      aria-hidden="true"
      className={styles.glyphe}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Trace />
    </svg>
  )
}
