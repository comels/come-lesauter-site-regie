import { monoprixProjects } from '../../../data/monoprixProjects';
import ProjectCard from '../../../components/ProjectCard';
import { renderProduction } from '../../../utils/productionUtils';
import { getCoverFileName } from '../../../utils/imageUtils';

/**
 * Page de listing des projets Monoprix
 * 
 * Affiche tous les sous-projets Monoprix dans une grille responsive.
 * Chaque sous-projet est affiché avec sa description et sa date, et est cliquable
 * pour accéder à sa page individuelle avec la galerie complète.
 * 
 * STRUCTURE :
 * - En-tête : Titre "Monoprix" + Production (récupérée du premier sous-projet)
 * - Grille : Tous les sous-projets affichés en cartes (ProjectCard)
 * 
 * ROUTING :
 * - URL : /projects/monoprix
 * - Sous-projets : /projects/monoprix/{subproject-slug}
 * 
 * DONNÉES :
 * - Les sous-projets sont définis dans data/monoprixProjects.js
 * - Chaque sous-projet a son propre dossier dans public/projects/monoprix/{subproject-slug}/
 */
export default function MonoprixPage() {
  return (
    <main className="min-h-screen px-6 py-6 pt-28">
      {/* En-tête avec titre et production */}
      <div className="mb-12">
        <h1 className="text-lg font-semibold uppercase tracking-tight">Monoprix</h1>
        {/* Production récupérée du premier sous-projet (tous les sous-projets partagent la même production) */}
        {monoprixProjects[0]?.production && (
          <h2 className="mb-4 text-lg font-light">
            Prod : {renderProduction(monoprixProjects[0].production, monoprixProjects[0].productionUrl, true)}
          </h2>
        )}
      </div>
      
      {/* Grille responsive des sous-projets */}
      <div className="grid grid-cols-1 items-stretch gap-x-12 gap-y-4 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
        {monoprixProjects.map((project) => {
          const coverFileName = getCoverFileName(project);
          // Chemin vers l'image : /projects/monoprix/{subproject-slug}/{coverFileName}
          const coverPath = coverFileName ? `/projects/monoprix/${project.slug}/${coverFileName}` : '';
          // Lien vers la page du sous-projet : /projects/monoprix/{subproject-slug}
          const projectHref = `/projects/monoprix/${project.slug}`;
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
