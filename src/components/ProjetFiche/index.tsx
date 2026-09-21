import { LogoMarque } from '@/components/LogoMarque'
import { marques } from '@/contenu/marques'
import type { IProjet } from '@/interfaces/IProjet'
import styles from './projet-fiche.module.css'

interface IProjetFicheProps {
  readonly projet: IProjet
}

/**
 * Un projet, en liste de definitions Contexte / Enjeu / Mon role / Resultat.
 *
 * Le titre du projet porte le plus de poids, l'entreprise et le sous-titre
 * suivent en plus petit : sur une dizaine de fiches, c'est cette hierarchie qui
 * permet de reperer un projet avant de lire son detail. Les quatre intitules
 * s'alignent sur la meme colonne de caracteres, dans l'esprit d'AxeListe : une
 * liste de definitions, pas une carte.
 *
 * `marque`, quand elle existe, place le logo a cote du titre, sur sa ligne de
 * base : une marque non repertoriee dans `src/contenu/marques.ts` ne rend
 * aucun logo, sans laisser de trou dans la mise en page.
 */
export function ProjetFiche({ projet }: IProjetFicheProps) {
  const marque = projet.marque ? marques[projet.marque] : undefined

  return (
    <article className={styles.fiche}>
      <header className={styles.entete}>
        <div className={styles.ligneTitre}>
          <h2 className={styles.titre}>{projet.titre}</h2>
          {marque && <LogoMarque marque={marque} />}
        </div>
        <p className={styles.meta}>
          <span className={styles.entreprise}>{projet.entreprise}</span>
          <span aria-hidden="true">·</span>
          <span>{projet.sousTitre}</span>
        </p>
      </header>
      <dl className={styles.details}>
        <div className={styles.ligne}>
          <dt className={styles.intitule}>Contexte</dt>
          <dd className={styles.valeur}>{projet.contexte}</dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.intitule}>Enjeu</dt>
          <dd className={styles.valeur}>{projet.enjeu}</dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.intitule}>Mon rôle</dt>
          <dd className={styles.valeur}>{projet.monRole}</dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.intitule}>Résultat</dt>
          <dd className={styles.valeur}>{projet.resultat}</dd>
        </div>
      </dl>
    </article>
  )
}
