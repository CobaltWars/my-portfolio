# Guide de déploiement du Portfolio Développeur

Ce document explique comment déployer votre portfolio sur GitHub et Vercel.

## Structure du projet

Le portfolio est composé des éléments suivants :

- **Pages HTML** : index.html, games.html, software.html, contact.html, project.html
- **CSS** : style.css (styles généraux), themes.css (thèmes de couleur)
- **JavaScript** : main.js, games.js, software.js, project-details.js, theme-switcher.js, projects.js
- **Données** : fichiers CSV dans le dossier data (games.csv, software.csv)
- **Images** : à placer dans le dossier img (avec sous-dossiers games et software)

## Personnalisation

1. **Informations personnelles** :
   - Modifiez le titre et les informations de contact dans les fichiers HTML
   - Personnalisez la section "À propos de moi" dans index.html

2. **Projets** :
   - Ajoutez vos propres projets dans les fichiers CSV (data/games.csv et data/software.csv)
   - Respectez le format des champs existants
   - Placez vos images dans les dossiers img/games/ et img/software/

3. **Apparence** :
   - Modifiez les couleurs des thèmes dans css/themes.css
   - Ajustez le style général dans css/style.css

## Déploiement sur GitHub

1. Créez un nouveau dépôt sur GitHub
2. Initialisez Git dans le dossier du projet :
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-pseudo/nom-du-repo.git
   git push -u origin main
   ```

## Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com/) si vous n'en avez pas déjà un
2. Connectez votre compte GitHub à Vercel
3. Importez votre dépôt GitHub dans Vercel
4. Configurez le projet :
   - Framework preset : Other
   - Root directory : ./
   - Build command : (laissez vide)
   - Output directory : ./
5. Cliquez sur "Deploy"

Vercel détectera automatiquement qu'il s'agit d'un site statique et le déploiera correctement.

## Mise à jour du site

Pour mettre à jour votre site après des modifications :

1. Modifiez les fichiers nécessaires
2. Committez et poussez les changements vers GitHub :
   ```
   git add .
   git commit -m "Description des modifications"
   git push
   ```
3. Vercel déploiera automatiquement les modifications

## Notes importantes

- Les formulaires de contact ne sont pas fonctionnels sans backend. Pour les rendre opérationnels, vous devrez intégrer un service comme Formspree ou Netlify Forms.
- Pour ajouter de nouveaux projets, il suffit de modifier les fichiers CSV et d'ajouter les images correspondantes.
- Le site est entièrement statique et peut être hébergé sur n'importe quelle plateforme d'hébergement statique.
