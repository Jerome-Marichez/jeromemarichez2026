import { ExperienceBloc } from '@/components/ExperienceBloc'
import { experiences } from '@/contenu/experiences'
import styles from './parcours-view.module.css'

/**
 * Le parcours, en lecture : trois expériences dans l'ordre antéchronologique
 * défini par `src/contenu/experiences`. Page de lecture, donc rien n'y est
 * animé : le mieux qu'on puisse faire à une entrée qui arrive pour lire est de
 * ne pas lui imposer un mouvement supplémentaire.
 */
export function ParcoursView() {
  return (
    <section className="cadre">
      <h1 className={styles.titre}>Parcours</h1>

      <ol className={styles.liste}>
        {experiences.map((experience) => (
          <li className={styles.item} key={experience.entreprise}>
            <ExperienceBloc experience={experience} />
          </li>
        ))}
      </ol>
    </section>
  )
}
