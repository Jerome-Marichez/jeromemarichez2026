# Makefile — jeromemarichez-fr
# Interface de commandes unique (local + CI). `make help` liste les cibles.

.DEFAULT_GOAL := help
.PHONY: help install dev build lint type-check test test-unit test-int test-mutation
.PHONY: test-e2e
.PHONY: test-system
.PHONY: test-acceptance
.PHONY: storybook storybook-build
.PHONY: docker-up docker-down logs

help: ## Liste les commandes disponibles
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

lint: ## Biome sur tout le dépôt + limite 300 lignes/fichier
	npx @biomejs/biome@^2.0.0 check .
	./scripts/check-max-lines.sh

type-check: ## Vérification des types TypeScript, sans émission de fichiers
	npx tsc --noEmit

test: test-unit test-int ## Tests unitaires + intégration (rapides)

install: ## Installe les dépendances
	npm install

dev: ## Démarrage local en mode développement
	npm run dev

build: ## Build de production
	npm run build

test-unit: ## Tests unitaires
	npx jest tests/unitaire --passWithNoTests

test-int: ## Tests d'intégration
	npx jest tests/integration --passWithNoTests

test-mutation: ## Tests de mutation (Stryker) — qualité des tests unitaires/intégration
	npx stryker run
test-e2e: ## Tests e2e navigateur — construit et sert l'export statique, puis Cypress headless
	node scripts/e2e.mjs

test-system: ## Tests système (vrai serveur HTTP via listen(0))
	npx jest tests/systeme --passWithNoTests
	@echo "Collection Postman rejouable : npx newman run tests/systeme/postman_collection.json (stack démarrée)"
test-acceptance: ## Tests d'acceptation / UAT (runner Node natif)
	node --test tests/acceptance/
storybook: ## Storybook en local (http://localhost:6006) — après npx storybook@latest init
	@if [ -d front ]; then cd front && npm run storybook; else npm run storybook; fi

storybook-build: ## Build statique Storybook
	@if [ -d front ]; then cd front && npm run build-storybook; else npm run build-storybook; fi
docker-up: ## Build + démarrage de la stack conteneurisée
	docker compose up -d --build

docker-down: ## Arrêt des conteneurs
	docker compose down

logs: ## Logs agrégés des conteneurs
	docker compose logs -f
