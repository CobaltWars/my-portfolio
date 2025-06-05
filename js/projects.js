// Chargement dynamique des projets depuis les fichiers CSV

// Fonction pour parser le CSV
async function parseCSV(filePath) {
    try {
        const response = await fetch(filePath);
        const data = await response.text();
        
        // Séparation des lignes
        const lines = data.split('\n');
        const headers = lines[0].split(',');
        
        const result = [];
        
        // Parcours des lignes (sauf l'en-tête)
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue; // Ignorer les lignes vides
            
            // Gestion des virgules dans les champs avec guillemets
            const row = {};
            let currentLine = lines[i];
            let inQuotes = false;
            let currentField = '';
            let fieldIndex = 0;
            
            for (let j = 0; j < currentLine.length; j++) {
                const char = currentLine[j];
                
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    row[headers[fieldIndex]] = currentField.trim();
                    currentField = '';
                    fieldIndex++;
                } else {
                    currentField += char;
                }
            }
            
            // Dernier champ
            if (fieldIndex < headers.length) {
                row[headers[fieldIndex]] = currentField.trim();
            }
            
            result.push(row);
        }
        
        return result;
    } catch (error) {
        console.error('Erreur lors du chargement du CSV:', error);
        return [];
    }
}

// Fonction pour créer une carte de projet
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Création du contenu de la carte
    card.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.title}" class="project-image">
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.short_description}</p>
            <a href="project.html?id=${project.id}&type=${project.type}" class="btn">Voir plus</a>
        </div>
    `;
    
    return card;
}

// Fonction pour charger les projets dans un conteneur
async function loadProjects(csvPath, containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Affichage du chargement
    container.innerHTML = '<div class="loading">Chargement des projets...</div>';
    
    try {
        // Chargement et parsing du CSV
        const projects = await parseCSV(csvPath);
        
        // Vider le conteneur
        container.innerHTML = '';
        
        // Limiter le nombre de projets si nécessaire
        const projectsToShow = limit ? projects.slice(0, limit) : projects;
        
        // Création des cartes de projet
        if (projectsToShow.length > 0) {
            projectsToShow.forEach(project => {
                const card = createProjectCard(project);
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p>Aucun projet disponible pour le moment.</p>';
        }
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        container.innerHTML = '<p>Une erreur est survenue lors du chargement des projets.</p>';
    }
}

// Fonction pour charger les détails d'un projet spécifique
async function loadProjectDetails(csvPaths) {
    // Récupération des paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const projectType = urlParams.get('type');
    
    if (!projectId || !projectType) {
        document.getElementById('project-header-content').innerHTML = '<p>Projet non trouvé.</p>';
        return;
    }
    
    // Sélection du CSV en fonction du type de projet
    let csvPath;
    if (projectType === 'game') {
        csvPath = csvPaths.games;
    } else if (projectType === 'software') {
        csvPath = csvPaths.software;
    } else {
        document.getElementById('project-header-content').innerHTML = '<p>Type de projet non valide.</p>';
        return;
    }
    
    try {
        // Chargement et parsing du CSV
        const projects = await parseCSV(csvPath);
        
        // Recherche du projet
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            document.getElementById('project-header-content').innerHTML = '<p>Projet non trouvé.</p>';
            return;
        }
        
        // Mise à jour du titre de la page
        document.title = `${project.title} | Portfolio Développeur`;
        
        // Affichage de l'en-tête du projet
        document.getElementById('project-header-content').innerHTML = `
            <h2>${project.title}</h2>
            <div class="project-meta">
                <span>Type: ${projectType === 'game' ? 'Jeu' : 'Logiciel'}</span> | 
                <span>Date de sortie: ${project.release_date}</span> | 
                <span>Technologies: ${project.technologies}</span>
            </div>
        `;
        
        // Affichage de la description complète
        document.getElementById('project-details-content').innerHTML = `
            <div class="project-description">
                ${project.full_description.replace(/\n/g, '<br>')}
            </div>
        `;
        
        // Affichage de la galerie d'images
        const galleryContainer = document.getElementById('project-gallery-content');
        const images = project.images.split(',');
        
        galleryContainer.innerHTML = '';
        images.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `<img src="${image.trim()}" alt="${project.title}">`;
            galleryContainer.appendChild(galleryItem);
        });
        
        // Affichage des liens de téléchargement
        document.getElementById('project-download-content').innerHTML = `
            <h3>Téléchargement</h3>
            <div class="download-links">
                <a href="${project.download_link}" class="btn" target="_blank">Télécharger</a>
                <a href="${project.github_link}" class="btn" target="_blank">GitHub</a>
            </div>
        `;
        
    } catch (error) {
        console.error('Erreur lors du chargement des détails du projet:', error);
        document.getElementById('project-header-content').innerHTML = '<p>Une erreur est survenue lors du chargement des détails du projet.</p>';
    }
}
