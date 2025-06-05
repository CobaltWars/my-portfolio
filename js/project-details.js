// Chargement des détails d'un projet spécifique
document.addEventListener('DOMContentLoaded', () => {
    // Importer le script de gestion des projets
    const script = document.createElement('script');
    script.src = 'js/projects.js';
    script.onload = () => {
        // Une fois le script chargé, charger les détails du projet
        loadProjectDetails({
            games: 'data/games.csv',
            software: 'data/software.csv'
        });
    };
    document.head.appendChild(script);
});
