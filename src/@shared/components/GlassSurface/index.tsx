// GlassSurface/index.tsx — jeromemarichez-fr
// Une surface de verre. Le contenu est dedans.

import type { ReactNode } from 'react'
import styles from './glass-surface.module.css'

interface GlassSurfaceProps {
  children: ReactNode
  /** Classes de mise en page ajoutées par l'appelant (module CSS du parent). */
  className?: string
}

/**
 * Le panneau **contient** son contenu, et se dimensionne dessus.
 *
 * Le contrat précédent était l'inverse — une div vide posée derrière le texte — et ce
 * n'était pas un choix de design : liquidGL mutait l'élément dont il faisait une
 * lentille (`opacity: 0`, puis `pointer-events: none` jamais restauré) et effaçait son
 * `background` en styles en ligne. Confier du contenu à cet élément revenait à en
 * confier la visibilité et la cliquabilité à une bibliothèque. Le calque vide était la
 * parade ; la bibliothèque partie, la parade n'a plus d'objet.
 *
 * Ce que le retour au conteneur rend possible, et que le calque vide interdisait : le
 * panneau prend la hauteur de son texte au lieu de la deviner, le rembourrage est une
 * propriété du verre et non celle du voisin, et il n'y a plus deux éléments à garder de
 * la même taille. Plus aucun cran d'empilement n'est à tenir non plus — c'est l'ordre de
 * l'arbre qui décide, voir le module CSS.
 *
 * Aucun état, aucun effet, aucun `'use client'` : le composant est rendu au serveur et
 * le verre qu'il porte est entièrement décrit en CSS. Il n'y a donc rien à amorcer, et
 * rien qui puisse manquer à l'appel.
 */
export function GlassSurface({ children, className }: GlassSurfaceProps) {
  const classes = className ? `${styles.panneau} ${className}` : styles.panneau

  return (
    <div className={classes}>
      <div className={styles.contenu}>{children}</div>
    </div>
  )
}
