/**
 * Une marque tierce citée dans un projet (l'entreprise ou l'un de ses produits) :
 * son nom, l'URL de son site vérifiée en HTTP 200, et son logo servi depuis
 * `public/marques/` avec ses dimensions intrinsèques (voir
 * `public/marques/LISEZMOI.md` pour la provenance de chaque fichier).
 */
export interface IMarque {
  nom: string
  url: string
  logo: {
    fichier: string
    largeur: number
    hauteur: number
  }
}
