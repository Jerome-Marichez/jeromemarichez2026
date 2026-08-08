import { Card } from '@/@shared/components/Card'
import { Section } from '@/@shared/components/Section'
import type { IFormation } from '@/interfaces/formation'
import styles from './formations.module.css'

interface IFormationsProps {
  titre: string
  formations: readonly IFormation[]
}

/**
 * Les diplômes, tels qu'inscrits sur les CV de référence.
 *
 * Le niveau passe en `eyebrow` : « Bac +5 » est ce qu'un lecteur cherche en premier dans
 * une rubrique de formation, et le placer avant le titre le lui donne sans qu'il ait à
 * lire l'intitulé complet.
 *
 * Ni mention, ni classement, ni intitulé d'établissement : rien de tout cela ne figure
 * dans le contenu typé, et rien ne s'ajoute par déduction (règles de véracité du
 * CLAUDE.md). La ville et l'année sont les deux seules précisions établies.
 */
export function Formations({ titre, formations }: IFormationsProps) {
  return (
    <Section id="formations" title={titre} tone="muted" width="wide">
      <ul className={styles.grille}>
        {formations.map((formation) => (
          <li className={styles.item} key={formation.cle}>
            <Card eyebrow={formation.niveau} headingLevel={3} title={formation.intitule}>
              <p className={styles.detail}>{formation.ville}</p>
              <p className={styles.detail}>{formation.annee}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
