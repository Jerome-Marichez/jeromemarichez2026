// image-illustration.ts — jeromemarichez2026
// Entité éditoriale : une image d'illustration et tout ce qu'il faut pour la servir.
//
// Le texte alternatif est du CONTENU, pas du JSX : il se relit comme le reste du corpus
// éditorial, et un rendu ne peut pas l'écrire à la main (docs/architecture.md — « le
// contenu éditorial est de la donnée »). Les déclinaisons et les formats sont ici pour
// la même raison qu'ailleurs dans ce projet : une largeur écrite dans un `srcset` et une
// autre écrite dans un attribut `width` finiraient par diverger.
import type { FormatImage } from './types'

/** Un fichier réellement présent dans `front/public/`, avec ses dimensions natives. */
export interface IDeclinaisonImage {
  /** Largeur native en pixels. Sert de descripteur `w` dans le `srcset`. */
  readonly largeur: number
  /** Hauteur native en pixels. */
  readonly hauteur: number
}

/**
 * Une image d'illustration.
 *
 * `placeholder` n'est pas décoratif : il marque une image qui ne représente pas encore
 * ce qu'elle devra représenter. Le porter dans la DONNÉE plutôt que dans un commentaire
 * rend la situation vérifiable par un test — un commentaire, lui, disparaît sans que
 * rien ne s'en aperçoive, et l'image provisoire part en production.
 */
export interface IImageIllustration {
  readonly cle: string
  /**
   * Texte alternatif. DÉCRIT l'image pour qui ne la voit pas — jamais un intitulé creux
   * (« illustration », « photo »), qui coûte un temps de restitution sans rien apprendre.
   */
  readonly alt: string
  /**
   * Racine du chemin public, sans suffixe de largeur ni extension : `/images/tasse`.
   * Chaque fichier servi vaut `<base>-<largeur>.<format>`.
   */
  readonly base: string
  /**
   * Formats servis, du plus efficace au plus compatible. Le DERNIER est le repli : c'est
   * lui qui alimente l'attribut `src`, celui que sert un navigateur qui ne comprend
   * aucune des `<source>` proposées.
   */
  readonly formats: readonly FormatImage[]
  /** Déclinaisons disponibles, de la plus étroite à la plus large. */
  readonly declinaisons: readonly IDeclinaisonImage[]
  /**
   * Attribut `sizes` : la largeur d'AFFICHAGE de l'image selon le viewport. Sans lui, le
   * navigateur suppose `100vw` et télécharge systématiquement la plus grande déclinaison.
   */
  readonly tailles: string
  /** Vrai tant que l'image doit être remplacée par un visuel définitif. */
  readonly placeholder: boolean
  /** Licence d'usage, telle que l'annonce la source. */
  readonly licence: string
  /** Provenance exacte : d'où vient le fichier, et quand il a été récupéré. */
  readonly provenance: string
}
