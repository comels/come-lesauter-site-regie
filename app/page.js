import { projects } from '../data/projects';
import Link from 'next/link';
import { getProjectImagePath, getProjectHref, isVideoFile } from '../utils/imageUtils';
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
    url: 'https://comelesauter.vercel.app',
    images: [
      {
        url: 'https://comelesauter.vercel.app/about-4.jpg',
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
    <span className="font-bold">
      Something
      <br />
      <span className="pl-8">you'll want on</span>
      <br />
      <span className="pl-2">every </span>
    </span>
    <span className="font-thin italic">
      production<span className="font-bold">.</span>
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
    'monoprix',
    'breitling',
    'kitsune',
    'feuillate',
    'king-ben',
    'grtgaz',
    'FFR',
    'courir-ruban',
    'or',
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
    'max-h-[380px]',
    'max-h-[360px]',
    'max-h-[440px]',
    'max-h-[370px]',
    'max-h-[450px]',
    'max-h-[380px]',
    'max-h-[400px]',
    'max-h-[370px]',
    'max-h-[430px]',
    'max-h-[390px]',
  ];

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

              // Toujours utiliser le lien interne vers la page du projet
              const linkHref = projectHref;
              // Classes CSS communes pour toutes les images
              const commonImageClasses =
                'h-auto w-auto max-w-xs select-none object-contain object-bottom grayscale transition-all duration-300 group-hover/image:grayscale-0';

              // Détermine si c'est une vidéo en regardant l'extension ou coverType (rétrocompatibilité)
              const isVideo = project.coverType === 'video' || isVideoFile(coverPath);

              // Contenu de l'image (vidéo ou image)
              const imageContent = isVideo ? (
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
                  {/* Overlay avec client/production et date au survol */}
                  {(project.client || project.production || project.date) && (
                    <div className="mb-2 flex items-end justify-between opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
                      <ProjectInfoOverlay project={project} />
                      {/* Date du projet - à droite */}
                      {project.date && (
                        <div className="mr-1 whitespace-nowrap font-thin">{project.date}</div>
                      )}
                    </div>
                  )}
                  {/* Lien cliquable vers le projet */}
                  <Link href={linkHref} className="flex items-end">
                    {imageContent}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
