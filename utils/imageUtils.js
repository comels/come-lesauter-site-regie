/**
 * Utilitaires pour gérer les chemins d'images et les liens de projets
 * 
 * Ces fonctions centralisent la logique de gestion des images pour éviter la duplication
 * et faciliter la maintenance. Elles gèrent également les cas spéciaux (Monoprix, Echos, Kitsuné).
 */

/**
 * Obtient le nom de fichier de l'image de couverture d'un projet
 * 
 * SYSTÈME D'IMAGES :
 * - NOUVEAU SYSTÈME : project.coverImage spécifie quelle photo utiliser (ex: 'photo-1.jpg')
 *   Permet de changer facilement l'image de couverture sans renommer de fichiers.
 * - ANCIEN SYSTÈME : project.coverFile (rétrocompatibilité avec les anciens projets)
 * - FALLBACK : Si aucun n'est défini, utilise la première image du tableau project.images
 * 
 * @param {Object} project - Le projet avec coverImage, coverFile, ou images
 * @returns {string|null} Le nom de fichier de l'image de couverture, ou null si aucune image
 */
export function getCoverFileName(project) {
  // Nouveau système : coverImage spécifie quelle photo utiliser (ex: 'photo-1.jpg')
  if (project.coverImage) {
    return project.coverImage;
  }
  
  // Ancien système : coverFile (rétrocompatibilité)
  if (project.coverFile) {
    return project.coverFile;
  }
  
  // Fallback : utilise la première image si aucune couverture n'est spécifiée
  if (project.images && project.images.length > 0) {
    return project.images[0];
  }
  
  return null;
}

/**
 * Construit le chemin complet vers l'image de couverture d'un projet
 * 
 * Gère les cas spéciaux pour les projets avec sous-projets (Monoprix, Echos, Kitsuné).
 * Ces projets ont une structure de dossiers différente car ils contiennent plusieurs sous-projets.
 * 
 * STRUCTURE DES DOSSIERS :
 * - Projets normaux : /projects/{slug}/{coverFileName}
 * - Monoprix : /projects/monoprix/{subproject-slug}/{coverFileName}
 * - Echos : /projects/{subproject-slug}/{coverFileName} (le slug du sous-projet est dans coverFileName)
 * - Kitsuné : /projects/kitsune/{subproject-slug}/{coverFileName}
 * 
 * @param {Object} project - Le projet avec son slug et coverImage/coverFile
 * @param {string} basePath - Le chemin de base (par défaut '/projects')
 * @returns {string} Le chemin complet vers l'image de couverture, ou '' si aucune image
 */
export function getProjectImagePath(project, basePath = '/projects') {
  const coverFileName = getCoverFileName(project);
  if (!coverFileName) return '';
  
  // CAS SPÉCIAL : Monoprix
  // Les images sont dans /projects/monoprix/{subproject-slug}/
  if (project.slug === 'monoprix') {
    // Si coverFileName contient déjà un chemin (ex: 'monoprix-birds/photo-1.jpg')
    if (coverFileName.includes('/')) {
      return `${basePath}/monoprix/${coverFileName}`;
    }
    // Sinon, c'est un projet Monoprix principal
    return `${basePath}/monoprix/${coverFileName}`;
  }
  
  // CAS SPÉCIAL : Echos
  // Le coverImage peut contenir le chemin complet du sous-projet (ex: 'les-echos-week-end-422/photo-1.jpg')
  if (project.slug === 'echos') {
    if (coverFileName.includes('/')) {
      return `${basePath}/${coverFileName}`;
    }
    return `${basePath}/${project.slug}/${coverFileName}`;
  }
  
  // CAS GÉNÉRAL : projets normaux
  // Format : /projects/{slug}/{coverFileName}
  return `${basePath}/${project.slug}/${coverFileName}`;
}

/**
 * Construit le lien vers la page d'un projet
 * 
 * ROUTING :
 * - Projets normaux : /projects/{slug} (page individuelle avec galerie complète)
 * - Monoprix, Echos, Kitsuné : /projects/{slug} (page de listing avec tous les sous-projets)
 *   Ces projets n'ont pas de page individuelle car ils sont des collections de sous-projets.
 * 
 * @param {Object} project - Le projet avec son slug
 * @returns {string} Le lien vers la page du projet
 */
export function getProjectHref(project) {
  // Projets avec sous-projets : pointent vers leur page de listing
  if (project.slug === 'monoprix') {
    return '/projects/monoprix';
  }
  if (project.slug === 'echos') {
    return '/projects/echos';
  }
  if (project.slug === 'kitsune') {
    return '/projects/kitsune';
  }
  
  // Projets normaux : page individuelle avec galerie complète
  return `/projects/${project.slug}`;
}

/**
 * Vérifie si un projet a plusieurs images (et donc doit être cliquable)
 * 
 * Un projet avec plusieurs images est cliquable et mène à sa page de galerie.
 * Les projets avec sous-projets (Monoprix, Echos, Kitsuné) sont toujours considérés
 * comme ayant plusieurs images car ils ont plusieurs sous-projets à afficher.
 * 
 * @param {Object} project - Le projet à vérifier
 * @returns {boolean} True si le projet a plusieurs images/sous-projets (donc cliquable)
 */
export function hasMultipleImages(project) {
  // Projets avec sous-projets : toujours cliquables
  if (project.slug === 'monoprix' || project.slug === 'echos' || project.slug === 'kitsune') {
    return true;
  }
  
  // Projets normaux : vérifie si le tableau d'images existe et contient au moins une image
  return project.images && project.images.length > 0;
}

/**
 * Vérifie si un fichier est une vidéo en regardant son extension
 * 
 * Formats vidéo supportés : .mp4, .mov, .webm, .ogg
 * 
 * @param {string} fileName - Le nom du fichier (ex: 'photo-1.jpg' ou 'video-1.mp4')
 * @returns {boolean} True si le fichier est une vidéo, false sinon
 */
export function isVideoFile(fileName) {
  if (!fileName) return false;
  return /\.(mp4|mov|webm|ogg)$/i.test(fileName);
}

