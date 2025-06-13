// Variables globales
let projectsData = {};
let currentProject = null;
let isScrolling = false;
let currentPageIndex = 0;
const pages = ['home', 'games', 'software', 'about', 'contact'];
const PROJECTS_PER_PAGE = 3; // Nombre de projets à afficher initialement
let displayedProjects = {
    games: PROJECTS_PER_PAGE,
    software: PROJECTS_PER_PAGE
};
let filteredProjects = {
    games: [],
    software: []
};

// Charger les données depuis le fichier JSON
async function loadProjectsData() {
    try {
        console.log('Tentative de chargement de projects.json...');
        const response = await fetch('./projects.json');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Données chargées avec succès:', data);
        
        // Utiliser directement les données du fichier projects.json
        projectsData = data;
        
        // Afficher un message de succès
        showNotification('Données chargées depuis projects.json', 'success');
        
        loadProjects('games');
        loadProjects('software');
        
    } catch (error) {
        console.error('Erreur lors du chargement de projects.json:', error);
        
        // Afficher un message d'erreur
        showNotification('Erreur de chargement - utilisation des données de fallback', 'error');
        
        // Utiliser les données de fallback intégrées
        projectsData = {
            games: [
                {
                    id: 'game1',
                    title: 'Adventure Quest',
                    shortDescription: 'Un jeu d\'aventure captivant avec des énigmes et des combats épiques.',
                    fullDescription: 'Adventure Quest est un jeu d\'aventure immersif qui vous plonge dans un monde fantastique. Explorez des donjons mystérieux, résolvez des énigmes complexes et affrontez des créatures légendaires. Le jeu propose un système de progression complet avec des compétences à débloquer et des équipements à collecter.',
                    image: 'https://via.placeholder.com/350x200/3b82f6/ffffff?text=Adventure+Quest',
                    images: [
                        'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Adventure+Quest+Screenshot+1',
                        'https://via.placeholder.com/800x600/1d4ed8/ffffff?text=Adventure+Quest+Screenshot+2',
                        'https://via.placeholder.com/800x600/60a5fa/ffffff?text=Adventure+Quest+Screenshot+3'
                    ],
                    features: [
                        'Monde ouvert explorable',
                        'Système de combat tactique',
                        'Plus de 50 quêtes principales',
                        'Crafting et amélioration d\'équipements',
                        'Mode multijoueur coopératif'
                    ],
                    downloadUrl: '#'
                },
                {
                    id: 'game2',
                    title: 'Space Explorer',
                    shortDescription: 'Explorez l\'espace infini dans ce jeu de simulation spatiale.',
                    fullDescription: 'Space Explorer vous permet de commander votre propre vaisseau spatial et d\'explorer une galaxie procédurale infinie. Découvrez de nouvelles planètes, commercez avec des aliens, et construisez votre empire galactique.',
                    image: 'https://via.placeholder.com/350x200/8b5cf6/ffffff?text=Space+Explorer',
                    images: [
                        'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Space+Explorer+Screenshot+1',
                        'https://via.placeholder.com/800x600/7c3aed/ffffff?text=Space+Explorer+Screenshot+2'
                    ],
                    features: [
                        'Galaxie procédurale infinie',
                        'Commerce intergalactique',
                        'Construction de vaisseaux',
                        'Exploration de planètes',
                        'Diplomatie alien'
                    ],
                    downloadUrl: '#'
                },
                {
                    id: 'game3',
                    title: 'Puzzle Master',
                    shortDescription: 'Des énigmes complexes qui défieront votre logique.',
                    fullDescription: 'Puzzle Master propose plus de 200 énigmes uniques qui testeront votre capacité de réflexion. Des puzzles simples aux casse-têtes les plus complexes, ce jeu offre des heures de divertissement intellectuel.',
                    image: 'https://via.placeholder.com/350x200/10b981/ffffff?text=Puzzle+Master',
                    images: [
                        'https://via.placeholder.com/800x600/10b981/ffffff?text=Puzzle+Master+Screenshot+1'
                    ],
                    features: [
                        'Plus de 200 énigmes',
                        'Difficulté progressive',
                        'Système d\'indices',
                        'Mode chronométré',
                        'Classements en ligne'
                    ],
                    downloadUrl: '#'
                },
                {
                    id: 'game4',
                    title: 'Racing Thunder',
                    shortDescription: 'Course automobile arcade avec des véhicules personnalisables.',
                    fullDescription: 'Racing Thunder est un jeu de course arcade où vous pouvez personnaliser vos véhicules et affronter des adversaires sur des circuits spectaculaires. Débloquez de nouvelles voitures et améliorez leurs performances.',
                    image: 'https://via.placeholder.com/350x200/f59e0b/ffffff?text=Racing+Thunder',
                    images: [
                        'https://via.placeholder.com/800x600/f59e0b/ffffff?text=Racing+Thunder+Screenshot+1'
                    ],
                    features: [
                        'Véhicules personnalisables',
                        'Circuits spectaculaires',
                        'Mode multijoueur',
                        'Système d\'amélioration',
                        'Physique réaliste'
                    ],
                    downloadUrl: '#'
                },
                {
                    id: 'game5',
                    title: 'Fantasy RPG',
                    shortDescription: 'Un RPG classique avec un système de magie innovant.',
                    fullDescription: 'Fantasy RPG vous transporte dans un monde médiéval fantastique où la magie règne en maître. Créez votre personnage, maîtrisez des sorts puissants et partez à l\'aventure dans un monde ouvert rempli de mystères.',
                    image: 'https://via.placeholder.com/350x200/ef4444/ffffff?text=Fantasy+RPG',
                    images: [
                        'https://via.placeholder.com/800x600/ef4444/ffffff?text=Fantasy+RPG+Screenshot+1'
                    ],
                    features: [
                        'Système de magie innovant',
                        'Monde ouvert',
                        'Création de personnage',
                        'Quêtes épiques',
                        'Guildes de joueurs'
                    ],
                    downloadUrl: '#'
                }
            ],
            software: [
                {
                    id: 'soft1',
                    title: 'TaskMaster Pro',
                    shortDescription: 'Gestionnaire de tâches avancé avec synchronisation cloud.',
                    fullDescription: 'TaskMaster Pro est un gestionnaire de tâches complet qui vous aide à organiser votre vie professionnelle et personnelle. Fonctionnalités : synchronisation multi-appareils, rappels intelligents, collaboration en équipe, rapports de productivité et intégration avec les calendriers populaires.',
                    image: 'https://via.placeholder.com/350x200/8b5cf6/ffffff?text=TaskMaster+Pro',
                    images: [
                        'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=TaskMaster+Pro+Screenshot+1',
                        'https://via.placeholder.com/800x600/7c3aed/ffffff?text=TaskMaster+Pro+Screenshot+2',
                        'https://via.placeholder.com/800x600/a78bfa/ffffff?text=TaskMaster+Pro+Screenshot+3'
                    ],
                    features: [
                        'Synchronisation cloud automatique',
                        'Collaboration en équipe',
                        'Rappels intelligents',
                        'Rapports de productivité',
                        'Intégration calendrier'
                    ],
                    downloadUrl: '#'
                },
                {
                    id: 'soft2',
                    title: 'CodeEditor Plus',
                    shortDescription: 'Éditeur de code moderne avec intelligence artificielle.',
                    fullDescription: 'CodeEditor Plus révolutionne l\'expérience de développement avec son assistant IA intégré. Autocomplétion intelligente, détection d\'erreurs en temps réel, et suggestions d\'optimisation pour plus de 50 langages de programmation.',
                    image: 'https://via.placeholder.com/350x200/3b82f6/ffffff?text=CodeEditor+Plus',
                    images: [
                        'https://via.placeholder.com/800x600/3b82f6/ffffff?text=CodeEditor+Plus+Screenshot+1'
                    ],
                    features: [
                        'Assistant IA intégré',
                        'Support de 50+ langages',
                        'Détection d\'erreurs temps réel',
                        'Thèmes personnalisables',
                        'Extensions communautaires'
                    ],
                    downloadUrl: '#'
                },
                {
                    id: 'soft3',
                    title: 'PhotoStudio',
                    shortDescription: 'Suite complète d\'édition photo professionnelle.',
                    fullDescription: 'PhotoStudio offre tous les outils nécessaires pour l\'édition photo professionnelle. Retouche avancée, filtres artistiques, gestion des calques, et export optimisé pour tous les formats et plateformes.',
                    image: 'https://via.placeholder.com/350x200/10b981/ffffff?text=PhotoStudio',
                    images: [
                        'https://via.placeholder.com/800x600/10b981/ffffff?text=PhotoStudio+Screenshot+1'
                    ],
                    features: [
                        'Retouche professionnelle',
                        'Filtres artistiques',
                        'Gestion des calques',
                        'Export multi-format',
                        'Interface intuitive'
                    ],
                    downloadUrl: '#'
                },
                {
                    id: 'soft4',
                    title: 'DataViz Pro',
                    shortDescription: 'Outil de visualisation de données interactives.',
                    fullDescription: 'DataViz Pro transforme vos données en visualisations interactives et engageantes. Créez des graphiques dynamiques, des tableaux de bord personnalisés et des rapports automatisés pour vos analyses business.',
                    image: 'https://via.placeholder.com/350x200/f59e0b/ffffff?text=DataViz+Pro',
                    images: [
                        'https://via.placeholder.com/800x600/f59e0b/ffffff?text=DataViz+Pro+Screenshot+1'
                    ],
                    features: [
                        'Graphiques interactifs',
                        'Tableaux de bord',
                        'Rapports automatisés',
                        'Import multi-sources',
                        'Partage collaboratif'
                    ],
                    downloadUrl: '#'
                }
            ]
        };
        
        loadProjects('games');
        loadProjects('software');
    }
}

// Navigation entre les pages avec animation slide
function showPage(pageId, direction = 'next') {
    if (isScrolling) return;
    
    isScrolling = true;
    
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(pageId);
    
    if (!targetPage || currentPage === targetPage) {
        isScrolling = false;
        return;
    }
    
    // Mettre à jour l'index de la page courante
    currentPageIndex = pages.indexOf(pageId);
    
    // Préparer l'animation
    targetPage.style.display = 'block';
    targetPage.classList.add('page-entering');
    
    if (direction === 'next') {
        targetPage.style.transform = 'translateY(100vh)';
        currentPage.style.transform = 'translateY(0)';
    } else {
        targetPage.style.transform = 'translateY(-100vh)';
        currentPage.style.transform = 'translateY(0)';
    }
    
    // Forcer le reflow
    targetPage.offsetHeight;
    
    // Démarrer l'animation
    requestAnimationFrame(() => {
        targetPage.style.transform = 'translateY(0)';
        
        if (direction === 'next') {
            currentPage.style.transform = 'translateY(-100vh)';
        } else {
            currentPage.style.transform = 'translateY(100vh)';
        }
        
        // Nettoyer après l'animation
        setTimeout(() => {
            // Masquer l'ancienne page
            currentPage.classList.remove('active');
            currentPage.style.display = 'none';
            currentPage.style.transform = '';
            
            // Afficher la nouvelle page
            targetPage.classList.add('active');
            targetPage.classList.remove('page-entering');
            targetPage.style.transform = '';
            
            isScrolling = false;
        }, 600);
    });
}

// Navigation par scroll
function initScrollNavigation() {
    let lastScrollTime = 0;
    const scrollThreshold = 100; // Seuil de scroll minimum
    const scrollCooldown = 1000; // Temps d'attente entre les navigations
    
    function handleScroll(event) {
        if (isScrolling) return;
        
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        
        const delta = event.deltaY || event.detail || event.wheelDelta;
        
        if (Math.abs(delta) < scrollThreshold) return;
        
        lastScrollTime = now;
        
        if (delta > 0) {
            // Scroll vers le bas - page suivante
            navigateToNextPage();
        } else {
            // Scroll vers le haut - page précédente
            navigateToPreviousPage();
        }
    }
    
    // Gestion du scroll avec la molette
    document.addEventListener('wheel', handleScroll, { passive: true });
    
    // Gestion du scroll tactile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        
        touchEndY = e.changedTouches[0].screenY;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaY) < 50) return; // Seuil minimum pour le swipe
        
        if (deltaY > 0) {
            // Swipe vers le haut - page suivante
            navigateToNextPage();
        } else {
            // Swipe vers le bas - page précédente
            navigateToPreviousPage();
        }
    }, { passive: true });
}

function navigateToNextPage() {
    if (currentPageIndex < pages.length - 1) {
        const nextPage = pages[currentPageIndex + 1];
        showPage(nextPage, 'next');
    }
}

function navigateToPreviousPage() {
    if (currentPageIndex > 0) {
        const previousPage = pages[currentPageIndex - 1];
        showPage(previousPage, 'prev');
    }
}

// Charger les projets avec limitation
function loadProjects(type) {
    const container = document.getElementById(`${type}-grid`);
    const showMoreSection = document.getElementById(`${type}-show-more`);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (projectsData[type]) {
        // Initialiser les projets filtrés
        filteredProjects[type] = projectsData[type];
        
        // Afficher seulement les premiers projets
        const projectsToShow = filteredProjects[type].slice(0, displayedProjects[type]);
        
        projectsToShow.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            // Ajouter une animation avec délai
            setTimeout(() => {
                projectCard.classList.add('fade-in');
                container.appendChild(projectCard);
            }, index * 100);
        });
        
        // Afficher le bouton "voir plus" s'il y a plus de projets
        if (filteredProjects[type].length > displayedProjects[type]) {
            showMoreSection.style.display = 'block';
        } else {
            showMoreSection.style.display = 'none';
        }
        
        // Charger aussi tous les projets dans la section dédiée
        loadAllProjects(type);
    }
}

// Charger tous les projets dans la section dédiée
function loadAllProjects(type) {
    const container = document.getElementById(`all-${type}-grid`);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (projectsData[type]) {
        projectsData[type].forEach((project, index) => {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
        });
    }
}

// Afficher plus de projets
function showMoreProjects(type) {
    const container = document.getElementById(`${type}-grid`);
    const showMoreSection = document.getElementById(`${type}-show-more`);
    
    if (!projectsData[type]) return;
    
    const currentCount = displayedProjects[type];
    const newCount = Math.min(currentCount + PROJECTS_PER_PAGE, filteredProjects[type].length);
    
    // Ajouter les nouveaux projets
    const newProjects = filteredProjects[type].slice(currentCount, newCount);
    
    newProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        setTimeout(() => {
            projectCard.classList.add('fade-in');
            container.appendChild(projectCard);
        }, index * 100);
    });
    
    displayedProjects[type] = newCount;
    
    // Masquer le bouton si tous les projets sont affichés
    if (displayedProjects[type] >= filteredProjects[type].length) {
        showMoreSection.style.display = 'none';
    }
}

// Afficher tous les projets (rediriger vers la section dédiée)
function showAllProjects(type) {
    const targetPage = `all-${type}`;
    const currentIndex = pages.indexOf(targetPage);
    
    // Ajouter temporairement la page à la liste si elle n'y est pas
    if (currentIndex === -1) {
        // Ne pas ajouter à la liste principale pour éviter la navigation par scroll
        showPage(targetPage, 'next');
    } else {
        const direction = currentIndex > currentPageIndex ? 'next' : 'prev';
        showPage(targetPage, direction);
    }
}

// Retourner à la section principale
function goBackToSection(type) {
    const direction = 'prev';
    showPage(type, direction);
}

// Rechercher des projets
function searchProjects(type) {
    const searchInput = document.getElementById(`${type}-search`);
    const query = searchInput.value.toLowerCase().trim();
    const container = document.getElementById(`all-${type}-grid`);
    
    if (!container || !projectsData[type]) return;
    
    container.innerHTML = '';
    
    let results = projectsData[type];
    
    if (query) {
        results = projectsData[type].filter(project => 
            project.title.toLowerCase().includes(query) ||
            project.shortDescription.toLowerCase().includes(query) ||
            project.features.some(feature => feature.toLowerCase().includes(query))
        );
    }
    
    if (results.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
                <h3>Aucun résultat trouvé</h3>
                <p>Essayez avec d'autres mots-clés</p>
            </div>
        `;
    } else {
        results.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            setTimeout(() => {
                projectCard.classList.add('fade-in');
                container.appendChild(projectCard);
            }, index * 50);
        });
    }
}

// Ajouter la recherche en temps réel
function initSearch() {
    const gamesSearch = document.getElementById('games-search');
    const softwareSearch = document.getElementById('software-search');
    
    if (gamesSearch) {
        gamesSearch.addEventListener('input', () => searchProjects('games'));
        gamesSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProjects('games');
            }
        });
    }
    
    if (softwareSearch) {
        softwareSearch.addEventListener('input', () => searchProjects('software'));
        softwareSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProjects('software');
            }
        });
    }
}

// Créer une carte de projet
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.shortDescription}</p>
        <button class="btn-primary" data-project-id="${project.id}">Voir plus</button>
    `;
    return card;
}

// Gestion de la modale plein écran
function openModal(projectId) {
    // Trouver le projet
    let project = null;
    for (const type in projectsData) {
        project = projectsData[type].find(p => p.id === projectId);
        if (project) break;
    }
    
    if (!project) return;
    
    currentProject = project;
    
    // Remplir la modale
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.fullDescription;
    
    // Image principale
    const mainImage = document.getElementById('mainModalImage');
    mainImage.src = project.images[0];
    mainImage.alt = `Image principale de ${project.title}`;
    
    // Miniatures
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    project.images.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail-item ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${imgSrc}" alt="Miniature ${index + 1}">`;
        thumbnail.addEventListener('click', () => {
            mainImage.src = imgSrc;
            document.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Caractéristiques
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    
    if (project.features) {
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
    }
    
    // Boutons d'action
    const modalActions = document.querySelector('.modal-actions');
    modalActions.innerHTML = ''; // Vider les boutons existants
    
    if (project.buttons && project.buttons.length > 0) {
        project.buttons.forEach(buttonData => {
            const button = document.createElement('button');
            button.className = buttonData.type === 'primary' ? 'btn-download' : 'btn-demo';
            button.innerHTML = `
                <span>${buttonData.icon}</span>
                ${buttonData.text}
            `;
            
            button.addEventListener('click', () => {
                if (buttonData.url && buttonData.url !== '#') {
                    window.open(buttonData.url, '_blank');
                } else {
                    showNotification(`Action "${buttonData.text}" sera bientôt disponible !`, 'info');
                }
            });
            
            modalActions.appendChild(button);
        });
    }
    
    // Afficher la modale
    const modal = document.getElementById('projectModal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus sur le bouton de fermeture
    setTimeout(() => {
        document.querySelector('.modal-close').focus();
    }, 100);
}

// Fermer la modale
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentProject = null;
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Styles pour la notification
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        border-radius: 12px;
        padding: 16px 20px;
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Bouton de fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-suppression après 4 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

// Gestion du formulaire de contact
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulation d'envoi
        showNotification(`Merci ${name} ! Votre message a été envoyé.`, 'success');
        form.reset();
    });
}

// Animations au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.project-card, .skill-item, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', async function() {
    // Charger les données
    await loadProjectsData();
    
    // Initialiser la navigation par scroll
    initScrollNavigation();
    
    // Initialiser le formulaire de contact
    initContactForm();
    
    // Initialiser la recherche
    initSearch();
    
    // Navigation
    document.addEventListener('click', (event) => {
        // Boutons d'action dans le hero
        if (event.target.classList.contains('btn-primary') || event.target.classList.contains('btn-secondary')) {
            const pageId = event.target.dataset.page;
            if (pageId) {
                const currentIndex = pages.indexOf(pageId);
                const direction = currentIndex > currentPageIndex ? 'next' : 'prev';
                showPage(pageId, direction);
                return;
            }
        }
        
        // Boutons "Voir plus" des projets
        if (event.target.classList.contains('btn-primary') && event.target.dataset.projectId) {
            openModal(event.target.dataset.projectId);
        }
    });
    
    // Fermeture de la modale
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Fermer la modale en cliquant à l'extérieur
    document.getElementById('projectModal').addEventListener('click', (event) => {
        if (event.target.id === 'projectModal') {
            closeModal();
        }
    });
    
    // Raccourcis clavier
    document.addEventListener('keydown', (event) => {
        // Fermer la modale avec Escape
        if (event.key === 'Escape') {
            const modal = document.getElementById('projectModal');
            if (modal.style.display === 'block') {
                closeModal();
            }
        }
        
        // Navigation avec les touches numériques
        if (event.key >= '1' && event.key <= '5') {
            const pageIndex = parseInt(event.key) - 1;
            if (pages[pageIndex]) {
                const direction = pageIndex > currentPageIndex ? 'next' : 'prev';
                showPage(pages[pageIndex], direction);
            }
        }
        
        // Navigation avec les flèches
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            navigateToNextPage();
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            navigateToPreviousPage();
        }
    });
    
    console.log('Portfolio initialisé avec succès !');
});