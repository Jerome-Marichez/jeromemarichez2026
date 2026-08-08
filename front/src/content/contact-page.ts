// contact-page.ts — jeromemarichez2026
// Libellés de la page « /contact » (issue #24).
//
// SANS FORMULAIRE — arbitrage de Jérôme MARICHEZ du 2026-08-08, postérieur à l'issue #24
// qui en demandait un. Le service d'acheminement des messages n'est pas choisi, et un
// formulaire qui afficherait « message envoyé » sans rien envoyer serait pire que pas de
// formulaire du tout. Le formulaire, son schéma partagé et la route back feront l'objet
// d'une évolution ultérieure.
//
// LES COORDONNÉES NE SONT PAS ICI. Elles vivent dans `content/identite.ts`, point unique
// du site : la page de contact, le pied de page et le JSON-LD y lisent tous les trois.
// Une coordonnée recopiée est une coordonnée qui devient fausse le jour où elle change.
//
// Véracité — points tenus ici :
// - AUCUN DÉLAI DE RÉPONSE annoncé, aucun engagement de disponibilité, aucun horaire :
//   rien de tout cela n'est établi (même règle que `content/accueil.ts`) ;
// - aucune adresse postale : la ville reste la seule granularité géographique publique ;
// - aucune durée de conservation chiffrée dans la mention RGPD — aucune n'a été arbitrée,
//   et un délai inventé serait une affirmation fausse dans le document qui doit
//   précisément protéger le visiteur. L'absence de collecte est, elle, un fait ;
// - première personne du singulier, aucun emoji, aucun superlatif.
import type { IContactPage } from '../interfaces/contact-page'
import { contactPageSchema } from '../schemas/contact-page.schema'

const donnees = {
  meta: {
    titre: 'Contact',
    description:
      'E-mail, téléphone, LinkedIn : les trois façons de me joindre directement. Un seul interlocuteur, c’est moi qui lis et c’est moi qui réponds.',
  },
  entete: {
    titre: 'Me contacter',
    lead: 'Écrivez-moi, appelez-moi ou passez par LinkedIn. C’est moi qui lis et c’est moi qui réponds : il n’y a personne d’autre derrière ce site.',
  },
  coordonnees: {
    titre: 'Trois façons de me joindre',
    libelleEmail: 'E-mail',
    libelleTelephone: 'Téléphone',
    // Référence, pas URL : l'adresse du profil reste dans `identite.profilsPublics`, et
    // `services/profils.service.ts` les rapproche au build.
    profils: [{ cle: 'linkedin', nom: 'LinkedIn', hote: 'www.linkedin.com' }],
  },
  sansFormulaire: {
    titre: 'Pourquoi il n’y a pas de formulaire',
    texte:
      'Le service qui achemine les messages n’est pas encore choisi. Un formulaire qui afficherait « message envoyé » sans rien envoyer vaudrait moins que pas de formulaire : les trois coordonnées ci-dessus, elles, fonctionnent dès maintenant. Il en viendra un le jour où l’acheminement sera tranché, pas avant.',
  },
  rgpd: {
    titre: 'Données personnelles',
    mentions: [
      'Cette page ne comporte aucun formulaire et ne collecte donc rien vous concernant : ni nom, ni adresse, ni message. Aucun cookie n’y est déposé et aucune donnée n’y est transmise à un tiers.',
      'Les seules données personnelles affichées ici sont les miennes — adresse e-mail, téléphone, profil LinkedIn. Elles figurent déjà sur mes CV et leur publication est mon choix.',
      'Si vous m’écrivez, votre message arrive dans ma boîte e-mail comme n’importe quel courrier : il ne transite par aucun service de ce site, il ne sert qu’à vous répondre, et vous pouvez à tout moment me demander de le supprimer.',
    ],
  },
} satisfies IContactPage

/** Validé au chargement : une donnée non conforme échoue au build, pas en production. */
export const contactPage: IContactPage = contactPageSchema.parse(donnees)
