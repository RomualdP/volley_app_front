# Nouvelle Structure à 4 Menus - VolleyApp

## Vue d'ensemble

L'application a été restructurée selon les exigences avec 4 menus principaux :

### 1. 🏠 Accueil (`/`)
- **Contenu** : Dernières actualités + prochain match
- **Fonctionnalités** :
  - Affichage des 3 dernières news publiées
  - Carte avec le prochain match programmé
  - Actions rapides (liens vers autres sections)
  - Bouton d'accès rapide à la gestion des news (admins)

### 2. 🏐 Matchs (`/matches`)
- **Contenu** : Liste des matchs avec filtres
- **Fonctionnalités** :
  - Recherche par équipe/lieu
  - Filtres par statut (Programmé, En cours, Terminé, Annulé)
  - **Nouveau** : Bouton "Ajouter un match" pour les admins connectés
  - Cards avec détails des matchs et statuts visuels

### 3. 👤 Profil (`/profile`)
- **Contenu** : Page profil utilisateur existante
- **Fonctionnalités** : Affichage/modification des informations personnelles

### 4. ⚙️ Admin (`/admin`)
- **Contenu** : Dashboard d'administration
- **Accessible** : Tout le temps pendant le développement (pas de restriction de rôle encore)
- **Sous-menus** :

#### 4.1 Gestion des utilisateurs (`/admin/users`)
- **Module de recherche** : Recherche par nom uniquement
- **Fonctionnalités** :
  - Tableau avec utilisateurs (nom, email, rôle, statut, dernière connexion)
  - Recherche en temps réel
  - Actions : Activer/Désactiver, Modifier
  - Avatars avec initiales
  - Badges visuels pour rôles et statuts

#### 4.2 Gestion des actualités (`/admin/news`)
- **Fonctionnalités** :
  - Formulaire d'ajout/modification d'actualités
  - Liste des actualités avec statuts (Publié/Brouillon)
  - Actions : Modifier, Publier/Dépublier, Supprimer
  - Synchronisation avec la page d'accueil

## Architecture Technique

### Types créés
```typescript
// News Types
interface News {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly excerpt?: string;
  readonly author: string;
  readonly isPublished: boolean;
  readonly publishedAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

### Stores Zustand
- **useNewsStore** : Gestion complète des actualités
  - CRUD operations
  - Filtres par publication
  - Méthodes `getPublishedNews()` et `getLatestNews()`

### Navigation mise à jour
- **Header** : 4 liens principaux (Accueil, Matchs, Profil, Admin)
- **Routes** : Nouvelles constantes dans `ROUTES.ADMIN`

### Gestion des rôles
- **Fonctionnalité admin** : Bouton "Ajouter un match" visible uniquement pour les admins
- **Future implémentation** : Restriction d'accès à la section admin par rôle

## Data Mock

### Utilisateurs
- 4 utilisateurs de test avec rôles ADMIN/USER
- Statuts actifs/inactifs
- Dates de création et dernière connexion

### Actualités
- 3 actualités de base synchronisées entre homepage et admin
- Statuts de publication
- Auteurs et dates

### Détection du prochain match
- Fonction `getNextMatch()` filtre les matchs SCHEDULED futurs
- Tri par date croissante
- Affichage dans la sidebar de l'accueil

## Build Status
✅ **Compilation réussie** : 13 pages générées sans erreur  
✅ **Types stricts** : Toutes les interfaces TypeScript valides  
✅ **Linting** : Code conforme aux standards  

## Prochaines étapes suggérées

1. **Restriction d'accès admin** par rôle utilisateur
2. **Formulaire complet d'ajout de match** dans la page matchs
3. **Pagination** pour les listes longues (users, news)
4. **Notifications** pour les actions admin (ajout/modification)
5. **Gestion d'images** pour les actualités
6. **API Backend** pour remplacer les données mock

## Structure des fichiers

```
src/
├── app/
│   ├── page.tsx                 # 🏠 Accueil (news + prochain match)
│   ├── matches/page.tsx         # 🏐 Matchs (+ bouton admin)
│   ├── profile/page.tsx         # 👤 Profil utilisateur
│   └── admin/
│       ├── page.tsx             # ⚙️ Dashboard admin
│       ├── users/page.tsx       # 👥 Gestion utilisateurs
│       └── news/page.tsx        # 📰 Gestion actualités
├── types/news.ts                # Types pour actualités
├── store/useNewsStore.ts        # Store Zustand news
└── constants/index.ts           # Routes mises à jour
``` 