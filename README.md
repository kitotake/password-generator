# 🔐 Password Generator - SCSS Architecture

Une architecture SCSS moderne et modulaire pour l'application générateur de mots de passe.

## 📁 Structure des fichiers

```
scss/
├── main.scss              # Fichier principal (point d'entrée)
├── _variables.scss         # Variables globales
├── _mixins.scss           # Mixins réutilisables
├── _base.scss             # Styles de base et reset
├── _components.scss       # Composants UI
├── _layout.scss           # Mise en page et positionnement
├── _animations.scss       # Animations et transitions
├── package.json           # Configuration npm
└── README.md             # Documentation
```

## 🚀 Installation et utilisation

### Prérequis
- Node.js (version 14+)
- npm ou yarn

### Installation
```bash
npm install
# ou
yarn install
```

### Compilation SCSS

#### Mode développement (avec watch)
```bash
npm run dev
```
Compile automatiquement à chaque modification et génère des source maps.

#### Build production
```bash
npm run build
```
Compile et compresse le CSS pour la production.

#### Build développement
```bash
npm run build-dev
```
Compile sans compression avec source maps.

### Linter SCSS
```bash
npm run lint
```

### Formatter le code
```bash
npm run format
```

## 📦 Build et déploiement

Le CSS compilé est généré dans le dossier `dist/` :
- `dist/style.css` - Version compressée
- `dist/style.css.map` - Source map (dev)

## 🎯 Bonnes pratiques

1. **Variables** : Utilisez les variables pour toutes les valeurs réutilisables
2. **Mixins** : Créez des mixins pour les patterns répétitifs
3. **Nesting** : Limitez l'imbrication à 3 niveaux maximum
4. **BEM** : Utilisez la méthodologie BEM pour nommer les classes
5. **Mobile-first** : Écrivez d'abord pour mobile, puis adaptez

## 🐛 Débogage

### Source maps
En mode développement, les source maps permettent de déboguer directement dans le SCSS :
```bash
npm run build-dev
```

## 📈 Performance

- **Compression** : Le CSS est automatiquement compressé en production
- **Préfixes** : Utilisez autoprefixer pour la compatibilité
- **Critical CSS** : Séparez le CSS critique si nécessaire
- **Purge CSS** : Supprimez le CSS inutilisé

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/amazing-feature`)
3. Commitez vos changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**✨ Happy coding!** 🎨