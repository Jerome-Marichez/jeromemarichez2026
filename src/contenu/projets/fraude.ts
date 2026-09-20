import type { IProjet } from '../../interfaces/IProjet'

export const fraude: IProjet = {
  titre: 'Fraude contenue sans perdre la conversion',
  entreprise: 'Acetelecom',
  sousTitre: 'Sms En Masse · analyse des données, parcours client et arbitrage',
  contexte:
    "Le canal SMS passait sous la pression du régulateur, avec des amendes de l'ARCOM dans le " +
    'secteur. Des concurrents basculaient leur parcours en traitement entièrement manuel.',
  enjeu:
    'Se protéger sans casser la conversion, alors que le retour au tout manuel était envisagé en ' +
    'interne aussi.',
  monRole:
    "Reprendre l'historique et croiser les variables jusqu'à ce que les schémas se voient. Proposer " +
    'une protection en plusieurs étapes le long du parcours, fraude avérée bloquée automatiquement, ' +
    "la défendre puis mesurer l'effet.",
  resultat:
    "Fraude en baisse et conversion préservée, là où le choix concurrent revenait à renoncer à l'une " +
    'des deux.',
}
