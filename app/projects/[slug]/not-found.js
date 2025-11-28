import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Projet introuvable</h1>
        <p className="mb-8 text-lg">Le projet que vous recherchez n'existe pas.</p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
