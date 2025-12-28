import Image from 'next/image';
import VideoWithSound from './VideoWithSound';
import ExternalLink from './ExternalLink';
import { renderProduction } from '../utils/productionUtils';
import { getCoverFileName, isVideoFile } from '../utils/imageUtils';

/**
 * Composant réutilisable pour afficher une galerie de projets
 *
 * Affiche l'image de couverture et toutes les images/vidéos d'un projet dans une grille responsive.
 * Utilisé sur les pages de projets individuels et les pages de sous-projets (Monoprix, Echos, Kitsuné).
 *
 * STRUCTURE DES DONNÉES DU PROJET :
 * - project.coverImage : Nom du fichier de couverture (ex: 'photo-1.jpg') - NOUVEAU SYSTÈME
 * - project.coverFile : Nom du fichier de couverture (rétrocompatibilité avec ancien système)
 * - project.images : Tableau de tous les fichiers médias (photos et vidéos)
 * - project.client : Nom du client
 * - project.production : Nom de la production (peut être une chaîne ou un tableau)
 * - project.crew : Tableau des membres de l'équipe (photographe, réalisateur, etc.)
 *
 * @param {Object} project - Les données du projet
 * @param {string} basePath - Le chemin de base pour les images (ex: '/projects/monoprix/project-slug')
 * @param {string} gridCols - Classes Tailwind pour la grille (défaut: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')
 * @param {boolean} showHeader - Affiche l'en-tête avec client, production, date et équipe si true
 */
export default function ProjectGallery({
  project,
  basePath,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  showHeader = false,
}) {
  // Récupère le nom du fichier de couverture (utilise la fonction utilitaire centralisée)
  const coverFileName = getCoverFileName(project);
  const coverPath = coverFileName ? `${basePath}/${coverFileName}` : null;

  // Filtre les images pour exclure la couverture (évite de l'afficher deux fois)
  const otherImages = project.images?.filter((img) => img !== coverFileName) || [];

  // Vérifie si la couverture est une vidéo (utilise la fonction utilitaire centralisée)
  const isCoverVideo = isVideoFile(coverFileName) || project.coverType === 'video';

  return (
    <>
      {/* 
        EN-TÊTE DU PROJET
        Affiche les informations du projet (client, production, date, équipe) si showHeader est true.
        Utilisé uniquement sur les pages de projets individuels, pas sur les pages de listing.
      */}
      {showHeader && (
        <div className="mb-12">
          {/* Nom du client - en gras, cliquable si clientUrl existe */}
          {project.client && (
            <h1 className="text-lg font-semibold uppercase">
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

          {/* Nom de la production - peut être une chaîne simple ou un tableau de personnes */}
          {project.production && (
            <h2 className="text-lg font-light">
              Prod : {renderProduction(project.production, project.productionUrl, true)}
            </h2>
          )}

          {/* Date du projet - format MM/YY (ex: '11/24' pour novembre 2024) */}
          {project.date && <p className="mb-4 text-lg font-light">Date : {project.date}</p>}

          {/* 
            ÉQUIPE DE PRODUCTION
            Liste des personnes de la production (régisseur, producteur, etc.)
            Format : tableau d'objets [{ name: 'Nom', url: 'https://...' }]
          */}
          {project.productionTeam && project.productionTeam.length > 0 && (
            <p className="mb-4 max-w-xl text-lg font-light">
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

          {/* 
            ÉQUIPE TECHNIQUE (CREW)
            Liste des membres de l'équipe technique : photographe, réalisateur, DOP, styliste, etc.
            Format : tableau d'objets [{ role: 'Rôle', name: 'Nom' ou [{ name: 'Nom', url: '...' }], url: '...' }]
            Le champ 'name' peut être une chaîne simple ou un tableau (pour plusieurs personnes au même poste)
          */}
          {project.crew && project.crew.length > 0 && (
            <div className="mb-4 max-w-xl space-y-1">
              {project.crew.map((member, index) => (
                <p key={index} className="text-lg font-light">
                  {member.role} :{' '}
                  {Array.isArray(member.name) ? (
                    // Plusieurs personnes pour le même rôle (ex: plusieurs photographes)
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
                    // Une seule personne pour ce rôle
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

          {/* Lien externe vers une vidéo YouTube ou autre plateforme */}
          {project.externalUrl && (
            <div className="mb-4">
              <ExternalLink
                href={project.externalUrl}
                className="text-lg font-medium hover:line-through"
              >
                Voir sur YouTube
              </ExternalLink>
            </div>
          )}
        </div>
      )}

      {/* 
        GRILLE DES MÉDIAS
        Affiche l'image de couverture en premier, puis toutes les autres images/vidéos.
        La grille est responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur desktop.
        Format des images : aspect ratio 3/4 sur mobile, 4/5 sur desktop.
      */}
      <div className={`grid ${gridCols} gap-8 md:gap-4`}>
        {/* Image de couverture - affichée en premier dans la grille */}
        {coverPath && (
          <div className="relative aspect-[3/4] w-full select-none overflow-hidden md:aspect-[4/5]">
            {isCoverVideo ? (
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
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
          </div>
        )}

        {/* Toutes les autres images/vidéos du projet (la couverture est exclue pour éviter les doublons) */}
        {otherImages.map((imageFile, index) => {
          const imagePath = `${basePath}/${imageFile}`;
          const isVideo = isVideoFile(imageFile);

          return (
            <div
              key={index}
              className="relative aspect-[3/4] w-full select-none overflow-hidden md:aspect-[4/5]"
            >
              {isVideo ? (
                <VideoWithSound
                  src={imagePath}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
              ) : (
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
