# Accessibilité

## Objectif

Conformité **WCAG 2.1 AA** / RGAA sur les parcours principaux.

> Ces règles **priment sur les défauts d'un template UI importé** : un thème du
> commerce qui désactive des règles a11y ou pose des `div` cliquables doit être
> corrigé, pas suivi.

## Règles pour le front React

- HTML **sémantique** d'abord (`nav`, `main`, `button`…) ; ARIA seulement en complément.
- **Navigation clavier** complète : focus visible, ordre logique, pas de piège de focus.
- **Formulaires** : chaque champ a un `label` associé ; erreurs annoncées (`aria-live`).
- **Contrastes** : ratio ≥ 4.5:1 pour le texte courant, ≥ 3:1 pour les composants
  d'interface (bordures d'éléments interactifs, anneau de focus).
- **Images** : `alt` pertinent (ou vide si décorative).

## Checklist par composant

- [ ] Élément interactif = vrai `button` / `a` (jamais un `div` avec `onClick` seul).
- [ ] Accessible et actionnable au **clavier** (Tab, Entrée/Espace) ; focus visible.
- [ ] Champs de formulaire reliés à un `label` (`htmlFor`/`id`) ; erreur en `aria-live`.
- [ ] Icône seule → `aria-label` ; image décorative → `alt=""`.
- [ ] Contraste texte/fond ≥ 4.5:1 (≥ 3:1 pour le grand texte et les bordures utiles).
- [ ] État dynamique (chargement, ouverture) annoncé (`aria-busy`, `aria-expanded`).
- [ ] L'information n'est jamais portée par la **seule** couleur (WCAG 1.4.1).

---

## Contrastes mesurés — socle de design

Les ratios ci-dessous ne sont pas déclaratifs : ils sont **recalculés à partir du fichier
de jetons lui-même** (`front/src/@shared/styles/tokens.css`), selon la formule de
luminance relative de WCAG 2.1. L'inventaire des combinaisons réellement produites par
les composants vit dans `front/src/@shared/config/contrast-pairs.ts`, et les fonctions de
calcul dans `front/src/@shared/utils/`.

Toutes les combinaisons sont vérifiées **dans les deux thèmes**. Seuils appliqués :
**4.5:1** pour le texte (WCAG 1.4.3), **3:1** pour les composants d'interface
(WCAG 1.4.11).

### Thème clair

| Avant-plan | Arrière-plan | Ratio | Seuil | Usage |
|---|---|---|---|---|
| `--color-text` `#16181c` | `--color-background` `#fcfcfa` | **17.30:1** | 4.5 | texte courant sur le fond de page |
| `--color-text` | `--color-surface` `#ffffff` | **17.77:1** | 4.5 | texte courant dans une carte |
| `--color-text` | `--color-surface-muted` `#f1f0eb` | **15.58:1** | 4.5 | texte courant sur fond atténué |
| `--color-text` | `--color-accent-soft` `#e3eef6` | **15.09:1** | 4.5 | texte courant sur pastille et panneau d'accent |
| `--color-text-muted` `#54585f` | `--color-background` | **6.96:1** | 4.5 | texte secondaire sur le fond de page |
| `--color-text-muted` | `--color-surface` | **7.15:1** | 4.5 | texte secondaire dans une carte |
| `--color-text-muted` | `--color-surface-muted` | **6.26:1** | 4.5 | texte secondaire sur fond atténué |
| `--color-text-muted` | `--color-accent-soft` | **6.07:1** | 4.5 | texte secondaire dans le panneau d'appel à l'action |
| `--color-accent` `#0b4f79` | `--color-background` | **8.49:1** | 4.5 | lien et navigation |
| `--color-accent` | `--color-surface` | **8.72:1** | 4.5 | lien dans une carte |
| `--color-accent` | `--color-surface-muted` | **7.64:1** | 4.5 | lien sur fond atténué |
| `--color-accent` | `--color-accent-soft` | **7.40:1** | 4.5 | texte accent sur pastille |
| `--color-accent-hover` `#083a5a` | `--color-background` | **11.59:1** | 4.5 | lien survolé |
| `--color-accent-hover` | `--color-accent-soft` | **10.11:1** | 4.5 | libellé d'un lien d'action secondaire survolé |
| `--color-accent-contrast` `#ffffff` | `--color-accent` | **8.72:1** | 4.5 | libellé d'un lien d'action plein |
| `--color-accent-contrast` | `--color-accent-hover` | **11.91:1** | 4.5 | libellé d'un lien d'action survolé |
| `--color-border-strong` `#8b8780` | `--color-background` | **3.48:1** | 3 | bordure d'action secondaire |
| `--color-border-strong` | `--color-surface` | **3.57:1** | 3 | bordure interactive dans une carte |
| `--color-border-strong` | `--color-surface-muted` | **3.13:1** | 3 | bordure interactive sur fond atténué |
| `--color-focus` `#0b4f79` | `--color-background` | **8.49:1** | 3 | anneau de focus |
| `--color-focus` | `--color-surface` | **8.72:1** | 3 | anneau de focus dans une carte |
| `--color-focus` | `--color-surface-muted` | **7.64:1** | 3 | anneau de focus sur fond atténué |
| `--color-focus` | `--color-accent-soft` | **7.40:1** | 3 | anneau de focus dans le panneau d'appel à l'action |
| `--color-accent` | `--color-background` | **8.49:1** | 3 | fond d'un lien d'action plein |
| `--color-depth-text` `#f4f8fb` | `--color-depth-top` `#0f4267` | **9.85:1** | 4.5 | texte sur la borne haute du dégradé de profondeur |
| `--color-depth-text` | `--color-depth-bottom` `#072235` | **15.25:1** | 4.5 | texte sur la borne basse, et sur la pastille de rattachement |
| `--color-depth-text-muted` `#b6c9d8` | `--color-depth-top` | **6.18:1** | 4.5 | étiquettes et texte secondaire, borne haute |
| `--color-depth-text-muted` | `--color-depth-bottom` | **9.56:1** | 4.5 | étiquettes et texte secondaire, borne basse |

### Thème sombre

| Avant-plan | Arrière-plan | Ratio | Seuil | Usage |
|---|---|---|---|---|
| `--color-text` `#e9ebee` | `--color-background` `#0e1013` | **15.95:1** | 4.5 | texte courant sur le fond de page |
| `--color-text` | `--color-surface` `#171a1f` | **14.60:1** | 4.5 | texte courant dans une carte |
| `--color-text` | `--color-surface-muted` `#1f2329` | **13.21:1** | 4.5 | texte courant sur fond atténué |
| `--color-text` | `--color-accent-soft` `#152430` | **13.25:1** | 4.5 | texte courant sur pastille et panneau d'accent |
| `--color-text-muted` `#a7aeb8` | `--color-background` | **8.52:1** | 4.5 | texte secondaire sur le fond de page |
| `--color-text-muted` | `--color-surface` | **7.80:1** | 4.5 | texte secondaire dans une carte |
| `--color-text-muted` | `--color-surface-muted` | **7.06:1** | 4.5 | texte secondaire sur fond atténué |
| `--color-text-muted` | `--color-accent-soft` | **7.08:1** | 4.5 | texte secondaire dans le panneau d'appel à l'action |
| `--color-accent` `#7fc1f0` | `--color-background` | **9.79:1** | 4.5 | lien et navigation |
| `--color-accent` | `--color-surface` | **8.96:1** | 4.5 | lien dans une carte |
| `--color-accent` | `--color-surface-muted` | **8.11:1** | 4.5 | lien sur fond atténué |
| `--color-accent` | `--color-accent-soft` | **8.13:1** | 4.5 | texte accent sur pastille |
| `--color-accent-hover` `#a8d5f7` | `--color-background` | **12.27:1** | 4.5 | lien survolé |
| `--color-accent-hover` | `--color-accent-soft` | **10.19:1** | 4.5 | libellé d'un lien d'action secondaire survolé |
| `--color-accent-contrast` `#07131c` | `--color-accent` | **9.64:1** | 4.5 | libellé d'un lien d'action plein |
| `--color-accent-contrast` | `--color-accent-hover` | **12.09:1** | 4.5 | libellé d'un lien d'action survolé |
| `--color-border-strong` `#6b7380` | `--color-background` | **3.98:1** | 3 | bordure d'action secondaire |
| `--color-border-strong` | `--color-surface` | **3.65:1** | 3 | bordure interactive dans une carte |
| `--color-border-strong` | `--color-surface-muted` | **3.30:1** | 3 | bordure interactive sur fond atténué |
| `--color-focus` `#7fc1f0` | `--color-background` | **9.79:1** | 3 | anneau de focus |
| `--color-focus` | `--color-surface` | **8.96:1** | 3 | anneau de focus dans une carte |
| `--color-focus` | `--color-surface-muted` | **8.11:1** | 3 | anneau de focus sur fond atténué |
| `--color-focus` | `--color-accent-soft` | **8.13:1** | 3 | anneau de focus dans le panneau d'appel à l'action |
| `--color-accent` | `--color-background` | **9.79:1** | 3 | fond d'un lien d'action plein |
| `--color-depth-text` `#eef4f8` | `--color-depth-top` `#0c3550` | **11.53:1** | 4.5 | texte sur la borne haute du dégradé de profondeur |
| `--color-depth-text` | `--color-depth-bottom` `#061b2a` | **15.80:1** | 4.5 | texte sur la borne basse, et sur la pastille de rattachement |
| `--color-depth-text-muted` `#adc0d0` | `--color-depth-top` | **6.84:1** | 4.5 | étiquettes et texte secondaire, borne haute |
| `--color-depth-text-muted` | `--color-depth-bottom` | **9.37:1** | 4.5 | étiquettes et texte secondaire, borne basse |

**Total : 28 combinaisons inventoriées, 56 mesures (deux thèmes), aucun échec.**

**Combinaison la plus juste** : `--color-border-strong` sur `--color-surface-muted` en
thème clair, à **3.13:1** pour un seuil de 3. C'est la marge la plus faible du socle :
toute modification de `--color-border-strong` ou de `--color-surface-muted` doit être
revérifiée. Les quatre combinaisons de profondeur, elles, sont larges — la plus juste,
`--color-depth-text-muted` sur `--color-depth-top` en thème clair, tient **6.18:1** pour
un seuil de 4.5.

**Texte posé sur un dégradé.** Un ratio ne se calcule que contre une couleur unie, et
un dégradé en présente une infinité. Les quatre combinaisons de profondeur sont mesurées
contre les **deux bornes** du dégradé, ce qui suffit à le couvrir entièrement :
`--color-depth-bottom` est plus sombre que `--color-depth-top` sur les trois canaux, donc
toute couleur intermédiaire a une luminance comprise entre celles des deux bornes, et le
ratio avec un avant-plan clair est encadré par les deux ratios mesurés. Cet
ordonnancement canal par canal est ce qui rend la démonstration valide : il est à
revérifier avant toute retouche d'une borne.

`--color-border` (séparations décoratives) n'est volontairement pas soumis à un seuil :
il ne porte aucune information et ne délimite aucun élément interactif. Le jour où une
bordure devient nécessaire à la compréhension d'un contrôle, c'est
`--color-border-strong` qu'il faut employer.

**Combinaison écartée** : `--color-border` sur `--color-accent-soft` a été mesurée à
**1.19:1** en thème clair et **1.21:1** en thème sombre. Le panneau d'appel à l'action de
la page d'accueil ne porte donc **aucun filet** : son fond seul le délimite. Une bordure y
aurait été invisible, et l'y ajouter « pour la forme » aurait laissé croire à une
séparation là où l'œil n'en perçoit aucune.

## Navigation clavier — socle de design

Vérifié sur le layout global (en-tête, contenu, pied de page) dans Chrome, en thème clair
et en thème sombre.

| Point | État | Détail |
|-------|------|--------|
| Lien d'évitement | OK | Premier élément focusable du document, avant l'en-tête. `href="#contenu"`, cible existante. |
| Restitution du lien d'évitement | OK | Toujours rendu (`display: block`, `visibility: visible`) : seulement déplacé hors du champ visuel par une transformation, donc jamais retiré de l'ordre de tabulation. Il revient dans le viewport au focus (mesuré : de `top: -70px` à `top: 8px`). |
| Déplacement réel du focus | OK | `main` porte `id="contenu"` et `tabIndex={-1}` : le saut déplace le focus, pas seulement le défilement. `tabIndex={-1}` n'ajoute pas de tabulation supplémentaire. |
| Indicateur de focus | OK | Règle `:focus-visible` globale, `3px solid var(--color-focus)` avec 2 px de décalage. Jamais neutralisée nulle part dans le socle. |
| Ordre de tabulation | OK | Ordre du DOM : lien d'évitement, identité, cinq entrées de navigation, puis le contenu, puis le pied de page. Aucun `tabindex` positif. |
| Piège de focus | Sans objet | Aucun menu déroulant, aucune modale, aucun élément d'interface à état dans le socle. |
| Régions | OK | Exactement un `header`, un `main`, un `footer` par page. |
| Navigations nommées | OK | Deux `nav` distinctes, nommées « Navigation principale » et « Navigation de pied de page » — obligatoire dès qu'il y en a plusieurs. |
| Page courante | OK | `aria-current="page"` posé par `NavLink`, doublé d'un soulignement épaissi : l'information n'est pas portée par la seule couleur (WCAG 1.4.1). |
| Cible tactile | OK | 44 px de hauteur utile pour `ActionLink`, au-delà du minimum de 24 px de WCAG 2.5.8. |
| Lien externe | OK | `ActionLink` avec `external` ajoute `rel="noopener noreferrer"` et une mention « (nouvelle fenêtre) » restituée aux lecteurs d'écran. |

## Rendu de 320 px à 1920 px

Mesuré dans Chrome (headless, pilotage CDP) sur dix largeurs — 320, 360, 390, 414, 600,
768, 1024, 1280, 1440 et 1920 px — dans les **deux thèmes**.

Résultat : **aucun défilement horizontal** (`documentElement.scrollWidth` égal à la
largeur du viewport dans les 40 mesures du socle, puis dans les 20 mesures de la page
d'accueil complète), et aucun élément débordant du viewport — la sonde énumère les
descendants de `body` dont le bord droit dépasse `clientWidth`, et n'en trouve aucun.

Trois garde-fous portent ce résultat, aucun ne consistant à masquer le débordement
(`overflow-x: hidden` n'est employé nulle part) :

- `overflow-wrap: break-word` sur `body` : une URL ou une adresse e-mail longue se coupe
  au lieu d'élargir le document.
- `min-width: 0` sur les conteneurs flex et grid : sans cela un enfant large impose sa
  largeur au parent.
- `max-width: 100%` sur tous les médias.

Le thème suit `prefers-color-scheme` : fond mesuré à `rgb(252, 252, 250)` en clair et
`rgb(14, 16, 19)` en sombre, sans intervention. L'attribut `data-theme` sur `:root`
permet de forcer l'un ou l'autre si un sélecteur de thème est ajouté plus tard.

## Structure de la page d'accueil

Relevée **sur la page servie** par `next start`, pas sur la source — c'est le seul
endroit où l'on voit ce qu'un lecteur d'écran reçoit.

| Point | Mesure | État |
|-------|--------|------|
| Titre de niveau 1 | `document.querySelectorAll('h1').length` vaut **1** | OK |
| Continuité des niveaux | Séquence relevée : `h1, h2, h3×4, h2, h3×2, h2, h3×2, h2, h3×3, h2, h3×6, h2` — aucun saut de niveau | OK |
| Régions nommées | **7** `section[aria-labelledby]` dans `main`, une par section de la page | OK |
| Thème restitué | `rgb(252, 252, 250)` en clair, `rgb(14, 16, 19)` en sombre, sans intervention | OK |

Deux points relèvent de WCAG 1.4.1 (« l'information n'est jamais portée par la seule
couleur ») et sont traités par construction :

- l'**ordre** de la chaîne et des chemins d'étapes est porté par des listes ordonnées
  (`ol`) et par un rang écrit en toutes lettres (« Étape 1 »), jamais par la seule
  disposition ;
- le **filet de liaison** entre deux étapes est un pseudo-élément au `content` vide : il
  ne peut être ni annoncé, ni nécessaire à la compréhension.

Le motif de profondeur n'introduit aucun élément interactif sur le dégradé : les
maillons de la chaîne et le panneau du constat ne contiennent aucun lien. Aucun anneau
de focus n'a donc à être mesuré contre les bornes du dégradé.

## Vérification

- Lint accessibilité (règles a11y de Biome) — `make lint`.
- Recalcul des contrastes depuis `tokens.css` (voir la section ci-dessus).
- Audit manuel clavier + lecteur d'écran sur les parcours critiques.
- Tests d'acceptation non fonctionnels : `tests/acceptance/uat/`.

| Parcours | Audit | État |
|----------|-------|------|
| Layout global (en-tête, contenu, pied de page) | Contrastes recalculés, clavier, 320→1920 px, deux thèmes | Vérifié |
| Page d'accueil | Contrastes recalculés (28 couples), 320→1920 px dans les deux thèmes, hiérarchie de titres et régions relevées sur la page servie | Vérifié |
| Pages de services | — | À faire (autre lot) |
| Parcours | — | À faire (autre lot) |
| Formulaire de contact | — | À faire (autre lot) ; couleurs d'état à définir et à mesurer |

## Restes à faire

- **Lecteur d'écran** : le socle a été vérifié par mesure et par inspection du DOM, pas
  encore avec VoiceOver ou NVDA. À faire avant la première mise en ligne.
- **Couleurs d'état** (succès, alerte, erreur) : non définies, car aucun écran n'en
  produit encore. À ajouter avec le formulaire de contact, et à soumettre au même
  contrôle de contraste.
- **Zoom 200 % et zoom texte seul** (WCAG 1.4.4 / 1.4.10) : non mesurés. La mise en page
  étant fluide et exprimée en `rem`, le risque est faible, mais cela reste à vérifier.
