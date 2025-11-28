# 📦 Configuration GitHub

## ✅ Ce qui a été fait

- ✅ Repository Git initialisé
- ✅ Remote GitHub configuré : `https://github.com/comels/come-lesauter-site-regie.git`
- ✅ Premier commit créé avec tous les fichiers du projet
- ✅ Branche renommée en `main`

## 🚀 Prochaines étapes

### 1. Pousser le code sur GitHub

```bash
# Pousser le code sur GitHub
git push -u origin main
```

**Note** : Si c'est la première fois, GitHub vous demandera peut-être de vous authentifier.

### 2. Vérifier sur GitHub

Une fois poussé, vous pourrez voir votre code sur :
**https://github.com/comels/come-lesauter-site-regie**

### 3. Déployer automatiquement avec Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "Add New Project"
3. Connecter le repository GitHub `come-lesauter-site-regie`
4. Vercel détectera automatiquement Next.js
5. Ajouter la variable d'environnement :
   - Nom : `NEXT_PUBLIC_SITE_URL`
   - Valeur : `https://votre-domaine.vercel.app` (ou votre domaine personnalisé)
6. Cliquer sur "Deploy"

Le site sera en ligne en quelques minutes ! 🎉

## 📝 Commandes Git utiles

```bash
# Voir l'état des fichiers
git status

# Ajouter des fichiers
git add .

# Créer un commit
git commit -m "Description de vos modifications"

# Pousser sur GitHub
git push

# Voir les branches
git branch

# Voir les commits
git log --oneline
```

## 🔄 Workflow de développement

1. Faire vos modifications dans le code
2. Vérifier avec `git status`
3. Ajouter les fichiers : `git add .`
4. Créer un commit : `git commit -m "Description"`
5. Pousser sur GitHub : `git push`

Chaque push sur `main` déclenchera automatiquement un nouveau déploiement si vous avez configuré Vercel !

## 📚 Ressources

- [Documentation GitHub](https://docs.github.com/)
- [Guide Git](https://git-scm.com/doc)

