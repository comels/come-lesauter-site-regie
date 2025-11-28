'use client';

import Link from 'next/link';

/**
 * Barre de navigation fixe en haut de la page
 * Affiche le nom "Côme Le Sauter" à gauche et les liens "About" et "Projects" à droite
 */
export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 w-full bg-stone-100">
      <div className="flex items-center gap-3 px-6 py-4">
        {/* Logo / Nom du site - cliquable, mène à la page d'accueil */}
        <Link href="/" className="text-2xl uppercase transition-colors hover:line-through">
          <span className="font-light tracking-tighter">Côme </span>
          <span className="font-bold tracking-tighter">Le Sauter</span>
        </Link>

        {/* Liens de navigation à droite */}
        <Link href="/about" className="ml-auto text-sm font-light uppercase hover:line-through">
          About
        </Link>
        <span className="text-sm font-light">-</span>
        <Link href="/" className="text-sm font-light uppercase hover:line-through">
          Projects
        </Link>
      </div>
    </nav>
  );
}
