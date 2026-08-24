// contact.ts — jeromemarichez-fr
// Les textes du formulaire de contact : libellés, aides, bouton, statuts.
//
// Ils vivent ici et non dans le composant pour la même raison que le reste du contenu :
// c'est de l'éditorial, il passe par la relecture, et il ne doit pas se retrouver dilué
// dans du JSX. Les messages d'erreur, eux, appartiennent au schéma Zod et au service :
// ils sont la formulation d'une règle, pas un libellé d'écran.

/** Les textes du formulaire, dans l'ordre où le visiteur les rencontre. */
export const CONTACT_FORMULAIRE = {
  consigne:
    'Les trois champs sont obligatoires. Rien ne part depuis cette page : le bouton ouvre ' +
    'votre client mail avec le message déjà écrit, et c’est vous qui l’envoyez.',
  marqueObligatoire: '(obligatoire)',
  resumeErreurs: 'À compléter avant d’ouvrir le mail :',
  bouton: 'Ouvrir mon client mail',
  statutSucces:
    'Votre client mail s’ouvre avec ce message déjà rempli. Vous le relisez, vous l’envoyez. ' +
    'Si rien ne s’ouvre, c’est en général qu’aucun client mail n’est configuré sur ce poste. ' +
    'Voici l’adresse.',
  champs: {
    nom: {
      label: 'Votre nom',
      aide: 'Il signe le mail, rien de plus.',
    },
    sujet: {
      label: 'Le sujet',
      aide: 'Une ligne, qui devient l’objet du mail.',
    },
    message: {
      label: 'Votre message',
      aide: 'Votre situation, ce que vous cherchez à trancher, et sous quel délai.',
    },
  },
} as const

/** Le bloc voisin du formulaire : l'adresse en clair, pour qui n'a pas de client mail. */
export const CONTACT_DIRECT = {
  titre: 'Écrire sans le formulaire',
  texte:
    'Le formulaire a besoin d’un client mail installé sur ce poste. Beaucoup de postes n’en ' +
    'ont pas, en entreprise notamment, ou quand le courrier passe par un webmail. Dans ce ' +
    'cas, voici l’adresse.',
} as const
