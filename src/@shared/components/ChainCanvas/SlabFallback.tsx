// SlabFallback.tsx — jeromemarichez-fr
// Le repli de la scène : la même composition, en SVG statique.
//
// Ce n'est pas un pis-aller réservé aux vieux navigateurs. C'est ce que voient, par
// construction : les visiteurs sous mouvement réduit, ceux qui n'ont pas de WebGL,
// ceux dont l'écran fait moins de 1024px, et tout le monde tant que la scène n'a pas
// fini de se charger. Il doit donc tenir seul.

import styles from './slab-fallback.module.css'

/** Trois dalles décalées dans le même axe, liseré cuivre, ~1,4 ko. */
export function SlabFallback() {
  return (
    <svg
      className={styles.repli}
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
