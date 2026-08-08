# RGPD

## En un mot

**Le site ne collecte aucune donnée personnelle de visiteur.** Il n'y a ni formulaire, ni
compte, ni panier, ni mesure d'audience active, ni cookie déposé. Les seules données
personnelles publiées sont celles de **Jérôme MARICHEZ lui-même**, à sa demande explicite
du 2026-08-08.

C'est un état de fait à un instant donné, pas une promesse définitive : il changera le
jour où un formulaire de contact ou une mesure d'audience seront mis en service. Les deux
sections « À venir » plus bas disent ce qui devra alors être tranché.

## Données personnelles traitées

| Donnée | Personne concernée | Finalité | Base légale | Durée de conservation |
|--------|--------------------|----------|-------------|-----------------------|
| E-mail `jeromemarichez@ik.me` | Jérôme MARICHEZ | Être joint par un prospect | Publication volontaire par la personne concernée elle-même | Tant que le site est en ligne |
| Téléphone `07 71 65 15 88` | Jérôme MARICHEZ | Idem | Idem | Idem |
| Profil LinkedIn | Jérôme MARICHEZ | Vérifier l'identité professionnelle annoncée | Idem | Idem |
| Compte GitHub | Jérôme MARICHEZ | `sameAs` des données structurées | Idem | Idem |

Ces coordonnées figurent déjà sur les trois CV de référence. Elles vivent à **un seul
endroit** du code, `front/src/content/identite.ts` : la page de contact, le pied de page
et le JSON-LD y lisent tous les trois, aucun ne les réécrit. Le jour où l'une change, elle
change une fois.

**Aucune donnée de tiers n'est traitée.** Pas de nom, pas d'adresse, pas de message, pas
d'adresse IP conservée, pas d'identifiant publicitaire. Ce n'est pas un oubli de
rédaction : c'est la conséquence directe de l'absence de formulaire.

## La page `/contact` : pourquoi elle n'a pas de formulaire

Arbitrage de Jérôme MARICHEZ du **2026-08-08**. Le service d'acheminement des messages
(SMTP, service tiers ou stockage) n'est pas choisi. Un formulaire qui afficherait
« message envoyé » sans rien envoyer serait pire que pas de formulaire du tout — et, du
point de vue RGPD, il collecterait des données de tiers sans qu'aucune finalité, aucun
destinataire ni aucune durée de conservation n'aient été définis.

La page publie donc trois coordonnées directes et dit explicitement au visiteur qu'elle ne
collecte rien. **Dire l'absence de collecte est un choix délibéré** : une page de contact
muette sur ce point laisse supposer un traitement silencieux, ce qui est exactement
l'inverse de la situation.

Un message envoyé par e-mail arrive dans la boîte de Jérôme comme n'importe quel courrier :
il ne transite par aucun service du site, et le site n'en a aucune connaissance.

## Obfuscation de l'adresse e-mail — et sa limite

L'adresse affichée sur `/contact` est **obfusquée au rendu** pour limiter le moissonnage
par les robots à spam, sans rien coûter à l'accessibilité. La méthode et ses garanties
sont documentées dans `front/src/utils/email.ts` et
[`accessibility.md`](./accessibility.md).

**Limite mesurée, à porter devant Jérôme MARICHEZ.** Le graphe JSON-LD injecté par le
layout racine publie `email` **en clair sur toutes les pages du site** — publication
demandée explicitement le 2026-08-08 et utile au référencement
([`seo.md`](./seo.md)). Relevé sur la page servie, l'adresse apparaît **deux fois** dans
le HTML de n'importe quelle page (le `<script type="application/ld+json">` et sa copie
dans la charge utile React), et **zéro fois** dans le corps de la page de contact.

Autrement dit : l'obfuscation protège le corps de page, pas le site. Les deux décisions ne
sont cohérentes entre elles que si l'on admet que l'adresse est publique — ce qui est le
cas, elle est sur les trois CV. Si l'objectif est réellement de réduire le moissonnage, le
point à trancher n'est pas l'obfuscation mais **le maintien de `email` dans le JSON-LD**.

## Droits des personnes

Les seules données traitées étant celles du responsable du site lui-même, les droits
d'accès, de rectification, d'effacement et de portabilité s'exercent **directement** par
Jérôme MARICHEZ sur son propre contenu (`front/src/content/identite.ts`).

Pour un visiteur qui écrit par e-mail : il peut demander à tout moment la suppression de
son message, ce que la mention affichée sur `/contact` lui dit explicitement.

## Mesures

- **Minimisation par construction** : le site est entièrement prérendu et statique. Il n'y
  a aucune route qui accepte une entrée, donc rien à collecter par mégarde.
- **Aucun appel à un service tiers au chargement** : polices système, aucune CDN, aucune
  balise de mesure. Aucune requête sortante depuis le navigateur du visiteur, donc aucune
  adresse IP transmise à un tiers.
- **Aucun cookie** n'est déposé.
- **Aucune adresse postale publiée** : la ville (Lille) est la seule granularité
  géographique établie, et une rue ne s'invente pas.
- Toute entrée externe future sera **validée par Zod** avant usage (règle du `CLAUDE.md`).

## À venir — ce qui devra être tranché

Ces points ne sont pas des manques du lot livré : ce sont des décisions qui n'ont pas
encore été prises, et qu'il serait faux de documenter comme si elles l'étaient.

| Sujet | À trancher par Jérôme MARICHEZ |
|-------|-------------------------------|
| **Formulaire de contact** | Service d'acheminement, puis : finalité, base légale, destinataires, **durée de conservation**, protection contre les envois automatisés. Aucune durée n'est publiée aujourd'hui, faute d'arbitrage — un délai inventé serait une affirmation fausse dans le texte censé protéger le visiteur. |
| **Mesure d'audience** | Annoncée comme « conforme RGPD avec consentement » dans le `README.md`, mais **non implémentée**. Elle imposera une CMP et un registre des traitements. |
| **`email` dans le JSON-LD** | Voir la limite mesurée ci-dessus. |
| **Registre des traitements** | Sans objet tant qu'aucune donnée de tiers n'est traitée. À ouvrir (`rgpd-registre.csv`) avec le formulaire. |
| **Politique de confidentialité dédiée** | Aujourd'hui la mention vit sur `/contact`, ce qui suffit à un site sans collecte. Une page dédiée deviendra nécessaire avec le formulaire ou la mesure d'audience. |
