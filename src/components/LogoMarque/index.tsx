import type { IMarque } from '@/interfaces/IMarque'
import styles from './logo-marque.module.css'

interface ILogoMarqueProps {
  readonly marque: IMarque
}

/**
 * Le logo d'une marque, à côté du titre de la fiche, sur fond transparent :
 * aucune pastille, le site n'habille pas ses logos d'un cadre (`docs/design.md`).
 * Pas de `next/image` : le site est en export statique avec
 * `images.unoptimized: true` (`next.config.ts`), donc l'optimiseur n'a rien à
 * faire ici, et une balise `<img>` classique avec `width`/`height` explicites
 * évite tout décalage de mise en page sans dépendance superflue.
 *
 * Un fond transparent exige que le fichier lui-même se lise sur `--fond` :
 * voir `public/marques/LISEZMOI.md` pour le traitement appliqué à chacun des
 * cinq logos avant leur dépôt ici.
 */
export function LogoMarque({ marque }: ILogoMarqueProps) {
  return (
    <a
      className={styles.lien}
      href={marque.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Voir le site de ${marque.nom}`}
    >
      {/* biome-ignore lint/performance/noImgElement: next/image est inutilisable ici,
          voir le commentaire de fonction ci-dessus (export statique, images non optimisées). */}
      <img
        className={styles.logo}
        src={marque.logo.fichier}
        alt={`Logo de ${marque.nom}`}
        width={marque.logo.largeur}
        height={marque.logo.hauteur}
        loading="lazy"
        decoding="async"
      />
    </a>
  )
}
