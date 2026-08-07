# Pistes d'amélioration

Backlog des améliorations identifiées mais non prioritaires. Chaque entrée précise
le bénéfice attendu et l'effort estimé.

| # | Amélioration | Bénéfice | Effort | Statut |
|---|--------------|----------|--------|--------|
| 1 | **Premier test d'acceptation** — `make test-acceptance` échoue tant que `tests/acceptance/` ne contient que des `.gitkeep` (`node --test` sur un dossier sans fichier de test lève `MODULE_NOT_FOUND`) | La cible UAT devient exécutable et la CI cesse d'être rouge sur ce job | faible | **à faire par Jérôme** (règle : les tests sont écrits par lui) |
| 2 | Trancher l'hébergement (front Vercel + back Cloud Run, ou tout sur le VPS Hetzner) et câbler le déploiement | Mise en production possible | moyen | proposé |
| 3 | Initialiser Storybook (`npx storybook@latest init`) | Catalogue de composants, démo vivante de l'exigence front vendue | faible | proposé |
| 4 | Récupérer les URLs officielles des certifications et les câbler dans les données de contenu | Certifications cliquables et vérifiables — exigence du `README.md` | faible | **bloqué : URLs à fournir** |
| 5 | Budget de performance vérifié en CI (Lighthouse CI sur les pages clés) | La promesse « Lighthouse ≥ 95 » est tenue par un contrôle, pas par une intention | moyen | proposé |

## Correctifs appliqués au socle généré

Trois défauts du générateur `bootstrap-claudecode-typescript` ont été corrigés
localement à l'initialisation. **Ils sont à remonter au dépôt du bootstrap** : les deux
premiers touchent tout projet en layout `front-back`.

| Défaut | Symptôme | Correctif local |
|--------|----------|-----------------|
| `biome.json` excluait `!.next` / `!dist` sans `**/` | En `front-back`, les artefacts sont dans `front/.next` et `back/dist` : après un `make build`, `make lint` remontait **8 590 erreurs** sur du code généré | Patterns passés en `!**/.next`, `!**/dist`, `!**/build`, `!**/coverage`, `!**/node_modules` |
| Fichiers générés par Next.js non exclus | Next régénère `next-env.d.ts` et réécrit `front/tsconfig.json` dans son propre style (double quotes, points-virgules) — Biome les refusait, donc `make lint` cassait dès qu'un `make build` ou `make dev` avait tourné, **CI comprise** | `!front/next-env.d.ts` et `!front/tsconfig.json` ajoutés aux exclusions |
| `console.log` de démarrage du back vs règle `noConsole: error` | Le back généré ne passait pas son propre lint | `biome-ignore` ciblé et justifié sur cette seule ligne (en conteneur, stdout est le canal de log) — la règle reste active partout ailleurs |

Reste non corrigé, à signaler aussi : `biome.json` fige `$schema` en **2.5.2** alors que
la contrainte `^2.0.0` résout aujourd'hui **2.5.7** — deux `infos` à chaque lint, dans
tous les projets générés. Le point de vérité est `BIOME_SCHEMA_VERSION` dans
`scripts/bootstrap.sh`.
