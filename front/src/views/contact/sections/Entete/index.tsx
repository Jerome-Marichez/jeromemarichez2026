import { Container } from '@/@shared/components/Container'
import type { IContactPage } from '@/interfaces/contact-page'
import styles from './entete.module.css'

interface IEnteteProps {
  contenu: IContactPage['entete']
}

/**
 * Bloc d'ouverture de la page de contact : le seul `h1` et son chapô.
 *
 * Composé à la main plutôt qu'avec `Section`, qui ne sait titrer qu'en `h2`/`h3` : le
 * niveau `h1` appartient à la page. Reste une région nommée par son propre titre.
 */
export function Entete({ contenu }: IEnteteProps) {
  return (
    <section aria-labelledby="contact-titre" className={styles.section} id="contact">
      <Container width="narrow">
        <h1 id="contact-titre">{contenu.titre}</h1>
        <p className={styles.lead}>{contenu.lead}</p>
      </Container>
    </section>
  )
}
