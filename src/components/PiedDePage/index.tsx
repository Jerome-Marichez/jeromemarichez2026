import { BoutonMouvement } from '@/components/BoutonMouvement';
import { contact } from '@/contenu/contact';
import { navigation } from '@/contenu/navigation';
import styles from './pied-de-page.module.css';

/**
 * Le pied de page porte les coordonnees, parce qu'un recruteur qui a fini de
 * lire ne doit pas remonter chercher comment joindre.
 *
 * Il porte aussi la mise en pause du mouvement (WCAG 2.2.2) et la ligne qui dit
 * comment le site est construit. Cette derniere n'est pas une coquetterie : ce
 * site est la piece a conviction de ce qu'il raconte, donc sa propre fabrication
 * fait partie du propos.
 */
export function PiedDePage() {
  const annee = new Date().getFullYear();

  return (
    <footer className={styles.pied}>
      <div className={`cadre ${styles.grille}`}>
        <section className={styles.bloc}>
          <h2 className={styles.intitule}>Me joindre</h2>
          <ul className={styles.liste}>
            <li>
              <a href={`tel:${contact.telephone.replace(/\s/g, '')}`}>
                {contact.telephone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li className={styles.lieu}>{contact.localisation}</li>
          </ul>
        </section>

        <section className={styles.bloc}>
          <h2 className={styles.intitule}>Ailleurs</h2>
          <ul className={styles.liste}>
            <li>
              <a href={contact.linkedin} rel="me noopener" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contact.github} rel="me noopener" target="_blank">
                GitHub
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.bloc}>
          <h2 className={styles.intitule}>Le site</h2>
          <ul className={styles.liste}>
            {navigation
              .filter((entree) => entree.href !== '/')
              .map((entree) => (
                <li key={entree.href}>
                  <a href={entree.href}>{entree.libelle}</a>
                </li>
              ))}
          </ul>
        </section>

        <section className={styles.bloc}>
          <h2 className={styles.intitule}>Confort de lecture</h2>
          <BoutonMouvement />
          <p className={styles.note}>
            La vapeur du mug est la seule animation continue du site. Elle
            s&apos;arrête aussi toute seule si votre système demande moins de
            mouvement.
          </p>
        </section>
      </div>

      <div className={`cadre ${styles.bas}`}>
        <p>
          Jérôme Marichez, {annee}. Site statique, sans cookie, sans mesure
          d&apos;audience et sans formulaire : rien de vous n&apos;est collecté ici.
        </p>
      </div>
    </footer>
  );
}
