import { mailtoObfusque, segmenterEmail } from '@/utils/email'

interface ILienEmailProps {
  /** Adresse à publier. Vient toujours du contenu typé, jamais d'une chaîne écrite ici. */
  email: string
  className?: string
}

/**
 * Lien `mailto:` dont l'adresse est obfusquée au rendu, SANS rien coûter à personne.
 *
 * La méthode et ses limites sont documentées en tête de `utils/email.ts`. Ce qu'il faut
 * en retenir ici, c'est ce que le composant garantit :
 *
 * - **lisible par un lecteur d'écran** : le nom accessible du lien est la concaténation
 *   des trois fragments, dans l'ordre du DOM — donc l'adresse exacte. Aucun texte n'est
 *   masqué, inversé, ni remplacé ;
 * - **sélectionnable et copiable** : les trois `span` sont du texte normal et voisins
 *   sans espace ; une sélection rend l'adresse telle quelle. Aucun leurre n'est glissé
 *   entre eux, précisément pour que le presse-papier reste propre ;
 * - **activable au clavier** : c'est un `a[href]`, donc focalisable et activable par
 *   Entrée. Le `href` est percent-encodé, forme que le navigateur décode avant de la
 *   passer au client de messagerie ;
 * - **sans JavaScript** : rien n'est reconstruit à l'exécution. Le site est prérendu, et
 *   une adresse qui n'apparaîtrait qu'après hydratation serait perdue pour un visiteur
 *   sans script — c'est-à-dire remplacer un problème de robots par un problème d'humains.
 *
 * ----------------------------------------------------------------------------------
 * POURQUOI TROIS EXPRESSIONS ET NON TROIS `<span>`.
 *
 * La première version enveloppait chaque fragment dans un `span`. Mesuré : le nom
 * accessible du lien devenait « jeromemarichez @ ik.me ». Ce n'est pas un détail de
 * rendu, c'est l'algorithme de calcul du nom accessible (accname) qui SÉPARE PAR UNE
 * ESPACE le résultat de chaque enfant de type ÉLÉMENT. Un lecteur d'écran annonçait donc
 * une adresse qui n'existe pas, et l'obfuscation coûtait exactement ce qu'elle n'avait pas
 * le droit de coûter.
 *
 * Trois expressions JSX adjacentes produisent trois NŒUDS DE TEXTE, pas trois éléments :
 * accname les concatène sans rien insérer, le nom accessible redevient l'adresse exacte,
 * et `textContent` — donc la sélection et la copie — aussi.
 *
 * Le découpage subsiste néanmoins dans le HTML SERVI : au rendu serveur, React sépare
 * deux nœuds de texte adjacents par un commentaire vide (`<!-- -->`) pour pouvoir les
 * distinguer à l'hydratation. C'est ce commentaire qui casse la contiguïté de la chaîne
 * pour un moissonneur, sans exister ni pour l'utilisateur, ni pour l'arbre d'accessibilité,
 * ni pour `textContent`.
 *
 * Cette seconde couche repose donc sur un détail d'implémentation de React, et c'est
 * assumé : elle ne fait que S'AJOUTER à l'obfuscation du `href`, qui, elle, ne dépend de
 * rien. Le jour où React cesserait d'émettre ces séparateurs, le lien continuerait de
 * fonctionner à l'identique — et le test de `email-obfusque.spec.tsx` qui inspecte le
 * rendu SERVEUR échouerait, ce qui est précisément le rôle qu'on lui donne.
 * ----------------------------------------------------------------------------------
 */
export function LienEmail({ email, className }: ILienEmailProps) {
  const { partieLocale, arobase, domaine } = segmenterEmail(email)

  return (
    <a className={className} href={mailtoObfusque(email)}>
      {partieLocale}
      {arobase}
      {domaine}
    </a>
  )
}
