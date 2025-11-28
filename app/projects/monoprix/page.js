import { monoprixProjects } from '../../../data/monoprixProjects';
import ProjectCard from '../../../components/ProjectCard';

export default function MonoprixPage() {
  return (
    <main className="min-h-screen px-6 py-6 pt-28">
      <div className="mb-12">
        <h1 className="text-lg font-semibold uppercase tracking-tight">Monoprix</h1>
        {monoprixProjects[0]?.production && (
          <h2 className="mb-4 text-lg font-light">
            Prod :{' '}
            {monoprixProjects[0].productionUrl ? (
              <a
                href={monoprixProjects[0].productionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:line-through"
              >
                {monoprixProjects[0].production}
              </a>
            ) : (
              monoprixProjects[0].production
            )}
          </h2>
        )}
      </div>
      <div className="grid grid-cols-1 items-stretch gap-x-12 gap-y-4 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
        {monoprixProjects.map((project) => {
          const coverPath = `/projects/monoprix/${project.slug}/${project.coverFile}`;
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
