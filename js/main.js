// Chargement des projets à la une sur la page d'accueil
document.addEventListener('DOMContentLoaded', () => {
    // Importer le script de gestion des projets
    const script = document.createElement('script');
    script.src = 'js/projects.js';
    script.onload = () => {
        // Une fois le script chargé, charger les projets à la une
        // On charge 2 jeux et 1 logiciel pour la page d'accueil
        Promise.all([
            parseCSV('data/games.csv'),
            parseCSV('data/software.csv')
        ]).then(([games, software]) => {
            const featuredContainer = document.getElementById('featured-projects-container');
            if (!featuredContainer) return;
            
            // Vider le conteneur
            featuredContainer.innerHTML = '';
            
            // Ajouter 2 jeux
            if (games.length > 0) {
                for (let i = 0; i < Math.min(2, games.length); i++) {
                    const card = createProjectCard(games[i]);
                    featuredContainer.appendChild(card);
                }
            }
            
            // Ajouter 1 logiciel
            if (software.length > 0) {
                const card = createProjectCard(software[0]);
                featuredContainer.appendChild(card);
            }
            
            // Si aucun projet n'est disponible
            if (featuredContainer.children.length === 0) {
                featuredContainer.innerHTML = '<p>Aucun projet à la une pour le moment.</p>';
            }
        }).catch(error => {
            console.error('Erreur lors du chargement des projets à la une:', error);
            document.getElementById('featured-projects-container').innerHTML = 
                '<p>Une erreur est survenue lors du chargement des projets.</p>';
        });
    };
    document.head.appendChild(script);
});
