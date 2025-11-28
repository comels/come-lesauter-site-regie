import { projects } from '../../../data/projects';
import { notFound } from 'next/navigation';
import ProjectGallery from '../../../components/ProjectGallery';

export async function generateStaticParams() {
  return projects
    .filter((project) => project.slug !== 'monoprix' && project.slug !== 'echos')
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Projet introuvable',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-domaine.com';
  const projectUrl = `${baseUrl}/projects/${project.slug}`;
  const imageUrl = `${baseUrl}/projects/${project.slug}/${project.coverFile}`;

  return {
    title: `${project.title} - ${project.client || 'Projet'} | Côme Le Sauter`,
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

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project || project.slug === 'monoprix' || project.slug === 'echos') {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-6 pt-28">
      <ProjectGallery project={project} basePath={`/projects/${project.slug}`} showHeader={true} />
    </main>
  );
}
