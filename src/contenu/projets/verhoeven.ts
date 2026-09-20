import type { IProjet } from '../../interfaces/IProjet'

export const verhoeven: IProjet = {
  titre: 'Verhoeven, flux boutique et e-commerce fiabilisés, puis socle remplacé',
  entreprise: 'Verhoeven Joaillier',
  sousTitre: 'intégration SI, refonte et recette, en poste unique',
  contexte:
    'Une maison de joaillerie qui vend les mêmes pièces en boutique et en ligne, souvent en un seul ' +
    "exemplaire. Le stock vivait dans l'ERP M3 Soft, le site marchand dans un socle PHP 5 en fin de " +
    'vie, et les deux ne se parlaient pas. Seul sur le périmètre digital.',
  enjeu:
    'Une survente sur une pièce unique se solde par un client à rembourser. Et le socle obsolète ' +
    "interdisait tout travail sérieux sur la conversion, sur un site qui ne pouvait pas s'arrêter.",
  monRole:
    'Modéliser les flux commande, stock et facturation en BPMN, les spécifier, les développer. ' +
    'Défendre la migration devant la direction sur ses effets métier avant ses mérites techniques, ' +
    'puis la mener seul, ancien et nouveau socle en cohabitation. Développeur et recetteur à la fois, ' +
    "non-régression écrite sur l'ancien socle puis rejouée sur le nouveau, recette manuelle des " +
    "tunnels de commande avec la boutique. Parcours d'achat refondus sur la donnée, prestataires " +
    "d'acquisition briefés et contrôlés.",
  resultat:
    'Survente supprimée, socle remplacé sans coupure, pics saisonniers absorbés sans incident, ' +
    'panier moyen en hausse de 50 %.',
}
