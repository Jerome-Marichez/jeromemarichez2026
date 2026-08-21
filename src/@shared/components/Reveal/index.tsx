'use client'

// Reveal/index.tsx — jeromemarichez-fr
// La révélation à l'entrée de section : ce qui arrive se pose, il n'apparaît pas.

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { MARGE_TRACE, useInViewport } from '../../hooks/use-in-viewport'
import { useMotionPaused } from '../../hooks/use-motion-paused'
import styles from './reveal.module.css'

interface RevealProps {
  children: ReactNode
  /** Balise rendue. La révélation prend la place de la section plutôt que de l'envelopper. */
  as?: 'div' | 'section'
  /** Classes de mise en page de l'appelant. Elles ne doivent jamais poser de `transform`. */
  className?: string
  id?: string
  /** Repris tel quel en `aria-labelledby` quand la balise rendue est la section. */
  ariaLabelledBy?: string
}

/**
 * Porte le seul geste de révélation du site, et il n'y en a pas deux implémentations :
 * `useInViewport` est le hook prévu pour ça, il ne fait que dire « c'est entré ».
 *
 * **Rien n'est masqué au rendu serveur.** L'état caché n'est armé qu'après montage, et
 * seulement pour ce qui est encore *sous la ligne de flottaison* à cet instant. Deux
 * défauts tombent d'un coup :
 *
 * - sans JavaScript, ou si l'hydratation échoue, la page reste entièrement lisible —
 *   une révélation qui laisse du contenu à `opacity: 0` est une panne, pas un effet ;
 * - ce qui est déjà à l'écran quand le JavaScript arrive n'est jamais caché *puis*
 *   remontré. C'est le clignotement typique des révélations au défilement, et il est
 *   d'autant plus visible qu'il frappe le premier écran.
 *
 * Le mouvement se coupe des deux côtés : `useMotionPaused` couvre la préférence système
 * **et** le `MotionToggle` de la page (WCAG 2.2.2), et le module CSS repose la même
 * garde sous `prefers-reduced-motion` — un état caché ne doit jamais dépendre du seul
 * JavaScript pour se lever.
 */
export function Reveal({ children, as = 'div', className, id, ariaLabelledBy }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const vu = useInViewport(ref, MARGE_TRACE)
  const fige = useMotionPaused()
  const [arme, setArme] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (node.getBoundingClientRect().top > window.innerHeight) setArme(true)
  }, [])

  const Tag = as
  const classes = className ? `${styles.revelation} ${className}` : styles.revelation

  return (
    <Tag
      aria-labelledby={ariaLabelledBy}
      className={classes}
      data-revele={arme && !fige && !vu ? 'attente' : 'pose'}
      id={id}
      ref={ref}
    >
      {children}
    </Tag>
  )
}
