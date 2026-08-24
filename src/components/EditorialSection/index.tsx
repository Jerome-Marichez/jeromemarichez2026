// EditorialSection/index.tsx — jeromemarichez-fr
// Une section de contenu, rendue selon sa nature.

import { GlassSurface } from '@/@shared/components/GlassSurface'
import { Reveal } from '@/@shared/components/Reveal'
import type { IEditorialSection } from '@/interfaces/IEditorialSection'
import { ExpertiseBlock } from '../ExpertiseBlock'
import { HingeNote } from '../HingeNote'
import { HingeSection } from '../HingeSection'
import { ThreadSection } from '../ThreadSection'
import styles from './editorial-section.module.css'

interface EditorialSectionProps {
  section: IEditorialSection
  /** Rendu sur verre réfractant. Réservé aux sections posées sur un fond travaillé. */
  glass?: boolean
}

/**
 * Rend une section éditoriale, chapô puis blocs d'expertise, et referme sur sa
 * charnière quand elle en porte une.
 *
 * Le contenu vient d'une structure typée : ajouter un point d'expertise se fait dans
 * `@vitrine/contenu`, jamais ici. C'est la contrainte d'architecture du projet — le
 * rendu ne connaît pas le fond.
 */
export function EditorialSection({ section, glass = false }: EditorialSectionProps) {
  // Une charnière n'est pas une section de contenu avec un fond différent : elle a sa
  // propre grammaire — pas de blocs d'expertise, pas de verre, un filet qui se trace.
  if (section.kind === 'charniere') return <HingeSection section={section} />
  // Un fil traverse tous les pôles au lieu de s'intercaler entre deux : il a lui aussi
  // sa grammaire propre — étapes numérotées, filet horizontal, jamais de verre.
  if (section.kind === 'fil') return <ThreadSection section={section} />

  const titreId = `${section.id}-titre`

  // La révélation enveloppe le CORPS, jamais la section. Quand la section est vitrée,
  // elle se retrouve ainsi DANS le panneau : c'est le texte qui se pose, le verre ne
  // bouge pas. L'inverse ferait glisser une surface floutée sur toute sa hauteur, et le
  // navigateur recalculerait son flou à chaque image de la transition.
  const corps = (
    <Reveal className={styles.corps}>
      <header className={styles.entete}>
        <p className={styles.kicker}>{section.kicker}</p>
        <h2 className={styles.titre} id={titreId}>
          {section.titre}
        </h2>
        <p className={styles.chapo}>{section.chapo}</p>
      </header>

      {section.blocs.length > 0 ? (
        <div className={styles.blocs}>
          {section.blocs.map((bloc) => (
            <ExpertiseBlock key={bloc.titre} bloc={bloc} />
          ))}
        </div>
      ) : null}
    </Reveal>
  )

  return (
    <section aria-labelledby={titreId} className={styles.section} id={section.id}>
      {glass ? <GlassSurface className={styles.verre}>{corps}</GlassSurface> : corps}
      {section.transition ? <HingeNote texte={section.transition} /> : null}
    </section>
  )
}
