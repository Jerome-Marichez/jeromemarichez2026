import { Section } from '@/@shared/components/Section'
import type { IAccueil } from '@/interfaces/accueil'
import type { IPreuveResolue } from '@/interfaces/preuve-resolue'
import styles from './preuves.module.css'

interface IPreuvesProps {
  contenu: IAccueil['preuves']
  preuves: readonly IPreuveResolue[]
}

/**
 * Les preuves publiables, rattachées chacune à l'offre qui la porte.
 *
 * Les énoncés ne sont pas écrits ici : ils viennent des offres, résolus par
 * `services/preuves.service.ts`. La page d'accueil ne peut donc pas affirmer quelque
 * chose que la page d'offre correspondante ne dit pas.
 */
export function Preuves({ contenu, preuves }: IPreuvesProps) {
  return (
    <Section id="preuves" lead={contenu.lead} title={contenu.titre} tone="muted" width="wide">
      <ul className={styles.grille}>
        {preuves.map((preuve) => (
          <li className={styles.item} key={preuve.cle}>
            <p className={styles.offre}>{preuve.offre}</p>
            <h3 className={styles.titre}>{preuve.titre}</h3>
            <p className={styles.enonce}>{preuve.enonce}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
