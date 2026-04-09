# invoice-flow-api

## Objectif

Construire un mini produit métier inspiré d’un workflow SaaS de traitement de factures fournisseurs.

### Vision d’ensemble

```
Angular UI
↓ HTTP
Fastify API
↓
Controllers
↓
Services
↓
Repositories
↓
PostgreSQL


+ Fake OCR service
+ Validation Zod
+ Error handling centralisé
+ Swagger auto-généré
+ Tests unitaires et d’intégration
```

## Prérequis

- Node.js (18+ recommandé)
- Docker

## Installation

À la racine du projet :

```bash
npm install
```

- Pour la configuration, copie le fichier d’exemple :

```bash
cp apps/api/.env.example apps/api/.env
```

(Sous Windows, utilise :)

```powershell
copy apps\api\.env.example apps\api\.env
```

## Lancement des services

- Pour lancer la base PostgreSQL et les services nécessaires :

```bash
npm run db:up
```

- Pour lancer l’API en mode développement :

```bash
npm run dev:api
```

L’API sera accessible sur :

http://localhost:3000

## Tester la documentation Swagger

Swagger UI est accessible à :

http://localhost:3000/docs

## Tester la route technique (healthcheck)

Ouvre simplement dans ton navigateur :

http://localhost:3000/health

La réponse attendue est un statut 200 avec un message de confirmation.

---

N’hésite pas à consulter le code source pour plus de détails sur la configuration ou l’ajout de nouvelles routes.
