import type { IProjet } from '../../interfaces/IProjet'

export const smsEnMasseIaAugmentee: IProjet = {
  titre: 'Le développement en IA augmentée piloté par les tests',
  entreprise: 'Acetelecom',
  marque: 'acetelecom',
  sousTitre: "méthode de travail construite puis transmise à l'équipe",
  contexte:
    "Une équipe de trois pour quatre produits. La génération de code a changé la vitesse d'écriture, " +
    "pas la confiance qu'on peut accorder au résultat.",
  enjeu:
    "Gagner en vélocité sans transformer le gain en dette ni en régressions. Le risque d'un code " +
    "généré n'est pas qu'il ne compile pas, c'est qu'il paraisse juste.",
  monRole:
    "Écrire les critères d'acceptation d'abord, faire produire l'implémentation ensuite, laisser les " +
    'tests et les tests de mutation trancher. Outiller la démarche par des agents, des hooks, des ' +
    'skills et des serveurs MCP internes, puis la transmettre aux alternants.',
  resultat:
    'Vélocité augmentée à effectif constant, avec la non-régression comme filet. Une méthode écrite ' +
    'et reprise, pas une pratique personnelle.',
}
