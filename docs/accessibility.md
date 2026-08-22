# Accessibilité

<!-- TODO : compléter avec les audits réalisés. -->

## Objectif

Conformité **WCAG 2.1 AA** sur les parcours principaux.

> Ces règles **priment sur les défauts d'un template UI importé** : un thème du
> commerce qui désactive des règles a11y ou pose des `div` cliquables doit être
> corrigé, pas suivi.

## Règles pour le front React

- HTML **sémantique** d'abord (`nav`, `main`, `button`…) ; ARIA seulement en complément.
- **Navigation clavier** complète : focus visible, ordre logique, pas de piège de focus.
- **Formulaires** : chaque champ a un `label` associé ; erreurs annoncées (`aria-live`).
- **Contrastes** : ratio ≥ 4.5:1 pour le texte courant. Les **seize valeurs** de la
  palette des pôles (`--accent` et `--accent-vif`, quatre pôles, deux thèmes) sont
  mesurées et tabulées dans [`design.md`](./design.md) :
  `--accent-vif` est **non-texte uniquement**, il est entre 3.5:1 et 3.9:1 en thème clair.
- **La couleur n'est jamais le seul porteur d'information** (WCAG 1.4.1). La teinte de
  pôle double une information déjà écrite — le nom du pôle, sa place, son temps. La
  limite connue de cette palette sous vision dichromate est documentée dans `design.md`,
  chiffres à l'appui, plutôt que passée sous silence.
- **Images** : `alt` pertinent (ou vide si décorative).

## Checklist par composant

- [ ] Élément interactif = vrai `button` / `a` (jamais un `div` avec `onClick` seul).
- [ ] Accessible et actionnable au **clavier** (Tab, Entrée/Espace) ; focus visible.
- [ ] Champs de formulaire reliés à un `label` (`htmlFor`/`id`) ; erreur en `aria-live`.
- [ ] Icône seule → `aria-label` ; image décorative → `alt=""`.
- [ ] Contraste texte/fond ≥ 4.5:1 (≥ 3:1 pour le grand texte).
- [ ] État dynamique (chargement, ouverture) annoncé (`aria-busy`, `aria-expanded`).

## Vérification

- Lint accessibilité (règles a11y de Biome).
- Audit manuel clavier + lecteur d'écran sur les parcours critiques.

| Parcours | Audit | État |
|----------|-------|------|
| _TODO_ | | |
