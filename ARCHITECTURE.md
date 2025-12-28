# Architecture et Conventions du Code

Ce document explique la structure du code, les conventions de nommage et les choix de design pour faciliter la maintenance future.

## 📁 Structure des Fichiers

### Données (Data)
- `data/projects.js` : Projets principaux (Aigle, Breitling, etc.)
- `data/monoprixProjects.js` : Sous-projets Monoprix
- `data/echosProjects.js` : Sous-projets Les Échos
- `data/kitsuneProjects.js` : Sous-projets Kitsuné

### Composants (Components)
- `components/Navbar.js` : Barre de navigation fixe
- `components/ProjectGallery.js` : Galerie complète d'un projet (utilisé sur les pages individuelles)
- `components/ProjectCard.js` : Carte de projet (utilisé sur les pages de listing)
- `components/ProjectInfoOverlay.js` : Overlay d'informations au survol (page d'accueil desktop)
- `components/TestPageMobile.js` : Affichage mobile des projets (page d'accueil)
- `components/VideoWithSound.js` : Composant vidéo avec contrôle du son
- `components/ExternalLink.js` : Lien externe avec gestion des événements

### Utilitaires (Utils)
- `utils/imageUtils.js` : Gestion des chemins d'images et détection vidéo
- `utils/productionUtils.js` : Affichage de la production (formats multiples)

### Pages (App Router)
- `app/page.js` : Page d'accueil (desktop + mobile)
- `app/projects/[slug]/page.js` : Pages individuelles des projets
- `app/projects/monoprix/page.js` : Page de listing Monoprix
- `app/projects/echos/page.js` : Page de listing Les Échos
- `app/projects/kitsune/page.js` : Page de listing Kitsuné
- `app/projects/{monoprix|echos|kitsune}/[subproject]/page.js` : Pages individuelles des sous-projets

## 🖼️ Système d'Images

### Nouveau Système (Recommandé)
```javascript
{
  coverImage: 'photo-1.jpg',  // Spécifie quelle photo utiliser comme couverture
  images: [
    'photo-1.jpg',
    'photo-2.jpg',
    'video-1.mp4',
    // ...
  ]
}
```

**Avantages** :
- Facile de changer l'image de couverture sans renommer de fichiers
- Toutes les images sont numérotées de manière cohérente
- Support des vidéos (video-1.mp4, video-2.mp4, etc.)

### Ancien Système (Rétrocompatibilité)
```javascript
{
  coverFile: 'cover.jpg',
  coverType: 'image' | 'video',
  images: [...]
}
```

Le code gère automatiquement les deux systèmes pour la rétrocompatibilité.

### Conventions de Nommage
- **Photos** : `photo-1.jpg`, `photo-2.jpg`, etc.
- **Vidéos** : `video-1.mp4`, `video-2.mp4`, etc.
- **Format** : Numérotation séquentielle, extension en minuscules

### Structure des Dossiers
```
public/projects/
  ├── {project-slug}/          # Projets normaux
  │   ├── photo-1.jpg
  │   ├── photo-2.jpg
  │   └── ...
  ├── monoprix/                # Projets Monoprix
  │   ├── {subproject-slug}/
  │   │   ├── photo-1.jpg
  │   │   └── ...
  │   └── ...
  ├── echos/                   # Projets Echos (structure spéciale)
  │   └── {subproject-slug}/   # Directement dans /projects/
  │       ├── photo-1.jpg
  │       └── ...
  └── kitsune/                 # Projets Kitsuné
      ├── {subproject-slug}/
      │   ├── photo-1.jpg
      │   └── ...
      └── ...
```

## 🎨 Choix de Design

### Effet Grayscale
- **Desktop (page d'accueil)** : Images en grayscale par défaut, couleur au survol
- **Pages de listing** : Images en couleur (noEffects=true)
- **Mobile** : Images toujours en couleur

### Typographie
- **Font Inter** : Poids 100 (thin), 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Client** : Semibold, uppercase
- **Production** : Light/Thin
- **Date** : Thin, format MM/YY (ex: '11/24')

### Responsive
- **Mobile** : Affichage vertical, informations toujours visibles
- **Desktop** : Défilement horizontal, informations au survol

## 🔄 Routing

### Projets Normaux
- **Listing** : `/projects/{slug}` → Page individuelle avec galerie
- **Exemples** : `/projects/aigle`, `/projects/breitling`

### Projets avec Sous-projets
- **Listing** : `/projects/{slug}` → Page de listing avec toutes les cartes
- **Sous-projet** : `/projects/{slug}/{subproject-slug}` → Page individuelle du sous-projet
- **Exemples** :
  - `/projects/monoprix` → Listing
  - `/projects/monoprix/birds` → Sous-projet individuel

## 📊 Structure des Données

### Projet Principal
```javascript
{
  slug: 'aigle',                    // Identifiant unique (utilisé dans les URLs)
  title: 'Aigle',                   // Titre du projet
  description: '',                   // Description (optionnel, souvent vide)
  date: '11/24',                    // Date au format MM/YY
  client: 'Aigle',                  // Nom du client
  clientUrl: '',                    // URL du client (optionnel)
  production: 'FaireFaire',         // Nom de la production (chaîne ou tableau)
  productionUrl: 'https://...',      // URL de la production (optionnel)
  productionTeam: [                 // Équipe de production (optionnel)
    { name: 'Côme Le Sauter', url: 'https://...' },
    // ...
  ],
  crew: [                            // Équipe technique (optionnel)
    {
      role: 'Photographe',
      name: 'Nom' | [{ name: 'Nom', url: '...' }],  // Chaîne ou tableau
      url: 'https://...'             // URL (si name est une chaîne)
    },
    // ...
  ],
  coverImage: 'photo-1.jpg',        // Image de couverture (nouveau système)
  images: ['photo-1.jpg', ...],      // Toutes les images/vidéos
  externalUrl: 'https://...'        // Lien externe (YouTube, etc.) - optionnel
}
```

### Production (Formats Supportés)
1. **Chaîne simple** : `production: 'FaireFaire'`
2. **Chaîne avec URL** : `production: 'FaireFaire'` + `productionUrl: 'https://...'`
3. **Tableau de personnes** :
   ```javascript
   production: [
     { name: 'Côme Le Sauter', url: 'https://...' },
     { name: 'Laura Thomassaint', url: 'https://...' }
   ]
   ```

### Crew (Équipe Technique)
- **Une personne par rôle** :
  ```javascript
  { role: 'Photographe', name: 'Nom', url: 'https://...' }
  ```
- **Plusieurs personnes par rôle** :
  ```javascript
  {
    role: 'Talents',
    name: [
      { name: 'Thierry Gary', url: 'https://...' },
      { name: 'Vanessa Paric', url: 'https://...' }
    ]
  }
  ```

## 🛠️ Fonctions Utilitaires

### `getCoverFileName(project)`
Récupère le nom du fichier de couverture (nouveau système → ancien système → fallback).

### `getProjectImagePath(project, basePath)`
Construit le chemin complet vers l'image de couverture, gère les cas spéciaux (Monoprix, Echos).

### `getProjectHref(project)`
Construit le lien vers la page du projet (gère les projets avec sous-projets).

### `isVideoFile(fileName)`
Vérifie si un fichier est une vidéo en regardant son extension.

### `renderProduction(production, productionUrl, useMediumFont)`
Affiche la production avec support de plusieurs formats.

## 📝 Notes Importantes

1. **Monoprix, Echos, Kitsuné** : Ces projets ont des pages de listing séparées et sont exclus de la route dynamique `[slug]`.

2. **Ordre des projets** : L'ordre d'affichage sur la page d'accueil est défini dans `app/page.js` via `customOrder`.

3. **Hauteurs variables** : Les images sur la page d'accueil ont des hauteurs maximales variables pour créer un effet visuel dynamique.

4. **Métadonnées SEO** : Chaque page de projet génère automatiquement ses métadonnées (title, description, Open Graph, Twitter Cards).

5. **Static Site Generation (SSG)** : Toutes les pages sont pré-générées au build pour de meilleures performances.

## 🔧 Maintenance

### Ajouter un Nouveau Projet
1. Ajouter les images dans `public/projects/{slug}/`
2. Ajouter les données dans `data/projects.js`
3. (Optionnel) Ajouter le slug dans `customOrder` dans `app/page.js`

### Ajouter un Nouveau Sous-projet (Monoprix, Echos, Kitsuné)
1. Ajouter les images dans `public/projects/{parent-slug}/{subproject-slug}/`
2. Ajouter les données dans `data/{parent}Projects.js`
3. La page de listing se mettra à jour automatiquement

### Changer l'Image de Couverture
Modifier simplement le champ `coverImage` dans les données :
```javascript
coverImage: 'photo-3.jpg'  // Au lieu de 'photo-1.jpg'
```

Pas besoin de renommer de fichiers !

