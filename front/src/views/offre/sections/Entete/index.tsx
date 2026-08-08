import { Container } from '@/@shared/components/Container'
import type { IOffre } from '@/interfaces/offre'
import styles from './entete.module.css'

interface IEnteteProps {
  offre: IOffre
}

/**
 * Ouverture d'une page d'offre : le seul `h1` du document et l'accroche.
 *
 * Rendue comme une région nommée par son propre titre (`aria-labelledby`) plutôt que
 * comme un simple bloc : la liste des régions restituée par un lecteur d'écran reprend
 * ainsi le plan visible de la page. Ce n'est pas un `@shared/Section`, qui ne sait
 * titrer qu'en `h2` ou `h3` — le niveau `h1` appartient à la page.
 *
 * Aucun lien d'action ici, contrairement à l'accroche de l'accueil : la page se ferme
 * sur son appel à contact, et le doubler en tête ajouterait un second lien au libellé
 * identique sans rien apporter à un visiteur qui vient tout juste d'arriver.
 */
export function Entete({ offre }: IEnteteProps) {
  return (
    <section aria-labelledby="offre-titre" className={styles.entete} id="offre">
      <Container className={styles.contenu}>
        <h1 id="offre-titre">{offre.titre}</h1>
        <p className={styles.lead}>{offre.accroche}</p>
      </Container>
    </section>
  )
}
