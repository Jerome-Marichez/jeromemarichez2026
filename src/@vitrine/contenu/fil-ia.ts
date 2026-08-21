// fil-ia.ts — jeromemarichez-fr
// Le fil IA : l'axe transverse de la page d'accueil.
//
// Ce n'est pas un quatrième pôle et ce n'est pas une charnière. Les charnières passent
// la main d'un pôle au suivant ; ce fil-ci traverse les trois. Il répond à une confusion
// que le site crée lui-même : l'IA y apparaît deux fois — comme offre (pôle 2) et comme
// méthode de production (les trois pôles). Sans cette section, le lecteur les mélange.
//
// Véracité (CLAUDE.md) : rien ici n'est nouveau. Chaque preuve citée est déjà portée
// par un pôle et sourcée dans les CV de référence. La seule affirmation propre à cette
// section est la méthode de travail elle-même — outillage Claude Code / Gemini piloté
// par les tests — que le CLAUDE.md revendique déjà comme différenciateur assumé.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTION_FIL_IA: IEditorialSection = {
  id: 'fil-ia',
  kind: 'fil',
  kicker: 'Le fil · les trois pôles',
  titre: 'Je conçois, je développe et je pilote avec l’IA',
  chapo:
    'L’IA apparaît deux fois sur ce site, et il faut les distinguer : elle est ce que je ' +
    'livre au pôle 2, et elle est la façon dont je travaille sur les trois. Cette ' +
    'section-ci parle de la seconde — de la première option d’architecture jusqu’à ' +
    'l’arbitrage d’un budget SEA. Une règle la tient d’un bout à l’autre : l’IA propose, ' +
    'les tests tranchent.',
  blocs: [
    {
      titre: 'Concevoir — instruire les options, pas les recevoir',
      texte:
        'Au cadrage et à l’architecture, l’IA sert à instruire : faire produire plusieurs ' +
        'scénarios, les confronter, exposer leurs coûts et leurs angles morts avant que le ' +
        'premier fichier soit écrit. La décision reste la mienne et s’écrit noir sur blanc — ' +
        'arbitrage monolithe ou microservices, stratégie de rendu page par page, découpage ' +
        'des services.',
      decision: 'Le scénario d’architecture retenu, ceux qui ont été écartés, et sur quel critère.',
    },
    {
      titre: 'Construire — Claude Code et Gemini, pilotés par les tests',
      texte:
        'Agents, hooks, skills, loop et serveurs MCP internes au quotidien, avec le test ' +
        'écrit avant, exécuté pendant et rejoué après la génération. Les tests de mutation ' +
        'vérifient que les tests eux-mêmes valent quelque chose : sans eux, une base générée ' +
        'donne surtout l’illusion d’être couverte.',
      preuve:
        'Jest, Cypress, Playwright, mutation Stryker. Certification ISTQB Foundation. Ce ' +
        'site est construit ainsi, de bout en bout.',
      decision: 'Ce que vous acceptez de faire produire par une IA, et le filet exigé en dessous.',
    },
    {
      titre: 'Livrer — l’IA dans le produit qui tourne',
      texte:
        'C’est le pôle 2 : donnée mise au propre, apprentissage supervisé en production, LLM ' +
        'et agents avec le coût d’inférence, la latence et le RGPD tenus. La méthode et ' +
        'l’offre partagent les mêmes outils, elles ne se confondent pas — ce que le pôle 2 ' +
        'vend, c’est de l’IA qui tourne chez vous, pas ma manière d’écrire du code.',
      preuve:
        'Modèle supervisé en production, fine-tuning de Llama 3 sur corpus métier, RAG ' +
        'documentaire fait maison.',
    },
    {
      titre: 'Piloter — le SEA et l’UX décidés sur ce que la donnée dit',
      texte:
        'Au bout de la chaîne, la même donnée sert à trancher : profilage clients par ' +
        'clustering, rentabilité client dans la durée, A/B testing des parcours. Un budget se ' +
        'coupe et une étape de tunnel disparaît parce que le chiffre le dit — puis c’est la ' +
        'même personne qui l’implémente dans le produit.',
      preuve:
        'Panier moyen en hausse de 50 % sur un e-commerce de joaillerie, 100 000 € de budget ' +
        'ADS / SEO pilotés.',
      decision: 'Quelle source d’acquisition vous coupez le mois prochain, et sur quel chiffre.',
    },
  ],
}
