// email.ts — jeromemarichez2026
// Utilitaire transverse : publier une adresse e-mail sans l'offrir aux moissonneurs.
// Pur, sans état, sans métier — convention `src/utils/` du CLAUDE.md.
//
// ------------------------------------------------------------------------------------
// LE PROBLÈME. Une adresse écrite en clair dans la page est ramassée par des robots à
// spam qui parcourent le web et cherchent, dans le HTML brut, la forme « quelque
// chose@quelque-chose.tld » — dans le texte comme dans les attributs.
//
// LA CONTRAINTE. La contre-mesure ne doit rien coûter à personne : l'adresse doit rester
// lisible par un lecteur d'écran, sélectionnable, copiable et activable au clavier. Cela
// écarte d'emblée les procédés répandus et nuisibles :
//
// - la reconstruction par JavaScript : sans script, il ne reste plus rien de cliquable —
//   et ce site est entièrement prérendu, précisément pour ne dépendre d'aucun script ;
// - l'écriture à l'envers redressée par `direction: rtl` : un lecteur d'écran lit l'ordre
//   du DOM, donc l'adresse à l'envers, et la copie rend une chaîne inversée ;
// - un leurre caché entre les caractères : il se retrouve dans le presse-papier ou dans
//   la restitution vocale selon la façon dont il est masqué ;
// - une image de l'adresse : ni sélectionnable, ni copiable, ni lisible.
//
// LA MÉTHODE RETENUE, en deux couches, sans une ligne de JavaScript :
//
// 1. le `href` est PERCENT-ENCODÉ (`mailto:%6A%65…`). C'est le mécanisme d'échappement
//    standard des URI, que tout navigateur décode avant de passer l'adresse au client de
//    messagerie (RFC 6068). Le lien fonctionne donc normalement, au clic comme au
//    clavier, alors que le HTML brut ne contient plus aucune adresse reconnaissable ;
// 2. le TEXTE VISIBLE est découpé par le rendu en trois éléments voisins (partie locale,
//    arobase, domaine) : aucune sous-chaîne contiguë du HTML brut ne ressemble plus à une
//    adresse. Le texte restitué, lui, est la concaténation des trois — donc l'adresse
//    exacte, dans le bon ordre, sélectionnable et copiable telle quelle.
//
// CE QUE ÇA NE FAIT PAS. Cela arrête les moissonneurs qui appliquent une expression
// régulière au HTML brut, c'est-à-dire les plus nombreux — pas un robot qui rend la page
// et lit le DOM, ni un robot qui décode les séquences `%XX`. L'obfuscation relève la
// barre, elle ne ferme pas la porte, et il serait malhonnête de la présenter autrement.
//
// LIMITE CONNUE ET ASSUMÉE, à porter devant Jérôme MARICHEZ : le graphe JSON-LD injecté
// par le layout racine publie `email` EN CLAIR sur toutes les pages du site
// (`@shared/seo/structured-data.ts`), publication demandée explicitement le 2026-08-08 et
// utile au référencement. Tant qu'elle est maintenue, l'obfuscation de cette page ne
// protège que du moissonnage du corps de page. Les deux décisions sont cohérentes entre
// elles seulement si l'on admet que l'adresse est publique : c'est le cas, elle figure
// sur les trois CV. Voir docs/rgpd.md.
// ------------------------------------------------------------------------------------

/** Séparateur d'une adresse. Isolé : il sert au découpage ET au réassemblage. */
const AROBASE = '@'

/** Les trois morceaux d'une adresse, dans l'ordre où ils doivent être restitués. */
export interface ISegmentsEmail {
  readonly partieLocale: string
  readonly arobase: string
  readonly domaine: string
}

/**
 * Découpe une adresse sur sa DERNIÈRE arobase.
 *
 * La dernière et non la première : une partie locale entre guillemets peut légalement
 * contenir une arobase, jamais un domaine. Découper sur la première produirait un domaine
 * tronqué, donc un lien vers une adresse qui n'existe pas.
 *
 * Lève sur une chaîne qui n'est pas une adresse plutôt que de rendre des morceaux
 * plausibles : le contenu étant résolu au chargement du module, l'erreur survient au
 * BUILD, jamais devant un visiteur.
 */
export function segmenterEmail(email: string): ISegmentsEmail {
  const position = email.lastIndexOf(AROBASE)
  if (position <= 0 || position === email.length - 1) {
    throw new Error(`Adresse e-mail attendue au format « local@domaine », reçu : « ${email} ».`)
  }

  return {
    partieLocale: email.slice(0, position),
    arobase: AROBASE,
    domaine: email.slice(position + 1),
  }
}

/**
 * Encode TOUS les caractères d'un texte en séquences `%XX`, sans exception.
 *
 * `encodeURIComponent` laisse passer les caractères dits « non réservés »
 * (`A-Z a-z 0-9 - _ . ! ~ * ' ( )`) : appliqué seul, il rendrait l'adresse presque
 * intacte, ce qui n'obfusque rien. Ceux-là sont donc encodés à la main — tous sont des
 * caractères ASCII, leur code tient sur un octet. Les autres passent par
 * `encodeURIComponent`, qui produit l'encodage UTF-8 correct des caractères accentués.
 */
function pourcentEncoder(texte: string): string {
  return [...texte]
    .map((caractere) => {
      const encode = encodeURIComponent(caractere)
      if (encode !== caractere) return encode
      return `%${caractere.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')}`
    })
    .join('')
}

/**
 * Construit le `href` d'un lien vers une adresse, sous forme percent-encodée.
 *
 * L'arobase reste littérale : c'est le délimiteur de l'URI `mailto:` lui-même, et
 * l'encoder ferait dépendre le bon acheminement du moment où chaque client de messagerie
 * décode la chaîne. Elle ne trahit rien seule — le HTML brut contient alors
 * `mailto:%6A…%7A@%69%6B%2E%6D%65`, qu'aucune expression régulière d'adresse ne
 * reconnaît : `%` n'appartient pas aux caractères admis dans un nom de domaine.
 *
 * Contrat vérifiable, et vérifié par les tests : `decodeURIComponent(mailtoObfusque(a))`
 * rend exactement `mailto:${a}`. C'est l'opération que fait le navigateur.
 */
export function mailtoObfusque(email: string): string {
  const { partieLocale, domaine } = segmenterEmail(email)
  return `mailto:${pourcentEncoder(partieLocale)}${AROBASE}${pourcentEncoder(domaine)}`
}
