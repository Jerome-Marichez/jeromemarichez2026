import { Container } from '@/@shared/components/Container'
import type { IOffre } from '@/interfaces/offre'
import type { IOffrePage } from '@/interfaces/offre-page'
import styles from './decision.module.css'

interface IDecisionProps {
  contenu: IOffrePage
  offre: IOffre
}

/**
 * Ce que le client peut trancher grâce à la prestation.
 *
 * Section à part entière, et non une ligne en pied de carte : la ligne éditoriale du
 * CLAUDE.md fait de la décision permise la conclusion d'un bloc de service — « vendre
 * une décision, pas une techno ». Elle mérite donc le même rang visuel que ce qu'elle
 * conclut.
 *
 * Posée sur le dégradé de profondeur, sans aucun lien à l'intérieur : la profondeur
 * bleutée marque ce qui explique, jamais ce qui fait agir (docs/design.md). L'action,
 * elle, est dans le panneau de contact qui suit.
 */
export function Decision({ contenu, offre }: IDecisionProps) {
  return (
    <section aria-labelledby="decision-titre" className={styles.section} id="decision">
      <Container>
        <div className={styles.panneau}>
          <h2 id="decision-titre">{contenu.titreDecision}</h2>
          <p className={styles.texte}>{offre.decisionPermise}</p>
        </div>
      </Container>
    </section>
  )
}
