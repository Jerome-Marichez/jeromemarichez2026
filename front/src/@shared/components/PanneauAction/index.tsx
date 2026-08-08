import type { IAppelAction } from '@/interfaces/appel-action'
import { ActionLink } from '../ActionLink'
import { Container } from '../Container'
import styles from './panneau-action.module.css'

interface IPanneauActionProps {
  /** Ancre de la région et racine de l'identifiant de son titre. */
  id: string
  titre: string
  lead: string
  action: IAppelAction
}

/**
 * Panneau mis en avant fermant une page sur l'action attendue.
 *
 * Composé à la main plutôt qu'avec `Section` : le titre et le texte doivent se trouver À
 * L'INTÉRIEUR du panneau, alors que `Section` rend toujours son en-tête au-dessus de son
 * contenu. Reste une région nommée par son propre titre (`aria-labelledby`).
 *
 * Deux contraintes viennent d'une MESURE, pas d'un goût (docs/accessibility.md) :
 *
 * - aucun filet : `--color-border` sur `--color-accent-soft` ne contraste qu'à 1.19:1 en
 *   thème clair, la bordure serait invisible. Le fond seul délimite le panneau ;
 * - un seul lien, et il est `primary` : sur ce fond, un lien `secondary` prendrait
 *   précisément `--color-accent-soft` au survol et disparaîtrait.
 *
 * Extrait de `views/offre/sections/Contact/` au moment de livrer la page parcours, qui
 * ferme sur le même panneau : deux exemplaires étaient une coïncidence, trois auraient
 * été une duplication. `views/accueil/sections/AppelContact/` garde délibérément sa
 * propre composition — c'est le bloc de clôture de la page d'accueil, dont la structure
 * diffère et que ses tests fixent.
 */
export function PanneauAction({ id, titre, lead, action }: IPanneauActionProps) {
  const titreId = `${id}-titre`

  return (
    <section aria-labelledby={titreId} className={styles.section} id={id}>
      <Container>
        <div className={styles.panneau}>
          <h2 id={titreId}>{titre}</h2>
          <p className={styles.lead}>{lead}</p>
          <ActionLink href={action.href}>{action.libelle}</ActionLink>
        </div>
      </Container>
    </section>
  )
}
