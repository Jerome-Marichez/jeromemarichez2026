// export-statique.ts — jeromemarichez-fr
// Article — pourquoi ce site est un export statique.
//
// Véracité (CLAUDE.md) : tout ce qui est affirmé ici est vérifiable dans ce dépôt —
// `output: 'export'` et `trailingSlash` dans next.config.mjs, l'absence de route API,
// le mailto du pied de page. Aucun chiffre de performance n'est revendiqué pour ce
// site : la cible est annoncée comme une cible, pas comme un résultat mesuré.

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_EXPORT_STATIQUE: IArticle = {
  slug: 'pourquoi-ce-site-est-un-export-statique',
  titre: 'Pourquoi ce site est un export statique',
  chapo:
    'Ce site ne tourne sur aucun serveur applicatif : la commande de build écrit des ' +
    'fichiers, et un serveur de fichiers les sert. C’est un arbitrage, pas un réglage — ' +
    'il ferme des portes, et je préfère dire lesquelles.',
  meta: {
    title: 'Pourquoi ce site est un export statique',
    description:
      'L’arbitrage derrière l’export statique de ce site : ce qu’il ferme (routes API, ' +
      'ISR, formulaire), ce qu’il ouvre, et quand il ne faut pas le choisir.',
  },
  datePublication: '2026-08-21',
  // La figure « borne » : ce qui est produit s'arrête à une ligne, et au-delà — tireté —
  // le serveur applicatif qui n'existe plus. C'est le sujet de l'article, en une forme.
  figure: 'borne',
  sections: [
    {
      id: 'ce-que-ca-ferme',
      titre: 'Ce que ça ferme',
      paragraphes: [
        'Le build ne produit pas un serveur, il produit un dossier. Conséquence immédiate : ' +
          'plus de route API, plus de rendu à la requête, plus d’action serveur, plus ' +
          'd’optimiseur d’images à la volée. Ce ne sont pas des options désactivées quelque ' +
          'part, ce sont des capacités que le site n’a plus.',
        'La première victime est le formulaire de contact. Il aurait fallu un service tiers ' +
          'ou un back séparé pour recevoir un message ; j’ai préféré une adresse en clair, qui ' +
          'arrive directement chez la personne qui fera le travail. C’est cohérent avec ce que ' +
          'le site vend, et c’est une capacité en moins à exploiter.',
      ],
    },
    {
      id: 'ce-que-ca-ouvre',
      titre: 'Ce que ça ouvre',
      paragraphes: [
        'Un site en fichiers plats se déplace : il tient derrière n’importe quel serveur ' +
          'statique, il n’a ni processus à surveiller ni dépendance à mettre à jour en urgence, ' +
          'et sa surface d’attaque se réduit à ce qui est servi. La cible de performance et ' +
          'd’accessibilité que je m’impose ici devient tenable sans acrobatie de cache.',
        'Il y a une contrepartie de rigueur : chaque page doit déclarer elle-même son adresse ' +
          'canonique et ses données structurées, parce qu’aucun serveur ne viendra les corriger ' +
          'après coup. Une URL fausse dans un export statique reste fausse jusqu’au prochain ' +
          'build.',
      ],
    },
    {
      id: 'quand-ne-pas-le-choisir',
      titre: 'Quand ne pas le choisir',
      paragraphes: [
        'Dès qu’un contenu dépend de qui regarde, ou qu’il change plusieurs fois par jour, ' +
          'l’export statique cesse d’être le bon outil : espace client, panier, tableau de bord, ' +
          'catalogue alimenté par un stock en direct. Le rendre statique quand même se paie en ' +
          'contournements, et les contournements se paient en incidents.',
        'La question à trancher n’est donc pas « statique ou dynamique » mais : qu’est-ce qui, ' +
          'sur ce site, change à quelle fréquence et pour qui ? La réponse décide de la ' +
          'stratégie de rendu, page par page — et elle peut très bien être différente d’une ' +
          'page à l’autre du même produit.',
      ],
    },
  ],
}
