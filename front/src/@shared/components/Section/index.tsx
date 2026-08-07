import type { ReactNode } from 'react'
import { Container, type ContainerWidth } from '../Container'
import styles from './section.module.css'

const HEADING_TAGS = { 2: 'h2', 3: 'h3' } as const

export type SectionHeadingLevel = 2 | 3
export type SectionTone = 'default' | 'muted'

interface ISectionProps {
  /**
   * Ancre de la section. Obligatoire : elle sert d'identifiant au titre
   * (`<id>-titre`), ce qui donne son nom accessible à la région, et de cible aux
   * liens internes de la page.
   */
  id: string
  title: string
  children: ReactNode
  headingLevel?: SectionHeadingLevel
  /** Phrase d'introduction affichée sous le titre. */
  lead?: string
  width?: ContainerWidth
  tone?: SectionTone
}

/**
 * Bloc de page titré. Rend une région nommée par son propre titre
 * (`aria-labelledby`) : la liste des régions restituée par un lecteur d'écran
 * reprend donc le plan visible de la page, sans libellé à maintenir en double.
 */
export function Section({
  id,
  title,
  children,
  headingLevel = 2,
  lead,
  width = 'default',
  tone = 'default',
}: ISectionProps) {
  const Heading = HEADING_TAGS[headingLevel]
  const headingId = `${id}-titre`
  const classNames = [styles.section, tone === 'muted' ? styles.muted : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <section aria-labelledby={headingId} className={classNames} id={id}>
      <Container width={width}>
        <div className={styles.header}>
          <Heading id={headingId}>{title}</Heading>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </div>
        {children}
      </Container>
    </section>
  )
}
