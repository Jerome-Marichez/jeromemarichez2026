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
export const marques: Record<IdMarque, IMarque> = {
  acetelecom: {
    nom: 'Acetelecom',
    url: 'https://www.acetelecom.fr/',
    logo: { fichier: '/marques/acetelecom.png', largeur: 190, hauteur: 71 },
  },
  smsEnMasse: {
    nom: 'Sms En Masse',
    url: 'https://www.smsenmasse.fr/',
    logo: { fichier: '/marques/sms-en-masse.svg', largeur: 100, hauteur: 55 },
  },
  prezage: {
    nom: 'Prézage',
    url: 'https://play.google.com/store/apps/details?id=fr.acetelecom.monavenir&hl=fr',
    logo: { fichier: '/marques/prezage.png', largeur: 192, hauteur: 192 },
  },
  verhoeven: {
    nom: 'Verhoeven Joaillier',
    url: 'https://www.verhoeven-joaillier.com/',
    logo: { fichier: '/marques/verhoeven-joaillier.svg', largeur: 1156, hauteur: 315 },
  },
  truffle: {
    nom: 'Truffle Capital',
    url: 'https://www.truffle.com/',
    logo: { fichier: '/marques/truffle-capital.svg', largeur: 220, hauteur: 220 },
  },
}
