import { echosProjects } from '../../../data/echosProjects';
import ProjectCard from '../../../components/ProjectCard';
import { renderProduction } from '../../../utils/productionUtils';

export default function EchosPage() {
  return (
    <main className="min-h-screen px-6 pt-28">
      <div className="mb-12">
        <h1 className="text-lg font-semibold uppercase tracking-tight">Les Échos</h1>
        {echosProjects[0]?.production && (
          <h2 className="mb-4 text-lg font-light">
            Prod : {renderProduction(echosProjects[0].production, echosProjects[0].productionUrl)}
          </h2>
        )}
      </div>
      <div className="grid grid-cols-1 items-stretch gap-x-12 gap-y-8 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
        {echosProjects.map((project) => {
          const coverPath = `/projects/${project.slug}/${project.coverFile}`;
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
