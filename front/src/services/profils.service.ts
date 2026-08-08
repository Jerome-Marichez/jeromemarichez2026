// profils.service.ts — jeromemarichez2026
// Logique métier : rapprocher une référence de profil de l'URL vérifiée qui le porte.
// Aucune logique de rendu ici (docs/architecture.md — services/ vs hooks).
import type { IProfilResolu, IReferenceProfil } from '../interfaces/profil-public'

/**
 * Hôte d'une URL, ou `null` si la chaîne n'est pas une URL absolue.
 *
 * `identite.profilsPublics` est validé en `z.url()`, donc ce cas ne devrait pas
 * survenir — mais rendre `null` plutôt que de laisser remonter l'exception permet à
 * `resoudreReference` de produire un message d'erreur qui nomme la référence fautive.
 */
function hoteDe(url: string): string | null {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}

/**
 * Libellé affiché : l'URL sans son protocole, et sans barre oblique finale.
 *
 * Ni les paramètres ni le fragment ne sont conservés : un profil public n'en a pas, et
 * en afficher rendrait le lien illisible sans rien apprendre.
 */
function libelleDe(url: string): string {
  const analysee = new URL(url)
  const chemin = analysee.pathname === '/' ? '' : analysee.pathname.replace(/\/$/, '')
  return `${analysee.host}${chemin}`
}

/**
 * Résout une référence de profil contre les URL publiques vérifiées de l'identité.
 *
 * Échoue bruyamment plutôt que de masquer un lien : une référence qui ne désigne aucun
 * profil est une erreur d'édition, pas un cas nominal. Le contenu étant résolu au rendu
 * serveur, donc au BUILD, l'erreur survient à la compilation — jamais devant un visiteur
 * sous la forme d'une coordonnée manquante que personne ne remarquerait.
 *
 * Une référence qui en désigne DEUX échoue aussi : le jour où un second compte du même
 * réseau entrerait dans l'identité, choisir silencieusement le premier publierait une
 * coordonnée au hasard.
 */
function resoudreReference(
  reference: IReferenceProfil,
  urlsPubliques: readonly string[],
): IProfilResolu {
  const correspondances = urlsPubliques.filter((url) => hoteDe(url) === reference.hote)

  if (correspondances.length === 0) {
    throw new Error(
      `Profil « ${reference.cle} » : aucune URL publique sur l’hôte « ${reference.hote} ». Une URL de profil ne s’écrit que dans identite.profilsPublics.`,
    )
  }
  if (correspondances.length > 1) {
    throw new Error(
      `Profil « ${reference.cle} » : ${correspondances.length} URL publiques sur l’hôte « ${reference.hote} ». Laquelle publier n’est pas au rendu de le décider.`,
    )
  }

  const url = correspondances[0] as string
  return { cle: reference.cle, nom: reference.nom, url, libelle: libelleDe(url) }
}

/**
 * Résout les références dans leur ordre de déclaration : l'ordre d'affichage est un choix
 * éditorial porté par le contenu, pas par le rendu.
 */
export function resoudreProfils(
  references: readonly IReferenceProfil[],
  urlsPubliques: readonly string[],
): readonly IProfilResolu[] {
  return references.map((reference) => resoudreReference(reference, urlsPubliques))
}
