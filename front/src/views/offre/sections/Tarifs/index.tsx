import { Section } from '@/@shared/components/Section'
import type { IGrilleTarifaire } from '@/interfaces/grille-tarifaire'
import type { IOffrePage } from '@/interfaces/offre-page'
import type { IPreuveResolue } from '@/interfaces/preuve-resolue'
import { formaterMontant } from '@/utils/tarif'
import styles from './tarifs.module.css'

interface ITarifsProps {
  contenu: IOffrePage
  grille: IGrilleTarifaire
  preuve: IPreuveResolue
}

/**
 * La grille tarifaire d'une offre.
 *
 * AUCUN MONTANT N'EST ÉCRIT ICI, ni ailleurs dans le rendu. Chaque prix sort de
 * `formaterMontant` (`utils/tarif.ts`), seul module du dépôt qui transforme un `Montant`
 * en texte. Ce n'est pas une convention mais une garantie du typage : `formaterMontant`
 * rend un `MontantAffichable`, type marqué qu'elle seule sait produire, et une chaîne
 * littérale ne compile pas à cette place. La mention « TTC » sort donc collée au chiffre,
 * dans la même chaîne : aucune mise en page ne peut la reléguer en note de bas de page,
 * aucun rendu partiel ne peut l'oublier.
 *
 * Rendu en LISTE et non en tableau : deux lignes portent le même intitulé et ne se
 * distinguent que par leur condition d'application. Un tableau aurait imposé un en-tête
 * de colonne à inventer, et se serait mal replié sous 400 px — alors qu'une grille de
 * prix est précisément ce qu'on lit sur un téléphone.
 *
 * La preuve qui appuie l'argument est RÉSOLUE, jamais recopiée : son texte reste écrit
 * une seule fois, sur l'axe de l'offre qui le porte.
 */
export function Tarifs({ contenu, grille, preuve }: ITarifsProps) {
  return (
    <Section id="tarifs" title={contenu.titreTarifs} tone="muted">
      <p className={styles.argument}>{grille.argument}</p>
      <ul className={styles.lignes}>
        {grille.lignes.map((ligne) => (
          <li className={styles.ligne} key={ligne.cle}>
            <p className={styles.intitule}>{ligne.intitule}</p>
            <p className={styles.condition}>{ligne.condition}</p>
            <p className={styles.montant}>{formaterMontant(ligne.montant)}</p>
          </li>
        ))}
      </ul>
      <div className={styles.preuve}>
        <p className={styles.preuveLibelle}>{contenu.libellePreuveTarifs}</p>
        <p className={styles.preuveEnonce}>{preuve.enonce}</p>
      </div>
    </Section>
  )
}
