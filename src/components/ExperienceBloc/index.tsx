import { TitreSection } from '@/components/TitreSection'
import type { IExperience } from '@/interfaces/IExperience'
import styles from './experience-bloc.module.css'

interface IExperienceBlocProps {
  readonly experience: IExperience
}

/**
 * Une expérience professionnelle, lue comme une entrée de journal : période,
 * poste, contexte, réalisations, stack, puis encadrement.
 *
 * Le statut `independant` se voit à l'écran, en toutes lettres, juste sous le
 * nom de l'entreprise : Truffle Capital était un client d'une mission menée en
 * indépendant, jamais un employeur, et ce fait ne doit pas se déduire d'un
 * détail (CLAUDE.md, table des interdits).
 */
export function ExperienceBloc({ experience }: IExperienceBlocProps) {
  const estIndependant = experience.statut === 'independant'

  return (
    <article className={styles.experience}>
      <p className={styles.periode}>{experience.periode}</p>

      <TitreSection niveau={3}>{experience.entreprise}</TitreSection>

      <p className={styles.secteur}>{experience.secteur}</p>

      {estIndependant && (
        <p className={styles.statut}>
          Mission menée en indépendant : {experience.entreprise} était un client, pas un employeur.
        </p>
      )}

      <p className={styles.poste}>{experience.posteIntitule}</p>

      <p className={styles.contexte}>{experience.contexte}</p>

      <ul className={styles.realisations}>
        {experience.realisations.map((realisation, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: liste statique, jamais réordonnée ni filtrée.
          <li className={styles.realisation} key={index}>
            {realisation}
          </li>
        ))}
      </ul>

      {experience.encadrement !== null && (
        <p className={styles.encadrement}>
          <span className={styles.etiquette}>Encadrement</span>
          {experience.encadrement}
        </p>
      )}

      <ul className={styles.stack} aria-label={`Stack technique, ${experience.entreprise}`}>
        {experience.stackTechnique.map((techno) => (
          <li className={styles.techno} key={techno}>
            {techno}
          </li>
        ))}
      </ul>
    </article>
  )
}
