document.addEventListener('DOMContentLoaded', function() {
    const themeOptions = document.querySelectorAll('.dial-option');
    const dialCenter = document.querySelector('.dial-center');

    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('portfolio-theme') || 'theme-dark';
    document.body.className = savedTheme;
    updateActiveTheme(savedTheme);

    // Gérer les clics sur les options
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.className = theme;
            localStorage.setItem('portfolio-theme', theme);
            updateActiveTheme(theme);
        });
    });

    // Mettre à jour l'option active
    function updateActiveTheme(theme) {
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
                dialCenter.textContent = option.textContent;
            }
        });
    }

    // Faire tourner le cadran au clic sur le centre
    dialCenter.addEventListener('click', function() {
        const dialOptions = document.querySelector('.dial-options');
        dialOptions.classList.toggle('rotated');
    });
});