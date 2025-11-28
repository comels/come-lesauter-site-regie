import { projects } from '../data/projects';
import Link from 'next/link';
import { getProjectImagePath, getProjectHref } from '../utils/imageUtils';
import TestPageMobile from '../components/TestPageMobile';
import ProjectInfoOverlay from '../components/ProjectInfoOverlay';

export const metadata = {
  title: 'Côme Le Sauter - Régisseur Production | Portfolio',
  description:
    'Portfolio de Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales. Découvrez mes réalisations pour des marques prestigieuses.',
  openGraph: {
    title: 'Côme Le Sauter - Régisseur Production',
    description:
      'Portfolio de Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales. Découvrez mes réalisations pour des marques prestigieuses.',
    url: 'https://votre-domaine.com',
    images: [
      {
        url: '/about-4.jpg',
        width: 1200,
        height: 630,
        alt: 'Côme Le Sauter - Régisseur',
      },
    ],
  },
};

/**
 * Contenu du texte "Something you'll want on every production."
 * Affiché en haut à droite sur la page d'accueil
 */
const TEXT_CONTENT = (
  <>
    <span className="font-semibold">
      Something
      <br />
      <span className="pl-8">you'll want on</span>
      <br />
      <span className="pl-2">every </span>
    </span>
    <span className="font-light italic">
      production<span className="font-semibold">.</span>
    </span>
  </>
);

/**
 * Page d'accueil du site
 * Affiche un texte en haut à droite et un défilement horizontal des projets en bas
 */
export default function Home() {
  // Ordre personnalisé des projets sur la page d'accueil
  // Vous pouvez modifier cette liste pour changer l'ordre d'affichage
  const customOrder = [
    'aigle',
    'zegna',
    'echos',
    'stahr',
    'breitling',
    'feuillate',
    'grtgaz',
    'king-ben',
    'FFR',
    'or',
    'courir-ruban',
    'monoprix',
    'vivier',
  ];

  // Réorganise les projets selon l'ordre personnalisé défini ci-dessus
  const orderedProjects = customOrder
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean); // Retire les projets non trouvés

  // Variations de hauteur maximale pour créer un effet visuel avec des images de tailles différentes
  const maxHeights = [
    'max-h-[350px]',
    'max-h-[450px]',
    'max-h-[380px]',
    'max-h-[420px]',
    'max-h-[350px]',
    'max-h-[440px]',
    'max-h-[360px]',
    'max-h-[430px]',
    'max-h-[450px]',
    'max-h-[410px]',
    'max-h-[370px]',
    'max-h-[400px]',
    'max-h-[340px]',
  ];

  /**
   * Calcule le nombre d'images/vidéos dans un projet
   * Pour Monoprix et Echos, retourne le nombre de sous-projets
   * Pour les autres, retourne 1 (cover) + le nombre d'images supplémentaires
   */
  const getCount = (project) => {
    if (project.slug === 'monoprix') {
      return 7; // Nombre de sous-projets Monoprix
    }
    if (project.slug === 'echos') {
      return 3; // Nombre de sous-projets Echos
    }
    // Pour les autres projets : 1 (cover) + nombre d'images supplémentaires
    return 1 + (project.images ? project.images.length : 0);
  };

  return (
    <>
      {/* Version Mobile - Affichage vertical */}
      <div className="min-h-screen md:hidden">
        {/* Texte "Something..." aligné à droite, en dessous de la navbar */}
        <div className="flex justify-end px-4 pb-10 pt-32">
          <p className="text-3xl uppercase leading-none tracking-tighter">{TEXT_CONTENT}</p>
        </div>

        {/* Liste des projets en version mobile (affichage vertical) */}
        <TestPageMobile projects={orderedProjects} />
      </div>

      {/* Version Desktop - Affichage horizontal */}
      <main className="relative hidden h-screen flex-col md:flex">
        {/* Texte "Something..." au milieu de l'écran, aligné à droite */}
        <div className="absolute right-4 top-1/4 -translate-y-1/2 transform md:right-48">
          <p className="text-4xl uppercase leading-none tracking-tighter">{TEXT_CONTENT}</p>
        </div>

        {/* Section de défilement horizontal en bas de l'écran */}
        <section className="mt-auto pb-4">
          <div className="custom-scrollbar group flex items-end gap-4 overflow-x-auto px-6">
            {orderedProjects.map((project, index) => {
              // Chemin vers l'image de couverture du projet
              const coverPath = getProjectImagePath(project);
              // Lien vers la page du projet
              const projectHref = getProjectHref(project);
              // Hauteur maximale variable pour créer un effet visuel
              const maxHeightClass = maxHeights[index % maxHeights.length];
              // Nombre d'images dans le projet
              const count = getCount(project);

              // Vérifie si le projet a un lien externe (ex: YouTube)
              const isExternalLink = project.externalUrl;
              // Utilise le lien externe si disponible, sinon le lien interne
              const linkHref = isExternalLink ? project.externalUrl : projectHref;
              // Classes CSS communes pour toutes les images
              const commonImageClasses =
                'h-auto w-auto max-w-xs select-none object-contain object-bottom grayscale transition-all duration-300 group-hover/image:grayscale-0';

              // Contenu de l'image (vidéo ou image)
              const imageContent =
                project.coverType === 'video' ? (
                  <video
                    src={coverPath}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`${maxHeightClass} ${commonImageClasses}`}
                  />
                ) : (
                  <img
                    src={coverPath}
                    alt={project.title}
                    className={`${maxHeightClass} ${commonImageClasses}`}
                  />
                );

              return (
                <div
                  key={project.slug}
                  className="group/image flex flex-shrink-0 flex-col opacity-100 transition-opacity duration-300 hover:!opacity-100 group-hover:opacity-60"
                >
                  {/* Overlay avec client/production au survol */}
                  <ProjectInfoOverlay project={project} />
                  {/* Badge avec le nombre d'images */}
                  <div className="mb-1 text-sm font-light">{count}</div>
                  {/* Lien cliquable vers le projet (externe ou interne) */}
                  {isExternalLink ? (
                    <a
                      href={linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-end"
                    >
                      {imageContent}
                    </a>
                  ) : (
                    <Link href={linkHref} className="flex items-end">
                      {imageContent}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
