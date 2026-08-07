import type { ReactNode } from 'react'
import styles from './card.module.css'

const HEADING_TAGS = { 2: 'h2', 3: 'h3', 4: 'h4' } as const

/** Niveau de titre de la carte — à choisir selon la hiérarchie de la page. */
export type CardHeadingLevel = 2 | 3 | 4

interface ICardProps {
  children: ReactNode
  title?: string
  /** Par défaut `3` : une carte vit normalement dans une `Section` titrée en `h2`. */
  headingLevel?: CardHeadingLevel
  /** Court libellé de catégorie affiché au-dessus du titre. */
  eyebrow?: string
  /** Zone d'actions, alignée en bas de carte. */
  footer?: ReactNode
  className?: string
}

/**
 * Surface autonome regroupant un titre et son contenu. Volontairement NON
 * cliquable dans son ensemble : la zone d'action est explicite (`footer`), ce qui
 * évite de superposer un lien invisible au texte et de rendre celui-ci
 * insélectionnable.
 */
export function Card({
  children,
  title,
  headingLevel = 3,
  eyebrow,
  footer,
  className,
}: ICardProps) {
  const Heading = HEADING_TAGS[headingLevel]
  const classNames = [styles.card, className].filter(Boolean).join(' ')

  return (
    <article className={classNames}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      {title ? <Heading className={styles.title}>{title}</Heading> : null}
      <div className={styles.body}>{children}</div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </article>
  )
}
