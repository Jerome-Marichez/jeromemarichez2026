// fil-ia.ts — jeromemarichez-fr
// Le fil IA : l'axe transverse de la page d'accueil.
//
// Ce n'est pas un quatrième pôle et ce n'est pas une charnière. Les charnières passent
// la main d'un pôle au suivant ; ce fil-ci les traverse tous. Il répond à une confusion
// que le site crée lui-même : l'IA y apparaît deux fois — comme offre (le pôle IA) et
// comme méthode de production (partout). Sans cette section, le lecteur les mélange.
//
// Véracité (CLAUDE.md) : rien ici n'est nouveau. Chaque preuve citée est déjà portée
// par un pôle et sourcée dans les CV de référence. La seule affirmation propre à cette
// section est la méthode de travail elle-même — outillage Claude Code / Gemini piloté
// par les tests — que le CLAUDE.md revendique déjà comme différenciateur assumé.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTION_FIL_IA: IEditorialSection = {
  id: 'fil-ia',
  kind: 'fil',
  kicker: 'Le fil · tous les pôles',
  titre: 'Je conçois, je développe et je pilote avec l’IA',
  chapo:
    'L’IA est ce que je livre au pôle IA, et la façon dont je travaille sur tous. Ici, la ' +
    'seconde : l’IA propose, les tests tranchent.',
  blocs: [
    {
      titre: 'Concevoir — instruire les options, pas les recevoir',
      texte:
        'L’IA instruit : plusieurs scénarios, leurs coûts, leurs angles morts. La décision ' +
        'reste la mienne et s’écrit noir sur blanc.',
      decision: 'Le scénario d’architecture retenu, ceux qui ont été écartés, et sur quel critère.',
    },
    {
      titre: 'Construire — Claude Code et Gemini, pilotés par les tests',
      texte:
        'Agents, hooks, skills et serveurs MCP internes, le test écrit avant et rejoué après ' +
        'la génération.',
      preuve:
        'Jest, Cypress, Playwright, mutation Stryker. Certification ISTQB Foundation. Ce ' +
        'site est construit ainsi, de bout en bout.',
      decision: 'Ce que vous acceptez de faire produire par une IA, et le filet exigé en dessous.',
    },
    {
      titre: 'Livrer — l’IA dans le produit qui tourne',
      texte:
        'De l’IA qui tourne chez vous, coût d’inférence, latence et RGPD tenus — pas ma ' +
        'manière d’écrire du code.',
      preuve:
        'Modèle supervisé en production, fine-tuning de Llama 3 sur corpus métier, RAG ' +
        'documentaire fait maison.',
    },
    {
      titre: 'Piloter — le SEA et l’UX décidés sur ce que la donnée dit',
      texte: 'La même donnée sert à trancher, puis la même personne implémente l’arbitrage.',
      preuve:
        'Panier moyen en hausse de 50 % sur un e-commerce de joaillerie, 100 000 € de budget ' +
        'ADS / SEO pilotés.',
      decision: 'Quelle source d’acquisition vous coupez le mois prochain, et sur quel chiffre.',
    },
  ],
}
