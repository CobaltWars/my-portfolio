// Chargement des jeux depuis le CSV
document.addEventListener('DOMContentLoaded', () => {
    // Importer le script de gestion des projets
    const script = document.createElement('script');
    script.src = 'js/projects.js';
    script.onload = () => {
        // Une fois le script chargé, charger les jeux
        loadProjects('data/games.csv', 'games-container');
    };
    document.head.appendChild(script);
});
