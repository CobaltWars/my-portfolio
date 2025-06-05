document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themes = ['theme-dark', 'theme-light', 'theme-light-blue', 'theme-dark-blue'];
    const themeIcons = ['🌑', '☀️', '🔆', '🌊'];
    let currentThemeIndex = 0;

    // Vérifie s'il y a un thème sauvegardé dans localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.body.className = savedTheme;
        currentThemeIndex = themes.indexOf(savedTheme);
        themeIcon.textContent = themeIcons[currentThemeIndex];
    }

    themeToggle.addEventListener('click', function() {
        // Passe au thème suivant
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        
        // Applique le nouveau thème
        const newTheme = themes[currentThemeIndex];
        document.body.className = newTheme;
        themeIcon.textContent = themeIcons[currentThemeIndex];
        
        // Sauvegarde le thème
        localStorage.setItem('portfolio-theme', newTheme);
    });
});