import type { IProjet } from '../../interfaces/IProjet'

export const prezage: IProjet = {
  titre: 'Prézage, socle mobile migré sans coupure',
  entreprise: 'Acetelecom',
  marque: 'prezage',
  sousTitre: 'Prézage · ingénieur fullstack, plus de 200 000 installations',
  contexte:
    'Application grand public utilisée au quotidien, près de 1 000 avis. Socle Ionic 6 et Angular 15 ' +
    "figé, dépendances en fin de support, magasins d'applications qui commençaient à refuser les " +
    'builds.',
  enjeu:
    'Changer de socle sous les pieds des utilisateurs sans interrompre le service ni geler la feuille ' +
    'de route commerciale.',
  monRole:
    'Plan de migration par paliers et reprise du code hérité. Plan de test manuel rédigé de zéro, cas ' +
    "numérotés par parcours et matrice d'appareils et de versions d'OS, campagne rejouée à " +
    "l'identique à chaque palier.",
  resultat:
    "Migration Ionic 6 vers 8 et Angular 15 vers 19 menée sans interruption, chiffre d'affaires " +
    "maintenu, note et parc d'installation préservés.",
}
