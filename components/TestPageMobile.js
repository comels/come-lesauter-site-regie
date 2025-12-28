import Link from 'next/link';
import Image from 'next/image';
import VideoWithSound from './VideoWithSound';
import { getProjectImagePath, getProjectHref, isVideoFile } from '../utils/imageUtils';
import ExternalLink from './ExternalLink';
import { renderProduction } from '../utils/productionUtils';

/**
 * Composant pour afficher les projets en version mobile
 * 
 * Affiche les projets verticalement, un par un, avec les informations (client, production, date)
 * toujours visibles au-dessus de chaque image. Contrairement à la version desktop, les images
 * sont en couleur (pas d'effet grayscale) et toutes les informations sont visibles directement.
 * 
 * @param {Array} projects - Liste des projets à afficher (déjà ordonnée selon customOrder)
 */
export default function TestPageMobile({ projects }) {
  return (
    <div className="flex flex-col gap-8 px-6 pb-8 pt-8 md:hidden">
      {projects.map((project) => {
        const coverPath = getProjectImagePath(project);
        const projectHref = getProjectHref(project);
        const isVideo = project.coverType === 'video' || isVideoFile(coverPath);

        // Contenu de l'image (vidéo ou image statique)
        const imageContent = (
          <div className="relative aspect-[3/4] w-full select-none overflow-hidden">
            {isVideo ? (
              <VideoWithSound
                src={coverPath}
                className="absolute inset-0 h-full w-full select-none object-cover"
              />
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
            {/* 
              INFORMATIONS DU PROJET
              Toujours visibles sur mobile (contrairement au desktop où elles apparaissent au survol).
              Layout : client/production à gauche, date à droite.
            */}
            {(project.client || project.production || project.date) && (
              <div className="mb-2 flex items-end justify-between">
                <div>
                  {/* Nom du client - en gras, cliquable si clientUrl existe */}
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
                  {/* Nom de la production - en fine, peut être une chaîne ou un tableau */}
                  {project.production && (
                    <p className="text-lg font-thin leading-snug">
                      {renderProduction(project.production, project.productionUrl)}
                    </p>
                  )}
                </div>
                {/* Date du projet - format MM/YY, alignée à droite */}
                {project.date && (
                  <div className="mr-1 whitespace-nowrap font-thin text-lg">{project.date}</div>
                )}
              </div>
            )}

            {/* Image cliquable - mène toujours vers la page interne du projet */}
            <Link href={projectHref} className="group block">
              {imageContent}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
