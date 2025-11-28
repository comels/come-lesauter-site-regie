import { echosProjects } from '../../../../data/echosProjects';
import { notFound } from 'next/navigation';
import ProjectGallery from '../../../../components/ProjectGallery';

export async function generateStaticParams() {
  return echosProjects.map((project) => ({
    subproject: project.slug,
  }));
}

export default function EchosSubprojectPage({ params }) {
  const project = echosProjects.find((p) => p.slug === params.subproject);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-6 pt-28">
      <ProjectGallery project={project} basePath={`/projects/${project.slug}`} showHeader={true} />
    </main>
  );
}
