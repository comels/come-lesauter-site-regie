import { echosProjects } from '../../../data/echosProjects';
import ProjectCard from '../../../components/ProjectCard';
import { renderProduction } from '../../../utils/productionUtils';
import { getCoverFileName } from '../../../utils/imageUtils';

/**
 * Page de listing des projets Les Échos
 *
 * Affiche tous les sous-projets Les Échos dans une grille responsive.
 * Chaque sous-projet est affiché avec sa description et sa date, et est cliquable
 * pour accéder à sa page individuelle avec la galerie complète.
 *
 * STRUCTURE :
 * - En-tête : Titre "Les Échos" + Production (récupérée du premier sous-projet)
 * - Grille : Tous les sous-projets affichés en cartes (ProjectCard)
 *
 * ROUTING :
 * - URL : /projects/echos
 * - Sous-projets : /projects/echos/{subproject-slug}
 *
 * DONNÉES :
 * - Les sous-projets sont définis dans data/echosProjects.js
 * - Chaque sous-projet a son propre dossier dans public/projects/{subproject-slug}/
 *   Note : Les sous-projets Echos sont directement dans /projects/, pas dans /projects/echos/
 */
export default function EchosPage() {
  return (
    <main className="min-h-screen px-6 pt-28">
      {/* En-tête avec titre et production */}
      <div className="mb-12">
        <h1 className="text-lg font-semibold uppercase tracking-tight">Les Échos</h1>
        {/* Production récupérée du premier sous-projet */}
        {echosProjects[0]?.production && (
          <h2 className="mb-4 text-lg font-light">
            Prod :{' '}
            {renderProduction(echosProjects[0].production, echosProjects[0].productionUrl, true)}
          </h2>
        )}
      </div>

      {/* Grille responsive des sous-projets */}
      <div className="grid grid-cols-1 items-stretch gap-x-12 gap-y-8 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
        {echosProjects.map((project) => {
          const coverFileName = getCoverFileName(project);
          // Chemin vers l'image : /projects/{subproject-slug}/{coverFileName}
          // Note : Les sous-projets Echos sont directement dans /projects/, pas dans /projects/echos/
          const coverPath = coverFileName ? `/projects/${project.slug}/${coverFileName}` : '';
          // Lien vers la page du sous-projet : /projects/echos/{subproject-slug}
          const projectHref = `/projects/echos/${project.slug}`;
          const hasMultipleImages = project.images && project.images.length > 0;

          return (
            <ProjectCard
              key={project.slug}
              project={project}
              coverPath={coverPath}
              projectHref={projectHref}
              hasMultipleImages={hasMultipleImages}
              noEffects={true}
              showDescription={true}
            />
          );
        })}
      </div>
    </main>
  );
}
