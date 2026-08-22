// HingeSection/index.tsx — jeromemarichez-fr
// Une charnière : le moment où un pôle passe la main au suivant.

import { Reveal } from '@/@shared/components/Reveal'
import type { IEditorialSection } from '@/interfaces/IEditorialSection'
import styles from './hinge-section.module.css'

interface HingeSectionProps {
  section: IEditorialSection
}

/**
 * Les charnières sont des sections à part entière, avec leur propre `h2` — pas des
 * transitions décoratives entre deux blocs.
 *
 * C'est ce qui distingue ce site d'un catalogue : sans elles, « ingénierie web »,
 * « data », « IA » et « SEA & UX » redeviennent des prestations qu'on pourrait acheter
 * à autant de fournisseurs différents. Avec elles, l'enchaînement devient l'argument — et
 * l'argument n'est tenable que parce que c'est la même personne à chaque poste.
 *
 * Les repères sont rendus en liste : ce sont des faits d'exploitation, pas du décor.
 *
 * La section EST la révélation, elle n'est pas enveloppée dedans : le filet qui se
 * trace est un `::before` de `.charniere`, et il doit partir au moment où la charnière
 * entre à l'écran. Jusqu'ici l'animation démarrait au chargement de la page, donc pour
 * les deux charnières à la fois, largement hors de vue — un tracé achevé avant d'être
 * regardé ne raconte rien.
 */
export function HingeSection({ section }: HingeSectionProps) {
  const titreId = `${section.id}-titre`

  return (
    <Reveal ariaLabelledBy={titreId} as="section" className={styles.charniere} id={section.id}>
      <p className={styles.kicker}>{section.kicker}</p>
      <h2 className={styles.titre} id={titreId}>
        {section.titre}
      </h2>
      <p className={styles.texte}>{section.chapo}</p>

      {section.blocs.length > 0 ? (
        <ul className={styles.reperes}>
          {section.blocs.map((bloc) => (
            <li className={styles.repere} key={bloc.titre}>
              <span className={styles.repereTitre}>{bloc.titre}</span>
              {bloc.texte ? <span className={styles.repereTexte}>{bloc.texte}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </Reveal>
  )
}
