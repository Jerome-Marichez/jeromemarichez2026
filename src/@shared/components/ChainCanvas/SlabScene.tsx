// SlabScene.tsx — jeromemarichez-fr
// Trois dalles de verre alignées dans le même axe : la thèse du site, en SVG.
//
// Cette scène a remplacé une scène WebGL (`three` + `@react-three/fiber`, 235 ko gzip)
// qui disait exactement la même chose. Le compromis n'en est pas un : le site vend une
// perf tenue, il ne pouvait pas payer un moteur 3D pour un décor. Ce qui est perdu — la
// réfraction physique, la rotation pilotée par le défilement — n'était lisible par
// personne ; ce qui est gagné se mesure au premier chargement.
//
// Règle de tenue : **rien d'autre que `transform` et `opacity` n'est animé ici**. Ce sont
// les deux seules propriétés que le compositeur traite sans repasser par la mise en page
// ni par le peintre, donc les deux seules qui tiennent 60 images par seconde sur un
// téléphone — la scène s'affiche désormais aussi sous 1024 px.

import styles from './slab-scene.module.css'

interface SlabSceneProps {
  /** Rend une image fixe : les dalles gardent leur pose, le mouvement s'arrête. */
  fige?: boolean
}

/** Trois dalles décalées dans le même axe, liseré cuivre. Environ 1,6 ko, zéro JS. */
export function SlabScene({ fige = false }: SlabSceneProps) {
  return (
    <svg
      className={styles.scene}
      data-fige={fige ? 'true' : undefined}
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 340 420"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Trois dalles de verre alignées dans le même axe</title>
      <defs>
        <linearGradient id="dalle-lueur" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="0.55" stopColor="currentColor" stopOpacity="0.04" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.14" />
        </linearGradient>
      </defs>

      {/* Le groupe porte la dérive d'ensemble, chaque dalle sa propre dérive : deux
          fréquences qui ne se referment jamais au même moment suffisent à faire lire
          du volume, là où une seule donnerait un balancement de métronome. */}
      <g className={styles.groupe}>
        <rect className={styles.arriere} height="290" rx="14" width="190" x="132" y="94" />
        <rect className={styles.milieu} height="300" rx="15" width="200" x="76" y="66" />
        <rect
          className={styles.avant}
          fill="url(#dalle-lueur)"
          height="312"
          rx="16"
          width="210"
          x="18"
          y="38"
        />
      </g>
    </svg>
  )
}
