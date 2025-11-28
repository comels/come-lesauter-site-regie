# 🚀 Guide de déploiement

## Déploiement sur Vercel (recommandé)

Vercel est la plateforme idéale pour déployer un site Next.js. Il détecte automatiquement Next.js et configure tout pour vous.

### Méthode 1 : Via l'interface Vercel (la plus simple)

1. **Connecter le repository GitHub**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "Add New Project"
   - Importer le repository : `comels/come-lesauter-site-regie`
   - Vercel détectera automatiquement Next.js

2. **Configurer les variables d'environnement**
   - Dans les paramètres du projet Vercel
   - Ajouter une variable d'environnement :
     - Nom : `NEXT_PUBLIC_SITE_URL`
     - Valeur : `https://votre-domaine.com` (remplacer par votre domaine réel)

3. **Déployer**
   - Cliquer sur "Deploy"
   - Le site sera en ligne en quelques minutes !

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 📝 Configuration avant déploiement

### 1. Mettre à jour les URLs dans le code

Remplacer `https://votre-domaine.com` par votre vrai domaine dans :

- `app/sitemap.js` (ligne 10)
- `public/robots.txt` (ligne 6)
- `app/layout.js` (dans les métadonnées Open Graph)

### 2. Variable d'environnement

Créer la variable d'environnement `NEXT_PUBLIC_SITE_URL` sur votre plateforme d'hébergement avec votre domaine réel.

### 3. Tester le build localement

```bash
npm run build
npm run start
```

## 🌐 Déploiement sur d'autres plateformes

### Netlify

1. Connecter le repository GitHub sur [netlify.com](https://netlify.com)
2. Build settings :
   - Build command : `npm run build`
   - Publish directory : `.next`
3. Ajouter la variable d'environnement `NEXT_PUBLIC_SITE_URL`

### Autres hébergeurs

- **Railway** : Import GitHub repo, détecte automatiquement Next.js
- **Render** : Import GitHub repo, configurez le build command
- **AWS Amplify** : Supporte Next.js avec configuration automatique

## 🔄 Déploiement continu

Une fois connecté à GitHub, chaque push sur la branche `main` déclenchera automatiquement un nouveau déploiement sur Vercel/Netlify.

## ✅ Après le déploiement

1. Vérifier que le site fonctionne
2. Soumettre le sitemap à Google Search Console : `https://votre-domaine.com/sitemap.xml`
3. Vérifier les métadonnées avec [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. Tester sur mobile et desktop

## 📚 Ressources

- [Documentation Next.js - Déploiement](https://nextjs.org/docs/deployment)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Netlify](https://docs.netlify.com/)

