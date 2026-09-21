import type { IProjet } from '../../interfaces/IProjet'

export const smsEnMasseDemarcheQa: IProjet = {
  titre: 'Démarche QA construite de zéro',
  entreprise: 'Acetelecom',
  marque: 'smsEnMasse',
  sousTitre: 'Sms En Masse · stratégie de test, automatisation et intégration continue',
  contexte:
    'Équipe de trois sans QA, quatre produits en parallèle, et des grands comptes qui auditaient ce ' +
    "qu'ils achetaient.",
  enjeu:
    "Prouver la qualité plutôt que l'affirmer, avec des éléments opposables en appel d'offres.",
  monRole:
    'Analyse de risques, plans de test par domaine fonctionnel, non-régression automatisée sur trois ' +
    'niveaux, unitaire et intégration à chaque poussée, bout en bout à chaque demande de fusion, ' +
    'campagne complète et bloquante avant production. Tests de mutation pour vérifier ce que la ' +
    'couverture détecte vraiment.',
  resultat: 'Régressions arrêtées avant la production plutôt que découvertes par le client.',
}
