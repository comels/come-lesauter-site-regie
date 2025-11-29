# 📝 Guide : Ajouter des informations crew aux projets

## Structure des données

Pour chaque projet dans `data/projects.js`, vous pouvez ajouter un tableau `crew` avec les informations des différents membres de l'équipe.

## Format

```javascript
crew: [
  { role: 'Photographe', name: 'Nom du photographe', url: 'https://site-du-photographe.com' },
  { role: 'Réalisateur', name: 'Nom du réalisateur', url: 'https://site-du-realisateur.com' },
  { role: 'Set Designer', name: 'Nom du set designer', url: '' }, // Pas de lien si url vide
  { role: 'Catering', name: 'Nom du catering', url: '' },
  { role: 'Styliste', name: 'Nom du styliste', url: 'https://instagram.com/styliste' },
  // ... etc
]
```

## Exemples d'utilisation

### Exemple 1 : Projet avec plusieurs membres

```javascript
{
  slug: 'aigle',
  title: 'Aigle',
  description: 'Aigle',
  client: 'Aigle',
  clientUrl: '',
  production: 'FaireFaire',
  productionUrl: 'https://www.instagram.com/fairefairefr/',
  coverType: 'image',
  coverFile: 'cover.jpg',
  crew: [
    { role: 'Photographe', name: 'Jean Dupont', url: 'https://jeandupont.com' },
    { role: 'Réalisateur', name: 'Marie Martin', url: 'https://mariemartin.fr' },
    { role: 'Set Designer', name: 'Pierre Durand', url: '' },
  ],
  images: [...],
}
```

### Exemple 2 : Projet avec seulement quelques informations

```javascript
{
  slug: 'breitling',
  title: 'Breitling',
  description: 'Breitling',
  client: 'Breitling',
  clientUrl: '',
  production: 'Ctzar',
  productionUrl: 'https://ctzar.com/',
  coverType: 'image',
  coverFile: 'cover.jpg',
  crew: [
    { role: 'Photographe', name: 'Sophie Bernard', url: 'https://instagram.com/sophie' },
  ],
  images: [...],
}
```

### Exemple 3 : Projet sans informations crew

```javascript
{
  slug: 'stahr',
  title: 'Stahr',
  description: '',
  client: 'Charles Cadic',
  clientUrl: 'https://www.instagram.com/charlescadic/',
  production: '',
  productionUrl: '',
  coverType: 'image',
  coverFile: 'cover.jpg',
  // Pas de crew = rien ne s'affiche
  images: [],
}
```

## Rôles courants

Vous pouvez utiliser n'importe quel nom de rôle, voici des exemples :

- `Photographe`
- `Réalisateur` / `Réalisatrice`
- `Directeur photo` / `DP`
- `Set Designer`
- `Styliste`
- `Catering`
- `Make-up artist` / `Maquilleur`
- `Hair stylist` / `Coiffeur`
- `Assistant réalisateur` / `1er assistant`
- `Scripte`
- `Chef opérateur`

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

Si vous ne voulez pas de lien, laissez `url: ''` ou ne mettez pas de `url`.

## Affichage

Les informations apparaîtront automatiquement sur la page du projet, en dessous de "Client" et "Production", dans le même style.

