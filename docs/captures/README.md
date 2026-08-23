# Captures de référence

Planches **avant / après** attachées à une décision de design documentée. Ce ne sont pas
des pages de documentation : ce sont les **pièces** d'un raisonnement qui vit ailleurs —
ici [`docs/design.md`](../design.md).

Elles ne sont **pas servies** : `next.config.mjs` exporte `src/app` et `public`, jamais
`docs/`. Elles ne pèsent donc rien sur le site ni sur les budgets Lighthouse.

## Ce qui vaut pour une planche de ce dossier

Une comparaison n'a de valeur que si **une seule variable** a bougé. Les planches ci-après
sont donc produites en injectant les réglages d'**avant** dans la page d'après, au lieu de
capturer deux versions du dépôt : même navigateur, même position de défilement, même rendu
de texte, même instant. Deux captures prises de part et d'autre d'un `git checkout`
montreraient aussi tout ce qui a bougé entre les deux.

Deux pièges, rencontrés et corrigés dans le script :

- `page.screenshot({ clip })` interprète `clip` dans les coordonnées du **document**,
  `getBoundingClientRect()` dans celles du **viewport**. Sur une bande `sticky`, dont le
  rect vaut toujours y≈0, on recapture indéfiniment le haut du document. On capture le
  viewport entier, on recadre au canvas ;
- `globals.css` pose `scroll-behavior: smooth` : un `scrollIntoView` encore en cours entre
  les deux captures les décadre l'une par rapport à l'autre, et le décalage se lit comme
  un effet. `behavior: 'instant'`.

## Les planches

| Fichier | Ce qu'elle montre | Issue |
|---|---|---|
| `115-verre-bandes.png` | l'en-tête et la barre de pôle empilés, à la position où la mesure a trouvé le pire fond sous la barre — `/services/data/`, 3288px | #115 |
| `115-verre-entete.png` | l'en-tête seul, à la position du pire cas en thème clair : l'aplat d'accent du bouton du seuil passe dessous — accueil, 528px | #115 |
| `115-verre-actions.png` | les deux actions du seuil : l'action principale reste un aplat, l'action secondaire devient une pastille de verre | #115 |
| `115-verre-contact.png` | le bloc de contact, qui passe d'un voile sans flou à un vrai panneau de verre | #115 |

Chaque planche porte les quatre cases : avant / après × thème clair / thème sombre.
