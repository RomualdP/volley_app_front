# VolleyApp Frontend - Architecture

## 🏗️ Architecture

Ce projet utilise une architecture basée sur les fonctionnalités (feature-based architecture) avec Next.js et TypeScript.

## 📁 Structure des dossiers

```
src/
├── app/                          # App Router de Next.js
│   ├── globals.css              # Styles globaux avec design system
│   ├── layout.tsx               # Layout racine
│   ├── page.tsx                 # Page d'accueil
│   └── teams/                   # Pages des équipes
│       └── page.tsx
├── features/                     # Fonctionnalités organisées par domaine
│   └── teams/
│       └── components/
│           ├── TeamCard.tsx
│           └── index.ts
├── shared/                       # Code partagé entre fonctionnalités
│   ├── components/              # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Layout.tsx
│   │   └── index.ts
│   ├── hooks/                   # Hooks personnalisés
│   │   ├── useApi.ts
│   │   └── index.ts
│   ├── types/                   # Types TypeScript partagés
│   │   └── index.ts
│   ├── constants/               # Constantes de l'application
│   │   └── index.ts
│   └── utils/                   # Utilitaires
│       └── index.ts
```

## 🎨 Design System

### Couleurs
Le design system utilise une palette inspirée du volleyball :
- **Primary (Orange)** : `#f97316` - Couleur principale rappelant le ballon de volleyball
- **Secondary (Bleu)** : `#0ea5e9` - Couleur secondaire pour la diversité
- **Neutral** : Gamme de gris pour le texte et les backgrounds
- **Success/Error/Warning** : Couleurs sémantiques standard

### Composants de base
- **Button** : Composant bouton avec variants (primary, secondary, outline, ghost, destructive)
- **Card** : Conteneur avec header, content, footer
- **Layout** : Layout principal avec navigation

## 🔧 Hooks personnalisés

### `useApi`
Hook pour la gestion des appels API avec :
- États de chargement
- Gestion d'erreurs
- Méthodes HTTP (GET, POST, PUT, DELETE)
- Headers personnalisables

## 📝 Types

Types TypeScript complets pour :
- **User** : Utilisateurs de l'application
- **Team** : Équipes de volleyball avec membres
- **Match** : Matchs avec scores et sets
- **Tournament** : Tournois avec équipes participantes
- **API Responses** : Réponses standardisées de l'API

## 🛠️ Utilitaires

Fonctions utilitaires pour :
- Formatage des dates (`formatDate`, `formatDateTime`, `formatTime`)
- Validation (`isValidEmail`)
- Formatage des données volleyball (`formatScore`, `getMatchStatusText`)
- Manipulation de texte (`truncateText`, `capitalizeFirstLetter`)
- Performance (`debounce`)

## 🎯 Fonctionnalités actuelles

### ✅ Implémenté
- Architecture feature-based
- Design system complet
- Page d'accueil moderne
- Page des équipes avec cartes
- Navigation responsive
- Hooks API personnalisés
- Types TypeScript complets

### 🚧 À venir
- Authentification
- Gestion des matchs
- Tournois
- Profils utilisateurs
- Dashboard analytique
- Mode hors ligne

## 🚀 Développement

### Démarrer le projet
```bash
npm run dev
```

### Standards de code
- TypeScript strict activé
- Composants fonctionnels uniquement
- Props en readonly
- Noms descriptifs et longs
- Pattern smart/dumb components
- Maximum 30 lignes par fonction
- Maximum 300 lignes par fichier

### Bonnes pratiques
- Un composant par fichier
- Export nommé (pas de default export)
- DisplayName pour tous les composants
- Retourner `null` si props obligatoires manquantes
- Accessibility-first (ARIA, navigation clavier)
- Mobile-first design

## 📱 Responsive Design

L'application est conçue mobile-first avec des breakpoints :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🔐 Sécurité

- Validation côté client et serveur
- Types stricts TypeScript
- Sanitisation des données utilisateur
- Headers de sécurité appropriés

## 🌐 Internationalisation

L'application est actuellement en français avec une structure prête pour l'i18n :
- Textes centralisés dans les utils
- Format de dates localisé
- Structure préparée pour multiple langues 