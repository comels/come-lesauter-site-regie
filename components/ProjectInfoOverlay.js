'use client';

import ExternalLink from './ExternalLink';
import { renderProduction } from '../utils/productionUtils';

/**
 * Composant pour afficher les informations client/production au survol d'une image
 * 
 * Utilisé uniquement sur la page d'accueil (version desktop) dans le défilement horizontal.
 * L'overlay est invisible par défaut (opacity-0) et apparaît au survol de l'image
 * grâce à la classe group-hover/image:opacity-100 définie dans le parent.
 * 
 * AFFICHAGE :
 * - Client : en gras, majuscules, cliquable si clientUrl existe
 * - Production : en fine, peut être une chaîne ou un tableau de personnes
 * 
 * @param {Object} project - Les données du projet (client, production, clientUrl, productionUrl)
 */
export default function ProjectInfoOverlay({ project }) {
  // Ne rien afficher si le projet n'a ni client ni production
  if (!project.client && !project.production) {
    return null;
  }

  return (
    <div>
      {/* Nom du client - en gras, majuscules, cliquable si clientUrl existe */}
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
        <p className="text-lg font-light leading-snug">
          {renderProduction(project.production, project.productionUrl)}
        </p>
      )}
    </div>
  );
}
