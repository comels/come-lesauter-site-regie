import Link from 'next/link';
import Image from 'next/image';
import VideoWithSound from './VideoWithSound';
import { getProjectImagePath, getProjectHref } from '../utils/imageUtils';
import ExternalLink from './ExternalLink';

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

        // Vérifie si le projet a un lien externe
        const isExternalLink = project.externalUrl;
        // Utilise le lien externe si disponible, sinon le lien interne
        const linkHref = isExternalLink ? project.externalUrl : projectHref;
        // Classes CSS pour le conteneur d'image
        const imageContainerClasses =
          'relative aspect-[3/4] w-full select-none overflow-hidden grayscale transition-all duration-300 group-hover:grayscale-0';
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
            {/* Client et Production - toujours visibles au-dessus de l'image */}
            {(project.client || project.production) && (
              <div className="mb-2">
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
                {/* Nom de la production - cliquable si productionUrl existe */}
                {project.production && (
                  <p className="text-lg font-light leading-snug">
                    {project.productionUrl ? (
                      <ExternalLink href={project.productionUrl} className="hover:line-through">
                        {project.production}
                      </ExternalLink>
                    ) : (
                      project.production
                    )}
                  </p>
                )}
              </div>
            )}

            {/* Image cliquable - lien externe ou interne selon le projet */}
            {isExternalLink ? (
              <a href={linkHref} target="_blank" rel="noopener noreferrer" className="group block">
                {imageContent}
              </a>
            ) : (
              <Link href={linkHref} className="group block">
                {imageContent}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
