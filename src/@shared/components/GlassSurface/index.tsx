// GlassSurface/index.tsx — jeromemarichez-fr
// Une surface de verre réfractant.

import type { ReactNode } from 'react'
import { GLASS_CLASS } from './glass-class'
import styles from './glass-surface.module.css'

interface GlassSurfaceProps {
  children: ReactNode
  /** Classes de mise en page ajoutées par l'appelant (module CSS du parent). */
  className?: string
  /** Rendu en `<article>` plutôt qu'en `<div>` quand le contenu est autoportant. */
  as?: 'div' | 'article' | 'aside'
}

/**
 * La lentille est un panneau **vide**, et le contenu est son voisin — jamais son enfant.
 *
 * Ce découpage n'est pas une élégance : liquidGL mute l'élément qu'il transforme en
 * lentille. Il lui pose `opacity: 0` (liquidGL.js l. 3397), puis `pointer-events: none`
 * (l. 3419) — et ce second réglage n'est **jamais restauré**, aucune ligne du fichier ne
 * le remet à sa valeur d'origine. Il efface aussi `background`, `background-image` et
 * `backdrop-filter` en styles en ligne. Faire du conteneur de contenu une lentille
 * revient donc à confier la visibilité du texte à l'animation d'apparition de la
 * bibliothèque, et à tuer silencieusement tout lien ou bouton qu'on y ajoutera un jour.
 *
 * Avec ce découpage, liquidGL ne possède qu'une div décorative et vide. Le contenu
 * garde son opacité, ses événements de pointeur et son style.
 *
 * Contraintes liquidGL tenues dans `glass-surface.css` : toutes les lentilles partagent
 * le même z-index, et aucune n'est en `position: fixed` — la bibliothèque les ignore.
 */
export function GlassSurface({ children, className, as = 'div' }: GlassSurfaceProps) {
  const Tag = as
  const classes = className ? `${styles.cadre} ${className}` : styles.cadre

  return (
    <Tag className={classes}>
      <div aria-hidden="true" className={GLASS_CLASS} />
      <div className={styles.contenu}>{children}</div>
    </Tag>
  )
}
