import { ActionLink } from '@/@shared/components/ActionLink'
import { Card } from '@/@shared/components/Card'
import { Section } from '@/@shared/components/Section'
import type { IAccueil } from '@/interfaces/accueil'
import type { IOffre } from '@/interfaces/offre'
import styles from './offres.module.css'

interface IOffresProps {
  contenu: IAccueil['offres']
  offres: readonly IOffre[]
}

/**
 * Les trois offres, chacune close par la décision qu'elle rend possible — jamais par
 * une liste d'outils (CLAUDE.md, « Ligne éditoriale »).
 *
 * Rendues dans une liste : un lecteur d'écran annonce alors leur nombre avant de les
 * énumérer. Le libellé de chaque lien reprend le titre de l'offre, pour que trois
 * liens voisins ne soient pas restitués comme trois fois « Voir l'offre ».
 */
export function Offres({ contenu, offres }: IOffresProps) {
  return (
    <Section id="offres" lead={contenu.lead} title={contenu.titre} tone="muted" width="wide">
      <ul className={styles.grille}>
        {offres.map((offre) => (
          <li className={styles.item} key={offre.cle}>
            <Card
              footer={
                <ActionLink href={`/services/${offre.cle}`} variant="secondary">
                  {`${contenu.libelleLien} ${offre.titre}`}
                </ActionLink>
              }
              title={offre.titre}
            >
              <p>{offre.accroche}</p>
              <p className={styles.decision}>
                <span className={styles.decisionLibelle}>{contenu.libelleDecision}</span>
                {offre.decisionPermise}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
