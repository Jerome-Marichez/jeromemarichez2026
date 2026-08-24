// HomeView/index.tsx — jeromemarichez-fr
// La page d'accueil : la vitrine — la promesse, le modèle, les quatre portes, les preuves.

import { Reveal } from '@/@shared/components/Reveal'
import { SITE_IDENTITY } from '@/@shared/seo/site'
import { ContactForm } from '../../components/_notPure/ContactForm'
import { BoundaryList } from '../../components/BoundaryList'
import { CertificationList } from '../../components/CertificationList'
import { ChainDiagram } from '../../components/ChainDiagram'
import { EditorialSection } from '../../components/EditorialSection'
import { HomeHero } from '../../components/HomeHero'
import { PoleEntries } from '../../components/PoleEntries'
import { ProofWall } from '../../components/ProofWall'
import { SpaceEntries } from '../../components/SpaceEntries'
import { PAGE_ACCUEIL, THESE_CHAINE } from '../../contenu/accueil'
import { CERTIFICATIONS } from '../../contenu/certifications'
import { CONTACT_DIRECT } from '../../contenu/contact'
import { LIMITES } from '../../contenu/limites'
import { PREUVES } from '../../contenu/preuves'
import { MAX_GLASS_ACCUEIL, selectGlassSectionIds } from '../../services/glass-policy'
import styles from './home-view.module.css'

/**
 * L'accueil **montre** la chaîne, il ne la déroule plus (issue #103).
 *
 * Il la déroulait : trois pôles racontés en court, deux charnières, seize sections et
 * douze mille pixels — dont deux sections identiques, à l'identifiant près, à celles des
 * pages de pôle. Un visiteur devait traverser huit écrans de prestation avant d'atteindre
 * la première preuve, et les pages qui vendent chaque pôle arrivaient en second sur leur
 * propre sujet.
 *
 * Ce qu'il fait maintenant, dans cet ordre : dire la promesse (le seuil), montrer le
 * modèle (la thèse et le schéma), ouvrir les quatre portes, traiter les deux objections,
 * puis prouver — preuves chiffrées, limites assumées, certifications — et donner où
 * regarder et comment écrire. Le détail de chaque pôle vit sur `/services/<pole>/`, où il
 * était déjà dit en plus long.
 *
 * Une seule section éditoriale est encore rendue depuis `PAGE_ACCUEIL.sections` : les
 * deux objections. Elle ne relève d'aucun pôle — elle porte sur la façon de travailler —
 * et sa seconde moitié est tenue par les règles de véracité du `CLAUDE.md`.
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

        {/* Les portes, juste après la thèse : le visiteur vient de lire ce qu'est la
            chaîne, c'est le moment où il veut y entrer. Ce sont elles qui portent le
            report des sections descendues (issue #103) — chacune donne la promesse du
            pôle, une preuve, et mène à sa page. */}
        <section aria-labelledby="poles-titre" className={styles.bloc} id="poles">
          <Reveal className={styles.corpsBloc}>
            <p className={styles.kicker}>Les quatre pôles</p>
            <h2 id="poles-titre">Par où vous entrez</h2>
            <PoleEntries />
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

        <section aria-labelledby="espaces-titre" className={styles.bloc} id="espaces">
          <Reveal className={styles.corpsBloc}>
            <p className={styles.kicker}>Pour aller voir</p>
            <h2 id="espaces-titre">Le travail, et les arbitrages</h2>
            <SpaceEntries />
          </Reveal>
        </section>

        <section aria-labelledby="contact-titre" className={styles.contact} id="contact">
          <Reveal className={styles.corpsContact}>
            <h2 id="contact-titre">Décrivez-moi votre situation</h2>
            <p className={styles.chapo}>
              Vous écrivez à la personne qui fera le travail. Si ce n'est pas pour moi, je vous le
              dis aussi.
            </p>
            {/* Le formulaire et l'adresse en clair sont côte à côte, et c'est une
                obligation, pas une mise en page : le formulaire a besoin d'un client mail
                installé sur le poste, ce qui n'est le cas ni en entreprise ni sur un
                navigateur qui n'a que du webmail. Sans l'adresse à côté, ce visiteur-là
                repartirait avec un bouton qui ne fait rien. */}
            <div className={styles.grilleContact}>
              <ContactForm destinataire={SITE_IDENTITY.email} titreId="contact-titre" />

              <div className={styles.direct}>
                <h3 className={styles.directTitre}>{CONTACT_DIRECT.titre}</h3>
                <p className={styles.directTexte}>{CONTACT_DIRECT.texte}</p>
                <a className={styles.action} href={`mailto:${SITE_IDENTITY.email}`}>
                  {SITE_IDENTITY.email}
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
