import Link from 'next/link';
import Image from 'next/image';
import VideoWithSound from './VideoWithSound';
import { getProjectImagePath, getProjectHref } from '../utils/imageUtils';
import ExternalLink from './ExternalLink';
import { renderProduction } from '../utils/productionUtils';

/**
 * Composant pour afficher les projets en version mobile
 * Affiche les projets verticalement, un par un, avec client/production toujours visibles
 *
 * @param {Array} projects - Liste des projets à afficher
 */
export default function TestPageMobile({ projects }) {
  return (
    <div className="flex flex-col gap-8 px-6 pb-8 pt-8 md:hidden">
      {projects.map((project) => {
        // Chemin vers l'image de couverture
        const coverPath = getProjectImagePath(project);
        // Lien vers la page du projet
        const projectHref = getProjectHref(project);

        // Toujours utiliser le lien interne vers la page du projet
        const linkHref = projectHref;
        // Classes CSS pour le conteneur d'image (pas de grayscale sur mobile - images en couleur)
        const imageContainerClasses = 'relative aspect-[3/4] w-full select-none overflow-hidden';
        // Classes CSS pour les médias (vidéo/image)
        const mediaClasses = 'absolute inset-0 h-full w-full select-none object-cover';

        // Contenu de l'image (vidéo ou image)
        const imageContent = (
          <div className={imageContainerClasses}>
            {project.coverType === 'video' ? (
              <VideoWithSound src={coverPath} className={mediaClasses} />
            ) : (
              <Image
                src={coverPath}
                alt={project.title}
                fill
                className="select-none object-cover"
                sizes="100vw"
              />
            )}
          </div>
        );

        return (
          <div key={project.slug}>
            {/* Client, Production et Date - toujours visibles au-dessus de l'image */}
            {(project.client || project.production || project.date) && (
              <div className="mb-2 flex items-end justify-between">
                <div>
                  {/* Nom du client - cliquable si clientUrl existe */}
                  {project.client && (
                    <p className="text-lg font-semibold uppercase leading-snug tracking-tight">
                      {project.clientUrl ? (
                        <ExternalLink href={project.clientUrl} className="hover:line-through">
                          {project.client}
                        </ExternalLink>
                      ) : (
                        project.client
                      )}
                    </p>
                  )}
                  {/* Nom de la production - peut être une chaîne ou un tableau de personnes */}
                  {project.production && (
                    <p className="text-lg font-thin leading-snug">
                      {renderProduction(project.production, project.productionUrl)}
                    </p>
                  )}
                </div>
                {/* Date du projet - à droite */}
                {project.date && (
                  <div className="mr-1 whitespace-nowrap font-thin text-lg">{project.date}</div>
                )}
              </div>
            )}

            {/* Image cliquable - lien vers la page du projet */}
            <Link href={linkHref} className="group block">
              {imageContent}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
