/**
 * muscle-icons.js
 * Bibliothèque d'icônes SVG pour les groupes musculaires de MyTraining.
 *
 * Contrairement à de simples pictogrammes en traits, chaque icône est ici une
 * silhouette pleine (remplie) qui reprend la forme anatomique réelle du muscle
 * (galbe, fibres, insertion) — pecs en éventail, deltoïde en trois faisceaux,
 * fer à cheval du triceps, etc. Toutes partagent le même dégradé violet → orange
 * (#muscleIconGrad, défini une seule fois dans app.html) et le même léger
 * liseré sombre pour la cohérence visuelle, plus quelques lignes de fibres
 * pour le détail musculaire.
 *
 * Usage :
 *   getMuscleIcon('Pectoraux')  → chaîne HTML/SVG prête à insérer dans le DOM
 *   MUSCLE_ICONS['Pectoraux']   → contenu SVG brut (paths) si besoin
 */

// Attributs communs appliqués à chaque <svg> généré : remplissage dégradé +
// liseré sombre fin pour détacher la silhouette du fond de la carte.
const MUSCLE_ICON_SVG_ATTRS = `viewBox="0 0 24 24" fill="url(#muscleIconGrad)" stroke="rgba(14,7,32,.4)" stroke-width="0.6" stroke-linejoin="round" stroke-linecap="round"`;

// Lignes de fibres/séparations internes : traits clairs fins, sans remplissage.
const FIBER = 'fill="none" stroke="rgba(255,255,255,.4)" stroke-width="0.8" stroke-linecap="round"';

const MUSCLE_ICONS = {

  // Pectoraux — deux faisceaux en éventail se rejoignant au sternum
  'Pectoraux': `
    <path d="M12 5c-2.6-1.2-6.2-.3-7.3 3-1 3 .4 6.3 3.6 7.4 1.6.6 2.9.3 3.7-.6z"/>
    <path d="M12 5c2.6-1.2 6.2-.3 7.3 3 1 3-.4 6.3-3.6 7.4-1.6.6-2.9.3-3.7-.6z"/>
    <path ${FIBER} d="M12 5.4v9"/>
    <path ${FIBER} d="M6.4 7.6 9.6 9.8"/>
    <path ${FIBER} d="M17.6 7.6 14.4 9.8"/>
  `,

  // Dos — trapèzes/grand dorsal en bouclier, taille resserrée
  'Dos': `
    <path d="M12 4c2.2 1 5.6 2 7 5 1.7 3.6.6 8-2.4 10.3-1.6 1.2-3 1.7-4.6 1.7s-3-.5-4.6-1.7C4.4 17 3.3 12.6 5 9c1.4-3 4.8-4 7-5z"/>
    <path ${FIBER} d="M12 6.4v13"/>
    <path ${FIBER} d="M7.6 9.6 10.6 12.4"/>
    <path ${FIBER} d="M16.4 9.6 13.4 12.4"/>
  `,

  // Épaules — trois faisceaux du deltoïde (antérieur / latéral / postérieur)
  'Épaules': `
    <circle cx="8.2" cy="12.6" r="3.6"/>
    <circle cx="12" cy="9.2" r="3.9"/>
    <circle cx="15.8" cy="12.6" r="3.6"/>
  `,

  // Biceps — galbe du biceps + attache de l'avant-bras
  'Biceps': `
    <path d="M8 4.8c2.4-1 5.1-.1 6.2 2.5 1.3 3.1-.2 6.4-3.3 7.7-2.7 1.1-5.7 0-6.9-2.8C2.8 8.9 4.3 6 8 4.8z"/>
    <path d="M9.6 14.8l3.6 6.4c.3.6-.1 1.3-.8 1.4l-1.3.2c-.6.1-1.2-.3-1.3-.9l-1.6-6.9z"/>
    <path ${FIBER} d="M6 8.4c1.6-1.6 4-2 5.6-.6"/>
  `,

  // Triceps — bras tendu avec le fer à cheval caractéristique du triceps
  'Triceps': `
    <path fill="none" stroke="url(#muscleIconGrad)" stroke-width="3.2" d="M8 5.4 11.6 20"/>
    <path fill="none" stroke="url(#muscleIconGrad)" stroke-width="4" d="M14 5.4c3 1 4.6 4.3 3.6 7.5-.8 2.6-3 4.3-5.6 4.5"/>
  `,

  // Avant-bras — faisceau tapered (large au coude, fin au poignet) + poing
  'Avant-bras': `
    <path d="M8.4 5h7.2l-1.6 10.4c-.2 1.3-1.2 2.1-2.4 2.1h-.8c-1.2 0-2.2-.8-2.4-2.1z"/>
    <circle cx="12" cy="19.6" r="2.3"/>
    <path ${FIBER} d="M9.2 8.6h5.6"/>
  `,

  // Abdominaux — grille façon "tablette de chocolat" + ligne blanche centrale
  'Abdominaux': `
    <rect x="7" y="5.3" width="4" height="4" rx="1.1"/>
    <rect x="13" y="5.3" width="4" height="4" rx="1.1"/>
    <rect x="7" y="10.3" width="4" height="4" rx="1.1"/>
    <rect x="13" y="10.3" width="4" height="4" rx="1.1"/>
    <rect x="7" y="15.3" width="4" height="4" rx="1.1"/>
    <rect x="13" y="15.3" width="4" height="4" rx="1.1"/>
    <path ${FIBER} d="M12 5.3v14"/>
  `,

  // Quadriceps — galbe de la cuisse avant + séparations des faisceaux
  'Quadriceps': `
    <path d="M12 4.2c2.3 0 3.9 1.9 3.7 4.5l-1 9.6c-.1 1.6-1.2 2.5-2.7 2.5s-2.6-.9-2.7-2.5l-1-9.6C8.1 6.1 9.7 4.2 12 4.2z"/>
    <path ${FIBER} d="M10 8.4v9"/>
    <path ${FIBER} d="M14 8.4v9"/>
  `,

  // Ischio-jambiers — même galbe que le quadriceps, fibres horizontales (arrière de cuisse)
  'Ischio-jambiers': `
    <path d="M12 4.2c2.3 0 3.9 1.9 3.7 4.5l-1 9.6c-.1 1.6-1.2 2.5-2.7 2.5s-2.6-.9-2.7-2.5l-1-9.6C8.1 6.1 9.7 4.2 12 4.2z"/>
    <path ${FIBER} d="M9.2 9.6c1.9.9 3.7.9 5.6 0"/>
    <path ${FIBER} d="M9 13.6c2 .9 4 .9 6 0"/>
  `,

  // Fessiers — galbe arrondi avec sillon central
  'Fessiers': `
    <path d="M12 5.2c4.1 0 6.9 3 6.9 6.9 0 4.3-3.3 6.7-6.9 6.7s-6.9-2.4-6.9-6.7c0-3.9 2.8-6.9 6.9-6.9z"/>
    <path ${FIBER} d="M12 9c-.9 2.1-.9 6 0 8.4"/>
  `,

  // Mollets — galbe du mollet (gastrocnémien) + tendon d'Achille
  'Mollets': `
    <path d="M12 4.2c1.1 0 2 .8 2.2 2l.6 5c.4 3.1-.3 6.5-1.5 8.4-.3.5-.8.8-1.3.8s-1-.3-1.3-.8c-1.2-1.9-1.9-5.3-1.5-8.4l.6-5c.2-1.2 1.1-2 2.2-2z"/>
    <path ${FIBER} d="M12 19.8v2.4"/>
  `,

  // Icône de repli pour tout groupe non listé (ex: Cou) — haltère plein
  'default': `
    <rect x="3.4" y="9.4" width="3" height="5.2" rx="1"/>
    <rect x="17.6" y="9.4" width="3" height="5.2" rx="1"/>
    <rect x="6.2" y="10.6" width="11.6" height="2.8" rx="1"/>
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
