// SlabScene.tsx — jeromemarichez-fr
// Quatre dalles de verre et un filet de tenue : le modèle de l'offre, en SVG.
//
// Ce que la scène dessine, c'est la topologie du CLAUDE.md — ingénierie web, puis la
// donnée en passage obligé, puis DEUX suites côte à côte — et le filet vertical qui les
// traverse toutes : l'interlocuteur unique. Le filet est le seul élément immobile de la
// scène. C'est délibéré : ce qui tient ne dérive pas.
//
// Les deux dalles du temps 3 sont des SŒURS, jamais une quatrième puis une cinquième
// étape. Même taille, même facture, même classe CSS ; seul un décalage vertical de
// quelques pixels casse la symétrie mécanique, et il ne se lit pas comme un ordre.
// Toute évolution de cette scène doit préserver cette égalité — c'est l'argument que le
// site vend, pas un détail de composition.
//
// Cette scène a remplacé une scène WebGL (`three` + `@react-three/fiber`, 235 ko gzip).
// Le compromis n'en est pas un : le site vend une perf tenue, il ne pouvait pas payer un
// moteur 3D pour un décor. Ce qui est perdu — la réfraction physique, la rotation pilotée
// par le défilement — n'était lisible par personne.
//
// Règle de tenue : **rien d'autre que `transform` et `opacity` n'est animé ici**. Ce sont
// les deux seules propriétés que le compositeur traite sans repasser par la mise en page
// ni par le peintre, donc les deux seules qui tiennent 60 images par seconde sur un
// téléphone — la scène s'affiche désormais aussi sous 1024 px.
//
// Les teintes ne sont pas écrites ici : chaque dalle porte `data-pole`, et `poles.css`
// mappe `--accent` dessous. L'accueil n'est sous aucune racine de pôle — les quatre y
// coexistent — donc chaque dalle pose la sienne. Le filet, lui, reste hors de tout
// `data-pole` : il hérite du cuivre de la racine, la couleur de la maison — celle de
// l'interlocuteur, qui n'appartient à aucun pôle parce qu'il les porte tous.

import styles from './slab-scene.module.css'

interface SlabSceneProps {
  /** Rend une image fixe : les dalles gardent leur pose, le mouvement s'arrête. */
  fige?: boolean
}

/** Quatre dalles teintées, un filet de tenue immobile. Environ 1,7 ko, zéro JS. */
export function SlabScene({ fige = false }: SlabSceneProps) {
  return (
    <svg
      className={styles.scene}
      data-fige={fige ? 'true' : undefined}
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 420 360"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Quatre dalles de verre traversées par un même filet vertical</title>
      <defs>
        {/* `currentColor` se résout sur l'élément qui RÉFÉRENCE le dégradé, pas sur le
            `<defs>` : un seul dégradé suffit aux quatre teintes, chaque dalle posant son
            propre `color: var(--accent)`. */}
        <linearGradient id="dalle-lueur" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.24" />
          <stop offset="0.55" stopColor="currentColor" stopOpacity="0.07" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Hors du groupe animé, et sans animation propre : le filet descend derrière les
          quatre dalles et ressort dans l'écart qui sépare les deux sœurs — c'est là qu'on
          le lit le mieux, et c'est là qu'il compte le plus. */}
      <rect className={styles.tenue} height="344" rx="1" width="2" x="209" y="8" />

      {/* Le groupe porte la dérive d'ensemble, chaque dalle la sienne : deux fréquences
          qui ne se referment jamais au même moment suffisent à faire lire du volume, là
          où une seule donnerait un balancement de métronome. */}
      <g className={styles.groupe}>
        <rect
          className={styles.socle}
          data-pole="ingenierie-web"
          fill="url(#dalle-lueur)"
          height="92"
          rx="14"
          width="168"
          x="126"
          y="18"
        />
        <rect
          className={styles.passage}
          data-pole="data"
          fill="url(#dalle-lueur)"
          height="92"
          rx="14"
          width="168"
          x="106"
          y="130"
        />
        {/* Les deux suites : même largeur, même hauteur, même classe, même dégradé. Seuls
            `x`, `y` et le déphasage de la dérive les distinguent — rien qui se lise
            comme un ordre. */}
        <rect
          className={styles.suite}
          data-pole="ia"
          fill="url(#dalle-lueur)"
          height="96"
          rx="14"
          width="150"
          x="26"
          y="250"
        />
        <rect
          className={`${styles.suite} ${styles.suiteDecalee}`}
          data-pole="sea-ux"
          fill="url(#dalle-lueur)"
          height="96"
          rx="14"
          width="150"
          x="244"
          y="262"
        />
      </g>
    </svg>
  )
}
