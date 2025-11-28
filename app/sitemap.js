import { projects } from '../data/projects';
import { monoprixProjects } from '../data/monoprixProjects';
import { echosProjects } from '../data/echosProjects';

/**
 * Génère automatiquement le sitemap.xml pour le SEO
 * Inclut toutes les pages du site
 */
export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://comelesauter.vercel.app';

  // Pages statiques
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/monoprix`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/echos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Pages des projets individuels
  const projectPages = projects
    .filter((project) => project.slug !== 'monoprix' && project.slug !== 'echos')
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // Pages des sous-projets Monoprix
  const monoprixPages = monoprixProjects.map((project) => ({
    url: `${baseUrl}/projects/monoprix/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Pages des sous-projets Echos
  const echosPages = echosProjects.map((project) => ({
    url: `${baseUrl}/projects/echos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...projectPages, ...monoprixPages, ...echosPages];
}

