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
 * Texte principal de la page d'accueil
 * 
 * Affiché en haut à droite avec un style typographique mixte (gras/fin).
 * Utilise des sauts de ligne et des indentations pour créer un effet visuel.
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
 * 
 * AFFICHAGE :
 * - Desktop : Texte "Something..." au milieu à droite + défilement horizontal des projets en bas
 * - Mobile : Texte "Something..." en haut + liste verticale des projets
 * 
 * FONCTIONNALITÉS :
 * - Les projets sont réorganisés selon un ordre personnalisé (customOrder)
 * - Sur desktop, les informations (client/production/date) apparaissent au survol
 * - Sur mobile, les informations sont toujours visibles
 * - Les images sont en grayscale par défaut sur desktop, en couleur au survol
 */
export default function Home() {
  /**
   * ORDRE PERSONNALISÉ DES PROJETS
   * 
   * Modifiez cette liste pour changer l'ordre d'affichage des projets sur la page d'accueil.
   * Les slugs doivent correspondre exactement aux slugs dans data/projects.js
   */
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

  /**
   * Réorganise les projets selon l'ordre personnalisé
   * Filtre les projets non trouvés (au cas où un slug n'existe plus dans les données)
   */
  const orderedProjects = customOrder
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  /**
   * VARIATIONS DE HAUTEUR MAXIMALE
   * 
   * Crée un effet visuel dynamique en variant les hauteurs des images.
   * Chaque projet utilise une hauteur différente selon son index (modulo pour boucler).
   * Ajustez ces valeurs pour modifier l'aspect visuel du défilement horizontal.
   */
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
      {/* 
        VERSION MOBILE
        Affichage vertical : texte en haut, projets en dessous, un par un.
        Les informations (client/production/date) sont toujours visibles.
      */}
      <div className="min-h-screen md:hidden">
        <div className="flex justify-end px-4 pb-10 pt-32">
          <p className="text-3xl uppercase leading-none tracking-tighter">{TEXT_CONTENT}</p>
        </div>
        <TestPageMobile projects={orderedProjects} />
      </div>

      {/* 
        VERSION DESKTOP
        Affichage horizontal : texte au milieu à droite, défilement horizontal des projets en bas.
        Les informations (client/production/date) apparaissent au survol de chaque image.
      */}
      <main className="relative hidden h-screen flex-col md:flex">
        {/* Texte "Something..." positionné au milieu de l'écran, aligné à droite */}
        <div className="absolute right-4 top-1/4 -translate-y-1/2 transform md:right-48">
          <p className="text-4xl uppercase leading-none tracking-tighter">{TEXT_CONTENT}</p>
        </div>

        {/* 
          DÉFILEMENT HORIZONTAL DES PROJETS
          Les projets sont affichés en ligne horizontale, défilable avec la molette de la souris.
          Chaque image a une hauteur maximale variable pour créer un effet visuel dynamique.
        */}
        <section className="mt-auto pb-4">
          <div className="custom-scrollbar group flex items-end gap-4 overflow-x-auto px-6">
            {orderedProjects.map((project, index) => {
              const coverPath = getProjectImagePath(project);
              const projectHref = getProjectHref(project);
              const maxHeightClass = maxHeights[index % maxHeights.length];
              const isVideo = project.coverType === 'video' || isVideoFile(coverPath);

              /**
               * EFFET GRAYSCALE
               * Les images sont en grayscale par défaut et passent en couleur au survol.
               * Utilise group-hover/image pour que l'effet se déclenche au survol de l'image spécifique.
               */
              const commonImageClasses =
                'h-auto w-auto max-w-xs select-none object-contain object-bottom grayscale transition-all duration-300 group-hover/image:grayscale-0';

              // Contenu de l'image (vidéo ou image statique)
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
                  {/* 
                    OVERLAY D'INFORMATIONS
                    Apparaît au survol de l'image (opacity-0 → opacity-100).
                    Affiche client/production à gauche et date à droite.
                  */}
                  {(project.client || project.production || project.date) && (
                    <div className="mb-2 flex items-end justify-between opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
                      <ProjectInfoOverlay project={project} />
                      {project.date && (
                        <div className="mr-1 whitespace-nowrap font-thin">{project.date}</div>
                      )}
                    </div>
                  )}
                  {/* Lien cliquable - mène toujours vers la page interne du projet */}
                  <Link href={projectHref} className="flex items-end">
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
