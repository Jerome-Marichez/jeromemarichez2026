import { Bouton } from '@/components/Bouton'
import { MurDeStack } from '@/components/MurDeStack'
import { TitreSection } from '@/components/TitreSection'
import { accroches } from '@/contenu/accroches'
import { competences } from '@/contenu/competences'
import styles from './competences-view.module.css'

/**
 * La page Competences est un mur, et c'est le propos.
 *
 * Elle refuse les deux formes que cette page prend d'habitude : la grille de
 * logos, qui ne dit rien de ce qui est reellement pratique, et la barre de
 * progression en pourcentage, qui invente une precision que personne ne peut
 * mesurer. Ici la liste est entiere et plate, et le lecteur juge lui-meme.
 */
export function CompetencesView() {
  return (
    <>
      <section className={`cadre ${styles.ouverture}`}>
        <h1 className={styles.titre}>Compétences</h1>
        <p className={styles.chapo}>{accroches.competencesChapo}</p>
      </section>

      <MurDeStack competences={competences} />

      <section className={`cadre ${styles.apres}`}>
        <TitreSection>Ce que ça a donné</TitreSection>
        <p className={styles.chapo}>
          Une liste de technologies ne prouve rien toute seule. Les projets disent ce que chacune a
          servi à trancher.
        </p>
        <div className={styles.actions}>
          <Bouton href="/projets/" ton="primaire">
            Les projets en détail
          </Bouton>
          <Bouton href="/parcours/">Le parcours</Bouton>
        </div>
      </section>
    </>
  )
}
