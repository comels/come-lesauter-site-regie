# Portfolio Côme Le Sauter

Portfolio professionnel de Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales.

🔗 **Repository GitHub** : [github.com/comels/come-lesauter-site-regie](https://github.com/comels/come-lesauter-site-regie)

## 🚀 Technologies

- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **Tailwind CSS** - Framework CSS utility-first
- **Next/Image** - Optimisation automatique des images
- **Google Fonts (Inter)** - Typographie

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une version de production optimisée
- `npm run start` - Lance le serveur de production
- `npm run lint` - Vérifie les erreurs de code
- `npm run format` - Formate le code avec Prettier
- `npm run format:check` - Vérifie le formatage sans modifier les fichiers

## 📁 Structure du projet

```
/
├── app/                    # Pages Next.js (App Router)
│   ├── about/             # Page À propos
│   ├── projects/          # Pages des projets
│   │   ├── [slug]/       # Pages individuelles des projets
│   │   ├── echos/        # Page listing Les Echos
│   │   └── monoprix/     # Page listing Monoprix
│   ├── layout.js         # Layout global avec metadata
│   ├── page.js           # Page d'accueil
│   └── globals.css       # Styles globaux
├── components/            # Composants React réutilisables
│   ├── Navbar.js         # Barre de navigation
│   ├── ProjectCard.js    # Carte de projet (accueil/listings)
│   ├── ProjectGallery.js # Galerie d'images pour pages projets
│   └── ...
├── data/                  # Données des projets
│   ├── projects.js       # Liste principale des projets
│   ├── monoprixProjects.js
│   └── echosProjects.js
├── public/                # Fichiers statiques
│   └── projects/         # Images et vidéos des projets
└── utils/                 # Fonctions utilitaires
    └── imageUtils.js     # Utilitaires pour chemins d'images
```

## 🎨 Fonctionnalités

- **Page d'accueil** : Design moderne avec défilement horizontal des projets
- **Pages projets** : Galeries d'images optimisées
- **Responsive design** : Adaptation mobile et desktop
- **Optimisation images** : Chargement optimisé avec Next/Image
- **Vidéos** : Support des vidéos avec contrôles audio
- **SEO** : Metadata optimisée pour le référencement

## 📝 Ajouter un nouveau projet

1. Ajouter les images dans `/public/projects/[nom-du-projet]/`
2. Ajouter les données dans `/data/projects.js` :

```javascript
{
  slug: 'nom-du-projet',
  title: 'Nom du projet',
  description: 'Description',
  client: 'Nom du client',
  clientUrl: 'https://...',
  production: 'Nom de la production',
  productionUrl: 'https://...',
  coverType: 'image', // ou 'video'
  coverFile: 'cover.jpg',
  images: ['photo-1.jpg', 'photo-2.jpg'],
}
```

## 🌐 Déploiement

Le site est optimisé pour être déployé sur :

- **Vercel** (recommandé pour Next.js)
- **Netlify**
- Tout hébergeur supportant Node.js

### Étapes de déploiement sur Vercel

1. Connecter votre repository GitHub/GitLab
2. Vercel détectera automatiquement Next.js
3. Cliquer sur "Deploy"
4. Le site sera en ligne en quelques minutes

## 🔍 SEO

Le site inclut :
- Metadata optimisée pour chaque page
- Sitemap automatique
- Robots.txt
- Images avec attributs alt
- Structure HTML sémantique
- URLs propres et descriptives

## 📄 Licence

Tous droits réservés - Côme Le Sauter

## 📧 Contact

- Instagram : [@votre_compte]
- Email : comelesauter@gmail.com
- Téléphone : 06 66 67 96 88

