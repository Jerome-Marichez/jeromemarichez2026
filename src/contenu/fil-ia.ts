// fil-ia.ts (jeromemarichez-fr)
// Le fil IA : l'axe transverse. La méthode de production, pas l'offre.
//
// Ce n'est pas un quatrième pôle et ce n'est pas une charnière. Les charnières passent
// la main d'un pôle au suivant ; ce fil-ci les traverse tous. Il répond à une confusion
// que le site crée lui-même : l'IA y apparaît deux fois, comme offre (le pôle IA) et
// comme méthode de production (partout). Sans cette section, le lecteur les mélange.
//
// ## Où il vit, et pourquoi il a bougé (issue #103)
//
// Il ouvrait la page d'accueil. L'accueil est devenu une vitrine : le détail est descendu
// sur les pages de pôle, et une section de méthode de production y est du détail. Elle a
// donc suivi le mouvement, sur `/services/ingenierie-web/`, la page où le site dit
// comment le code est produit, et où le chapitre « qualité » revendiquait déjà le
// développement piloté par les tests en IA augmentée.
//
// **Pas sur `/services/ia/`, et c'est la règle qu'il ne faut pas casser** : ce fil existe
// pour séparer l'IA-offre de l'IA-méthode. Le poser sur la page de l'offre IA fondrait
// exactement les deux choses qu'il est là pour distinguer.
//
// L'accueil, lui, n'est pas muet sur la méthode : `HERO_ACCUEIL.methode` la dit en une
// phrase dès le seuil, au-dessus de la ligne de flottaison. C'est la version condensée
// que l'issue #103 proposait comme alternative, et elle existait déjà.
//
// Véracité (CLAUDE.md) : rien ici n'est nouveau. Chaque preuve citée est déjà portée
// par un pôle et sourcée dans les CV de référence. La seule affirmation propre à cette
// section est la méthode de travail elle-même (outillage Claude Code / Gemini piloté
// par les tests) que le CLAUDE.md revendique déjà comme différenciateur assumé.

import type { IEditorialSection } from '@/interfaces/IEditorialSection'

export const SECTION_FIL_IA: IEditorialSection = {
  id: 'fil-ia',
  kind: 'fil',
  kicker: 'Le fil · tous les pôles',
  titre: 'Je conçois, je développe et je pilote avec l’IA',
  chapo:
    'L’IA est ce que je livre au pôle IA, et la façon dont je travaille sur tous. Ici, la ' +
    'seconde : elle propose, les tests tranchent.',
  blocs: [
    {
      titre: 'Concevoir : instruire les options, pas les recevoir',
      decision: 'Le scénario d’architecture retenu, ceux qui ont été écartés, et sur quel critère.',
    },
    {
      titre: 'Construire : Claude Code et Gemini, pilotés par les tests',
      preuve:
        'Jest, Cypress, Playwright, mutation Stryker. Certification ISTQB Foundation. Ce ' +
        'site est construit ainsi, de bout en bout.',
      decision: 'Ce que vous acceptez de faire produire par une IA, et le filet exigé en dessous.',
    },
    {
      titre: 'Livrer : l’IA dans le produit qui tourne',
      texte:
        'De l’IA qui tourne chez vous, coût d’inférence, latence et RGPD tenus. Pas ma ' +
        'manière d’écrire du code.',
      preuve:
        'Modèle supervisé en production, fine-tuning de Llama 3 sur corpus métier, RAG ' +
        'documentaire fait maison.',
    },
    {
      titre: 'Piloter : le SEA et l’UX décidés sur ce que la donnée dit',
      preuve:
        'Panier moyen en hausse de 50 % sur un e-commerce de joaillerie, 100 000 € de budget ' +
        'ADS / SEO pilotés.',
      decision: 'Quelle source d’acquisition vous coupez le mois prochain, et sur quel chiffre.',
    },
  ],
}
