/**
 * Les descriptions de referencement, rassemblees ici plutot que dispersees dans
 * les pages : ce sont des textes lus (par un moteur, puis par un humain dans une
 * page de resultats), donc ils relevent du contenu et pas du routage.
 *
 * Chacune tient sous 160 caracteres, longueur au dela de laquelle Google tronque.
 * Aucune ne promet ce que les CV n'etablissent pas.
 */

export const descriptions = {
  accueil:
    "Ingénieur Full Stack, IA, QA et Data-Driven à Lille. Dix ans en petite équipe : je conçois, je livre, je recette puis j'exploite.",
  aPropos:
    "Mon parcours en dix ans : ingénieur logiciel et chef de projet, la qualité définie là où il n'y en avait pas, le test avant le code.",
  parcours:
    "Trois expériences : Acetelecom, Verhoeven Joaillier et Truffle Capital en indépendant. Ce que j'ai construit, livré puis exploité.",
  projets:
    "Projets détaillés : plateforme SaaS livrée de zéro, migrations sans coupure, fraude contenue, mesure remise d'aplomb. Contexte, rôle, résultat.",
  competences:
    'Front, back, qualité et tests, IA augmentée, data, cloud et exploitation, gestion de projet. La stack réellement pratiquée, sans remplissage.',
  blog: 'Notes courtes sur des décisions techniques réelles : ce qui a été tranché, sur quel critère, et ce que ça a coûté. Ni veille, ni tutoriel.',
  contact:
    'Me joindre directement : téléphone, email, LinkedIn et GitHub. Un seul interlocuteur, aucune couche intermédiaire.',
} as const

export type CleDescription = keyof typeof descriptions
