/**
 * Le contenu porte les profils sous leur forme lisible (« github.com/… »), parce
 * que c'est cette forme qui s'affiche a l'ecran. Un `href` exige autre chose :
 * sans schema, le navigateur lirait « github.com/... » comme un chemin relatif et
 * fabriquerait une adresse interne qui n'existe pas.
 *
 * L'encodage n'est pas optionnel non plus : l'adresse LinkedIn de Jerome contient
 * un « é », illegal dans une URL brute.
 */
export function versUrl(domaine: string): string {
  const nettoye = domaine.replace(/^https?:\/\//, '')
  return encodeURI(`https://${nettoye}`)
}

/**
 * Un numero de telephone s'affiche avec ses espaces et se compose sans.
 * Le prefixe international rend le lien utilisable depuis l'etranger, ce qui
 * n'est pas anecdotique pour un recruteur d'un groupe international.
 */
export function versTel(numero: string): string {
  const chiffres = numero.replace(/\s/g, '')
  return chiffres.startsWith('0') ? `tel:+33${chiffres.slice(1)}` : `tel:${chiffres}`
}
