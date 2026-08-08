import { ActionLink } from '@/@shared/components/ActionLink'
import { Container } from '@/@shared/components/Container'
import type { IAccueil } from '@/interfaces/accueil'
import styles from './appel-contact.module.css'

interface IAppelContactProps {
  contenu: IAccueil['contact']
}

/**
 * Appel à contact fermant la page.
 *
 * Composé à la main plutôt qu'avec `@shared/Section` : le titre et le texte doivent
 * se trouver À L'INTÉRIEUR du panneau mis en avant, alors que `Section` rend toujours
 * son en-tête au-dessus de son contenu.
 *
 * Le panneau ne porte qu'un seul lien, et il est `primary` : sur un fond
 * `--color-accent-soft`, un lien `secondary` deviendrait invisible au survol,
 * puisqu'il prend précisément cette couleur comme fond.
 */
export function AppelContact({ contenu }: IAppelContactProps) {
  return (
    <section aria-labelledby="contact-titre" className={styles.section} id="contact">
      <Container>
        <div className={styles.panneau}>
          <h2 id="contact-titre">{contenu.titre}</h2>
          <p className={styles.lead}>{contenu.lead}</p>
          <ActionLink href={contenu.action.href}>{contenu.action.libelle}</ActionLink>
        </div>
      </Container>
    </section>
  )
}
