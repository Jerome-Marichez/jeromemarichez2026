import styles from './lien-evitement.module.css';

/**
 * Premier element focusable de la page. Invisible jusqu'au focus clavier, il
 * evite de retraverser l'en-tete a chaque changement de page.
 */
export function LienEvitement() {
  return (
    <a className={styles.lien} href="#contenu">
      Aller au contenu
    </a>
  );
}
