import { contact } from '@/contenu/contact'
import { versTel, versUrl } from '@/utils/lien'
import styles from './contact-view.module.css'

/**
 * La page Contact : pas de formulaire, des coordonnees directement cliquables.
 *
 * C'est la page ou le recruteur agit, pas une page de lecture : le telephone et
 * l'email sont donc les deux actions principales, en grand, avant les liens
 * secondaires. Le pied de page porte deja ces coordonnees en petit ; ici elles
 * sont la seule chose sur l'ecran.
 */
export function ContactView() {
  return (
    <section className={`cadre ${styles.bloc}`}>
      <h1 className={styles.titre}>Me joindre</h1>

      <div className={styles.principales}>
        <a className={styles.action} href={versTel(contact.telephone)}>
          <span className={styles.intitule}>Téléphone</span>
          <span className={styles.donnee}>{contact.telephone}</span>
        </a>
        <a className={styles.action} href={`mailto:${contact.email}`}>
          <span className={styles.intitule}>Email</span>
          <span className={styles.donnee}>{contact.email}</span>
        </a>
      </div>

      <dl className={styles.secondaires}>
        <div className={styles.ligne}>
          <dt className={styles.intituleSecondaire}>LinkedIn</dt>
          <dd>
            <a href={versUrl(contact.linkedin)} rel="me noopener" target="_blank">
              {contact.linkedin}
            </a>
          </dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.intituleSecondaire}>GitHub</dt>
          <dd>
            <a href={versUrl(contact.github)} rel="me noopener" target="_blank">
              {contact.github}
            </a>
          </dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.intituleSecondaire}>Localisation</dt>
          <dd>{contact.localisation}</dd>
        </div>
      </dl>
    </section>
  )
}
