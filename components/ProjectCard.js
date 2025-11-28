'use client';

import Link from 'next/link';
import Image from 'next/image';
import VideoWithSound from './VideoWithSound';

/**
 * Composant pour afficher une carte de projet
 * Utilisé sur la page d'accueil et les pages de listing (Monoprix, Echos)
 *
 * @param {Object} project - Les données du projet
 * @param {string} coverPath - Chemin vers l'image de couverture
 * @param {string} projectHref - Lien vers la page du projet
 * @param {boolean} hasMultipleImages - Le projet a plusieurs images (donc cliquable)
 * @param {boolean} noEffects - Désactive les effets de survol (grayscale)
 * @param {boolean} showCount - Affiche le nombre d'images
 * @param {number} count - Nombre d'images à afficher
 * @param {boolean} showDescription - Affiche la description du projet
 */
export default function ProjectCard({
  project,
  coverPath,
  projectHref,
  hasMultipleImages,
  noEffects = false,
  showCount = false,
  count = null,
  showDescription = false,
}) {
  // Classes CSS pour l'effet grayscale au survol
  // Si noEffects est true, pas d'effet. Sinon, grayscale par défaut qui disparaît au survol
  const grayscaleClasses = noEffects
    ? ''
    : `grayscale transition-all duration-300 ${hasMultipleImages ? 'group-hover:grayscale-0' : 'hover:grayscale-0'}`;

  // Contenu de l'image (vidéo ou image statique)
  const imageContent = (
    <div
      className={`relative aspect-[3/4] w-full select-none overflow-hidden ${
        hasMultipleImages ? 'group' : ''
      }`}
    >
      {project.coverType === 'video' ? (
        // Affiche une vidéo avec son
        <VideoWithSound
          src={coverPath}
          className={`absolute inset-0 h-full w-full select-none object-cover ${grayscaleClasses}`}
        />
      ) : (
        // Affiche une image
        <Image
          src={coverPath}
          alt={project.title}
          fill
          className={`select-none object-cover ${grayscaleClasses}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      )}
    </div>
  );

  // Classes CSS du conteneur selon si le projet a plusieurs images ou non
  const containerClasses = !hasMultipleImages
    ? 'group flex h-full flex-col'
    : 'flex h-full flex-col';

  return (
    <div className={containerClasses}>
      {/* Description du projet (affichée si showDescription est true) */}
      {showDescription && project.description && (
        <div className="mb-1 font-thin">{project.description}</div>
      )}
      {/* Compteur d'images (affiché si showCount est true) */}
      {showCount && count !== null && (
        <div className="mb-1 flex items-center justify-between text-sm font-light">
          <span>{count}</span>
          {project.description && <span>{project.description}</span>}
        </div>
      )}
      {/* Contenu de l'image - cliquable uniquement si le projet a plusieurs images */}
      <div className="mt-auto">
        {hasMultipleImages ? (
          // Si plusieurs images, l'image est cliquable et mène à la page du projet
          <Link href={projectHref} className="group block">
            {imageContent}
          </Link>
        ) : (
          // Si une seule image, l'image n'est pas cliquable
          imageContent
        )}
      </div>
    </div>
  );
}
