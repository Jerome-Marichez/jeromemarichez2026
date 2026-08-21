// BoundaryList/index.tsx — jeromemarichez-fr
// Le bloc qui rend tout le reste croyable.

import type { IBoundary } from '@/interfaces/IBoundary'
import styles from './boundary-list.module.css'

interface BoundaryListProps {
  limites: IBoundary[]
}

/**
 * Une liste de définitions plutôt qu'un tableau : chaque limite est un terme, et ce
 * qui est fait à la place en est la définition. Un lecteur d'écran restitue la paire
 * telle quelle, ce qu'un tableau à deux colonnes rendrait bien plus laborieusement.
 */
export function BoundaryList({ limites }: BoundaryListProps) {
  return (
    <dl className={styles.liste}>
      {limites.map((limite) => (
        <div className={styles.paire} key={limite.hors}>
          <dt className={styles.hors}>{limite.hors}</dt>
          <dd className={styles.alaPlace}>{limite.alaPlace}</dd>
        </div>
      ))}
    </dl>
  )
}
