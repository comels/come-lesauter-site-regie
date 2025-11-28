import Image from 'next/image';

export const metadata = {
  title: 'À propos - Côme Le Sauter | Régisseur Production',
  description:
    'Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales. Expertise en repérage de lieux, logistique, restauration et gestion efficace des tournages.',
  openGraph: {
    title: 'À propos - Côme Le Sauter',
    description:
      'Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales. Expertise en repérage de lieux, logistique, restauration et gestion efficace des tournages.',
    url: 'https://votre-domaine.com/about',
    images: [
      {
        url: '/about-4.jpg',
        width: 1200,
        height: 1600,
        alt: 'Côme Le Sauter',
      },
    ],
  },
};

export default function About() {
  return (
    <main className="relative min-h-screen px-0 lg:h-screen lg:overflow-hidden">
      <div className="relative flex min-h-screen w-full flex-col lg:block lg:h-full">
        <div className="w-full px-6 pb-16 pt-20">
          <p
            className="relative z-10 text-justify text-4xl font-semibold uppercase sm:text-5xl lg:text-6xl"
            style={{ lineHeight: '1.3' }}
          >
            I’m Côme Le Sauter, a production manager working on commercial shoots, bringing
            expertise in location scouting, logistics, catering, and efficient on-set operations.
          </p>
        </div>

        <div className="absolute bottom-0 right-0 z-0 mx-auto mb-0 aspect-[3/4] w-96 opacity-80 sm:right-64">
          <Image
            src="/about-4.jpg"
            alt="Côme"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 30vw"
          />
        </div>

        <div className="absolute bottom-0 z-20 px-6 pb-4">
          <div className="text-base font-semibold">
            <p>INSTAGRAM</p>
            <p>06 66 67 96 88</p>
            <p>COMELESAUTER@GMAIL.COM</p>
          </div>
        </div>
      </div>
    </main>
  );
}
