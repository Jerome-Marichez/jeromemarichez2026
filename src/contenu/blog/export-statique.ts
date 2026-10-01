// export-statique.ts (jeromemarichez-fr)
// Article porte tel quel depuis l'ancien site : pourquoi ce site est un export
// statique. Titre, plan et formulations restent ceux de Jerome MARICHEZ (CLAUDE.md,
// « on le porte, on ne le reecrit pas »). Aucun tiret cadratin dans le texte source :
// rien a reformuler de ce cote.

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_EXPORT_STATIQUE: IArticle = {
  slug: 'pourquoi-ce-site-est-un-export-statique',
  titre: 'Pourquoi ce site est un export statique',
  chapo:
    'Ce site ne tourne sur aucun serveur applicatif : la commande de build écrit des ' +
    'fichiers, et un serveur de fichiers les sert. C’est un arbitrage, pas un réglage : ' +
    'il ferme des portes, et je préfère dire lesquelles.',
  metaDescription:
    'L’arbitrage derrière l’export statique de ce site : ce qu’il ferme (routes API, ' +
    'ISR, formulaire), ce qu’il ouvre, et quand il ne faut pas le choisir.',
  datePublication: '2026-08-21',
  corpsHtml: `
    <h2>Ce que ça ferme</h2>
    <p>Le build ne produit pas un serveur, il produit un dossier. Conséquence immédiate : plus de route API, plus de rendu à la requête, plus d’action serveur, plus d’optimiseur d’images à la volée. Ce ne sont pas des options désactivées quelque part, ce sont des capacités que le site n’a plus.</p>
    <p>La première victime est le formulaire de contact. Il aurait fallu un service tiers ou un back séparé pour recevoir un message ; j’ai préféré une adresse en clair, qui arrive directement chez la personne qui fera le travail. C’est cohérent avec ce que le site vend, et c’est une capacité en moins à exploiter.</p>
    <h2>Ce que ça ouvre</h2>
    <p>Un site en fichiers plats se déplace : il tient derrière n’importe quel serveur statique, il n’a ni processus à surveiller ni dépendance à mettre à jour en urgence, et sa surface d’attaque se réduit à ce qui est servi. La cible de performance et d’accessibilité que je m’impose ici devient tenable sans acrobatie de cache.</p>
    <p>Il y a une contrepartie de rigueur : chaque page doit déclarer elle-même son adresse canonique et ses données structurées, parce qu’aucun serveur ne viendra les corriger après coup. Une URL fausse dans un export statique reste fausse jusqu’au prochain build.</p>
    <h2>Quand ne pas le choisir</h2>
    <p>Dès qu’un contenu dépend de qui regarde, ou qu’il change plusieurs fois par jour, l’export statique cesse d’être le bon outil : espace client, panier, tableau de bord, catalogue alimenté par un stock en direct. Le rendre statique quand même se paie en contournements, et les contournements se paient en incidents.</p>
    <p>La question à trancher n’est donc pas « statique ou dynamique » mais : qu’est-ce qui, sur ce site, change à quelle fréquence et pour qui ? La réponse décide de la stratégie de rendu, page par page, et elle peut très bien être différente d’une page à l’autre du même produit.</p>
  `.trim(),
}
