// GlassSurface/index.tsx — jeromemarichez-fr
// Une surface de verre réfractant.

import type { ReactNode } from 'react'
import { GLASS_CLASS } from './glass-class'

interface GlassSurfaceProps {
  children: ReactNode
  /** Classes de mise en page ajoutées par l'appelant (module CSS du parent). */
  className?: string
  /** Rendu en `<article>` plutôt qu'en `<div>` quand le contenu est autoportant. */
  as?: 'div' | 'article' | 'aside'
}

/**
 * Marque un bloc comme surface de verre.
 *
 * Le composant ne fait qu'apposer la classe globale que liquidGL cible : c'est
 * `LiquidGlassRuntime` qui amorce le moteur, une seule fois par page. Tant qu'il n'a
 * pas tourné — et sur mobile, sans WebGL ou en mouvement réduit, où il ne tourne pas du
 * tout — le repli `backdrop-filter` de `glass-surface.css` porte seul le rendu. Le bloc
 * est donc toujours lisible, jamais dépendant du WebGL.
 *
 * Contrainte liquidGL à ne pas contourner : toutes les surfaces partagent le même
 * z-index, posé une seule fois dans `glass-surface.css`. N'y ajoutez pas de `z-index`
 * local, et ne posez pas de surface en `position: fixed` — la bibliothèque les ignore.
 */
export function GlassSurface({ children, className, as = 'div' }: GlassSurfaceProps) {
  const Tag = as
  const classes = className ? `${GLASS_CLASS} ${className}` : GLASS_CLASS

  return <Tag className={classes}>{children}</Tag>
}
