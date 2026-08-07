// data-ia.ts — jeromemarichez2026
// Données éditoriales de l'offre « Data & IA ».
// Sources de vérité : README.md (périmètre éditorial) puis les CV de référence
// (/Users/nicolasb/Documents/CV/) pour les chiffres, dates et périmètres.
// Points de véracité tenus ici : aucun framework RAG (LangChain / LlamaIndex) — la
// chaîne est maison ; l'Universitat de Barcelona est nommée comme ÉDITRICE de la
// publication arXiv (arbitrage de Jérôme MARICHEZ, 2026-08-08), la méthode étant
// implémentée par lui — écrire « en collaboration avec » resterait interdit ;
// pas de cluster Kubernetes administré en propre.
import type { IOffre } from '../../interfaces/offre'
import { offreSchema } from '../../schemas/offre.schema'

const donnees = {
  cle: 'data-ia',
  titre: 'Data & IA',
  accroche:
    'Mettre l’IA en production, dans des produits vendus, avec les contraintes qui vont avec : coût d’inférence, latence, RGPD, disponibilité. Pas dans des notebooks.',
  decisionPermise:
    'Vous décidez si un cas d’usage IA tient en production, sur des chiffres de coût, de latence et de qualité — pas sur une démonstration.',
  axes: [
    {
      cle: 'llm-production',
      titre: 'LLM en production',
      description:
        'Claude (Vertex AI, API Anthropic), OpenAI, Gemini, Llama. Context engineering, comparaison continue des modèles et arbitrage coût / latence / qualité / confidentialité, cas d’usage par cas d’usage.',
      preuve: null,
    },
    {
      cle: 'adaptation-modeles',
      titre: 'Adaptation de modèles',
      description:
        'Fine-tuning de Llama 3 sur corpus métier pour l’application mobile Prézage, complété par un procédé maison d’augmentation du contexte, proche du RAG. Constitution et nettoyage du jeu d’entraînement, évaluation face au modèle propriétaire. La chaîne est écrite et maîtrisée, sans framework tiers.',
      preuve: 'Charge de travail des prestataires réduite.',
    },
    {
      cle: 'rag-documentaire',
      titre: 'RAG documentaire',
      description:
        'Réponse automatisée aux tickets de support de niveau 1 sur l’ensemble des produits : recherche vectorielle PostgreSQL et API OpenAI, réponses ancrées sur la documentation interne et non sur la mémoire du modèle.',
      preuve: null,
    },
    {
      cle: 'agents-interoperabilite',
      titre: 'Agents et interopérabilité',
      description:
        'Conception, développement et documentation de serveurs MCP et de plugins n8n, Make et Zapier : le produit devient appelable par un agent IA ou par un scénario no-code chez le client.',
      preuve:
        'Serveur MCP et plugins n8n, Make et Zapier livrés et documentés pour la plateforme « Sms En Masse ».',
    },
    {
      cle: 'machine-learning',
      titre: 'Machine learning',
      description:
        'Modèle supervisé anticipant les échecs de dépôt vocal, en production : extraction des caractéristiques du signal audio (niveau de bruit, probabilité de présence de voix, durée, puissance sonore dans le temps), entraînement TensorFlow, inférence en cloud functions, versioning et monitoring. La méthode d’extraction vient d’une publication arXiv de l’Universitat de Barcelona, que j’ai implémentée moi-même, adaptée à des données réelles puis industrialisée.',
      preuve: 'Routes vocales coûteuses évitées.',
    },
    {
      cle: 'data-mining',
      titre: 'Data mining et règles métier',
      description:
        'Analyse exploratoire sous Orange Data Mining, pondération et sélection des variables, élimination des corrélations fortes et des variables porteuses de bruit, puis règles définies et implémentées dans le produit.',
      preuve: 'Fraude en baisse, conversion des inscriptions en hausse, latence réduite.',
    },
    {
      cle: 'data-engineering',
      titre: 'Data engineering',
      description:
        'Pipelines d’ingestion, nettoyage, dédoublonnage, agrégation et réconciliation multi-sources. Contrôles d’intégrité et de véracité dès l’ingestion, détection d’anomalies : la qualité de la donnée est un prérequis, pas un correctif appliqué après coup.',
      preuve: null,
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
  ],
} satisfies IOffre

/** Validée au chargement : une donnée non conforme échoue au build, pas en production. */
export const offreDataIa: IOffre = offreSchema.parse(donnees)
