import type { IProjet } from '@/interfaces/IProjet'

/**
 * Les projets détaillés au format Contexte / Enjeu / Mon rôle / Résultat.
 *
 * Chaque texte est reformulé sous cette structure à partir des expériences déjà
 * écrites et vérifiées (`src/contenu/experiences/`), pas réinventé : aucun fait,
 * aucune date et aucun chiffre n'y figure qui ne soit déjà dans ces fichiers.
 * Ordre antéchronologique, comme les expériences dont ils sont tirés.
 */
export const projets: IProjet[] = [
  {
    titre: 'Sms En Masse',
    entreprise: 'Acetelecom',
    sousTitre: 'Plateforme SaaS BtoB de campagnes SMS conçue et livrée de zéro',
    contexte:
      "Éditeur lillois de campagnes multicanales pour de grands comptes de la distribution, de l'assurance et de la banque. La plateforme vendue jusque là était une solution tierce exploitée en marque blanche, sans marge de manœuvre sur son évolution.",
    enjeu:
      'Remplacer cette solution tierce par une plateforme propre, sans QA, sans équipe data et sans ops en place au départ : la démarche qualité restait à construire en même temps que le produit.',
    monRole:
      'Lead tech : architecture, modélisation des données, front React et Next.js, back Node.js et Express avec API REST spécifiée en OpenAPI, CI/CD, mise en production et run. Design system en atomic design documenté sous Storybook, non-régression sur trois niveaux bloquante en CI.',
    resultat:
      'Plateforme livrée et exploitée en remplacement de la solution tierce. Lighthouse 98/100, RGAA et WCAG tenus, déploiements sans interruption sur Google Cloud et Vercel, PCA et PRA testés.',
  },
  {
    titre: 'Lutte contre la fraude SMS',
    entreprise: 'Acetelecom',
    sousTitre: 'Détection et protection sous la pression du régulateur',
    contexte:
      "Fraude constatée sur le canal SMS, dans un secteur sous la pression du régulateur et des amendes de l'ARCOM.",
    enjeu:
      'Rendre visibles des schémas de fraude jusque là non détectés, puis les bloquer sans ajouter de friction pour les clients légitimes.',
    monRole:
      "Analyse des données pour faire émerger les schémas de fraude, conception d'une protection en plusieurs étapes le long du parcours client.",
    resultat: 'Fraude sur le canal SMS contenue, parcours client légitime préservé.',
  },
  {
    titre: 'Prézage',
    entreprise: 'Acetelecom',
    sousTitre: "Migration d'une application mobile grand public sans interruption",
    contexte:
      'Application mobile grand public, plus de 200 000 installations et près de 1 000 avis, construite en Ionic et Angular vieillissants.',
    enjeu:
      'Migrer Ionic 6 vers 8 et Angular 15 vers 19 sans interrompre le service ni geler la feuille de route produit.',
    monRole:
      "Migration menée par paliers, plan de test manuel rédigé de zéro pour couvrir l'application avant chaque palier.",
    resultat:
      'Migration réalisée sans interruption ni gel de la feuille de route, sur une base installée de plus de 200 000 utilisateurs.',
  },
  {
    titre: 'MailingVox',
    entreprise: 'Acetelecom',
    sousTitre: "Cartographie d'une plateforme de 2008 pour sa mise en conformité",
    contexte:
      'Plateforme historique en production depuis 2008, sans cartographie applicative, SI ni infrastructure à jour.',
    enjeu:
      "Fonder la mise en conformité RGPD et DORA, et la réduction des coûts, sur une connaissance réelle de l'existant.",
    monRole:
      "Cartographie applicative, du système d'information et de l'infrastructure, en tant qu'ingénieur fullstack sur la plateforme.",
    resultat:
      'Base établie pour la mise en conformité RGPD et DORA et pour la réduction des coûts.',
  },
  {
    titre: 'Data et intelligence artificielle',
    entreprise: 'Acetelecom',
    sousTitre: 'Initiative ouverte de ma propre initiative, du clustering au LLM',
    contexte:
      "Base clients et support de niveau 1 sans exploitation de la donnée ni assistance automatisée, sur un sujet que j'ai ouvert moi-même.",
    enjeu:
      "Segmenter la base clients et outiller le support sans dépendre uniquement d'un modèle tiers coûteux à l'usage.",
    monRole:
      "Base clients segmentée par clustering k-means. LLM Claude sur Vertex AI avec recherche vectorielle pour le support de niveau 1, Llama 3 affiné sur corpus métier, et prototype de modèle supervisé pour anticiper les échecs de dépôt vocal, à partir d'une méthode publiée sur arXiv que j'ai implémentée moi-même.",
    resultat:
      'Segmentation client opérationnelle, support de niveau 1 outillé, prototype de détection des échecs de dépôt vocal produit.',
  },
  {
    titre: "Mesure d'acquisition",
    entreprise: 'Acetelecom',
    sousTitre: "Plan de taggage remis d'aplomb sur tous les produits",
    contexte:
      "Mesure d'acquisition disparate d'un produit à l'autre, sans vision commune de ce qui convertit vraiment en BtoB.",
    enjeu:
      'Unifier la mesure et suivre la valeur client à long terme pour réallouer les budgets sur ce qui fonctionne.',
    monRole:
      'Plan de taggage repris sur tous les produits, suivi de la valeur client à long terme en BtoB.',
    resultat: 'Budgets réalloués sur les canaux qui convertissent réellement.',
  },
  {
    titre: "Synchronisation de l'ERP",
    entreprise: 'Verhoeven Joaillier',
    sousTitre: 'Fin de la survente sur des pièces uniques',
    contexte:
      'Maison de joaillerie vendant des pièces souvent uniques en boutique et en ligne, où un stock faux se paie en survente.',
    enjeu:
      "Synchroniser l'ERP propriétaire M3 Soft avec le site marchand pour que le stock affiché soit toujours le stock réel.",
    monRole:
      'Flux commande, stock et facturation modélisés en BPMN, développés puis recettés avec la boutique.',
    resultat: 'Survente supprimée sur les pièces uniques.',
  },
  {
    titre: 'Migration du socle e-commerce',
    entreprise: 'Verhoeven Joaillier',
    sousTitre: 'PHP 5 vers Node.js et React, sans couper le site',
    contexte:
      'Socle e-commerce en fin de vie, PHP 5 et jQuery, sur un site marchand de joaillerie de luxe.',
    enjeu:
      'Remplacer ce socle par une architecture découpée en front et back sans interrompre les ventes, et défendre la migration devant la direction sur ses effets métier.',
    monRole:
      "Réécriture PHP 7 orientée objet puis Node.js, jQuery vers React, monolithe découpé avec un contrat d'interface explicite. Non-régression Cypress et Jest écrite sur l'ancien socle puis rejouée sur le nouveau.",
    resultat:
      'Migration réalisée sans coupure du site, monolithe remplacé par une architecture front et back séparée.',
  },
  {
    titre: "Refonte du parcours d'achat",
    entreprise: 'Verhoeven Joaillier',
    sousTitre: 'Panier moyen en hausse de 50 %',
    contexte:
      "Pages produit et tunnel d'achat conçus sans exploitation de la donnée comportementale.",
    enjeu:
      'Refondre le parcours sur cette donnée pour améliorer la conversion, sur un site où chaque pièce est un achat engageant.',
    monRole:
      "Parcours d'achat et pages produit refondus sur la donnée comportementale, A/B testing, configurateur de bracelet rendu en temps réel.",
    resultat: 'Panier moyen en hausse de 50 %.',
  },
  {
    titre: 'Refonte de trois sites',
    entreprise: 'Truffle Capital',
    sousTitre: 'truffle.com, truffle100.fr et artedrone.fr, en indépendant',
    contexte:
      "Fonds de capital-risque parisien dont les vitrines sont lues par des investisseurs et par la presse spécialisée, avec l'existant d'une agence digitale d'environ 70 personnes à reprendre.",
    enjeu:
      "Reprendre cet existant en indépendant, du cadrage à l'exploitation, avec le risque commercial et financier à ma charge.",
    monRole:
      'Proposition commerciale de reprise défendue devant le comité de direction. Trois sites créés et refondus de bout en bout, prestataires recrutés et rémunérés à mes frais, recette manuelle avant chaque mise en ligne.',
    resultat:
      'Proposition remportée, trois sites livrés et exploités, mission reconduite sur deux ans.',
  },
]
