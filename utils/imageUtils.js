/**
 * Utilitaires pour gérer les chemins d'images et les liens de projets
 */

/**
 * Obtient le nom de fichier de l'image de couverture d'un projet
 * Utilise le nouveau système (coverImage) ou l'ancien (coverFile) pour la rétrocompatibilité
 *
 * @param {Object} project - Le projet avec coverImage, coverFile, ou images
 * @returns {string|null} Le nom de fichier de l'image de couverture
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
  
  // Si aucun n'est défini et qu'il y a des images, utilise la première
  if (project.images && project.images.length > 0) {
    return project.images[0];
  }
  
  return null;
}

/**
 * Construit le chemin complet vers l'image de couverture d'un projet
 * Gère les cas spéciaux pour Monoprix et Echos qui ont des structures différentes
 *
 * @param {Object} project - Le projet avec son slug et coverImage/coverFile
 * @param {string} basePath - Le chemin de base (par défaut '/projects')
 * @returns {string} Le chemin complet vers l'image de couverture
 */
export function getProjectImagePath(project, basePath = '/projects') {
  const coverFileName = getCoverFileName(project);
  if (!coverFileName) return '';
  
  // Cas spécial pour Monoprix : les images sont dans /projects/monoprix/
  if (project.slug === 'monoprix') {
    // Si coverFileName contient déjà un chemin (ex: 'monoprix-birds/photo-1.jpg')
    if (coverFileName.includes('/')) {
      return `${basePath}/monoprix/${coverFileName}`;
    }
    // Sinon, c'est un projet Monoprix principal, retourne juste le chemin de base
    return `${basePath}/monoprix/${coverFileName}`;
  }
  // Cas spécial pour Echos : le coverImage peut contenir le chemin (ex: 'les-echos-week-end-422/photo-1.jpg')
  if (project.slug === 'echos') {
    // Si coverFileName contient déjà un chemin
    if (coverFileName.includes('/')) {
      return `${basePath}/${coverFileName}`;
    }
    return `${basePath}/${project.slug}/${coverFileName}`;
  }
  // Cas général : /projects/{slug}/{coverFileName}
  return `${basePath}/${project.slug}/${coverFileName}`;
}

/**
 * Construit le lien vers la page d'un projet
 * Monoprix et Echos ont des pages de listing, pas de pages individuelles
 *
 * @param {Object} project - Le projet avec son slug
 * @returns {string} Le lien vers la page du projet
 */
export function getProjectHref(project) {
  // Monoprix et Echos pointent vers leurs pages de listing
  if (project.slug === 'monoprix') {
    return '/projects/monoprix';
  }
  if (project.slug === 'echos') {
    return '/projects/echos';
  }
  // Les autres projets pointent vers leur page individuelle
  return `/projects/${project.slug}`;
}

/**
 * Vérifie si un projet a plusieurs images (et donc doit être cliquable)
 * Monoprix et Echos sont considérés comme ayant plusieurs images car ils ont des sous-projets
 *
 * @param {Object} project - Le projet à vérifier
 * @returns {boolean} True si le projet a plusieurs images/sous-projets
 */
export function hasMultipleImages(project) {
  // Monoprix et Echos ont toujours plusieurs sous-projets
  if (project.slug === 'monoprix' || project.slug === 'echos') {
    return true;
  }
  // Pour les autres projets, vérifie si le tableau d'images existe et n'est pas vide
  return project.images && project.images.length > 0;
}

/**
 * Vérifie si un fichier est une vidéo en regardant son extension
 *
 * @param {string} fileName - Le nom du fichier
 * @returns {boolean} True si le fichier est une vidéo
 */
export function isVideoFile(fileName) {
  if (!fileName) return false;
  return /\.(mp4|mov|webm|ogg)$/i.test(fileName);
}

