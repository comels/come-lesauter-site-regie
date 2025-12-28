import ExternalLink from '../components/ExternalLink';

/**
 * Utilitaires pour afficher la production
 *
 * La production peut être affichée sous deux formats différents pour plus de flexibilité.
 */

/**
 * Affiche la production avec support de deux formats
 *
 * FORMATS SUPPORTÉS :
 * 1. Chaîne simple (ancien format) :
 *    production = "FaireFaire"
 *    productionUrl = "https://www.instagram.com/fairefairefr/"
 *
 * 2. Tableau de personnes (nouveau format) :
 *    production = [
 *      { name: 'Côme Le Sauter', url: 'https://...' },
 *      { name: 'Laura Thomassaint', url: 'https://...' }
 *    ]
 *
 * UTILISATION :
 * - useMediumFont = false : pour la page d'accueil (lien en fine)
 * - useMediumFont = true : pour les pages de projets (lien en medium, plus visible)
 *
 * @param {string|Array} production - La production (chaîne ou tableau d'objets)
 * @param {string} productionUrl - URL optionnelle (uniquement pour format chaîne simple)
 * @param {boolean} useMediumFont - Si true, applique font-medium aux liens (défaut: false)
 * @returns {JSX.Element|null} Le JSX pour afficher la production, ou null si vide
 */
export function renderProduction(production, productionUrl = null, useMediumFont = false) {
  if (!production) return null;

  const linkClassName = useMediumFont
    ? 'font-medium hover:line-through'
    : 'font-thin hover:line-through';

  // Format nouveau : tableau de personnes (plusieurs personnes pour la même production)
  if (Array.isArray(production)) {
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

  // Format ancien : chaîne simple avec URL optionnelle
  if (productionUrl) {
    return (
      <a href={productionUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {production}
      </a>
    );
  }

  // Chaîne simple sans URL
  return <>{production}</>;
}
