// Chargement des logiciels depuis le CSV
document.addEventListener('DOMContentLoaded', () => {
    // Importer le script de gestion des projets
    const script = document.createElement('script');
    script.src = 'js/projects.js';
    script.onload = () => {
        // Une fois le script chargé, charger les logiciels
        loadProjects('data/software.csv', 'software-container');
    };
    document.head.appendChild(script);
});
