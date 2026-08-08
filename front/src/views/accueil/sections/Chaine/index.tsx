import { Section } from '@/@shared/components/Section'
import type { IAccueil } from '@/interfaces/accueil'
import type { IMaillonResolu } from '@/interfaces/maillon-resolu'
import styles from './chaine.module.css'

interface IChaineProps {
  contenu: IAccueil['chaine']
  maillons: readonly IMaillonResolu[]
}

/**
 * La chaîne, rendue comme un enchaînement et non comme une liste.
 *
 * Trois choix portent cette lecture :
 * - une liste ORDONNÉE (`ol`) — l'ordre est l'information, un lecteur d'écran annonce
 *   le nombre d'étapes avant de les énumérer ;
 * - un rang visible (« Étape 1 »), composé du libellé porté par le contenu et de
 *   l'index : rien n'est écrit en dur dans ce composant ;
 * - une sortie explicite en pied de chaque maillon, dont l'énoncé est justement ce
 *   dont le maillon suivant part. C'est ce chaînage textuel qui tient à toutes les
 *   largeurs, là où un trait de liaison se briserait au passage à une colonne.
 *
 * L'avertissement précède les maillons : le caractère illustratif du scénario
 * e-commerce se lit AVANT le scénario, jamais après.
 */
export function Chaine({ contenu, maillons }: IChaineProps) {
  return (
    <Section id="chaine" lead={contenu.lead} title={contenu.titre} tone="muted" width="wide">
      <p className={styles.avertissement}>
        <span className={styles.avertissementLibelle}>{contenu.libelleAvertissement}</span>
        {contenu.avertissement}
      </p>
      <ol className={styles.chaine}>
        {maillons.map((maillon, index) => (
          <li className={styles.maillon} key={maillon.cle}>
            <article className={styles.carte}>
              <p className={styles.rang}>{`${contenu.libelleEtape} ${index + 1}`}</p>
              <h3 className={styles.titre}>{maillon.titre}</h3>
              <p className={styles.role}>{maillon.role}</p>
              <p className={styles.illustration}>
                <span className={styles.etiquette}>{contenu.libelleIllustration}</span>
                {maillon.illustration}
              </p>
              <p className={styles.sortie}>
                <span className={styles.etiquette}>{maillon.libelleSortie}</span>
                {maillon.sortie}
              </p>
              <div className={styles.rattachement}>
                <span className={styles.etiquette}>{contenu.libelleRattachement}</span>
                <ul className={styles.offres}>
                  {maillon.offres.map((offre) => (
                    <li className={styles.offre} key={offre}>
                      {offre}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
