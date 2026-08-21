// accueil-data.ts — jeromemarichez-fr
// Le bloc du pôle Data sur la page d'accueil, extrait de `accueil-sections.ts`.
//
// Extrait pour une raison de contenu autant que de taille : ce pôle porte un ordre —
// métier, stratégie data, gouvernance et droit — et cet ordre doit se lire d'un seul
// tenant, sans être rogné pour tenir dans un fichier qui approche la limite de 300
// lignes.
//
// Version longue : `data-sections.ts`, rendue par `data.ts`. Les deux disent la même
// chose dans le même ordre ; l'accueil en donne la version courte, jamais une version
// différente.
//
// `kind: 'pole'` et non `'chapitre'` : cette section-ci EST un pôle, alors que les
// sections de `/services/data/` sont les chapitres internes d'une seule page.
//
// DETTE DE NARRATION, à solder par le lot de réécriture éditoriale : le quatrième bloc
// ci-dessous parle de la solution technique, donc du pôle IA, qui n'a pas encore sa
// propre section d'accueil. Le passage à quatre pôles n'a pas déplacé cette prose — le
// lot topologique ne réécrit pas le texte — mais l'accueil doit finir par raconter
// l'embranchement qu'il annonce déjà dans son schéma.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTION_ACCUEIL_DATA: IEditorialSection = {
  id: 'data',
  kind: 'pole',
  pole: 'data',
  kicker: 'Le passage · Comprendre',
  titre: 'Comprendre votre métier, puis choisir la solution',
  chapo:
    'Je ne commence pas par un modèle. Je commence par ce que votre activité sait déjà ' +
    'sans l’avoir écrit : ses règles de décision, ses profils de clients, ce que raconte ' +
    'son historique. La stratégie data, la gouvernance et la technique en découlent, dans ' +
    'cet ordre — et la réponse n’est pas toujours de l’IA.',
  blocs: [
    {
      titre: 'Découvrir ce que votre métier sait déjà',
      texte:
        'Insights métier tirés de l’historique, profils de clients dégagés par clustering ' +
        '(KNN), règles de décision appliquées par vos équipes sans avoir jamais été ' +
        'formalisées. C’est une prestation à part entière : elle se livre, et vous pouvez ' +
        'vous arrêter là.',
      preuve:
        'AMOA de la startup biotech Artedrone : besoin recueilli auprès des équipes ' +
        'scientifiques et dirigeantes, traduit en spécifications exploitables par des ' +
        'prestataires non spécialistes.',
      decision:
        'Lesquelles de vos règles actuelles méritent d’être écrites, et lesquelles ne ' +
        'tiennent plus.',
    },
    {
      titre: 'La stratégie data : la déployer ou s’appuyer sur l’existante',
      texte:
        'Quand rien n’est en place, on décide quoi mesurer à partir des questions du ' +
        'métier. Quand la donnée existe, on la reprend : agrégation et réconciliation ' +
        'multi-sources, dédoublonnage, contrôles d’intégrité et de véracité dès ' +
        'l’ingestion.',
      preuve:
        'Système d’analyse multi-sources conforme RGPD mesurant la rentabilité client à ' +
        'long terme, branché sur Google Ads et Bing Ads.',
      decision: 'Sur quels indicateurs vous acceptez de décider, et lesquels sont encore du bruit.',
    },
    {
      titre: 'Gouvernance et droit, avant la technique',
      texte:
        'Qui possède quoi, ce qui a le droit d’être collecté et traité, ce qui doit rester ' +
        'chez vous. RGPD, base légale, consentement géré par une CMP, cadrage des ' +
        'traitements avec le juridique. La réponse écarte des solutions entières : mieux ' +
        'vaut la connaître avant de construire.',
      preuve:
        'Conformité RGPD et DORA tenue en appels d’offres grands comptes — distribution, ' +
        'assurance, banque.',
      decision: 'Quelle donnée reste chez vous, et ce que vous acceptez d’envoyer à un tiers.',
    },
    {
      titre: 'La solution répond au problème posé au départ',
      texte:
        'Souvent, une règle métier intégrée à vos systèmes existants suffit — et c’est un ' +
        'livrable complet. Sinon, un modèle supervisé ou non supervisé ; et si le problème ' +
        'est du langage, un LLM arbitré sur le coût d’inférence, la latence, la qualité et ' +
        'la confidentialité : Claude sur Vertex AI, OpenAI, Gemini, fine-tuning de Llama 3 ' +
        'pour l’application mobile Prézage, RAG documentaire fait maison sur recherche ' +
        'vectorielle PostgreSQL.',
      preuve:
        'Règles anti-fraude implémentées dans le produit : fraude en baisse, conversion ' +
        'des inscriptions en hausse. Modèle supervisé anticipant les échecs de dépôt ' +
        'vocal : routes vocales coûteuses évitées.',
      decision:
        'Ce qui se règle par une règle intégrée à l’existant, et ce qui mérite vraiment un ' +
        'modèle.',
    },
  ],
}
