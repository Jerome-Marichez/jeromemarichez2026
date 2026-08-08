// extrait.ts — jeromemarichez2026
// Utilitaire transverse : réduire un texte éditorial à la longueur d'une meta
// description. Pur, sans état, sans métier — convention `src/utils/` du CLAUDE.md.
//
// POURQUOI CE MODULE EXISTE. Les pages d'offre déclarent leur description SEO à partir
// de l'accroche de l'offre, seul texte du contenu typé qui décrive l'offre en une
// phrase. Or `pageSeoSchema` borne une description à 160 caractères — au-delà, les
// moteurs tronquent — et deux des trois accroches dépassent cette borne.
//
// Le choix fait ici est de DÉRIVER plutôt que d'écrire. Rédiger trois descriptions à la
// main aurait produit un quatrième jeu de texte éditorial, non relu contre les règles de
// véracité du CLAUDE.md et libre de diverger de l'accroche qu'il résume. La troncature,
// elle, ne peut affirmer que ce que l'accroche affirme déjà : c'est le même texte, plus
// court. Le jour où `IOffre` portera une description SEO propre, écrite et arbitrée par
// Jérôme MARICHEZ, ce module cessera d'être appelé par les pages d'offre — voir la PR
// de l'issue #22.
//
// Aucun texte éditorial n'est écrit ici : seul le signe de troncature l'est.

/** Marque visible d'une phrase coupée. Un seul caractère, pas trois points. */
const ELLIPSE = '…'

/**
 * Réduit un texte à `longueurMaximale` caractères au plus, sans couper de mot.
 *
 * Rendu inchangé si le texte tient déjà : c'est le cas nominal, et il ne doit rien
 * coûter — l'accroche de l'offre SEA passe ainsi telle quelle, ellipse comprise.
 *
 * Sinon, le texte est coupé à la dernière frontière de mot qui laisse la place à
 * l'ellipse, puis la ponctuation et les espaces de fin sont retirés : une description
 * ne se termine pas sur « et… » précédé d'une virgule orpheline.
 *
 * La coupure se fait sur les mots et jamais sur les phrases. Couper à la phrase aurait
 * paru plus propre, mais aurait rendu la longueur du résultat imprévisible : l'accroche
 * de « Data & IA » se serait réduite à sa première phrase — 73 caractères — en perdant
 * précisément les deux volets qui font la valeur de la page en résultat de recherche.
 * Une règle unique, appliquée aux trois offres, reste préférable à deux comportements
 * dont le déclenchement dépend d'une ponctuation.
 */
export function extraireDescription(texte: string, longueurMaximale: number): string {
  const source = texte.trim()
  if (source.length <= longueurMaximale) return source

  // On garde la place de l'ellipse dans le budget : le résultat doit tenir la borne,
  // signe de troncature compris.
  const coupe = source.slice(0, longueurMaximale - ELLIPSE.length)
  const derniereEspace = coupe.lastIndexOf(' ')
  const mots = derniereEspace > 0 ? coupe.slice(0, derniereEspace) : coupe

  // Retire la ponctuation faible et les espaces laissés en bout de coupe.
  return `${mots.replace(/[\s,;:—–-]+$/u, '')}${ELLIPSE}`
}
