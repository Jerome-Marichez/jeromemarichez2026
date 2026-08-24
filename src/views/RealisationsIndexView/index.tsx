// RealisationsIndexView/index.tsx — jeromemarichez-fr
// La liste des réalisations, groupée par cadre d'emploi.

import { Breadcrumb } from '@/components/Breadcrumb'
import type { IRealisationGroupe } from '@/interfaces/IRealisationGroupe'
import type { IRealisationsIndex } from '@/interfaces/IRealisationsIndex'
import { EmploymentFrame } from '../../components/EmploymentFrame'
import { RealisationCard } from '../../components/RealisationCard'
import styles from './realisations-index-view.module.css'

interface RealisationsIndexViewProps {
  index: IRealisationsIndex
  /** Groupes déjà constitués et classés par le service : la vue n'ordonne rien. */
  groupes: IRealisationGroupe[]
}

/**
 * **Le regroupement par cadre n'est pas un classement, c'est l'argument.**
 *
 * Une liste plate de treize fiches se lirait comme un portfolio d'agence, et le lecteur
 * supposerait treize commanditaires. Groupées sous trois organisations, avec le statut,
 * l'intitulé de poste et la période en tête de chaque groupe, les mêmes fiches disent ce
 * qu'elles sont : deux postes salariés et une mission en indépendant, sur neuf ans. Le
 * cadre est donc rendu **avant** les fiches qu'il porte, jamais en note sous chacune
 * d'elles.
 *
 * Chaque groupe est une `<section>` étiquetée par le nom de l'organisation : au clavier
 * comme au lecteur d'écran, on peut passer d'un cadre au suivant sans traverser ses
 * fiches.
 */
export function RealisationsIndexView({ index, groupes }: RealisationsIndexViewProps) {
  return (
    <div className={styles.page}>
      <header className={styles.entete}>
        <Breadcrumb fil={[{ nom: index.titre, route: index.route }]} />
        <h1 className={styles.titre}>{index.titre}</h1>
        <p className={styles.chapo}>{index.chapo}</p>
      </header>

      {groupes.map((groupe) => {
        const titreId = `cadre-${groupe.cadre.periode}`

        return (
          <section aria-labelledby={titreId} className={styles.groupe} key={titreId}>
            <EmploymentFrame cadre={groupe.cadre} niveau="h2" titreId={titreId} />

            <ol className={styles.liste}>
              {groupe.realisations.map((realisation) => (
                <li key={realisation.slug}>
                  <RealisationCard realisation={realisation} />
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
