import type { IProjet } from '../../interfaces/IProjet'

export const choixNextjs: IProjet = {
  titre: "Le choix Next.js, défendu devant des équipes que je n'encadrais pas",
  entreprise: 'Acetelecom',
  sousTitre: "décision d'architecture, débat et adoption",
  contexte:
    "Un site vitrine tenu au quotidien par l'équipe SEO et média, une application métier, et la " +
    'tentation de deux stacks séparées.',
  enjeu:
    'Tenir la cohérence technique sans immobiliser les équipes tierces ni rendre la passation ' +
    'impossible.',
  monRole:
    "Porter le choix en débat, pas en décret. Trois arguments, l'absence de verrouillage " +
    "fournisseur, une stack unique sur tout le périmètre et la reprise du socle par d'autres. Puis " +
    "brancher Strapi pour que l'équipe SEO et média publie sans développeur.",
  resultat:
    'Choix adopté et tenu, autonomie éditoriale rendue aux équipes tierces, décision et conventions ' +
    'écrites.',
}
