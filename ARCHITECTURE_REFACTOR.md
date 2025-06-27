# Refactorisation de l'Architecture VolleyApp Frontend

## Vue d'ensemble
Cette refactorisation réorganise l'application selon une approche orientée pages/fonctionnalités métier, en suivant exactement les besoins exprimés par l'utilisateur.

## Nouvelle Structure

```
src/
├── app/                          # Pages Next.js App Router
│   ├── login/                    # Page de connexion
│   ├── profile/                  # Page profil utilisateur
│   ├── matches/                  # Liste des matchs
│   │   └── [id]/                 # Détail d'un match
│   └── admin/                    # Section administration
│       ├── teams/                # Gestion équipes (admin)
│       ├── users/                # Gestion utilisateurs (admin)
│       ├── skills/               # Gestion compétences (admin)
│       └── matches/              # Édition matchs (admin)
├── components/                   # Composants réutilisables
│   ├── ui/                       # Composants UI de base (Button, Card, etc.)
│   ├── forms/                    # Composants de formulaires (Input, Select)
│   ├── layout/                   # Composants de layout (Layout, Navigation)
│   └── features/                 # Composants spécifiques aux fonctionnalités
├── hooks/                        # Hooks personnalisés (useApi, etc.)
├── store/                        # Stores Zustand
├── types/                        # Types TypeScript
├── utils/                        # Utilitaires
└── constants/                    # Constantes
```

## Pages et Fonctionnalités Implémentées

### 1. Page de Login (`/login`)
- **Fonctionnalités** :
  - Formulaire de connexion (email + mot de passe)
  - Validation côté client
  - Gestion des erreurs
  - Authentification simulée (mock)
  - Redirection après connexion

### 2. Page Profil Utilisateur (`/profile`)
- **Fonctionnalités** :
  - Affichage des informations personnelles
  - Modification du profil en mode édition
  - Changement de mot de passe
  - Validation des formulaires
  - Protection d'accès (utilisateur connecté requis)

### 3. Liste des Matchs (`/matches`)
- **Fonctionnalités** :
  - Affichage de la liste des matchs
  - Filtres par statut (Programmé, En cours, Terminé, Annulé)
  - Recherche par équipe ou lieu
  - Affichage des scores pour les matchs terminés
  - Accès aux détails de chaque match

### 4. Section Administration (Routes `/admin/*`)
Structure prête pour :
- **Gestion d'équipes** (`/admin/teams`)
- **Gestion d'utilisateurs** (`/admin/users`)
- **Gestion des compétences** (`/admin/skills`)
- **Édition des matchs** (`/admin/matches`)

## Types et Interfaces

### Types étendus pour les nouvelles fonctionnalités :
- **User** : Ajout de `role`, `isActive`, `lastLoginAt`
- **Match** : Types complets avec équipes, statuts, scores
- **Skill** : Gestion complète des compétences avec catégories et niveaux
- **UserSkill** : Association utilisateur-compétence

### Nouveaux types :
- **MatchFilters** : Filtres pour la liste des matchs
- **SkillCategory** : Catégories de compétences (ATTACK, DEFENSE, etc.)
- **SkillLevel** : Niveaux de compétence (BEGINNER à EXPERT)

## Stores Zustand

### Stores créés/mis à jour :
1. **useAuthStore** : Authentification (existant, conservé)
2. **useMatchesStore** : Gestion des matchs avec filtres
3. **useUsersStore** : Gestion des utilisateurs (admin)
4. **useSkillsStore** : Gestion des compétences
5. **useTeamsStore** : Gestion des équipes (existant, conservé)

### Fonctionnalités communes :
- États loading/error standardisés
- Actions CRUD complètes
- DevTools Redux pour debugging
- Gestion d'état immutable

## Composants de Formulaires

### Nouveaux composants réutilisables :
- **Input** : Champ de saisie avec validation et gestion d'erreurs
- **Select** : Liste déroulante avec options personnalisables
- **Validation intégrée** : Messages d'erreur et états visuels

## Navigation et Routes

### Routes principales :
- `/` : Page d'accueil (existante)
- `/login` : Authentification
- `/profile` : Profil utilisateur
- `/matches` : Liste des matchs
- `/matches/[id]` : Détail d'un match
- `/admin/*` : Pages d'administration

### Navigation mise à jour :
- Liens vers les nouvelles fonctionnalités
- Structure adaptée aux rôles utilisateurs
- Navigation responsive conservée

## Fonctionnalités Techniques Conservées

### Éléments maintenus de l'architecture précédente :
- **Design System** : Couleurs volleyball, CSS variables, dark mode
- **Polices personnalisées** : ANIME ACE 2.0 BB + Roboto
- **Logo personnalisé** : SVG volleyball
- **Composants UI** : Button, Card (5 variantes + composants Card)
- **Zustand** : Store state management avec persistence
- **TypeScript strict** : Types readonly, validation complète

## Migration et Compatibilité

### Changements structurels :
1. **Déplacement des fichiers** : 
   - `src/shared/*` → `src/{store,types,utils,constants}/`
   - `src/features/*` → Structure pages + composants
   
2. **Imports mis à jour** :
   - Nouveaux chemins d'import
   - Index files pour faciliter les imports

3. **Types étendus** :
   - Propriétés ajoutées aux interfaces existantes
   - Nouveaux types pour fonctionnalités métier

## Prochaines Étapes

### Fonctionnalités à implémenter :
1. **Page détail match** (`/matches/[id]`)
2. **Pages d'administration** :
   - Gestion équipes (`/admin/teams`)
   - Gestion utilisateurs (`/admin/users`)
   - Gestion compétences (`/admin/skills`)
   - Édition matchs (`/admin/matches`)
3. **Intégration backend** : Remplacement des mocks par de vraies API
4. **Authentification réelle** : Intégration avec le backend NestJS
5. **Gestion des rôles** : Contrôle d'accès admin/utilisateur

### Améliorations techniques :
1. **Tests** : Tests unitaires et d'intégration pour les nouvelles pages
2. **Gestion d'erreurs** : Error boundaries et retry logic
3. **Performance** : Lazy loading et optimisations
4. **Accessibilité** : Amélioration a11y sur les nouveaux composants

## Conformité aux Standards

### Respect des règles projet :
- ✅ **Clean Code** : Max 30 lignes/fonction, noms explicites
- ✅ **TypeScript strict** : Types readonly, pas de `any`
- ✅ **Architecture feature-based** adaptée aux besoins métier
- ✅ **Composants séparés** : Smart/dumb pattern
- ✅ **Gestion d'erreur** : Fail fast, messages utilisateur
- ✅ **Yarn** : Gestionnaire de packages exclusif 