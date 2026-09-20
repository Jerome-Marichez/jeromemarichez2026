import { Annotation } from '@/components/Annotation';
import { AxeListe } from '@/components/AxeListe';
import { Bouton } from '@/components/Bouton';
import { Mug } from '@/components/Mug';
import { TitreMachine } from '@/components/TitreMachine';
import { TitreSection } from '@/components/TitreSection';
import { accroches } from '@/contenu/accroches';
import { axes } from '@/contenu/axes';
import { profil } from '@/contenu/profil';
import styles from './accueil-view.module.css';

/**
 * L'accueil. Il a trente secondes pour empecher une elimination, puis il doit
 * donner envie de descendre.
 *
 * Le premier ecran ne contient donc rien d'ornemental : le nom, ce que je fais,
 * ou, depuis combien de temps, et les deux actions qu'un recruteur veut. Le mug
 * est la seule chose vivante, et c'est voulu : il situe la scene sans rien dire.
 */
export function AccueilView() {
  return (
    <>
      <section className={`cadre ${styles.hero}`}>
        <div className={styles.propos}>
          <TitreMachine texte="< Jérôme Marichez />" />

          <p className={styles.metier}>{profil.titre}</p>

          <p className={styles.reperes}>
            <span>{profil.anneesExperience} ans d&apos;expérience</span>
            <span className={styles.separateur} aria-hidden="true">
              ·
            </span>
            <span>{profil.localisation}</span>
          </p>

          <div className={styles.actions}>
            <Bouton
              href="/cv-jerome-marichez.pdf"
              ton="primaire"
              telechargement="cv-jerome-marichez.pdf"
            >
              Télécharger le CV
            </Bouton>
            <Bouton href="/parcours/">Voir le parcours</Bouton>
          </div>

          <div className={styles.note}>
            <Annotation>{accroches.heroAnnotation}</Annotation>
          </div>
        </div>

        <div className={styles.tasse}>
          <Mug />
        </div>
      </section>

      <section className={`cadre ${styles.bloc}`}>
        <TitreSection id="methode">{accroches.methode}</TitreSection>
        <p className={styles.paragraphe}>{profil.differenciationIaAugmentee}</p>
      </section>

      <section className={`cadre ${styles.bloc}`}>
        <TitreSection id="axes">{accroches.axes}</TitreSection>
        <p className={styles.paragraphe}>{accroches.axesChapo}</p>
        <div className={styles.axes}>
          <AxeListe axes={axes} />
        </div>
      </section>

      <section className={`cadre ${styles.bloc}`}>
        <TitreSection>{accroches.suite}</TitreSection>
        <div className={styles.actions}>
          <Bouton href="/projets/" ton="primaire">
            Les projets en détail
          </Bouton>
          <Bouton href="/competences/">Les compétences</Bouton>
          <Bouton href="/contact/">Me joindre</Bouton>
        </div>
      </section>
    </>
  );
}
