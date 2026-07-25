/**
 * muscle-icons.js
 * Bibliothèque d'icônes SVG pour les groupes musculaires de MyTraining.
 *
 * Style repris de la planche de référence fournie : une silhouette du
 * segment corporel concerné (torse, bras, hanches/cuisses, mollet) en ton
 * violet discret, avec la zone musculaire ciblée surlignée par-dessus dans
 * le dégradé violet → orange de l'app (#muscleIconGrad). Les zones
 * surlignées sont découpées (clip-path) par la silhouette elle-même — donc
 * toujours parfaitement contenues dans le contour du corps, quelle que soit
 * la forme de la zone. Les 4 silhouettes de base et leurs clip-paths sont
 * définis UNE SEULE FOIS dans app.html (voir le <svg> caché en tête de
 * <body>) ; ce fichier ne fait que les référencer par id.
 *
 * Usage :
 *   getMuscleIcon('Pectoraux')  → chaîne HTML/SVG prête à insérer dans le DOM
 *   MUSCLE_ICONS['Pectoraux']   → contenu SVG brut (le <g> intérieur) si besoin
 */

const MUSCLE_ICON_SVG_ATTRS = `viewBox="0 0 48 48"`;

// Silhouette "au repos" (partie du corps non ciblée par la carte).
const BASE = 'fill="rgba(167,139,250,.18)" stroke="rgba(139,92,246,.5)" stroke-width="1.4" stroke-linejoin="round"';
// Zone musculaire mise en évidence.
const HI_FILL = 'url(#muscleIconGrad)';
// Traits fins (colonne vertébrale, ligne blanche des abdos...).
const LINE = 'fill="none" stroke="rgba(255,255,255,.5)" stroke-width="0.9" stroke-linecap="round"';

// ── Silhouettes de base (mêmes chemins que les clipPaths globaux) ──
const TORSO_D = 'M14,7 C18,4 30,4 34,7 C38,10 39,15 37,20 C36,28 36,36 34,44 L14,44 C12,36 12,28 11,20 C9,15 10,10 14,7 Z';
const ARM_D   = 'M18,3 C23,3 26,6 25,11 C24,15 22,17 22,20 C26,21 31,23 33,28 C35,33 34,39 30,43 C27,46 22,45 20,41 L15,28 C13,22 11,16 10,11 C9,6 13,3 18,3 Z';
const HIP_D   = 'M9,8 C9,5 39,5 39,8 C40,12 40,16 38,20 L36,44 L27,44 L25,24 L23,24 L21,44 L12,44 L10,20 C8,16 8,12 9,8 Z';
const CALF_D  = 'M15,4 L25,4 L26,14 C27,20 26,26 24,30 L25,38 L28,42 L27,45 L13,45 L12,42 L15,38 L16,30 C14,26 13,20 14,14 Z';

const TORSO = `<path ${BASE} d="${TORSO_D}"/><circle ${BASE} cx="10" cy="10" r="4"/><circle ${BASE} cx="38" cy="10" r="4"/>`;
const ARM   = `<path ${BASE} d="${ARM_D}"/>`;
const HIP   = `<path ${BASE} d="${HIP_D}"/>`;
const CALF  = `<path ${BASE} d="${CALF_D}"/>`;

const MUSCLE_ICONS = {

  // Pectoraux — torse avec les deux faisceaux pectoraux surlignés (découpés par le torse)
  'Pectoraux': `
    ${TORSO}
    <g clip-path="url(#torsoClip)" fill="${HI_FILL}">
      <ellipse cx="17.5" cy="14" rx="7" ry="6"/>
      <ellipse cx="30.5" cy="14" rx="7" ry="6"/>
    </g>
  `,

  // Épaules — les deux deltoïdes (boules d'épaule) surlignés
  'Épaules': `
    ${TORSO}
    <circle fill="${HI_FILL}" cx="10" cy="10" r="4.2"/>
    <circle fill="${HI_FILL}" cx="38" cy="10" r="4.2"/>
  `,

  // Dos — torse (vue arrière) entièrement surligné + colonne vertébrale
  'Dos': `
    <path fill="${HI_FILL}" d="${TORSO_D}"/>
    <circle fill="${HI_FILL}" cx="10" cy="10" r="4"/>
    <circle fill="${HI_FILL}" cx="38" cy="10" r="4"/>
    <path ${LINE} d="M24,8 L24,41"/>
    <path ${LINE} d="M17,14 L22,19"/>
    <path ${LINE} d="M31,14 L26,19"/>
  `,

  // Biceps — haut du bras (épaule + galbe du biceps) surligné
  'Biceps': `
    ${ARM}
    <g clip-path="url(#armClip)" fill="${HI_FILL}">
      <ellipse cx="17" cy="12" rx="9" ry="11"/>
    </g>
  `,

  // Triceps — arrière du bras / zone du coude surlignée
  'Triceps': `
    ${ARM}
    <g clip-path="url(#armClip)" fill="${HI_FILL}">
      <ellipse cx="27" cy="25" rx="9" ry="9"/>
    </g>
  `,

  // Avant-bras — avant-bras + poing surlignés
  'Avant-bras': `
    ${ARM}
    <g clip-path="url(#armClip)" fill="${HI_FILL}">
      <ellipse cx="24" cy="38" rx="10" ry="9"/>
    </g>
  `,

  // Abdominaux — bloc abdominal central surligné (grille + ligne blanche)
  'Abdominaux': `
    ${TORSO}
    <g clip-path="url(#torsoClip)" fill="${HI_FILL}">
      <rect x="18" y="19" width="12" height="22" rx="1.5"/>
    </g>
    <path ${LINE} d="M24,19 L24,41"/>
    <path ${LINE} d="M18.5,26 L29.5,26"/>
    <path ${LINE} d="M18.7,33.5 L29.3,33.5"/>
  `,

  // Quadriceps — les deux cuisses avant surlignées
  'Quadriceps': `
    ${HIP}
    <g clip-path="url(#hipClip)" fill="${HI_FILL}">
      <ellipse cx="15.5" cy="32" rx="7.5" ry="14"/>
      <ellipse cx="32.5" cy="32" rx="7.5" ry="14"/>
    </g>
  `,

  // Ischio-jambiers — bande médiane des cuisses surlignée
  'Ischio-jambiers': `
    ${HIP}
    <g clip-path="url(#hipClip)" fill="${HI_FILL}">
      <rect x="8" y="27" width="32" height="7" rx="1"/>
    </g>
  `,

  // Fessiers — ceinture haute (bassin) surlignée
  'Fessiers': `
    ${HIP}
    <g clip-path="url(#hipClip)" fill="${HI_FILL}">
      <rect x="7" y="4" width="34" height="16" rx="2"/>
    </g>
  `,

  // Mollets — galbe central du mollet (gastrocnémien) surligné
  'Mollets': `
    ${CALF}
    <g clip-path="url(#calfClip)" fill="${HI_FILL}">
      <ellipse cx="19" cy="21" rx="8" ry="12"/>
    </g>
  `,

  // Icône de repli pour tout groupe non listé (ex: Cou) — haltère plein
  'default': `
    <rect fill="${HI_FILL}" x="3.4" y="20.4" width="7" height="7.2" rx="1.6"/>
    <rect fill="${HI_FILL}" x="37.6" y="20.4" width="7" height="7.2" rx="1.6"/>
    <rect fill="${HI_FILL}" x="12.2" y="22.2" width="23.6" height="3.6" rx="1.4"/>
  `,
};

/**
 * Retourne le SVG complet (balise <svg> incluse) pour un groupe musculaire donné.
 * Si le groupe n'est pas reconnu, retourne l'icône par défaut (haltère).
 * Nécessite que app.html définisse une fois #muscleIconGrad et les clipPaths
 * #torsoClip / #armClip / #hipClip / #calfClip (voir le <svg> caché en tête
 * de <body>).
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
