import type { IMarque } from '../interfaces/IMarque'
import type { IdMarque } from '../interfaces/types'

/**
 * Catalogue des marques citées dans les fiches projet : l'entreprise Acetelecom
 * et deux de ses produits (Sms En Masse, Prézage), plus les deux clients dont
 * Jérôme MARICHEZ portait seul le périmètre digital (Verhoeven Joaillier,
 * Truffle Capital). Chaque logo et chaque URL sont vérifiés, jamais approximés :
 * voir `public/marques/LISEZMOI.md` pour la provenance des fichiers et l'issue
 * #172 pour la vérification HTTP 200 du 2026-09-21.
 */
/**
 * Gabarit commun aux cinq logos : 240 x 120, soit un rapport de 2:1.
 *
 * Les fichiers d'origine allaient de 1:1 (Truffle) a 3.67:1 (Verhoeven), et
 * `object-fit: contain` les laissait donc occuper des surfaces tres inegales
 * dans la meme boite. Chaque fichier est desormais detoure de son vide puis
 * pose au centre de ce gabarit, si bien que les cinq declarent les memes
 * dimensions et occupent le meme emplacement.
 *
 * Le 2:1 n'est pas un choix de gout : les surfaces rendues ont ete calculees
 * pour cinq gabarits candidats, et c'est lui qui donne l'ecart le plus faible
 * entre le logo le plus present et le moins present (x1.82, contre x2.02 en
 * 1.8:1, x2.41 en 2.5:1 et x2.59 en 3:1).
 */
const GABARIT = { largeur: 240, hauteur: 120 } as const

export const marques: Record<IdMarque, IMarque> = {
  acetelecom: {
    nom: 'Acetelecom',
    url: 'https://www.acetelecom.fr/',
    logo: { fichier: '/marques/acetelecom.png', ...GABARIT },
  },
  smsEnMasse: {
    nom: 'Sms En Masse',
    url: 'https://www.smsenmasse.fr/',
    logo: { fichier: '/marques/sms-en-masse.svg', ...GABARIT },
  },
  prezage: {
    nom: 'Prézage',
    url: 'https://play.google.com/store/apps/details?id=fr.acetelecom.monavenir&hl=fr',
    logo: { fichier: '/marques/prezage.png', ...GABARIT },
  },
  verhoeven: {
    nom: 'Verhoeven Joaillier',
    url: 'https://www.verhoeven-joaillier.com/',
    logo: { fichier: '/marques/verhoeven-joaillier.svg', ...GABARIT },
  },
  truffle: {
    nom: 'Truffle Capital',
    url: 'https://www.truffle.com/',
    logo: { fichier: '/marques/truffle-capital.png', ...GABARIT },
  },
}
