# RGPD

<!-- TODO : compléter si le projet traite des données personnelles. -->

## Données personnelles traitées

| Donnée | Finalité | Base légale | Durée de conservation |
|--------|----------|-------------|-----------------------|
| _TODO_ | | | |

## Droits des personnes

Décrire comment sont assurés : accès, rectification, effacement, portabilité.

## Le formulaire de contact : aucun traitement, aucun sous-traitant

C'est une information utile même quand la réponse est « rien à déclarer », et c'est
justement parce que la réponse est « rien à déclarer » qu'elle est écrite ici : un
formulaire est l'endroit du site où l'on s'attend à trouver une collecte, et ne rien dire
laisserait supposer qu'elle existe sans être documentée.

**Ce que le formulaire fait.** Le visiteur saisit trois champs (nom, sujet, message). Le
navigateur les valide sur place avec un schéma Zod, en compose une URL `mailto:`, et ouvre
le client mail du poste avec l'objet et le corps déjà écrits. C'est le visiteur qui envoie
le mail, depuis sa propre boîte.

**Ce qu'il ne fait pas**, et qui est vérifiable dans le code :

- **aucun appel réseau sortant** : pas de `fetch`, pas de route d'API, pas de formulaire
  posté. Le site est un export statique (`output: 'export'`), il n'a pas de serveur qui
  pourrait recevoir quoi que ce soit ;
- **aucun sous-traitant** : pas de service tiers de formulaire, pas de passerelle mail,
  pas de clé d'API. Rien à ajouter au registre des sous-traitants ;
- **aucun stockage** : ni cookie, ni `localStorage`, ni `sessionStorage`. La saisie vit
  dans l'état React de la page et disparaît au rechargement ;
- **aucune donnée en plus de ce que le visiteur écrit** : pas d'horodatage, pas
  d'identifiant de campagne, pas d'adresse IP relevée, pas d'en-tête ajouté au corps du
  mail. Le champ « adresse de réponse » est volontairement absent : le mail part de la
  boîte du visiteur, son adresse voyage déjà dans l'en-tête, et la redemander serait
  collecter une donnée pour rien.

**Le traitement qui existe** est celui qui existait déjà avant le formulaire : la réception
et la conservation d'un mail dans la boîte de Jérôme MARICHEZ, au titre de la relation
commerciale. Le formulaire ne le crée pas, il ne l'élargit pas, et il ne change ni sa
finalité ni sa base légale.

## Mesures

- Minimisation : ne collecter que le nécessaire.
- Mots de passe **hachés** (bcrypt/argon2), jamais en clair.
- Registre des traitements : tenir un `rgpd-registre.csv` si nécessaire.
