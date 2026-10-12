'use client';

import { useEffect } from 'react';

/**
 * Empêche le défilement sur téléphone. Sur iOS, la page À propos peut
 * glisser et laisser apparaître le fond derrière les éléments fixes.
 */
export default function LockMobileScroll() {
  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');

    const lock = () => {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
      document.body.style.position = 'fixed';
      document.body.style.inset = '0';
      document.body.style.width = '100%';
    };

    const unlock = () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.position = '';
      document.body.style.inset = '';
      document.body.style.width = '';
    };

    const apply = () => {
      if (query.matches) lock();
      else unlock();
    };

    apply();
    query.addEventListener('change', apply);
    return () => {
      query.removeEventListener('change', apply);
      unlock();
    };
  }, []);

  return null;
}
