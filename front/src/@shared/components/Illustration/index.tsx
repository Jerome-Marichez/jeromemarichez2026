import type { IImageIllustration } from '@/interfaces/image-illustration'
import {
  cheminImage,
  declinaisonDeRepli,
  formatDeRepli,
  formatsModernes,
  jeuDeSources,
  typeMime,
} from '@/utils/image'
import styles from './illustration.module.css'

/** `eager` pour une image visible sans défilement — elle porte souvent le LCP. */
export type ChargementImage = 'eager' | 'lazy'

interface IIllustrationProps {
  image: IImageIllustration
  chargement?: ChargementImage
  className?: string
}

/**
 * Image d'illustration servie en formats modernes, tailles responsives et dimensions
 * déclarées. Tout vient de la donnée typée : le composant ne connaît aucun fichier.
 *
 * TROIS PROPRIÉTÉS TENUES ICI, et chacune répond à un défaut précis :
 *
 * 1. **Dimensions déclarées.** `width` et `height` portent les dimensions NATIVES du
 *    fichier pointé par `src`. Le navigateur en déduit le rapport hauteur/largeur et
 *    réserve la place AVANT le chargement : le texte sous l'image ne se fait pas
 *    repousser quand elle arrive. Sans elles, la page saute — c'est la moitié d'un mauvais
 *    score de décalage cumulé (CLS), et le site est censé démontrer l'inverse.
 * 2. **Formats modernes avec repli.** Chaque format sauf le dernier devient une
 *    `<source>` ; le dernier alimente l'`<img>`. Un navigateur qui ne lit pas WebP
 *    descend jusqu'au JPEG sans que rien ne soit détecté côté serveur.
 * 3. **Tailles responsives.** `sizes` dit la largeur d'AFFICHAGE, `srcset` les largeurs
 *    DISPONIBLES. Sans `sizes`, le navigateur suppose `100vw` et télécharge la plus
 *    grande déclinaison même sur un téléphone.
 *
 * `<picture>` plutôt que `next/image` : le site est entièrement prérendu et servi en
 * `output: standalone`. `next/image` ajouterait un optimiseur d'images à l'exécution pour
 * un gain nul sur des fichiers déjà déclinés à la main, et rendrait le rendu dépendant
 * d'un service là où trois balises HTML suffisent (docs/design.md — « le HTML d'abord »).
 */
export function Illustration({ image, chargement = 'lazy', className }: IIllustrationProps) {
  const repli = declinaisonDeRepli(image)
  const format = formatDeRepli(image)
  const classNames = [styles.picture, className].filter(Boolean).join(' ')

  return (
    <picture className={classNames}>
      {formatsModernes(image).map((moderne) => (
        <source
          key={moderne}
          sizes={image.tailles}
          srcSet={jeuDeSources(image, moderne)}
          type={typeMime(moderne)}
        />
      ))}
      <img
        alt={image.alt}
        className={styles.image}
        // Le décodage ne bloque pas le rendu du reste de la page.
        decoding="async"
        // Dimensions natives du fichier servi en `src` : elles réservent la place.
        height={repli.hauteur}
        loading={chargement}
        sizes={image.tailles}
        src={cheminImage(image, format, repli.largeur)}
        srcSet={jeuDeSources(image, format)}
        width={repli.largeur}
      />
    </picture>
  )
}
