import { monoprixProjects } from '../../../../data/monoprixProjects';
import { notFound } from 'next/navigation';
import ProjectGallery from '../../../../components/ProjectGallery';

export async function generateStaticParams() {
  return monoprixProjects.map((project) => ({
    subproject: project.slug,
  }));
}

export default function MonoprixSubprojectPage({ params }) {
  const project = monoprixProjects.find((p) => p.slug === params.subproject);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-6 pt-28">
      <ProjectGallery 
        project={project} 
        basePath={`/projects/monoprix/${project.slug}`}
        showHeader={true}
      />
    </main>
  );
}

