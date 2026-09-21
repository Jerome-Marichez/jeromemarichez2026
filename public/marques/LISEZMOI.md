# Logos des marques citées dans les projets

Ce dossier ne contient que des **marques appartenant à des tiers**. Chaque fichier y est
donc accompagné de sa provenance, de sa date de récupération et de son titulaire. Un
fichier dont on ne saurait pas dire d'où il vient n'a rien à faire ici.

Le logo s'affiche à côté du titre de la fiche projet, sur **fond transparent** (aucune
pastille) : voir `src/components/LogoMarque/index.tsx`. Pour publier un logo : déposer le
fichier, l'inscrire dans le tableau ci-dessous, puis renseigner l'entrée correspondante
dans `src/contenu/marques.ts` avec `largeur` et `hauteur`, les dimensions intrinsèques du
fichier réellement servi : ce sont elles qui réservent la place et évitent tout décalage
de mise en page au chargement (CLS).

## Fichiers déposés

| Fichier | Source | Titulaire | Récupéré le |
|---|---|---|---|
| `acetelecom.png` | https://www.acetelecom.fr/img/ACETELECOM.jpg | Acetelecom | 2026-09-21 |
| `sms-en-masse.svg` | fourni par Jérôme MARICHEZ, logo de marque officiel | Acetelecom | 2026-09-21 |
| `prezage.png` | icône Play Store de `fr.acetelecom.monavenir` | Acetelecom | 2026-09-21 |
| `verhoeven-joaillier.svg` | https://www.verhoeven-joaillier.com/themes/classic_child/assets/img/logo-mobile.svg | Verhoeven Joaillier | 2026-09-21 |
| `truffle-capital.svg` | https://www.truffle.com/themes/TruffleTheme/static/favicon.svg | Truffle Capital | 2026-09-21 |

Les cinq logos appartiennent à leurs titulaires respectifs et ne sont utilisés ici que
pour **identifier factuellement** les projets d'un CV, sans suggérer de partenariat, de
parrainage ni d'affiliation.

## Traitement appliqué : fond transparent sur `--fond`

Le site n'a qu'un thème, sombre (`docs/design.md`), et le logo est posé directement sur
`--fond` (#232020), sans pastille. Trois des cinq fichiers d'origine n'étaient pas lisibles
dans ces conditions et ont été retravaillés le 2026-09-21, **sur notre copie uniquement** :
le fichier original côté titulaire n'est pas modifié, seule la copie déposée ici l'est.

Le cas de Sms En Masse mérite d'être noté, parce qu'il montre ce que vaut un bon fichier
source. Le dossier servait d'abord `sms-en-masse.png`, l'**icône d'application** du site,
récupérée faute de mieux : un pictogramme, sans le nom de la marque. Jérôme MARICHEZ a
fourni le **logo de marque** en SVG, qui porte le nom et qui est déjà dessiné pour un fond
sombre. Aucune recoloration n'a donc été nécessaire, contrairement aux trois autres.

| Fichier | État d'origine | Traitement appliqué |
|---|---|---|
| `sms-en-masse.svg` | logo de marque, blanc et turquoise `#09c4bf` sur transparent, donc déjà dessiné pour un fond sombre | aucun |
| `prezage.png` | carré jaune plein `#ffd100` | aucun, c'est la forme réelle de l'icône |
| `verhoeven-joaillier.svg` | tracés en `#020204` (quasi noir), invisibles sur `--fond` (contraste mesuré 1.28:1) | tracés recolorés en `#f7f2f2` (`--encre`), fond resté transparent |
| `truffle-capital.svg` | tracé en `#294276` (bleu nuit), invisible sur `--fond` (contraste mesuré 1.64:1) | tracé recoloré en `#f7f2f2` (`--encre`), fond resté transparent |
| `acetelecom.jpg` → `acetelecom.png` | fond blanc opaque, encre grise (`#545454` au plus sombre), invisible une fois le blanc rendu transparent (contraste mesuré 2.13:1 sur `--fond`) | converti en PNG : le blanc d'origine devient transparent, l'encre restante est recolorée en `#f7f2f2` (`--encre`) par un remappage d'alpha sur la luminance, sans redessiner le tracé |

Ces trois recolorations ne changent ni la forme ni la composition des logos : elles
adaptent uniquement leur couleur au thème sombre du site, exactement comme le ferait un
mode sombre appliqué à un logo monochrome. Aucun logo n'a été redessiné.

> **À arbitrer par Jérôme MARICHEZ si le traitement ne convient pas.** Recolorer trois
> logos en blanc cassé pour les rendre lisibles sur fond transparent est le traitement
> jugé le plus proche des deux contraintes demandées (fond transparent, pas de pastille) ;
> si un titulaire imposait une charte stricte sur la couleur de son logo, ce traitement
> serait à revoir avec lui.
