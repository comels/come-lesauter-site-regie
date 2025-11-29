import ExternalLink from '../components/ExternalLink';

/**
 * Utilitaires pour afficher la production (peut être une chaîne ou un tableau de personnes)
 */

/**
 * Affiche la production, qui peut être soit :
 * - Une chaîne simple avec une URL optionnelle (format actuel)
 * - Un tableau d'objets [{ name: 'Nom', url: 'https://...' }] (nouveau format)
 *
 * @param {string|Array} production - La production (chaîne ou tableau)
 * @param {string} productionUrl - URL optionnelle (pour format chaîne simple)
 * @returns {JSX.Element|null} Le JSX pour afficher la production
 */
export function renderProduction(production, productionUrl = null) {
  if (!production) return null;

  if (Array.isArray(production)) {
    // Format nouveau : tableau de personnes
    return (
      <>
        {production.map((person, index) => (
          <span key={index}>
            {person.url ? (
              <ExternalLink href={person.url} className="font-medium hover:line-through">
                {person.name}
              </ExternalLink>
            ) : (
              person.name
            )}
            {index < production.length - 1 && <span>, </span>}
          </span>
        ))}
      </>
    );
  }

  // Format actuel : chaîne simple
  if (productionUrl) {
    return (
      <a
        href={productionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium hover:line-through"
      >
        {production}
      </a>
    );
  }

  return <>{production}</>;
}

