// jointures.ts — jeromemarichez-fr
// Les arêtes de la chaîne : ce que chaque pôle remet au suivant, et à quelle condition.
//
// Trois arêtes pour quatre pôles, parce que la donnée en porte deux :
//
//   ingénierie web  →  data  →  ( ia  et/ou  sea-ux )
//
// Chaque arête dit deux choses, et la seconde compte autant que la première : ce qui est
// requis, et le fait que ce soit une **matière** et non un **achat**. Un prospect qui lit
// « il faut passer par la donnée » sans lire « si vous l'avez déjà, on part de là »
// comprend qu'on lui vend un préalable obligatoire. C'est faux, et c'est repoussant.
//
// Les textes ne citent aucune preuve qui ne soit pas déjà portée par un pôle.

import type { IJointure } from '@/interfaces/IJointure'

export const JOINTURES: IJointure[] = [
  {
    amont: 'ingenierie-web',
    aval: 'data',
    matiere:
      'Un produit en production, exploité et mesuré : c’est le run qui fabrique la ' +
      'donnée, jamais l’inverse. Les règles anti-fraude que j’ai implémentées ne sont pas ' +
      'nées d’une intuition, mais de la reprise de l’historique que l’exploitation avait ' +
      'produit.',
    siDejaEnPlace:
      'Si votre produit tourne déjà, on part de lui. Je ne le réécris pas pour avoir le ' +
      'droit de le mesurer : l’ingénierie web n’est pas un préalable à vous facturer, ' +
      'c’est simplement l’endroit d’où la donnée vient.',
  },
  {
    amont: 'data',
    aval: 'ia',
    matiere:
      'Un métier formalisé et une donnée gouvernée : les règles de décision écrites, ce ' +
      'que dit réellement l’historique, et ce qui a le droit d’être traité. Sans ça, un ' +
      'modèle apprend l’erreur de cadrage au lieu de la corriger.',
    siDejaEnPlace:
      'Si votre stratégie data tient déjà, on la reprend telle quelle et on va droit à la ' +
      'solution. Le pôle data se livre pour lui-même — il ne se rachète pas pour avoir ' +
      'accès à l’IA.',
  },
  {
    amont: 'data',
    aval: 'sea-ux',
    matiere:
      'La même donnée gouvernée, tournée vers l’arbitrage : quel canal financer, quelle ' +
      'étape du parcours supprimer, quelle page rendre autrement. Sans elle, le SEA achète ' +
      'du volume et l’UX redevient une affaire de goût.',
    siDejaEnPlace:
      'Si la mesure est en place et qu’elle est fiable, on arbitre dessus dès le premier ' +
      'jour. Et rien n’oblige à prendre l’IA pour tirer parti de la donnée : les deux ' +
      'suites se prennent séparément ou ensemble.',
  },
]
