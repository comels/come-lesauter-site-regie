import { projects } from '../../../data/projects';
import { notFound } from 'next/navigation';
import ProjectGallery from '../../../components/ProjectGallery';
import { getCoverFileName } from '../../../utils/imageUtils';

/**
 * Génère les paramètres statiques pour tous les projets individuels
 * 
 * EXCLUSIONS :
 * - Monoprix, Echos, Kitsuné : ces projets ont des pages de listing séparées
 *   et des sous-projets avec leurs propres routes dynamiques
 * 
 * @returns {Array} Tableau d'objets { slug: 'project-slug' } pour chaque projet
 */
export async function generateStaticParams() {
  return projects
    .filter(
      (project) =>
        project.slug !== 'monoprix' && project.slug !== 'echos' && project.slug !== 'kitsune'
    )
    .map((project) => ({ slug: project.slug }));
}

/**
 * Génère les métadonnées SEO pour la page du projet
 * 
 * Utilisé par Next.js pour générer les balises <title>, <meta>, Open Graph et Twitter Cards.
 * Ces métadonnées sont importantes pour le référencement et le partage sur les réseaux sociaux.
 * 
 * @param {Object} params - Paramètres de la route (contient { slug: 'project-slug' })
 * @returns {Object} Métadonnées pour la page
 */
export async function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Projet introuvable',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://comelesauter.vercel.app';
  const projectUrl = `${baseUrl}/projects/${project.slug}`;
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

/**
 * Page individuelle d'un projet
 * 
 * Affiche la galerie complète du projet avec toutes les informations (client, production, date, équipe).
 * Utilise le composant ProjectGallery avec showHeader=true pour afficher l'en-tête.
 * 
 * ROUTING :
 * - URL : /projects/{slug}
 * - Exemples : /projects/aigle, /projects/breitling
 * - Exclusions : /projects/monoprix, /projects/echos, /projects/kitsune (ont leurs propres pages)
 * 
 * @param {Object} params - Paramètres de la route (contient { slug: 'project-slug' })
 */
export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  // Vérifie que le projet existe et n'est pas un projet avec sous-projets
  if (
    !project ||
    project.slug === 'monoprix' ||
    project.slug === 'echos' ||
    project.slug === 'kitsune'
  ) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-6 pt-28">
      <ProjectGallery project={project} basePath={`/projects/${project.slug}`} showHeader={true} />
    </main>
  );
}
