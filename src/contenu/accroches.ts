/**
 * Les phrases courtes du site : celles qui tiennent sur une ligne et qui portent
 * un ecran a elles seules.
 *
 * Toutes sont tirees des CV de Jerome MARICHEZ, pas ecrites par dessus. La
 * distinction compte : une accroche inventee serait la premiere chose qu'un
 * recruteur pourrait mettre en defaut en entretien.
 */

export const accroches = {
  /**
   * L'annotation manuscrite de l'accueil, reprise mot pour mot de la fin de son
   * paragraphe de profil. C'est la phrase qui distingue reellement le poste :
   * beaucoup concoivent, peu restent pour exploiter.
   */
  heroAnnotation: 'Je paie moi-même le prix de mes choix d\'architecture.',

  /** Titre de la section qui porte la methode de travail. */
  methode: 'La marque de fabrique',

  /** Titre de la section des quatre axes. */
  axes: 'Quatre axes, une seule pratique',

  /**
   * Phrase qui empeche la lecture « candidat qui ratisse large ». Elle dit
   * pourquoi les quatre axes tiennent ensemble, ce que les CV expliquent par le
   * contexte : des equipes sans QA, sans ops et sans equipe data.
   */
  axesChapo:
    'Ces quatre axes ne sont pas quatre métiers mis côte à côte. Ils tiennent ensemble parce que les équipes où j\'ai travaillé n\'avaient ni QA, ni ops, ni équipe data : ce qui manquait, je l\'ai construit.',

  /** Invitation de fin d'accueil, vers la lecture detaillee. */
  suite: 'La suite en détail',
} as const;
