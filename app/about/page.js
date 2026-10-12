import Image from 'next/image';
import Typewriter from '../../components/Typewriter';

const TEAM = [
  { firstName: 'Côme', lastName: 'Le Sauter', phone: '06 66 67 96 88' },
  { firstName: 'Basile', lastName: 'Le Sauter', phone: '06 68 03 95 91' },
  { firstName: 'Charles', lastName: 'Créhange', phone: '06 84 00 78 19' },
];

export const metadata = {
  title: 'À propos - Fourche | Production',
  description:
    'Fourche Prod accompagne les productions audiovisuelles et commerciales avec une expertise en repérage, logistique, restauration et gestion opérationnelle des tournages.',
  openGraph: {
    title: 'À propos - Côme Le Sauter',
    description:
      'Fourche Prod accompagne les productions audiovisuelles et commerciales avec une expertise en repérage, logistique, restauration et gestion opérationnelle des tournages.',
    url: 'https://comelesauter.vercel.app/about',
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
    <main className="relative h-dvh overflow-hidden px-0 sm:h-auto sm:min-h-screen sm:overflow-visible lg:h-screen lg:overflow-hidden">
      <div className="relative h-full w-full sm:min-h-screen lg:h-full">
        <div className="w-full px-6 pt-20 sm:pb-16">
          <p
            className="relative z-10 text-justify text-3xl font-semibold uppercase sm:text-5xl lg:text-[57px]"
            style={{ lineHeight: '1.3' }}
          >
            <Typewriter
              text="We’re a production team working on commercial shoots, bringing expertise in location scouting, logistics, catering, and efficient on-set operations."
              speed={50}
              delay={1000}
            />
          </p>
        </div>

        <div className="absolute left-0 right-0 top-1/2 z-0 aspect-[3/4] w-full sm:bottom-0 sm:left-auto sm:right-64 sm:top-auto sm:w-96">
          <Image
            src="/about-5.jpg"
            alt="Côme"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 30vw"
          />
        </div>

        <div className="fixed bottom-0 left-0 z-20 px-6 py-4 sm:absolute">
          <div className="flex flex-col gap-4">
            {TEAM.map((person) => (
              <div key={`${person.firstName}-${person.lastName}`}>
                <p className="text-base uppercase leading-none">
                  <span className="font-thin">{person.firstName} </span>
                  <span className="font-semibold">{person.lastName}</span>
                </p>
                <a
                  href={`tel:${person.phone.replace(/\s/g, '')}`}
                  className="mt-1 block text-base font-thin leading-none hover:line-through"
                >
                  {person.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
