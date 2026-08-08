import { Card } from '@/@shared/components/Card'
import { Section } from '@/@shared/components/Section'
import type { IExperience } from '@/interfaces/experience'
import { formaterPeriode } from '@/utils/periode'
import styles from './experiences.module.css'

interface IExperiencesProps {
  titre: string
  experiences: readonly IExperience[]
}

/**
 * Les expériences professionnelles, dans l'ordre où le contenu les déclare — du plus
 * récent au plus ancien. Aucun tri n'a lieu ici : l'ordre est un choix éditorial.
 *
 * LES INTITULÉS SONT AFFICHÉS TELS QUELS. `experience.intitule` est repris à l'identique
 * des CV de référence (règle de véracité bloquante du CLAUDE.md) : il n'est ni
 * reformulé, ni tronqué, ni mis en capitales — une transformation de casse au rendu est
 * une réécriture de l'intitulé pour qui lit le HTML.
 *
 * L'employeur passe en `eyebrow`, donc AVANT le titre dans l'ordre de lecture comme dans
 * l'ordre du DOM : « chez qui » cadre « quoi », et un lecteur d'écran reçoit le contexte
 * avant l'intitulé plutôt que l'inverse.
 *
 * `ul` et non `ol` : l'ordre porte une chronologie, pas un rang. Une liste ordonnée
 * ferait annoncer « 1 » l'expérience la plus RÉCENTE, ce qui suggère un classement qui
 * n'existe pas. Les périodes affichées portent l'information de temps, explicitement.
 */
export function Experiences({ titre, experiences }: IExperiencesProps) {
  return (
    <Section id="experiences" title={titre} width="wide">
      <ul className={styles.liste}>
        {experiences.map((experience) => (
          <li className={styles.item} key={experience.cle}>
            <Card eyebrow={experience.employeur} headingLevel={3} title={experience.intitule}>
              <p className={styles.periode}>
                {formaterPeriode(experience.anneeDebut, experience.anneeFin)}
              </p>
              <p className={styles.secteur}>{experience.secteur}</p>
              <p>{experience.contexte}</p>
              <ul className={styles.faits}>
                {experience.faits.map((fait) => (
                  <li key={fait}>{fait}</li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
