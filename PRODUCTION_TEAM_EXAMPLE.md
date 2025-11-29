# 📝 Guide : Ajouter une Production Team aux projets

## Structure des données

Pour chaque projet dans `data/projects.js`, vous pouvez ajouter un tableau `productionTeam` avec les personnes de la production team.

## Format

```javascript
productionTeam: [
  { name: 'Personne 1', url: 'https://site-personne1.com' },
  { name: 'Personne 2', url: 'https://instagram.com/personne2' },
  { name: 'Personne 3', url: '' }, // Pas de lien si url vide
]
```

## Exemple d'utilisation

```javascript
{
  slug: 'exemple-projet',
  title: 'Titre du Projet',
  description: 'Description du projet.',
  client: 'Nom du Client',
  clientUrl: 'https://site-client.com',
  production: 'Nom de la Production',
  productionUrl: 'https://site-production.com',
  
  // Ajoutez le tableau 'productionTeam' ici
  productionTeam: [
    { name: 'John Doe', url: 'https://johndoe.com' },
    { name: 'Jane Smith', url: 'https://instagram.com/janesmith' },
    { name: 'Bob Wilson', url: '' }, // Pas de lien si l'URL est vide
  ],
  
  // Les autres champs (crew, images, etc.)
  crew: [
    { role: 'Photographe', name: 'Nom du photographe', url: 'https://...' },
    // ...
  ],
  coverType: 'image',
  coverFile: 'cover.jpg',
  images: ['photo-1.jpg', 'photo-2.jpg'],
}
```

## Différence avec `production`

- **`production`** : Le nom de la société/compagnie de production (affiché comme "Prod : ...")
- **`productionTeam`** : Les personnes individuelles de l'équipe de production (affiché comme "Production Team : Personne 1, Personne 2, ...")

## Affichage sur le site

Les informations de la `productionTeam` seront affichées sur la page détaillée du projet, en dessous de "Prod : ..." et avant les informations `crew`.

Format d'affichage :
**Production Team : Personne 1, Personne 2, Personne 3**

Si une `url` est fournie pour une personne, son nom sera cliquable et ouvrira le lien dans un nouvel onglet, avec l'effet `line-through` au survol.

## Où ajouter ces informations ?

1. **Pour les projets principaux** : `data/projects.js`
2. **Pour les sous-projets Monoprix** : `data/monoprixProjects.js`
3. **Pour les sous-projets Echos** : `data/echosProjects.js`

## Format des URLs

Les URLs peuvent être :
- Site web : `https://site.com`
- Instagram : `https://www.instagram.com/username/`
- LinkedIn : `https://linkedin.com/in/username`
- Autre réseau social

Si vous ne voulez pas de lien, laissez `url: ''` ou omettez simplement l'URL.

