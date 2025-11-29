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
 * @param {boolean} useMediumFont - Si true, applique font-medium aux liens (pour pages de projets)
 * @returns {JSX.Element|null} Le JSX pour afficher la production
 */
export function renderProduction(production, productionUrl = null, useMediumFont = false) {
  if (!production) return null;

  const linkClassName = useMediumFont ? 'font-medium hover:line-through' : 'hover:line-through';

  if (Array.isArray(production)) {
    // Format nouveau : tableau de personnes
    return (
      <>
        {production.map((person, index) => (
          <span key={index}>
            {person.url ? (
              <ExternalLink href={person.url} className={linkClassName}>
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
      <a href={productionUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {production}
      </a>
    );
  }

  return <>{production}</>;
}
