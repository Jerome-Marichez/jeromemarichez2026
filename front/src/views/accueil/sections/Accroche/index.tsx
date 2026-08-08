import { ActionLink } from '@/@shared/components/ActionLink'
import { Container } from '@/@shared/components/Container'
import type { IAccueil } from '@/interfaces/accueil'
import styles from './accroche.module.css'

interface IAccrocheProps {
  contenu: IAccueil['accroche']
}

/**
 * Accroche de la page d'accueil : le seul `h1` du document.
 *
 * Rendue comme une région nommée par son propre titre (`aria-labelledby`) plutôt que
 * comme un simple bloc : la liste des régions restituée par un lecteur d'écran reprend
 * ainsi le plan visible de la page. Ce n'est pas un `@shared/Section`, qui ne sait
 * titrer qu'en `h2` ou `h3` — le niveau `h1` appartient à la page.
 */
export function Accroche({ contenu }: IAccrocheProps) {
  return (
    <section aria-labelledby="accroche-titre" className={styles.accroche} id="accroche">
      <Container className={styles.contenu}>
        <h1 id="accroche-titre">{contenu.titre}</h1>
        <p className={styles.lead}>{contenu.lead}</p>
        <div className={styles.actions}>
          <ActionLink href={contenu.actionPrincipale.href}>
            {contenu.actionPrincipale.libelle}
          </ActionLink>
          <ActionLink href={contenu.actionSecondaire.href} variant="secondary">
            {contenu.actionSecondaire.libelle}
          </ActionLink>
        </div>
      </Container>
    </section>
  )
}
