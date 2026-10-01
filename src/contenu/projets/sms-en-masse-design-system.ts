import type { IProjet } from '../../interfaces/IProjet'

export const smsEnMasseDesignSystem: IProjet = {
  titre: "Un design system en atomic design, construit avec l'UI designer",
  entreprise: 'Acetelecom',
  marque: 'smsEnMasse',
  sousTitre: 'Sms En Masse · composants, Storybook et arbitrages UX',
  contexte:
    'Une plateforme neuve avec un périmètre public et une application métier authentifiée, des ' +
    "maquettes produites par un UI designer, et un socle qui devait rester repris par d'autres " +
    'développeurs après moi.',
  enjeu:
    'Livrer des écrans cohérents sans réécrire les mêmes composants à chaque maquette, et trancher ' +
    'les écarts entre la maquette et ce que le socle savait déjà faire.',
  monRole:
    'Bibliothèque découpée en atomes, molécules et organismes, documentée sous Storybook et ' +
    'versionnée, chaque composant livré avec ses variantes, ses états et son comportement clavier. ' +
    'Material UI contraint par le thème, SCSS et modules CSS sur les composants propres. Maquettes ' +
    'confrontées au socle avant implémentation, jetons de design alignés entre maquette et code. ' +
    'Arbitrages UX tranchés à deux avec le designer, à partir des écrans où les utilisateurs ' +
    'décrochaient.',
  resultat:
    "Des écrans cohérents d'un parcours à l'autre et un socle front laissé aux développeurs " +
    'suivants, documenté et prêt à reprendre.',
}
