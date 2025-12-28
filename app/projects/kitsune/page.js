import { kitsuneProjects } from '../../../data/kitsuneProjects';
import { projects } from '../../../data/projects';
import ProjectCard from '../../../components/ProjectCard';
import { renderProduction } from '../../../utils/productionUtils';
import { getCoverFileName } from '../../../utils/imageUtils';

/**
 * Page de listing des projets Kitsuné
 * 
 * Affiche tous les sous-projets Kitsuné dans une grille responsive.
 * Chaque sous-projet est affiché avec sa description et sa date, et est cliquable
 * pour accéder à sa page individuelle avec la galerie complète.
 * 
 * STRUCTURE :
 * - En-tête : Titre récupéré du projet principal "Kitsuné" dans projects.js + Production
 * - Grille : Tous les sous-projets affichés en cartes (ProjectCard)
 * 
 * ROUTING :
 * - URL : /projects/kitsune
 * - Sous-projets : /projects/kitsune/{subproject-slug}
 * 
 * DONNÉES :
 * - Le projet principal est défini dans data/projects.js (slug: 'kitsune')
 * - Les sous-projets sont définis dans data/kitsuneProjects.js
 * - Chaque sous-projet a son propre dossier dans public/projects/kitsune/{subproject-slug}/
 */
export default function KitsunePage() {
  // Récupère le projet principal "Kitsuné" pour afficher son titre (ex: "Maison Kitsuné")
  const kitsuneProject = projects.find((p) => p.slug === 'kitsune');

  return (
    <main className="min-h-screen px-6 py-6 pt-28">
      {/* En-tête avec titre (récupéré du projet principal) et production */}
      <div className="mb-12">
        <h1 className="text-lg font-semibold uppercase tracking-tight">
          {kitsuneProject?.title || 'Kitsuné'}
        </h1>
        {/* Production récupérée du premier sous-projet */}
        {kitsuneProjects[0]?.production && (
          <h2 className="mb-4 text-lg font-light">
            Prod :{' '}
            {renderProduction(
              kitsuneProjects[0].production,
              kitsuneProjects[0].productionUrl,
              true
            )}
          </h2>
        )}
      </div>
      
      {/* Grille responsive des sous-projets */}
      <div className="grid grid-cols-1 items-stretch gap-x-12 gap-y-4 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
        {kitsuneProjects.map((project) => {
          const coverFileName = getCoverFileName(project);
          // Chemin vers l'image : /projects/kitsune/{subproject-slug}/{coverFileName}
          const coverPath = coverFileName
            ? `/projects/kitsune/${project.slug}/${coverFileName}`
            : '';
          // Lien vers la page du sous-projet : /projects/kitsune/{subproject-slug}
          const projectHref = `/projects/kitsune/${project.slug}`;
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
