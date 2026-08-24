// ThreadSection/index.tsx — jeromemarichez-fr
// Le fil : une méthode qui traverse tous les pôles.

import { Reveal } from '@/components/Reveal'
import type { IEditorialSection } from '@/interfaces/IEditorialSection'
import styles from './thread-section.module.css'

interface ThreadSectionProps {
  section: IEditorialSection
}

/**
 * Un fil se rend perpendiculairement aux charnières, et c'est volontaire.
 *
 * Les charnières tracent un filet **vertical** : la chaîne qui descend, un pôle passant
 * la main au suivant. Le fil trace un filet **horizontal** et numérote ses étapes de la
 * même main : il coupe la chaîne au lieu de s'y insérer. C'est la seule façon de dire
 * visuellement « ceci n'est pas une quatrième offre » sans avoir à l'écrire.
 *
 * Pas de verre ici — `selectGlassSectionIds` ne vitre que les pôles et les chapitres.
 */
export function ThreadSection({ section }: ThreadSectionProps) {
  const titreId = `${section.id}-titre`

  return (
    <Reveal ariaLabelledBy={titreId} as="section" className={styles.fil} id={section.id}>
      <header className={styles.entete}>
        <p className={styles.kicker}>{section.kicker}</p>
        <h2 className={styles.titre} id={titreId}>
          {section.titre}
        </h2>
        <p className={styles.chapo}>{section.chapo}</p>
      </header>

      <ol className={styles.etapes}>
        {section.blocs.map((bloc, index) => (
          <li className={styles.etape} key={bloc.titre}>
            {/* Le rang est décoratif : la numérotation est déjà portée par le `<ol>`,
                et la répéter aux lecteurs d'écran ferait entendre « un un ». */}
            <span aria-hidden="true" className={styles.rang}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.etapeTitre}>{bloc.titre}</h3>
            {bloc.texte ? <p className={styles.etapeTexte}>{bloc.texte}</p> : null}
            {bloc.preuve ? <p className={styles.preuve}>{bloc.preuve}</p> : null}
            {bloc.decision ? (
              <p className={styles.decision}>
                <span className={styles.decisionLabel}>Vous tranchez</span>
                {bloc.decision}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
