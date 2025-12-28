'use client';

import Link from 'next/link';
import Image from 'next/image';
import VideoWithSound from './VideoWithSound';
import { isVideoFile } from '../utils/imageUtils';

/**
 * Composant pour afficher une carte de projet
 * 
 * Utilisé sur les pages de listing (Monoprix, Echos, Kitsuné) pour afficher chaque sous-projet.
 * Affiche l'image de couverture avec optionnellement la description et la date en dessous.
 * 
 * COMPORTEMENT :
 * - Si hasMultipleImages est true : l'image est cliquable et mène à la page du projet
 * - Si hasMultipleImages est false : l'image n'est pas cliquable (projet avec une seule image)
 * - Si noEffects est true : pas d'effet grayscale (utilisé sur les pages de listing)
 * - Si showDescription est true : affiche la description et la date au-dessus de l'image
 * 
 * @param {Object} project - Les données du projet
 * @param {string} coverPath - Chemin complet vers l'image de couverture
 * @param {string} projectHref - Lien vers la page du projet (ex: '/projects/monoprix/birds')
 * @param {boolean} hasMultipleImages - True si le projet a plusieurs images (rend l'image cliquable)
 * @param {boolean} noEffects - True pour désactiver l'effet grayscale (défaut: false)
 * @param {boolean} showDescription - True pour afficher description et date (défaut: false)
 */
export default function ProjectCard({
  project,
  coverPath,
  projectHref,
  hasMultipleImages,
  noEffects = false,
  showDescription = false,
}) {
  /**
   * EFFET GRAYSCALE
   * 
   * Par défaut, les images sont en grayscale et passent en couleur au survol.
   * Si noEffects est true (pages de listing), pas d'effet grayscale.
   * Si hasMultipleImages est true, utilise group-hover pour déclencher l'effet au survol du groupe.
   */
  const grayscaleClasses = noEffects
    ? ''
    : `grayscale transition-all duration-300 ${hasMultipleImages ? 'group-hover:grayscale-0' : 'hover:grayscale-0'}`;

  // Détection vidéo : vérifie l'extension du fichier ou le champ coverType (rétrocompatibilité)
  const isVideo = project.coverType === 'video' || isVideoFile(coverPath);

  // Contenu de l'image (vidéo ou image statique)
  const imageContent = (
    <div
      className={`relative aspect-[3/4] w-full select-none overflow-hidden ${
        hasMultipleImages ? 'group' : ''
      }`}
    >
      {isVideo ? (
        <VideoWithSound
          src={coverPath}
          className={`absolute inset-0 h-full w-full select-none object-cover ${grayscaleClasses}`}
        />
      ) : (
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

  return (
    <div className="flex h-full flex-col">
      {/* 
        DESCRIPTION ET DATE
        Affichées uniquement si showDescription est true (pages de listing).
        La description est en gras, la date en fine, toutes deux en majuscules.
      */}
      {showDescription && project.description && (
        <div className="font-semibold uppercase">{project.description}</div>
      )}
      {showDescription && project.date && (
        <div className="mb-2 font-thin">{project.date}</div>
      )}
      
      {/* 
        IMAGE DE COUVERTURE
        Cliquable uniquement si le projet a plusieurs images (hasMultipleImages = true).
        Si une seule image, l'image n'est pas cliquable (projet terminé ou en cours).
      */}
      <div className="mt-auto">
        {hasMultipleImages ? (
          <Link href={projectHref} className="group block">
            {imageContent}
          </Link>
        ) : (
          imageContent
        )}
      </div>
    </div>
  );
}
