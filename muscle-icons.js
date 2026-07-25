/**
 * muscle-icons.js
 * Bibliothèque d'icônes SVG minimalistes pour les groupes musculaires de MyTraining.
 *
 * Chaque icône est un mini-pictogramme en style "ligne" (stroke, sans remplissage),
 * dessiné sur un viewBox 24x24, pensé pour être placé dans une plaque de ~34-38px.
 * Toutes les icônes utilisent le même dégradé violet → orange (voir #muscleIconGrad,
 * défini une seule fois dans app.html) pour rester cohérentes avec l'identité visuelle
 * de l'application, et le même style de trait (épaisseur, arrondis) pour l'homogénéité.
 *
 * Usage :
 *   getMuscleIcon('Pectoraux')  → chaîne HTML/SVG prête à insérer dans le DOM
 *   MUSCLE_ICONS['Pectoraux']   → chemin SVG brut (<path>, <rect>, etc.) si besoin
 */

const MUSCLE_ICON_STROKE = {
  fill: 'none',
  stroke: 'url(#muscleIconGrad)',
  'stroke-width': '1.6',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
};

// Attributs communs appliqués à chaque <svg> généré.
const MUSCLE_ICON_SVG_ATTRS = `viewBox="0 0 24 24" fill="none" stroke="url(#muscleIconGrad)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;

// Chaque entrée est le contenu interne du <svg> (paths/shapes), pas le tag <svg> lui-même.
const MUSCLE_ICONS = {

  // Pectoraux — silhouette en cœur avec ligne de séparation centrale (sternum)
  'Pectoraux': `
    <path d="M12 19c-4.6-3.2-7.6-6.3-7.6-9.7C4.4 6.6 6.4 4.6 8.8 4.6c1.4 0 2.7.7 3.2 1.9.5-1.2 1.8-1.9 3.2-1.9 2.4 0 4.4 2 4.4 4.7 0 3.4-3 6.5-7.6 9.7z"/>
    <path d="M12 7.2V17.8"/>
  `,

  // Dos — colonne centrale + fibres du dos/trapèzes en éventail (façon ailes)
  'Dos': `
    <path d="M12 4v16"/>
    <path d="M12 8.5c-2.6-1.8-6-1.4-8.4 1"/>
    <path d="M12 8.5c2.6-1.8 6-1.4 8.4 1"/>
    <path d="M12 13.5c-2.2-1.3-5-1-6.8 1.1"/>
    <path d="M12 13.5c2.2-1.3 5-1 6.8 1.1"/>
  `,

  // Épaules — arc reliant deux deltoïdes (petites boules aux extrémités)
  'Épaules': `
    <path d="M4.8 14.5c0-3.6 3.2-6.5 7.2-6.5s7.2 2.9 7.2 6.5"/>
    <circle cx="4.8" cy="14.7" r="1.7"/>
    <circle cx="19.2" cy="14.7" r="1.7"/>
  `,

  // Biceps — bras fléchi avec bosse (le classique "flex")
  'Biceps': `
    <path d="M5.2 19c-.2-3.3.9-6.3 3.4-8.3"/>
    <path d="M8.6 10.7c2.6-2 5.6-.7 5.4 1.9-.2 2.1-2.2 3-4.2 2.6"/>
    <path d="M9.8 15.2l4.6 2"/>
    <circle cx="15.8" cy="18" r="1.9"/>
  `,

  // Triceps — bras tendu avec la forme en "fer à cheval" caractéristique
  'Triceps': `
    <path d="M6.5 5.2L9.8 19"/>
    <path d="M11.3 9.2c2.6-.5 3.7 1.6 3 3.4-.6 1.5-2.3 2.1-3.7 1.6"/>
    <circle cx="9.8" cy="19.8" r="1.7"/>
  `,

  // Avant-bras — forme tapered (large au coude, fine au poignet) + poing
  'Avant-bras': `
    <path d="M8.6 5h6.4l-2 11.4h-2.4z"/>
    <path d="M10.2 17.6h3.2"/>
    <circle cx="11.8" cy="19.6" r="2"/>
  `,

  // Abdominaux — grille 2x3 façon "tablette de chocolat"
  'Abdominaux': `
    <rect x="7" y="5.3" width="4" height="4" rx="1.1"/>
    <rect x="13" y="5.3" width="4" height="4" rx="1.1"/>
    <rect x="7" y="10.3" width="4" height="4" rx="1.1"/>
    <rect x="13" y="10.3" width="4" height="4" rx="1.1"/>
    <rect x="7" y="15.3" width="4" height="4" rx="1.1"/>
    <rect x="13" y="15.3" width="4" height="4" rx="1.1"/>
  `,

  // Quadriceps — cuisse avant, forme galbée + stries verticales
  'Quadriceps': `
    <path d="M12 4.2c2.1 0 3.5 1.8 3.3 4.2l-.9 9.6c-.1 1.5-1 2.4-2.4 2.4s-2.3-.9-2.4-2.4l-.9-9.6C8.5 6 9.9 4.2 12 4.2z"/>
    <path d="M10.3 8.4v8.4"/>
    <path d="M13.7 8.4v8.4"/>
  `,

  // Ischio-jambiers — même galbe que le quadriceps mais fibres horizontales (arrière de cuisse)
  'Ischio-jambiers': `
    <path d="M12 4.2c2.1 0 3.5 1.8 3.3 4.2l-.9 9.6c-.1 1.5-1 2.4-2.4 2.4s-2.3-.9-2.4-2.4l-.9-9.6C8.5 6 9.9 4.2 12 4.2z"/>
    <path d="M9.3 9.6c1.8.9 3.6.9 5.4 0"/>
    <path d="M9.1 13.6c1.9.9 3.9.9 5.8 0"/>
  `,

  // Fessiers — forme arrondie type "pêche" avec sillon central
  'Fessiers': `
    <path d="M12 5.2c4.1 0 6.9 3 6.9 6.9 0 4.3-3.3 6.7-6.9 6.7s-6.9-2.4-6.9-6.7c0-3.9 2.8-6.9 6.9-6.9z"/>
    <path d="M12 9c-.9 2.1-.9 6 0 8.4"/>
  `,

  // Mollets — jambe basse effilée avec galbe du mollet + tendon d'Achille
  'Mollets': `
    <path d="M12 4.2c1 0 1.8.7 2 1.8l.5 4.6c.4 2.9-.3 6.1-1.4 7.9-.2.4-.6.6-1.1.6s-.9-.2-1.1-.6c-1.1-1.8-1.8-5-1.4-7.9l.5-4.6c.2-1.1 1-1.8 2-1.8z"/>
    <path d="M12 19.4v2.4"/>
  `,

  // Icône de repli pour tout groupe non listé (ex: Cou) — haltère simplifié
  'default': `
    <path d="M6.5 9v6"/>
    <path d="M4.6 10.4v3.2"/>
    <path d="M17.5 9v6"/>
    <path d="M19.4 10.4v3.2"/>
    <path d="M8.6 12h6.8"/>
  `,
};

/**
 * Retourne le SVG complet (balise <svg> incluse) pour un groupe musculaire donné.
 * Si le groupe n'est pas reconnu, retourne l'icône par défaut (haltère).
 * @param {string} groupName - Nom du groupe musculaire (ex: 'Pectoraux')
 * @returns {string} Balisage SVG prêt à insérer via innerHTML
 */
function getMuscleIcon(groupName) {
  const inner = MUSCLE_ICONS[groupName] || MUSCLE_ICONS['default'];
  return `<svg ${MUSCLE_ICON_SVG_ATTRS}>${inner}</svg>`;
}

// Support both usages: <script src="muscle-icons.js"> (globals) et import ES module.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MUSCLE_ICONS, getMuscleIcon };
}
