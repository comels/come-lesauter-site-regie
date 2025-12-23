import { echosProjects } from '../../../../data/echosProjects';
import { notFound } from 'next/navigation';
import ProjectGallery from '../../../../components/ProjectGallery';
import { getCoverFileName } from '../../../../utils/imageUtils';

export async function generateStaticParams() {
  return echosProjects.map((project) => ({
    subproject: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const project = echosProjects.find((p) => p.slug === params.subproject);

  if (!project) {
    return {
      title: 'Projet introuvable',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://comelesauter.vercel.app';
  const projectUrl = `${baseUrl}/projects/echos/${project.slug}`;
  const coverFileName = getCoverFileName(project);
  const imageUrl = coverFileName ? `${baseUrl}/projects/${project.slug}/${coverFileName}` : '';

  return {
    title: `${project.client || 'Projet'} | Côme Le Sauter`,
    description:
      project.description ||
      `Projet ${project.title}${project.client ? ` pour ${project.client}` : ''}${project.production ? ` produit par ${project.production}` : ''}.`,
    openGraph: {
      title: `${project.title} - ${project.client || 'Projet'}`,
      description:
        project.description ||
        `Projet ${project.title}${project.client ? ` pour ${project.client}` : ''}`,
      url: projectUrl,
      siteName: 'Côme Le Sauter - Régisseur',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1600,
          alt: `${project.title} - ${project.client || ''}`,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ${project.client || 'Projet'}`,
      description: project.description || `Projet ${project.title}`,
      images: [imageUrl],
    },
  };
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
