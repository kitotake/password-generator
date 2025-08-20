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

## 🎨 Architecture

### 1. **_variables.scss**
Centralise toutes les variables du projet :
- Palette de couleurs
- Typographies
- Espacements
- Points de rupture
- Ombres et effets

### 2. **_mixins.scss**
Mixins réutilisables pour :
- Transitions et animations
- Effets visuels (glassmorphism, gradients)
- Layouts (flexbox, grid)
- États hover et focus
- Responsive design

### 3. **_base.scss**
Styles de base :
- Reset CSS
- Typographie globale
- Styles du body
- Éléments HTML de base

### 4. **_components.scss**
Composants UI :
- Boutons
- Formulaires
- Cartes et conteneurs
- Éléments interactifs

### 5. **_layout.scss**
Mise en page :
- Modales
- Notifications
- Sections d'information
- Positionnement

### 6. **_animations.scss**
Animations et effets :
- Keyframes
- Classes d'animation
- Effets hover
- Transitions

## 🎯 Fonctionnalités clés

### Variables organisées
```scss
// Couleurs
$primary-color: #3498db;
$success-color: #27ae60;
$error-color: #e74c3c;

// Espacements
$spacing-sm: 8px;
$spacing-md: 10px;
$spacing-lg: 15px;
```

### Mixins puissants
```scss
// Glassmorphism
@include glassmorphism(10px, 0.95);

// Responsive
@include mobile {
  // Styles mobile
}

// Effets hover
@include button-hover(-2px, $shadow-xl);
```

### Système de grille
```scss
.checkbox-group {
  @include grid(1fr 1fr, $spacing-lg);
  
  @include mobile {
    @include grid(1fr, $spacing-lg);
  }
}
```

## 🔧 Personnalisation

### Modifier les couleurs
Éditez `_variables.scss` :
```scss
$primary-color: #votre-couleur;
$secondary-color: #votre-couleur;
```

### Ajouter des breakpoints
```scss
$tablet: 1024px;
$desktop: 1200px;

@mixin tablet {
  @media (min-width: $tablet) {
    @content;
  }
}
```

### Créer des composants
Ajoutez dans `_components.scss` :
```scss
.mon-composant {
  @include glassmorphism();
  @include border-radius($radius-lg);
  padding: $spacing-xl;
}
```

## 📱 Responsive Design

L'architecture inclut des mixins pour le responsive :

```scss
@include mobile {
  // Styles pour mobile (< 768px)
}

@include tablet {
  // Styles pour tablette (768px - 1024px)
}

@include desktop {
  // Styles pour desktop (> 1024px)
}
```

## 🎨 Classes utilitaires

Le système inclut des classes utilitaires :
- Espacement : `.mt-1`, `.mb-2`, `.p-3`
- Texte : `.text-center`, `.text-primary`
- Affichage : `.d-flex`, `.justify-center`
- Couleurs : `.bg-primary`, `.text-success`

## 🔍 Linting et formatage

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

### Variables de debug
Ajoutez dans `_variables.scss` :
```scss
$debug: true !default;

@if $debug {
  * {
    outline: 1px solid red;
  }
}
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