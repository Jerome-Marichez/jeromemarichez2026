import type { ReactNode } from 'react'
import styles from './container.module.css'

/** Largeurs de lecture disponibles, définies par les jetons `--layout-width-*`. */
export type ContainerWidth = 'narrow' | 'default' | 'wide'

interface IContainerProps {
  children: ReactNode
  /**
   * `narrow` pour du texte suivi (longueur de ligne confortable), `default` pour
   * les sections courantes, `wide` pour l'en-tête et les grilles de cartes.
   */
  width?: ContainerWidth
  className?: string
}

/**
 * Centre son contenu, borne sa largeur et applique la gouttière latérale.
 * C'est le seul endroit du socle qui décide de la largeur utile : aucun autre
 * composant ne redéfinit `max-width` sur l'axe de la page.
 */
export function Container({ children, width = 'default', className }: IContainerProps) {
  const classNames = [styles.container, styles[width], className].filter(Boolean).join(' ')

  return <div className={classNames}>{children}</div>
}
