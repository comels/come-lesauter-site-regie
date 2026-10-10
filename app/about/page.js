import Image from 'next/image';
import Typewriter from '../../components/Typewriter';

const TEAM = [
  { firstName: 'Côme', lastName: 'Le Sauter', phone: '06 66 67 96 88' },
  { firstName: 'Basile', lastName: 'Le Sauter', phone: '06 68 03 95 91' },
  { firstName: 'Charles', lastName: 'Créhange', phone: '06 84 00 78 19' },
];

export const metadata = {
  title: 'À propos - Côme Le Sauter | Régisseur Production',
  description:
    'Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales. Expertise en repérage de lieux, logistique, restauration et gestion efficace des tournages.',
  openGraph: {
    title: 'À propos - Côme Le Sauter',
    description:
      'Côme Le Sauter, régisseur pour productions audiovisuelles et commerciales. Expertise en repérage de lieux, logistique, restauration et gestion efficace des tournages.',
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
    <main className="relative min-h-screen px-0 lg:h-screen lg:overflow-hidden">
      <div className="relative flex min-h-screen w-full flex-col lg:block lg:h-full">
        <div className="w-full px-6 pb-16 pt-20">
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

        <div className="absolute bottom-0 right-0 z-0 mx-auto mb-0 aspect-[3/4] w-96 sm:right-64">
          <Image
            src="/about-5.jpg"
            alt="Côme"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 30vw"
          />
        </div>

        <div className="absolute bottom-0 left-0 z-20 px-6 py-4">
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
