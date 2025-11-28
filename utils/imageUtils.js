/**
 * Utilitaires pour gérer les chemins d'images et les liens de projets
 */

/**
 * Construit le chemin complet vers l'image de couverture d'un projet
 * Gère les cas spéciaux pour Monoprix et Echos qui ont des structures différentes
 *
 * @param {Object} project - Le projet avec son slug et coverFile
 * @param {string} basePath - Le chemin de base (par défaut '/projects')
 * @returns {string} Le chemin complet vers l'image de couverture
 */
export function getProjectImagePath(project, basePath = '/projects') {
  // Cas spécial pour Monoprix : les images sont dans /projects/monoprix/
  if (project.slug === 'monoprix') {
    return `${basePath}/monoprix/${project.coverFile}`;
  }
  // Cas spécial pour Echos : le coverFile contient déjà le chemin
  if (project.slug === 'echos') {
    return `${basePath}/${project.coverFile}`;
  }
  // Cas général : /projects/{slug}/{coverFile}
  return `${basePath}/${project.slug}/${project.coverFile}`;
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

