// HomeView/index.tsx — jeromemarichez-fr
// La page d'accueil : la chaîne complète, d'un bout à l'autre.

import { MagneticAction } from '@/@shared/components/MagneticAction'
import { Reveal } from '@/@shared/components/Reveal'
import { SITE_IDENTITY } from '@/@shared/seo/site'
import { BoundaryList } from '../../components/BoundaryList'
import { CertificationList } from '../../components/CertificationList'
import { ChainDiagram } from '../../components/ChainDiagram'
import { EditorialSection } from '../../components/EditorialSection'
import { HomeHero } from '../../components/HomeHero'
import { ProofWall } from '../../components/ProofWall'
import { PAGE_ACCUEIL, THESE_CHAINE } from '../../contenu/accueil'
import { CERTIFICATIONS } from '../../contenu/certifications'
import { LIMITES } from '../../contenu/limites'
import { PREUVES } from '../../contenu/preuves'
import { MAX_GLASS_ACCUEIL, selectGlassSectionIds } from '../../services/glass-policy'
import styles from './home-view.module.css'

/**
 * L'accueil est la seule page qui déroule la chaîne entière : construire, exploiter et
 * mesurer, arbitrer. Les charnières y sont des sections à part entière — ce sont elles
 * qui distinguent une prise en charge continue d'un catalogue de prestations.
 */
export function HomeView() {
  const verre = selectGlassSectionIds(PAGE_ACCUEIL.sections, MAX_GLASS_ACCUEIL)

  return (
    <div className={styles.page}>
      <HomeHero />

      <div className={styles.corps}>
        <section aria-labelledby="chaine-titre" className={styles.bloc} id="chaine">
          <Reveal className={styles.corpsBloc}>
            <p className={styles.kicker}>La thèse</p>
            <h2 id="chaine-titre">{THESE_CHAINE.titre}</h2>
            <p className={styles.chapo}>{THESE_CHAINE.chapo}</p>
            <ChainDiagram />
            <p className={styles.appui}>{THESE_CHAINE.appui}</p>
          </Reveal>
        </section>

        {PAGE_ACCUEIL.sections.map((section) => (
          <EditorialSection glass={verre.has(section.id)} key={section.id} section={section} />
        ))}

        <section aria-labelledby="preuves-titre" className={styles.bloc} id="preuves">
          <Reveal className={styles.corpsBloc}>
            <p className={styles.kicker}>Vérifiable</p>
            <h2 id="preuves-titre">Ce qui est mesuré, pas ce qui est promis</h2>
            <p className={styles.chapo}>
              Chaque chiffre porte son contexte : où, quand, et sur quel produit.
            </p>
            <ProofWall preuves={PREUVES} />
          </Reveal>
        </section>

        <section aria-labelledby="limites-titre" className={styles.bloc} id="limites">
          <Reveal className={styles.corpsBloc}>
            <p className={styles.kicker}>Les limites</p>
            <h2 id="limites-titre">Ce que je ne fais pas</h2>
            <p className={styles.chapo}>
              Un prestataire qui sait tout faire ne sait rien faire. Voici ce que je laisse à
              d'autres, et ce que je fais à la place.
            </p>
            <BoundaryList limites={LIMITES} />
          </Reveal>
        </section>

        <section aria-labelledby="certifications-titre" className={styles.bloc} id="certifications">
          <Reveal className={styles.corpsBloc}>
            <p className={styles.kicker}>Certifications</p>
            <h2 id="certifications-titre">Ce qui a été évalué par quelqu'un d'autre que moi</h2>
            <p className={styles.chapo}>
              Aucun justificatif n'est publié en ligne à ce jour : ils sont communiqués sur demande.
            </p>
            <CertificationList certifications={CERTIFICATIONS} />
          </Reveal>
        </section>

        <section aria-labelledby="contact-titre" className={styles.contact} id="contact">
          <Reveal className={styles.corpsContact}>
            <h2 id="contact-titre">Décrivez-moi votre situation</h2>
            <p className={styles.chapo}>
              Vous écrivez à la personne qui fera le travail. Si ce n'est pas pour moi, je vous le
              dis aussi.
            </p>
            <MagneticAction className={styles.action} href={`mailto:${SITE_IDENTITY.email}`}>
              {SITE_IDENTITY.email}
            </MagneticAction>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
