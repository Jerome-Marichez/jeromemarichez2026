// RealisationView/index.tsx — jeromemarichez-fr
// Une fiche : son cadre d'emploi, le problème, ce qui a été fait, le résultat, la décision.

import Link from 'next/link'
import { Breadcrumb } from '@/@shared/components/Breadcrumb'
import { toRealisationRoute } from '@/@shared/routes'
import type { IRealisation } from '@/interfaces/IRealisation'
import type { IRealisationsIndex } from '@/interfaces/IRealisationsIndex'
import { EmploymentFrame } from '../../components/EmploymentFrame'
import { PoleTagList } from '../../components/PoleTagList'
import { RealisationCard } from '../../components/RealisationCard'
import styles from './realisation-view.module.css'

interface RealisationViewProps {
  realisation: IRealisation
  index: IRealisationsIndex
  /** Fiches proposées en fin de lecture. Choisies par le service, pas par la vue. */
  autres: IRealisation[]
}

/**
 * Quatre sections, toujours les mêmes, toujours dans cet ordre : le problème, ce qui a été
 * fait, le résultat, ce que ça permettait de trancher. Une fiche n'a pas de plan libre —
 * un plan libre produit treize fiches qui ne se comparent plus, et une comparaison
 * impossible est exactement ce qu'un prospect vient chercher ici.
 *
 * **Le cadre d'emploi est au-dessus du titre**, pas en bas de page. C'est la première
 * chose lue, donc la première chose sue : ce travail a été mené sous contrat de travail,
 * pas vendu à un client.
 *
 * Le chiffre, quand il existe, s'affiche avec sa **portée** — ce qu'il mesure et ce qu'il
 * ne mesure pas. C'est la seule façon de publier « +50 % » sans qu'il se fasse élargir en
 * « +50 % de chiffre d'affaires » par celui qui le lit.
 */
export function RealisationView({ realisation, index, autres }: RealisationViewProps) {
  const route = toRealisationRoute(realisation.slug)

  return (
    <div className={styles.page}>
      <article className={styles.fiche}>
        <header className={styles.entete}>
          <Breadcrumb
            fil={[
              { nom: index.titre, route: index.route },
              { nom: realisation.titre, route },
            ]}
          />
          <EmploymentFrame cadre={realisation.cadre} />
          <h1 className={styles.titre}>{realisation.titre}</h1>
          <p className={styles.chapo}>{realisation.chapo}</p>
          <PoleTagList legende="Pôles mobilisés" poles={realisation.poles} />
        </header>

        {realisation.chiffre ? (
          <figure className={styles.chiffre}>
            <p className={styles.nombre}>{realisation.chiffre.chiffre}</p>
            <p className={styles.mesure}>{realisation.chiffre.libelle}</p>
            <figcaption className={styles.portee}>{realisation.chiffre.portee}</figcaption>
          </figure>
        ) : null}

        <section aria-labelledby="probleme-titre" className={styles.section} id="probleme">
          <h2 className={styles.sousTitre} id="probleme-titre">
            Le problème posé
          </h2>
          <p className={styles.paragraphe}>{realisation.probleme}</p>
        </section>

        <section aria-labelledby="travail-titre" className={styles.section} id="travail">
          <h2 className={styles.sousTitre} id="travail-titre">
            Ce qui a été fait
          </h2>
          <ol className={styles.etapes}>
            {realisation.etapes.map((etape) => (
              <li className={styles.etape} key={etape.titre}>
                <h3 className={styles.titreEtape}>{etape.titre}</h3>
                <p className={styles.paragraphe}>{etape.texte}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="resultat-titre" className={styles.section} id="resultat">
          <h2 className={styles.sousTitre} id="resultat-titre">
            Le résultat
          </h2>
          <p className={styles.paragraphe}>{realisation.resultat}</p>
        </section>

        <section aria-labelledby="decision-titre" className={styles.decision} id="decision">
          <h2 className={styles.sousTitre} id="decision-titre">
            Ce que ça permettait de trancher
          </h2>
          <p className={styles.tranche}>{realisation.decision}</p>
        </section>
      </article>

      {autres.length > 0 ? (
        <aside aria-labelledby="a-voir-ensuite" className={styles.ensuite}>
          <h2 className={styles.titreEnsuite} id="a-voir-ensuite">
            Sur les mêmes pôles
          </h2>
          <ol className={styles.liste}>
            {autres.map((autre) => (
              <li key={autre.slug}>
                <RealisationCard realisation={autre} />
              </li>
            ))}
          </ol>
          <p className={styles.retour}>
            <Link href={index.route}>Toutes les réalisations</Link>
          </p>
        </aside>
      ) : null}
    </div>
  )
}
