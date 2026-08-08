// data-ia.ts — jeromemarichez2026
// Données éditoriales de l'offre « Data & IA ».
// Sources de vérité : README.md (périmètre éditorial) puis les CV de référence
// (/Users/nicolasb/Documents/CV/) pour les chiffres, dates et périmètres.
//
// Repositionnement du 2026-08-08 (arbitrage de Jérôme MARICHEZ, issue #16) : l'offre
// porte désormais DEUX VOLETS explicites — « Agents autonomes » d'une part, « Projets
// data supervisés et non supervisés » d'autre part. Le découpage est porté par le champ
// `volet` de chaque axe, donc par la DONNÉE : le rendu n'a rien à regrouper de son
// côté, et les axes sans `volet` forment le socle commun aux deux.
//
// ORDRE DE LECTURE — précisions de Jérôme MARICHEZ, 2026-08-08. L'offre s'ouvre sur la
// FIABILITÉ des données, puis sur leur QUALIFICATION selon l'usage visé, et SEULEMENT
// ENSUITE sur les deux volets. Cet ordre est le discours réel : il distingue de qui vend
// l'IA d'abord et découvre ensuite que la donnée du client est inexploitable. Ne pas
// l'inverser pour gagner en effet d'annonce — l'ordre du tableau `axes` EST le message.
//
// TARIFS : l'offre est entièrement SUR DEVIS, un projet data se chiffrant au périmètre.
// « Sur devis » est une modalité, pas un prix : aucun montant n'est publié ici. Les
// montants de l'offre SEA font l'objet de l'issue #17, distincte.
//
// Points de véracité tenus ici : aucun framework RAG (LangChain / LlamaIndex) — la
// chaîne est maison ; l'Universitat de Barcelona est nommée comme ÉDITRICE de la
// publication arXiv (arbitrage de Jérôme MARICHEZ, 2026-08-08), la méthode étant
// implémentée par lui — écrire « en collaboration avec » resterait interdit ;
// pas de cluster Kubernetes administré en propre.
import type { IOffre } from '../../interfaces/offre'
import { offreSchema } from '../../schemas/offre.schema'

/** Les deux volets de l'offre. Nommés une seule fois, portés par les axes. */
const AGENTS = 'Agents autonomes'
const PROJETS_DATA = 'Projets data supervisés et non supervisés'

const donnees = {
  cle: 'data-ia',
  titre: 'Data & IA',
  accroche:
    'Commencer par la donnée : fiable d’abord, qualifiée selon l’usage ensuite. Puis l’exploiter sur deux volets — agents autonomes, projets data supervisés et non supervisés — en production, avec les contraintes qui vont avec : coût d’inférence, latence, RGPD, disponibilité.',
  decisionPermise:
    'Vous décidez si un cas d’usage IA tient en production, sur des chiffres de coût, de latence et de qualité — pas sur une démonstration. Et vous savez avant de vous engager si vos données le permettent.',
  axes: [
    {
      cle: 'fiabilite-donnees',
      titre: 'Fiabilité des données',
      description:
        'Le préalable, traité comme tel : vos données sont-elles intègres, dédoublonnées, exploitables ? Pipelines d’ingestion, nettoyage, dédoublonnage, agrégation et réconciliation multi-sources ; contrôles d’intégrité et de véracité dès l’ingestion, détection d’anomalies. La qualité de la donnée est un prérequis, jamais un correctif appliqué après coup — c’est la question que je pose avant de parler de modèle.',
      preuve: null,
    },
    {
      cle: 'qualification-donnees',
      titre: 'Qualification selon l’usage visé',
      description:
        'La même donnée ne se prépare pas de la même façon selon ce qu’on veut en faire. Trois usages, trois préparations : usages marketing (segmentation, activation, mesure) ; IA générative et LLM (constitution du corpus, découpage, indexation vectorielle) ; modèles prédictifs et non prédictifs (sélection et pondération des variables, étiquetage, jeux d’entraînement et de test). Qualifier l’usage avant de préparer la donnée évite de refaire le travail à chaque nouveau cas.',
      preuve: null,
    },
    {
      cle: 'llm-production',
      titre: 'LLM en production',
      description:
        'Claude (Vertex AI, API Anthropic), OpenAI, Gemini, Llama. Context engineering, comparaison continue des modèles et arbitrage coût / latence / qualité / confidentialité, cas d’usage par cas d’usage.',
      preuve: null,
      volet: AGENTS,
    },
    {
      cle: 'agents-interoperabilite',
      titre: 'MCP et automatisation no-code',
      description:
        'Conception, développement et documentation de serveurs MCP et de plugins n8n, Make et Zapier : le produit devient appelable par un agent IA ou par un scénario no-code chez le client.',
      preuve:
        'Serveur MCP et plugins n8n, Make et Zapier livrés et documentés pour la plateforme « Sms En Masse ».',
      volet: AGENTS,
    },
    {
      cle: 'rag-documentaire',
      titre: 'RAG documentaire',
      description:
        'Recherche vectorielle PostgreSQL et API OpenAI sur votre base documentaire : les réponses sont ancrées sur vos documents et non sur la mémoire du modèle. La chaîne est écrite et maîtrisée, sans framework tiers.',
      preuve:
        'Réponse automatisée aux tickets de support de niveau 1, sur l’ensemble des produits.',
      volet: AGENTS,
    },
    {
      cle: 'adaptation-modeles',
      titre: 'Adaptation de modèles open-weight',
      description:
        'Fine-tuning de Llama 3 sur corpus métier pour l’application mobile Prézage, complété par un procédé maison d’augmentation du contexte, proche du RAG. Constitution et nettoyage du jeu d’entraînement, évaluation face au modèle propriétaire.',
      preuve: 'Charge de travail des prestataires réduite.',
      volet: AGENTS,
    },
    {
      cle: 'apprentissage-supervise',
      titre: 'Apprentissage supervisé — modèles prédictifs',
      description:
        'Classification, régression et réseaux de neurones sous TensorFlow : ce que le métier appelle des modèles prédictifs. Modèle anticipant les échecs de dépôt vocal, en production : extraction des caractéristiques du signal audio (niveau de bruit, probabilité de présence de voix, durée, puissance sonore dans le temps), entraînement, inférence en cloud functions, versioning et monitoring. La méthode d’extraction vient d’une publication arXiv de l’Universitat de Barcelona, que j’ai implémentée moi-même, adaptée à des données réelles puis industrialisée.',
      preuve: 'Routes vocales coûteuses évitées.',
      volet: PROJETS_DATA,
    },
    {
      cle: 'apprentissage-non-supervise',
      titre: 'Apprentissage non supervisé — descriptif et non prédictif',
      description:
        'Clustering, KNN, profilage et segmentation : faire apparaître des groupes de clients ou de comportements qu’aucune étiquette ne désignait à l’avance, puis les rendre exploitables par le métier. Ces modèles décrivent ce qui est, ils ne prédisent pas — la distinction se dit, elle évite d’attendre d’un profilage ce qu’il ne peut pas donner.',
      preuve: null,
      volet: PROJETS_DATA,
    },
    {
      cle: 'data-mining',
      titre: 'Data mining et règles métier',
      description:
        'Analyse exploratoire sous Orange Data Mining, pondération et sélection des variables, élimination des corrélations fortes et des variables porteuses de bruit, puis règles définies et implémentées dans le produit.',
      preuve: 'Fraude en baisse, conversion des inscriptions en hausse, latence réduite.',
      volet: PROJETS_DATA,
    },
    {
      cle: 'mlops-cloud',
      titre: 'MLOps et cloud',
      description:
        'Déploiement, versioning et monitoring de modèles, CI/CD Docker et GitHub Actions, Vertex AI, Pub/Sub, Cloud Run, VM Compute Engine auto-scalées.',
      preuve: null,
    },
    {
      cle: 'conformite',
      titre: 'Conformité',
      description:
        'RGPD et DORA, du cadrage des traitements jusqu’aux pièces demandées en appel d’offres.',
      preuve:
        'Exigées et tenues en appels d’offres grands comptes : distribution, assurance, banque.',
    },
    {
      cle: 'devis',
      titre: 'Sur devis',
      description:
        'Un projet data se chiffre au périmètre : volume et état des données, usage visé, contraintes de mise en production. Cette offre est donc entièrement sur devis, sans forfait affiché — annoncer un montant avant d’avoir regardé les données reviendrait à chiffrer ce qu’on n’a pas vu.',
      preuve: null,
    },
  ],
} satisfies IOffre

/** Validée au chargement : une donnée non conforme échoue au build, pas en production. */
export const offreDataIa: IOffre = offreSchema.parse(donnees)
