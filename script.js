// Variables globales
let projectsData = {};
let currentProject = null;

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
                    title: 'Adventure Quest (Fallback)',
                    shortDescription: 'Un jeu d\'aventure captivant avec des énigmes et des combats épiques.',
                    fullDescription: 'Adventure Quest est un jeu d\'aventure immersif qui vous plonge dans un monde fantastique. Explorez des donjons mystérieux, résolvez des énigmes complexes et affrontez des créatures légendaires. Le jeu propose un système de progression complet avec des compétences à débloquer et des équipements à collecter.',
                    image: 'https://via.placeholder.com/350x200/3b82f6/ffffff?text=Adventure+Quest+Fallback',
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
                }
            ],
            software: [
                {
                    id: 'soft1',
                    title: 'TaskMaster Pro (Fallback)',
                    shortDescription: 'Gestionnaire de tâches avancé avec synchronisation cloud.',
                    fullDescription: 'TaskMaster Pro est un gestionnaire de tâches complet qui vous aide à organiser votre vie professionnelle et personnelle. Fonctionnalités : synchronisation multi-appareils, rappels intelligents, collaboration en équipe, rapports de productivité et intégration avec les calendriers populaires.',
                    image: 'https://via.placeholder.com/350x200/8b5cf6/ffffff?text=TaskMaster+Pro+Fallback',
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
                }
            ]
        };
        
        loadProjects('games');
        loadProjects('software');
    }
}

// Gestion de la barre latérale
function initSidebar() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    function toggleSidebar() {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeSidebar() {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    hamburger.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // Fermer la sidebar sur Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

// Navigation entre les pages
function showPage(pageId) {
    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Désactiver tous les boutons de navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Afficher la page sélectionnée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Activer le bouton correspondant
    const activeBtn = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Fermer la sidebar sur mobile après navigation
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const hamburger = document.getElementById('hamburger');
        
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Charger les projets
function loadProjects(type) {
    const container = document.getElementById(`${type}-grid`);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (projectsData[type]) {
        projectsData[type].forEach(project => {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
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
    
    // Initialiser la barre latérale
    initSidebar();
    
    // Initialiser le formulaire de contact
    initContactForm();
    
    // Initialiser les animations
    initScrollAnimations();
    
    // Navigation
    document.addEventListener('click', (event) => {
        // Navigation par boutons
        if (event.target.classList.contains('nav-item') || event.target.closest('.nav-item')) {
            const navItem = event.target.classList.contains('nav-item') ? event.target : event.target.closest('.nav-item');
            const pageId = navItem.dataset.page;
            if (pageId) {
                showPage(pageId);
            }
        }
        
        // Boutons d'action dans le hero
        if (event.target.classList.contains('btn-primary') || event.target.classList.contains('btn-secondary')) {
            const pageId = event.target.dataset.page;
            if (pageId) {
                showPage(pageId);
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
            const pages = ['home', 'games', 'software', 'about', 'contact'];
            const pageIndex = parseInt(event.key) - 1;
            if (pages[pageIndex]) {
                showPage(pages[pageIndex]);
            }
        }
    });
    
    // Gestion du redimensionnement
    window.addEventListener('resize', () => {
        // Fermer la sidebar sur desktop si elle est ouverte
        if (window.innerWidth > 768) {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const hamburger = document.getElementById('hamburger');
            
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('Portfolio initialisé avec succès !');
});

