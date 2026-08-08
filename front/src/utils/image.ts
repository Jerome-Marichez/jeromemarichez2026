// image.ts — jeromemarichez2026
// Utilitaire transverse : composer les attributs d'une image responsive à partir de sa
// déclaration typée. Pur, sans état, sans métier — convention `src/utils/` du CLAUDE.md.
//
// POURQUOI CE MODULE EXISTE. Une image responsive répète la même information à quatre
// endroits : le `srcset` de chaque `<source>`, celui du `<img>`, l'attribut `src` de
// repli et les attributs `width`/`height`. Écrits à la main dans le JSX, ces quatre
// endroits divergent — et la divergence la plus coûteuse est silencieuse : des
// dimensions qui ne sont pas celles du fichier servi laissent la page sauter au
// chargement, sans qu'aucun test ni aucun lint ne s'en aperçoive.
//
// Ici, les quatre sont DÉRIVÉS de la même déclaration.
import type { IDeclinaisonImage, IImageIllustration } from '../interfaces/image-illustration'
import type { FormatImage } from '../interfaces/types'

/**
 * Type MIME de chaque format servi.
 *
 * Table explicite et non `image/${format}` : le type de JPEG est `image/jpeg`, pas
 * `image/jpg`. Un `<source type="image/jpg">` serait ignoré par tous les navigateurs, en
 * silence — l'image ne disparaîtrait pas, elle retomberait simplement sur le repli, et
 * personne ne verrait que la déclinaison choisie n'est plus la bonne.
 */
const TYPES_MIME: Readonly<Record<FormatImage, string>> = {
  webp: 'image/webp',
  jpg: 'image/jpeg',
}

/** Type MIME d'un format, tel qu'attendu par l'attribut `type` d'une `<source>`. */
export function typeMime(format: FormatImage): string {
  return TYPES_MIME[format]
}

/** Chemin public d'un fichier : `/images/tasse` + 800 + `webp` → `/images/tasse-800.webp`. */
export function cheminImage(
  image: IImageIllustration,
  format: FormatImage,
  largeur: number,
): string {
  return `${image.base}-${largeur}.${format}`
}

/**
 * Attribut `srcset` d'un format : « chemin 800w, chemin 1200w ».
 *
 * Descripteurs de LARGEUR (`w`) et non de densité (`x`) : couplés à `sizes`, ils laissent
 * le navigateur choisir en connaissant à la fois la densité de l'écran et la largeur
 * d'affichage réelle. Des descripteurs `x` ignoreraient la seconde.
 */
export function jeuDeSources(image: IImageIllustration, format: FormatImage): string {
  return image.declinaisons
    .map(
      (declinaison) => `${cheminImage(image, format, declinaison.largeur)} ${declinaison.largeur}w`,
    )
    .join(', ')
}

/**
 * Le format de repli : le DERNIER déclaré, celui que sert un navigateur qui ne comprend
 * aucune des `<source>` proposées. Le schéma garantit qu'il y en a au moins un.
 */
export function formatDeRepli(image: IImageIllustration): FormatImage {
  const dernier = image.formats.at(-1)
  if (dernier === undefined) {
    throw new Error(`Image « ${image.cle} » : aucun format déclaré, aucun repli possible.`)
  }
  return dernier
}

/**
 * Les formats servis en `<source>`, dans l'ordre de préférence : tous sauf le repli, qui
 * est déjà porté par l'`<img>` lui-même.
 */
export function formatsModernes(image: IImageIllustration): readonly FormatImage[] {
  return image.formats.slice(0, -1)
}

/**
 * La déclinaison qui alimente `src`, `width` et `height` : la PLUS LARGE.
 *
 * C'est elle et non la plus étroite, pour deux raisons. Un navigateur sans `srcset`
 * reçoit alors la version la plus définie, ce qui est le bon repli sur un grand écran ;
 * et les dimensions déclarées sont celles du fichier réellement pointé par `src`, donc le
 * rapport hauteur/largeur réservé avant le chargement est le bon. Le schéma impose
 * l'ordre croissant : la dernière est bien la plus large.
 */
export function declinaisonDeRepli(image: IImageIllustration): IDeclinaisonImage {
  const derniere = image.declinaisons.at(-1)
  if (derniere === undefined) {
    throw new Error(`Image « ${image.cle} » : aucune déclinaison déclarée.`)
  }
  return derniere
}
