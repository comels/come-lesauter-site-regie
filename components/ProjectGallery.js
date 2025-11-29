import Image from 'next/image';
import VideoWithSound from './VideoWithSound';
import ExternalLink from './ExternalLink';
import { renderProduction } from '../utils/productionUtils';

/**
 * Composant réutilisable pour afficher une galerie de projets
 * Affiche le cover et toutes les images/vidéos d'un projet dans une grille
 *
 * @param {Object} project - Les données du projet (client, production, coverFile, images, etc.)
 * @param {string} basePath - Le chemin de base pour les images (ex: '/projects/monoprix/project-slug')
 * @param {string} gridCols - Classes Tailwind pour la grille (ex: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')
 * @param {boolean} showHeader - Affiche ou non l'en-tête avec client et production
 */
export default function ProjectGallery({
  project,
  basePath,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  showHeader = false,
}) {
  // Construit le chemin complet de l'image de couverture
  const coverPath = `${basePath}/${project.coverFile}`;

  return (
    <>
      {/* En-tête avec client et production (affiché si showHeader est true) */}
      {showHeader && (
        <div className="mb-12">
          {/* Nom du client - cliquable si clientUrl existe */}
          {project.client && (
            <h1 className="text-lg font-semibold uppercase tracking-tight">
              {project.clientUrl ? (
                <a
                  href={project.clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:line-through"
                >
                  {project.client}
                </a>
              ) : (
                project.client
              )}
            </h1>
          )}
          {/* Nom de la production - format actuel (chaîne simple) */}
          {project.production && (
            <h2 className="mb-4 text-lg font-light">
              Prod : {renderProduction(project.production, project.productionUrl, true)}
            </h2>
          )}
          {/* Production Team - plusieurs personnes de la production, affichées sur une ligne avec virgules */}
          {project.productionTeam && project.productionTeam.length > 0 && (
            <p className="mb-4 text-lg font-light">
              Production Team :{' '}
              {project.productionTeam.map((person, index) => (
                <span key={index}>
                  {person.url ? (
                    <ExternalLink href={person.url} className="font-medium hover:line-through">
                      {person.name}
                    </ExternalLink>
                  ) : (
                    person.name
                  )}
                  {index < project.productionTeam.length - 1 && <span>, </span>}
                </span>
              ))}
            </p>
          )}
          {/* Informations additionnelles (crew) - photographe, réalisateur, set designer, etc. */}
          {project.crew && project.crew.length > 0 && (
            <div className="mb-4 space-y-1">
              {project.crew.map((member, index) => (
                <p key={index} className="text-lg font-light">
                  {member.role} :{' '}
                  {Array.isArray(member.name) ? (
                    // Si name est un tableau, affiche plusieurs personnes séparées par des virgules
                    <>
                      {member.name.map((person, personIndex) => (
                        <span key={personIndex}>
                          {person.url ? (
                            <ExternalLink
                              href={person.url}
                              className="font-medium hover:line-through"
                            >
                              {person.name}
                            </ExternalLink>
                          ) : (
                            person.name
                          )}
                          {personIndex < member.name.length - 1 && <span>, </span>}
                        </span>
                      ))}
                    </>
                  ) : (
                    // Format actuel : name est une chaîne simple
                    <>
                      {member.url ? (
                        <ExternalLink href={member.url} className="font-medium hover:line-through">
                          {member.name}
                        </ExternalLink>
                      ) : (
                        member.name
                      )}
                    </>
                  )}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Grille contenant toutes les images du projet */}
      <div className={`grid ${gridCols} gap-8 md:gap-4`}>
        {/* Image de couverture (affichée en premier) */}
        <div className="relative aspect-[3/4] w-full select-none overflow-hidden md:aspect-[4/5]">
          {project.coverType === 'video' ? (
            // Si c'est une vidéo, utilise le composant VideoWithSound
            <VideoWithSound
              src={coverPath}
              className="absolute inset-0 h-full w-full select-none object-cover"
            />
          ) : (
            // Si c'est une image, utilise le composant Image de Next.js
            <Image
              src={coverPath}
              alt={project.title}
              fill
              className="select-none object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Boucle sur toutes les autres images du projet */}
        {project.images?.map((imageFile, index) => {
          // Construit le chemin complet de chaque image
          const imagePath = `${basePath}/${imageFile}`;
          // Vérifie si le fichier est une vidéo en regardant l'extension
          const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(imageFile);

          return (
            <div
              key={index}
              className="relative aspect-[3/4] w-full select-none overflow-hidden md:aspect-[4/5]"
            >
              {isVideo ? (
                // Affiche une vidéo si l'extension correspond
                <VideoWithSound
                  src={imagePath}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
              ) : (
                // Affiche une image sinon
                <Image
                  src={imagePath}
                  alt={`${project.title} - Photo ${index + 1}`}
                  fill
                  className="select-none object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
