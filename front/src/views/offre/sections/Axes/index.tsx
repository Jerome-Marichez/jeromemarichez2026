import { Card } from '@/@shared/components/Card'
import { Section } from '@/@shared/components/Section'
import type { IGroupeAxes } from '@/interfaces/groupe-axes'
import type { IOffrePage } from '@/interfaces/offre-page'
import styles from './axes.module.css'

interface IAxesProps {
  contenu: IOffrePage
  groupes: readonly IGroupeAxes[]
}

/**
 * Ce que couvre l'offre : ses axes de travail, chacun portant sa preuve quand il en a
 * une publiable.
 *
 * LES VOLETS SONT RENDUS DANS L'ORDRE DU CONTENU. `grouperAxesParVolet` découpe les axes
 * en suites contiguës sans jamais réordonner : l'offre « Data & IA » ouvre donc bien sur
 * la fiabilité puis la qualification des données, avant ses deux volets nommés, et se
 * referme sur MLOps, conformité et « sur devis ». Cet ordre est le message de l'offre —
 * il distingue de qui vend l'IA d'abord et découvre ensuite que la donnée du client est
 * inexploitable.
 *
 * HIÉRARCHIE DES TITRES. Un groupe nommé pose un `h3` (le volet) et ses axes deviennent
 * des `h4` ; un groupe du socle commun n'a pas de nom à afficher et ses axes restent des
 * `h3`. Aucun niveau n'est sauté dans l'un ou l'autre cas, et le niveau reflète
 * exactement la profondeur réelle de l'information plutôt qu'un alignement décoratif.
 *
 * Les axes sont rendus en liste : un lecteur d'écran annonce leur nombre avant de les
 * énumérer, ce qui donne d'emblée la taille du périmètre couvert.
 */
export function Axes({ contenu, groupes }: IAxesProps) {
  return (
    <Section id="axes" title={contenu.titreAxes} width="wide">
      {groupes.map((groupe) => (
        <div className={styles.groupe} key={groupe.cle}>
          {groupe.volet === null ? null : <h3 className={styles.volet}>{groupe.volet}</h3>}
          <ul className={styles.grille}>
            {groupe.axes.map((axe) => (
              <li className={styles.item} key={axe.cle}>
                <Card headingLevel={groupe.volet === null ? 3 : 4} title={axe.titre}>
                  <p>{axe.description}</p>
                  {axe.preuve === null ? null : (
                    <p className={styles.preuve}>
                      <span className={styles.preuveLibelle}>{contenu.libellePreuve}</span>
                      {axe.preuve}
                    </p>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  )
}
