// accueil.ts — jeromemarichez2026
// Contenu éditorial de la page d'accueil.
//
// Sources de vérité, dans cet ordre : README.md (positionnement, promesse centrale,
// la chaîne et les deux points d'entrée) puis CLAUDE.md (ligne éditoriale et règles
// de véracité). Arbitrages de Jérôme MARICHEZ du 2026-08-08 (issue #19).
//
// Véracité — points tenus ici :
// - La promesse est reprise dans les termes du README : « un seul interlocuteur […]
//   aucune sous-traitance — celui qui cadre est celui qui code, mesure et exploite ».
// - LE FIL ROUGE E-COMMERCE EST ILLUSTRATIF. Aucun nom d'entreprise, aucune
//   formulation au passé, aucun résultat chiffré ne lui est rattaché. Jérôme n'a
//   aucune référence client publiable et n'a jamais mené cette chaîne complète chez
//   un même e-commerçant : le taggage GTM relève de la période Acetelecom /
//   MailingVox, l'e-commerce de la période Verhoeven Joaillier. Le champ
//   `chaine.avertissement` le dit dans le TEXTE VISIBLE — c'est une exigence de
//   véracité, pas une précaution de style.
// - AUCUNE preuve n'est réécrite ici : `preuves` et `pourquoi` ne portent que des
//   RÉFÉRENCES vers des preuves déjà rédigées et relues dans content/offres/.
// - La section `pourquoi` s'énonce à la PREMIÈRE PERSONNE, depuis l'expérience
//   vécue. Aucun nom d'agence, aucune généralisation sur la profession, aucun verbe
//   d'intention prêté à un tiers : le constat porte sur un périmètre d'accès à la
//   donnée, c'est-à-dire sur un dispositif, jamais sur des personnes.
// - Aucun prix, aucun montant : la tarification vit dans l'offre SEA, pas ici.
// - Aucun délai de réponse n'est annoncé : aucun engagement de ce type n'est établi.
// - Aucun emoji, aucun superlatif (CLAUDE.md, « Ligne éditoriale »).
import type { IAccueil } from '../interfaces/accueil'
import { accueilSchema } from '../schemas/accueil.schema'

const donnees = {
  meta: {
    // Titre appliqué en `absolute` par app/page.tsx : la page d'accueil porte
    // l'identité complète et ne doit pas être suffixée une seconde fois.
    titre: 'Jérôme Marichez — Ingénieur logiciel à Lille',
    description:
      'Ingénierie web, data et IA, SEA à Lille. Un seul interlocuteur pour vos projets digitaux : celui qui cadre est celui qui code, mesure et exploite.',
  },

  accroche: {
    // Unique h1 du document. Porte l'identité et le lieu (référencement) ET la
    // promesse centrale du site (README.md).
    titre: 'Ingénieur logiciel à Lille : un seul interlocuteur pour vos projets digitaux',
    lead: 'Pas de chaîne de prestataires : celui qui cadre est celui qui code, mesure et exploite. En neuf ans, j’ai travaillé en petite équipe ou en autonomie complète, avec des décisions techniques assumées en production.',
    actionPrincipale: { href: '/contact', libelle: 'Discuter de votre projet' },
    actionSecondaire: { href: '/parcours', libelle: 'Voir mon parcours' },
  },

  chaine: {
    titre: 'Une chaîne, pas un catalogue',
    lead: 'Le site produit la donnée, la donnée se structure, le taggage la rend mesurable, et c’est elle qui arbitre les budgets. Chaque étape existe parce que la précédente lui a passé quelque chose.',
    libelleAvertissement: 'Scénario illustratif',
    // Le texte visible qui empêche toute lecture « étude de cas ». Il nomme
    // explicitement ce qui n'a PAS eu lieu, plutôt que de rester vague.
    avertissement:
      'Le déroulé e-commerce ci-dessous est un exemple construit pour rendre la chaîne lisible. Il ne décrit aucun client et aucune mission : je n’ai pas mené cette chaîne entière chez un même e-commerçant. Les compétences qu’elle mobilise, elles, sont attestées offre par offre — le taggage et l’entrepôt d’un côté, l’e-commerce de l’autre, sur des périodes différentes de mon parcours.',
    libelleEtape: 'Étape',
    libelleIllustration: 'Sur une boutique en ligne',
    libelleRattachement: 'Couvert par',
    maillons: [
      {
        cle: 'site',
        titre: 'Le site',
        role: 'Je cadre le besoin, puis je développe le produit : parcours, pages, tunnel de commande, mise en production et exploitation. Le site est conçu dès le départ pour produire de la donnée, au lieu d’être instrumenté après coup.',
        illustration:
          'les fiches produit et les étapes du tunnel sont écrites avec, dès les spécifications, les événements qu’il faudra mesurer plus tard.',
        libelleSortie: 'Ce qu’il passe à l’étape suivante',
        sortie: 'Un produit en ligne dont chaque étape est identifiable et nommée.',
        offres: ['ingenierie-web'],
      },
      {
        cle: 'entrepot',
        titre: 'La donnée structurée et l’entrepôt',
        role: 'Je modélise la donnée selon votre métier, puis je l’agrège, la réconcilie et la dédoublonne dans un entrepôt unique. La qualité de la donnée est un prérequis, jamais un correctif appliqué après coup.',
        illustration:
          'commandes, marges, stocks et sources d’acquisition cessent de vivre dans quatre outils qui ne comptent pas de la même façon.',
        libelleSortie: 'Ce qu’il passe à l’étape suivante',
        sortie: 'Un entrepôt où un euro dépensé et un euro encaissé désignent le même client.',
        // L'entrepôt est le pivot : il alimente l'acquisition ET les projets data
        // et IA (README.md — « La chaîne, et les deux points d'entrée »).
        offres: ['sea', 'data-ia'],
      },
      {
        cle: 'taggage',
        titre: 'Le taggage',
        role: 'Je pose le plan de collecte : conteneur Google Tag Manager web et server-side, dataLayer, nomenclature d’événements documentée, consentement géré par catégorie. La conformité conditionne l’architecture de collecte, elle ne s’y ajoute pas.',
        illustration:
          'l’ajout au panier, le paiement, le remboursement et le retour remontent avec le même identifiant de commande que l’entrepôt.',
        libelleSortie: 'Ce qu’il passe à l’étape suivante',
        sortie:
          'Une mesure qui décrit ce qui s’est passé, et qui se raccorde à vos chiffres de gestion.',
        offres: ['sea'],
      },
      {
        cle: 'sea',
        titre: 'Le SEA',
        role: 'Je pilote Google Ads et Bing Ads sur la rentabilité client à long terme plutôt que sur les métriques natives des régies : structuration des campagnes, A/B testing, arbitrages de budget.',
        illustration:
          'le budget se déplace vers les produits qui laissent de la marge et que le stock permet de livrer, pas vers ceux qui cliquent le mieux.',
        // Dernier maillon : il ne passe pas la main, il rend une décision.
        libelleSortie: 'Ce que vous en retirez',
        sortie:
          'La décision de remettre — ou non — un euro sur une campagne, prise sur vos chiffres à vous.',
        offres: ['sea'],
      },
    ],
  },

  pointsEntree: {
    titre: 'Où vous entrez dans la chaîne',
    lead: 'Deux situations, deux points d’entrée. Dans les deux cas, l’interlocuteur ne change pas d’une étape à l’autre.',
    libelleChemin: 'Le chemin',
    points: [
      {
        cle: 'depart-zero',
        situation: 'Vous partez de zéro',
        description:
          'Il n’y a pas encore de produit. On cadre le besoin, je développe, et je câble la donnée dans la foulée : la mesure n’est pas rajoutée à la fin, elle est prévue dans les spécifications.',
        etapes: ['Cadrage', 'Développement', 'Câblage data', 'SEA'],
        liens: [
          {
            offre: 'ingenierie-web',
            libelle: 'Commencer par le cadrage — offre Ingénierie Web',
          },
        ],
      },
      {
        cle: 'application-existante',
        situation: 'Vous avez déjà une application',
        description:
          'Le produit tourne déjà. On part de l’existant : je branche la collecte et l’entrepôt sur ce qui est en place, puis cette donnée sert à piloter l’acquisition, à alimenter des projets data et IA, ou les deux.',
        etapes: ['Câblage data', 'SEA ou Data & IA'],
        liens: [
          { offre: 'sea', libelle: 'Brancher la mesure sur l’existant — offre SEA' },
          { offre: 'data-ia', libelle: 'Exploiter la donnée existante — offre Data & IA' },
        ],
      },
    ],
  },

  pourquoi: {
    titre: 'D’où vient cette promesse',
    // Première personne, depuis l'expérience vécue. « Six chiffres » renvoie aux
    // 100 000 € pilotés chez Truffle Capital : le chiffre exact est apporté par la
    // preuve référencée plus bas, pas réécrit ici.
    lead: 'En pilotant des budgets d’acquisition à six chiffres, puis en encadrant les prestataires qui les dépensaient, j’ai vu la même coupure revenir : les chiffres sur lesquels une campagne s’optimise ne sont pas ceux sur lesquels l’entreprise décide.',
    colonnes: [
      {
        cle: 'metriques-regie',
        titre: 'Ce qu’une régie publicitaire mesure',
        elements: [
          'le coût par clic',
          'les conversions qu’elle déclare elle-même',
          'le volume d’impressions et de clics',
        ],
      },
      {
        cle: 'chiffres-entreprise',
        titre: 'Ce sur quoi vous décidez',
        elements: [
          'la marge que laisse chaque produit',
          'le stock réellement disponible',
          'la valeur d’un client sur la durée',
        ],
      },
    ],
    conclusion:
      'La seconde colonne ne sort d’aucune régie : elle sort de votre système d’information. Un intervenant qui n’y a pas accès travaille sur la première — c’est le seul jeu de chiffres dont il dispose. Question de périmètre, pas de compétence. Câbler la donnée et piloter l’acquisition avec le même interlocuteur, c’est faire tenir les deux colonnes dans le même tableau.',
    // Les deux faits du parcours qui fondent le constat, repris par référence :
    // budgets pilotés et prestataires encadrés d'une part, mesure de la rentabilité
    // à long terme d'autre part.
    references: [
      { offre: 'sea', axe: 'sea-pilotage' },
      { offre: 'sea', axe: 'rentabilite-long-terme' },
    ],
  },

  offres: {
    titre: 'Les trois pôles de la chaîne',
    lead: 'Le même interlocuteur les tient tous les trois. Chaque offre se termine sur ce que vous pouvez décider, pas sur une liste d’outils.',
    libelleDecision: 'Ce que vous décidez',
    // Complété par le titre de l'offre : « Voir l'offre Ingénierie Web ». Les trois
    // liens restent distincts et compréhensibles hors contexte (WCAG 2.4.4).
    libelleLien: 'Voir l’offre',
  },

  preuves: {
    titre: 'Ce qui rend ces offres crédibles',
    lead: 'Chaque affirmation de ce site porte sa preuve : un chiffre, une durée ou une contrainte tenue. Voici celles qui sont publiables.',
    // Les preuves listées au README, plus le développement en IA augmentée piloté par
    // les tests — différenciateur que le CLAUDE.md impose de faire apparaître partout
    // où le site parle de programmation.
    // Ordre : les trois offres sont représentées dès les trois premières lignes.
    // SEA est représentée ici par le plan de taggage : ses deux preuves de pilotage
    // sont déjà portées par la section « pourquoi », et les répéter les affaiblirait.
    references: [
      { offre: 'ingenierie-web', axe: 'ui-ux' },
      { offre: 'sea', axe: 'mesure-taggage' },
      { offre: 'data-ia', axe: 'data-mining' },
      { offre: 'ingenierie-web', axe: 'migrations' },
      { offre: 'ingenierie-web', axe: 'front-end' },
      { offre: 'ingenierie-web', axe: 'ia-augmentee' },
    ],
  },

  contact: {
    titre: 'Parlons de votre projet',
    lead: 'Décrivez votre besoin en quelques lignes : cadrage, développement, mise en production, mesure. C’est moi qui lis et qui réponds.',
    action: { href: '/contact', libelle: 'Me contacter' },
  },
} satisfies IAccueil

/** Validé au chargement : une donnée non conforme échoue au build, pas en production. */
export const accueil: IAccueil = accueilSchema.parse(donnees)
