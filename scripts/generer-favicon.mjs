// generer-favicon.mjs — jeromemarichez-fr
//
// Fabrique `src/app/favicon.ico` à partir de la même marque que `src/app/icon.svg`.
//
// Pourquoi un script et pas une convention Next : `favicon.ico` est le seul fichier
// d'icône que Next ne sait pas générer au build, il doit exister sur disque. Le binaire
// est donc commité — mais il reste reproductible, ce qui évite un fichier opaque dont
// plus personne ne saurait redessiner la source.
//
//   node scripts/generer-favicon.mjs      (ou : make favicon)
//
// À rejouer si la marque change dans `icon.svg`.

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
// `next/og.js` et non `next/og` : le paquet n'expose pas de carte `exports`, donc la
// résolution ESM de Node réclame l'extension.
import { ImageResponse } from 'next/og.js'

const CUIVRE = '#8f4520'
const PAPIER = '#f2efe8'
const TAILLE = 32

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const cible = join(racine, 'src', 'app', 'favicon.ico')

/** Le monogramme, décrit sans JSX pour que le script tourne sous Node sans build. */
const marque = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: CUIVRE,
      color: PAPIER,
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: -1,
    },
    children: 'JM',
  },
}

/**
 * Enveloppe un PNG dans un conteneur ICO à une seule image.
 *
 * Le format autorise une charge PNG depuis Windows Vista, et tous les navigateurs
 * actuels la lisent : inutile de produire le BMP historique.
 */
function encapsulerEnIco(png, taille) {
  const entete = Buffer.alloc(6)
  entete.writeUInt16LE(0, 0) // réservé
  entete.writeUInt16LE(1, 2) // type : icône
  entete.writeUInt16LE(1, 4) // une seule image

  const entree = Buffer.alloc(16)
  entree.writeUInt8(taille === 256 ? 0 : taille, 0) // largeur (0 signifie 256)
  entree.writeUInt8(taille === 256 ? 0 : taille, 1) // hauteur
  entree.writeUInt8(0, 2) // palette : aucune
  entree.writeUInt8(0, 3) // réservé
  entree.writeUInt16LE(1, 4) // plans
  entree.writeUInt16LE(32, 6) // bits par pixel
  entree.writeUInt32LE(png.length, 8)
  entree.writeUInt32LE(entete.length + entree.length, 12)

  return Buffer.concat([entete, entree, png])
}

const rendu = new ImageResponse(marque, { width: TAILLE, height: TAILLE })
const png = Buffer.from(await rendu.arrayBuffer())
writeFileSync(cible, encapsulerEnIco(png, TAILLE))
console.log(`favicon.ico écrit (${TAILLE}×${TAILLE}, ${png.length} octets de PNG) : ${cible}`)
