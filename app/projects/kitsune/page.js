import { kitsuneProjects } from '../../../data/kitsuneProjects';
import { projects } from '../../../data/projects';
import ProjectCard from '../../../components/ProjectCard';
import { renderProduction } from '../../../utils/productionUtils';
import { getCoverFileName } from '../../../utils/imageUtils';

export default function KitsunePage() {
  const kitsuneProject = projects.find((p) => p.slug === 'kitsune');

  return (
    <main className="min-h-screen px-6 py-6 pt-28">
      <div className="mb-12">
        <h1 className="text-lg font-semibold uppercase tracking-tight">
          {kitsuneProject?.title || 'Kitsuné'}
        </h1>
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
      <div className="grid grid-cols-1 items-stretch gap-x-12 gap-y-4 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
        {kitsuneProjects.map((project) => {
          const coverFileName = getCoverFileName(project);
          const coverPath = coverFileName
            ? `/projects/kitsune/${project.slug}/${coverFileName}`
            : '';
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
