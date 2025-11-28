'use client';

import ExternalLink from './ExternalLink';

/**
 * Composant pour afficher les informations client/production au survol d'une image
 * Utilisé sur la page d'accueil dans le défilement horizontal
 * L'overlay est invisible par défaut et apparaît au survol de l'image
 *
 * @param {Object} project - Les données du projet (client, production, clientUrl, productionUrl)
 */
export default function ProjectInfoOverlay({ project }) {
  // Ne rien afficher si le projet n'a ni client ni production
  if (!project.client && !project.production) {
    return null;
  }

  return (
    <div className="mb-2 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
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
  );
}
