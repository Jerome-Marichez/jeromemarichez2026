# Logos des organismes certificateurs

Ce dossier ne contient que des **marques appartenant à des tiers**. Chaque fichier y est
donc accompagné de sa provenance, de sa licence et de la base sur laquelle il est utilisé.
Un fichier dont on ne saurait pas dire d'où il vient n'a rien à faire ici.

Pour publier un logo : déposer le **SVG** (ou un PNG à défaut), l'inscrire dans le tableau
ci-dessous, puis renseigner le champ `logo` de la certification correspondante dans
`src/contenu/certifications.ts` — avec `largeur` et `hauteur`, les dimensions
intrinsèques du fichier : ce sont elles qui réservent la place et évitent tout décalage de
mise en page au chargement (CLS).

## Fichiers déposés

| Fichier | Certification | Provenance | Licence du fichier | Base d'usage |
|---|---|---|---|---|
| `google-cloud.svg` | Claude with Google Cloud's Vertex AI | [Simple Icons](https://simpleicons.org/), slug `googlecloud`, récupéré le 2026-08-21 via `cdn.simpleicons.org` | **CC0 1.0** (licence du dépôt Simple Icons) | Marque de Google LLC. Usage **nominatif et factuel** : désigner une certification réellement obtenue. Logo non modifié, non recoloré, non inversé. |
| `google-analytics.svg` | Google Analytics Individual Qualification | [Simple Icons](https://simpleicons.org/), slug `googleanalytics`, récupéré le 2026-08-21 | **CC0 1.0** | idem |
| `google-ads.svg` | Google Ads | [Simple Icons](https://simpleicons.org/), slug `googleads`, récupéré le 2026-08-21 | **CC0 1.0** | idem |

Les trois fichiers sont des glyphes **monochromes** en `viewBox="0 0 24 24"`, dans la
couleur officielle de leur marque (`#4285F4` pour Google Cloud et Google Ads, `#E37400`
pour Google Analytics). Cette homogénéité est voulue : la grille garde un seul registre
graphique au lieu de sept chartes qui se contredisent.

> **À arbitrer par Jérôme MARICHEZ.** La licence CC0 porte sur le **fichier** Simple Icons,
> pas sur la **marque** : celle-ci reste la propriété de Google et son usage relève des
> *Google Brand Permissions*. L'usage retenu ici — mentionner factuellement une
> certification obtenue, sans suggérer de partenariat, de parrainage ni d'affiliation — est
> l'usage le plus étroit possible. Si un jour le site va au-delà (page partenaires,
> communication commerciale), une autorisation écrite devient nécessaire.

## Logos manquants

Aucun fichier n'a pu être obtenu pour les quatre certifications suivantes. Elles
s'affichent donc **en toutes lettres**, le nom de l'organisme tenant la place exacte du
futur logo : la mise en page ne bougera pas le jour où le fichier arrivera.

| Certification | Fichier attendu | Ce qu'il faut pour l'obtenir |
|---|---|---|
| ISTQB Foundation | `istqb.svg` | Le badge personnel **« ISTQB Certified Tester »** délivré au titulaire. Le logo ISTQB seul n'est pas libre d'usage : c'est le badge nominatif qui autorise l'affichage. |
| WeLoveDev — Top 5 % React | `welovedev.svg` | Export du badge depuis le compte WeLoveDev de Jérôme, ou accord écrit de WeLoveDev. Absent de Simple Icons. |
| Microsoft Ads | `microsoft.svg` | Kit de marque officiel Microsoft, sous *Microsoft Trademark and Brand Guidelines*. Absent de Simple Icons. |
| EF SET — Anglais B2 (CECRL) | `ef.svg` | Export du certificat / badge EF SET depuis le compte de Jérôme. Absent de Simple Icons. |

**Tant qu'un fichier est absent, la certification s'affiche en toutes lettres.** C'est le
comportement voulu : la même règle que pour les justificatifs — rien de cassé, rien
d'approximatif. **Aucun logo n'est publié sans provenance ni base d'usage consignées
ci-dessus.**
