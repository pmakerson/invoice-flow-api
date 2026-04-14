# invoice-flow-api

## Objectif

Construire un mini produit métier inspiré d’un workflow SaaS de traitement de factures fournisseurs.

## Vision d’ensemble

```text
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

Avant de commencer, assurez-vous d’avoir :

- Node.js (24.14.1 recommandé)
- Docker installé et démarré sur votre machine

## Installation et lancement de l’application

### 1. Installer les dépendances

À la racine du projet :

```bash
npm install
```

### 2. Configurer les variables d’environnement

Copiez le fichier d’exemple :

```bash
cp apps/api/.env.example apps/api/.env
```

Sous Windows :

```powershell
copy apps\api\.env.example apps\api\.env
```

### 3. Démarrer la base de données PostgreSQL

```bash
npm run db:up
```

### 4. Créer les tables

```bash
npm run drizzle:push
```

### 5. Initialiser les données de démonstration

```bash
npm run drizzle:seed
```

### 6. Visualiser les données (optionnel)

```bash
npm run drizzle:studio
```

Vous pourrez consulter :

- **DATA** : les données
- **STRUCTURE** : les tables et colonnes

Vous pouvez aussi utiliser votre client PostgreSQL préféré avec les paramètres suivants :

- Base de données : `invoice_flow`
- Utilisateur : `app_user`
- Mot de passe : `app_password`
- Port : `5432`

### 7. Lancer le back-end

```bash
npm run dev:api
```

API disponible sur : <http://localhost:3000>

### 8. Lancer le front-end

```bash
npm run dev:web
```

Application web disponible selon la configuration Angular locale (généralement <http://localhost:4200>).

## Documentation API

Swagger UI est accessible à l’adresse :

<http://localhost:3000/docs>

## Healthcheck

Vérifiez que l’API répond correctement :

<http://localhost:3000/health>

Réponse attendue : statut **200**.

## Créer une nouvelle facture

Vous pouvez utiliser la documentation Swagger pour créer une nouvelle facture.

1. Ouvrez la documentation API : <http://localhost:3000/docs>
2. Recherchez l’endpoint **POST /invoices**
3. Cliquez sur **Try it out**
4. Renseignez les champs demandés
5. Cliquez sur **Execute**

La facture sera alors créée en base de données et visible dans l’application.

## Scripts utiles

```bash
npm run db:up            # démarre PostgreSQL via Docker
npm run drizzle:push     # applique le schéma en base
npm run drizzle:seed     # insère les données de test
npm run drizzle:studio   # interface base de données
npm run dev:api          # lance l’API en développement
npm run dev:web          # lance le front-end en développement
```

## Notes

- Vérifiez que Docker est bien lancé avant `npm run db:up`.
- Si le port `5432` est déjà utilisé, adaptez votre configuration Docker.
- Pensez à relancer le seed si vous souhaitez réinitialiser les données de démonstration.
