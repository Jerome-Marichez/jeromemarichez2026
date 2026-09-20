---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/views/HomeView"]
---

## Scope

Site CV `jeromemarichez.fr`. Surface primaire : l'accueil. Mode visiteur : **Persuade**
(le recruteur décide d'accorder un entretien). Les pages de lecture (parcours,
compétences) héritent de ce monde en mode **Read**.

## Audience et tâche

Recruteur ou manager technique, arrivé de LinkedIn ou d'une candidature, souvent sur
mobile. Trente secondes pour jauger, puis lecture détaillée. Action attendue :
accorder l'entretien, et dans l'immédiat télécharger le CV ou ouvrir le parcours.

## Direction contract

**THESIS.** Le site est le poste de travail où ce métier se fait réellement, à l'heure
où il se fait : nuit, mug tiède, une seule lampe. Il refuse l'arrangement que cette
catégorie livre par défaut, le héros centré suivi d'une grille de cartes de projets
égales, parce qu'une grille de cartes traite neuf ans comme six vignettes
interchangeables. Ici le contenu est disposé comme du code se lit : aligné, indenté,
annoté, dense là où la densité est une preuve.

**OWN-WORLD.** Fond café torréfié `#232020`, et une seule source de lumière, le café
au lait `#D48646`, qui possède des régions entières plutôt que de saupoudrer des accents.
Crème `#f7f2f2` pour l'encre, `#bebebe` pour le second plan. La coloration syntaxique
existante (`#a6e22e` sélecteur, `#cb7832` variable, `#6a8759` chaîne, `#e0c46c` addition)
sert de palette secondaire, et elle ne sert **qu'à du code réel**. Fira Code sur tout,
Shadows Into Light réservé à l'annotation manuscrite, la voix humaine dans la marge.
Tout s'aligne sur une **grille de caractères** en unités `ch`, jamais sur une grille de
pixels arbitraire : c'est ce qui fait du monospace un système et non un costume. Aucune
carte, aucun encadré à coins arrondis flottant. Les séparations sont des filets d'un
pixel et des changements de fond, comme dans un éditeur.

**STORY.** Le visiteur comprend en une ligne qu'il a devant lui un ingénieur full stack
dont la pratique couvre l'IA, la QA et la donnée, et que ces quatre axes sont une seule
pratique cohérente. Il croit ce qu'il lit parce que chaque affirmation arrive avec son
chiffre. Il fait deux choses : il télécharge le CV, ou il descend lire le parcours.

**FIRST VIEWPORT.** Plein cadre sombre. À gauche, sur la colonne de caractères, le titre
`< Jérôme Marichez />` qui s'écrit lettre à lettre, en très grand, aligné à gauche, sans
sur-titre. Dessous, les quatre axes présentés comme un commentaire de code sur quatre
lignes, chacun avec sa preuve chiffrée en fin de ligne. Sous les axes, deux actions
visibles, « Télécharger le CV » en action primaire dans le café plein, « Voir le
parcours » en action secondaire au filet. À droite, le mug qui fume, seule chose vivante
de l'écran, dont la vapeur monte en continu et dont le café tourne au survol. Un filet
horizontal ferme le premier écran et porte, en très petit, la position et la
disponibilité.

**FORM.** Le Poste de Travail à 3h du matin, direction épinglée par Jérôme MARICHEZ,
première de ma liste ordonnée puisque le brief la pose. Haussée par trois donneurs
nommés : la grille de caractères vient du **service télétexte** (le mono devient une
discipline de mise en page), le mur de stack dense vient de l'**affiche double**
(la densité comme récompense du lecteur attentif), la lumière unique qui possède des
régions vient du **néon soufflé à la main** (l'accent n'est pas saupoudré). Graine du
tirage : `9a1391e4`.

**FINISH.** unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Moment mémorable

Le mug. Il fume en continu, sa vapeur est le seul mouvement permanent du site, et le
café tourne quand on le survole. C'est la signature du portfolio d'origine, reprise et
tenue proprement : `prefers-reduced-motion` l'arrête, et un mécanisme de mise en pause
explicite existe (WCAG 2.2.2).

## Contraintes

- Export statique, aucun appel réseau, aucun formulaire.
- Plancher performance 80, accessibilité 95, RGAA et WCAG AA testés.
- Aucun tiret cadratin dans un texte lu, attributs d'accessibilité compris.
- Aucune affirmation au delà de ce qu'établissent les six CV.

## Décisions non tranchées

- Date de la certification Google Ads (2021 ou 2022), à confirmer par Jérôme MARICHEZ.
- URL des justificatifs de certification, non fournies à ce jour.
