'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/contenu/navigation';
import styles from './en-tete.module.css';

/**
 * L'en-tete est une barre d'onglets d'editeur, pas un menu de site.
 *
 * C'est la consequence directe du monde retenu : sur un poste de travail, on ne
 * navigue pas dans un menu, on change de fichier ouvert. Chaque route porte donc
 * un nom de fichier, et l'onglet actif est marque comme dans un editeur, par un
 * filet en haut et un fond releve.
 *
 * Sur mobile la barre defile lateralement, exactement comme une vraie barre
 * d'onglets. C'est ce qui evite un menu hamburger : il n'y a rien a replier,
 * la metaphore gere elle-meme le debordement.
 */
export function EnTete() {
  const chemin = usePathname();

  return (
    <header className={styles.entete}>
      <div className={styles.barre}>
        <Link href="/" className={styles.marque} aria-label="Jérôme Marichez, accueil">
          <span className={styles.chevron}>&lt;</span>
          <span className={styles.initiales}>JM</span>
          <span className={styles.chevron}>/&gt;</span>
        </Link>

        <nav aria-label="Navigation principale">
          <ul className={styles.onglets}>
            {navigation.map((entree) => {
              const actif = chemin === entree.href;

              return (
                <li key={entree.href}>
                  <Link
                    href={entree.href}
                    className={styles.onglet}
                    data-actif={actif || undefined}
                    aria-current={actif ? 'page' : undefined}
                  >
                    <span className={styles.libelle}>{entree.libelle}</span>
                    <span className={styles.fichier} aria-hidden="true">
                      {entree.onglet}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
