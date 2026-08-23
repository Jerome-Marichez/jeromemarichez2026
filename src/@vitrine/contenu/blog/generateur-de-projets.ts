// generateur-de-projets.ts — jeromemarichez-fr
// Article — le générateur qui initialise mes projets, ouvert au public.
//
// Véracité (CLAUDE.md) : tout ce qui est affirmé ici vient du README du dépôt
// `bootstrap-claudecode-typescript` (public, licence MIT), et non du post LinkedIn qui a
// annoncé le plugin. Trois écarts au post sont délibérés :
//
// 1. La CI. Le post dit « GitHub Actions ou GitLab CI au choix » ; le README dit que les
//    workflows GitHub Actions sont testés et fonctionnels et que le fichier GitLab généré
//    n'est validé que par le test de fumée. L'article dit la version du README.
// 2. Le plugin est assumé « avant tout personnel », comme le README l'écrit en tête, et
//    non « pensé pour être réutilisé » comme le disait le post.
// 3. Aucune revendication d'adoption, de popularité ou de traction : le dépôt est à zéro
//    étoile au 2026-08-23. Aucun appel à mettre une étoile, à partager ou à contribuer
//    non plus — ce site n'est pas un réseau social.
//
// Pas de champ `source` : l'URL du post d'origine n'a pas été fournie par Jérôme MARICHEZ,
// et une URL ne s'invente ni ne s'approxime (voir `IArticleSource`).

import type { IArticle } from '@/interfaces/IArticle'

export const ARTICLE_GENERATEUR_DE_PROJETS: IArticle = {
  slug: 'un-generateur-de-projets-public-et-personnel',
  titre: 'Un générateur de projets, public et personnel',
  chapo:
    'J’ai ouvert le code du plugin qui initialise mes projets TypeScript : une commande, et ' +
    'le projet existe — documentation, règles, tests, lint, CI. Il est public, et il encode ' +
    'mes conventions à moi. Les deux tiennent ensemble, à condition de le dire.',
  meta: {
    title: 'Un générateur de projets, public et personnel',
    description:
      'Un plugin qui initialise un projet TypeScript complet en une commande : le critère ' +
      'de réussite que je me suis donné, ce que la CI générée vaut réellement, et où ' +
      'devraient vivre vos conventions.',
  },
  datePublication: '2026-08-23',
  // La figure « gabarit » : une forme ouverte du côté de la sortie, et ce qui en sort déjà
  // complet, jusqu'à son aboutissement. Elle dit qu'un point de départ se produit, jamais
  // combien de projets en sont sortis — aucun compte n'est affiché nulle part.
  figure: 'gabarit',
  sections: [
    {
      id: 'le-cout-du-premier-jour',
      titre: 'Ce que coûte le premier jour',
      paragraphes: [
        'Le premier jour d’un projet est celui où l’on décide le plus avec le moins : ' +
          'l’emplacement des tests, le modèle de branches, la limite de taille d’un fichier, ' +
          'ce que la CI refuse de laisser passer. Personne n’a le temps de trancher vraiment, ' +
          'alors on recopie le dernier projet — la moitié du dernier projet, en réalité — et ' +
          'on vit deux ans avec le résultat.',
        'Quand une part du code est produite par un agent, ce jour-là pèse plus lourd encore : ' +
          'les règles qu’un agent applique sont exactement les fichiers posés au démarrage. Une ' +
          'convention absente le premier jour ne s’ajoute pas le quarantième — elle se discute ' +
          'en revue de code, une fois que le code contraire existe déjà.',
      ],
    },
    {
      id: 'un-critere-de-reussite',
      titre: 'Un critère de réussite, pas un squelette',
      paragraphes: [
        'D’où ce plugin, bootstrap-claudecode-typescript : le générateur pose ses questions — ' +
          'type de projet, framework, CI, niveaux de tests — puis écrit l’ensemble. Le critère ' +
          'que je me suis donné tient en une ligne de terminal : make install, make lint, make ' +
          'test et make build passent dès la génération. Un squelette qui ne se construit pas ' +
          'n’est pas un point de départ, c’est une liste de choses à faire — précisément ce ' +
          'qu’on n’a pas le temps de faire le premier jour.',
        'Ce critère décide de tout le reste. La CI générée exécute les vraies cibles du ' +
          'Makefile au lieu d’étapes qui affichent un TODO ; la structure de tests contient un ' +
          'test qui passe, pour que la chaîne d’outils soit prouvée et non supposée ; et les ' +
          'règles qui comptent — la limite de trois cents lignes par fichier, le test écrit ' +
          'avant le code, l’interdiction des doublures de modules — sont portées par des hooks ' +
          'qui refusent, pas par un paragraphe de documentation lu une fois.',
      ],
    },
    {
      id: 'ce-qu-il-n-est-pas',
      titre: 'Ce qu’il n’est pas',
      paragraphes: [
        'Le dépôt est public sous licence MIT, et le plugin reste avant tout personnel : il ' +
          'encode mes conventions et mes habitudes de travail. Utilisable par d’autres, mais ' +
          'les choix — la structure, les hooks, les règles — reflètent ma façon de faire. Je ' +
          'préfère l’écrire en tête du dépôt plutôt que laisser quelqu’un le découvrir à la ' +
          'troisième question du générateur.',
        'L’état de la CI se dit de la même manière. Les workflows GitHub Actions sont testés ' +
          'et fonctionnels ; le fichier GitLab CI produit est conçu pour tourner sur les deux ' +
          'exécuteurs, mais il n’est validé que par le test de fumée du générateur. C’est ' +
          'l’état de la validation, pas celui de l’intention — et c’est exactement ce que ' +
          'j’attends qu’un prestataire me dise avant que je m’engage sur son travail.',
      ],
    },
    {
      id: 'ou-vivent-vos-conventions',
      titre: 'Où vivent vos conventions',
      paragraphes: [
        'La question n’est pas de savoir quel générateur adopter — le mien encode mes règles, ' +
          'pas les vôtres. Elle est de savoir où vivent vos conventions : dans un document lu ' +
          'une fois à l’arrivée d’une nouvelle personne, ou dans un outillage rencontré à ' +
          'chaque écriture de fichier. Le premier se périme en silence ; le second échoue ' +
          'bruyamment, à la trois cent unième ligne.',
        'Vient ensuite une décision qui coûte plus qu’elle n’en a l’air : ce que vaut le ' +
          'premier jour de votre prochain projet, et qui le paie. Une équipe qui réimprovise ' +
          'son point de départ à chaque fois le paie deux fois par an, dans la monnaie la plus ' +
          'chère qui soit — les choix qu’elle garde ensuite.',
      ],
    },
  ],
}
