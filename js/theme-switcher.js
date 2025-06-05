// Gestion des thèmes pour le portfolio

// Fonction pour définir le thème
function setTheme(themeName) {
    // Supprime toutes les classes de thème du body
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-light-blue', 'theme-dark-blue');
    
    // Ajoute la classe du thème sélectionné
    document.body.classList.add(themeName);
    
    // Enregistre le thème dans le localStorage
    localStorage.setItem('theme', themeName);
    
    // Met à jour les boutons de thème
    updateThemeButtons(themeName);
}

// Fonction pour mettre à jour l'état des boutons de thème
function updateThemeButtons(themeName) {
    // Supprime la classe active de tous les boutons
    document.querySelectorAll('.theme-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Ajoute la classe active au bouton du thème sélectionné
    const activeButton = document.getElementById(themeName);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Fonction pour initialiser le thème
function initTheme() {
    // Récupère le thème enregistré ou utilise le thème sombre par défaut
    const savedTheme = localStorage.getItem('theme') || 'theme-dark';
    
    // Applique le thème
    setTheme(savedTheme);
}

// Ajoute les écouteurs d'événements aux boutons de thème
document.addEventListener('DOMContentLoaded', () => {
    // Initialise le thème
    initTheme();
    
    // Ajoute les écouteurs d'événements aux boutons de thème
    document.getElementById('theme-dark').addEventListener('click', () => setTheme('theme-dark'));
    document.getElementById('theme-light').addEventListener('click', () => setTheme('theme-light'));
    document.getElementById('theme-light-blue').addEventListener('click', () => setTheme('theme-light-blue'));
    document.getElementById('theme-dark-blue').addEventListener('click', () => setTheme('theme-dark-blue'));
});
