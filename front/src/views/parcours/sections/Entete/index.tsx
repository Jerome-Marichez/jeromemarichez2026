import { Container } from '@/@shared/components/Container'
import { Illustration } from '@/@shared/components/Illustration'
import type { IParcoursPage } from '@/interfaces/parcours-page'
import styles from './entete.module.css'

interface IEnteteProps {
  contenu: IParcoursPage['entete']
}

/**
 * Bloc d'ouverture de la page parcours : le seul `h1`, son chapô et l'illustration.
 *
 * Composé à la main plutôt qu'avec `Section`, qui ne sait titrer qu'en `h2`/`h3` : le
 * niveau `h1` appartient à la page. Reste une région nommée par son propre titre.
 *
 * L'IMAGE EST UN PLACEHOLDER SOUS LICENCE UNSPLASH, à remplacer par une photo de Jérôme
 * MARICHEZ. Ce n'est délibérément pas un portrait : un visage inconnu parti en production
 * présenterait quelqu'un d'autre comme étant lui. Provenance et licence complètes dans
 * `content/parcours-page.ts` et dans
 * `~/Desktop/assets-jeromemarichez/LICENCE-ET-PROVENANCE.md`.
 *
 * `chargement="eager"` : l'illustration est visible sans défiler et porte probablement le
 * plus grand élément affiché (LCP). La différer la ferait charger après le premier rendu,
 * ce qui dégraderait précisément la mesure qu'on cherche à tenir.
 */
export function Entete({ contenu }: IEnteteProps) {
  return (
    <section aria-labelledby="parcours-titre" className={styles.section} id="parcours">
      <Container>
        <div className={styles.grille}>
          <div className={styles.texte}>
            <h1 id="parcours-titre">{contenu.titre}</h1>
            <p className={styles.lead}>{contenu.lead}</p>
          </div>
          <Illustration chargement="eager" image={contenu.illustration} />
        </div>
      </Container>
    </section>
  )
}
