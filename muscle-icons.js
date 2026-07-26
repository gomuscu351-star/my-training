/**
 * muscle-icons.js
 * Bibliothèque d'icônes SVG pour les groupes musculaires de MyTraining.
 *
 * Contrairement aux versions précédentes (formes dessinées à la main), les
 * silhouettes et zones surlignées ci-dessous sont directement TRACÉES depuis
 * la planche de référence fournie (contours vectorisés à partir des pixels
 * réels de chaque icône) — le rendu correspond donc fidèlement aux formes
 * et proportions de la référence, pas à une approximation.
 *
 * Chaque icône = une silhouette de segment corporel (torse avant, torse
 * arrière, bras, hanches/cuisses, mollets) en ton violet discret, avec le
 * muscle ciblé surligné dans le dégradé violet → orange de l'app
 * (#muscleIconGrad) et un léger glow (#muscleGlow) — tous deux définis une
 * seule fois dans app.html, aux côtés des clip-paths qui garantissent que
 * chaque zone surlignée reste contenue dans le contour du corps.
 *
 * Usage :
 *   getMuscleIcon('Pectoraux')  → chaîne HTML/SVG prête à insérer dans le DOM
 */

const MUSCLE_ICON_SVG_ATTRS = `viewBox="0 0 48 48"`;

const BASE = 'fill="rgba(167,139,250,.18)" stroke="rgba(139,92,246,.55)" stroke-width="1.3" stroke-linejoin="round"';
const HI_FILL = 'url(#muscleIconGrad)';
const HI = `fill="${HI_FILL}" stroke="rgba(20,10,40,.4)" stroke-width="0.6" stroke-linejoin="round"`;

// ── Silhouettes tracées depuis la référence (mêmes chemins que les
//    clipPaths globaux #frontTorsoClip / #backTorsoClip / #armClip /
//    #hipClip / #calfClip définis dans app.html) ──
const FRONT_TORSO_D = 'M5.13,12.75 L4.4,24.36 L1.5,25.09 L2.23,37.43 L4.4,38.15 L4.4,40.33 L6.58,40.33 L7.31,41.78 L10.94,41.06 L12.39,43.23 L16.02,43.23 L20.37,44.69 L27.63,44.69 L34.89,43.23 L37.06,41.06 L40.69,41.78 L45.77,34.52 L46.5,30.9 L45.77,27.27 L42.87,23.64 L42.87,20.73 L44.32,20.01 L42.87,19.28 L42.87,15.65 L38.52,11.3 L29.08,6.94 L29.81,3.31 L26.18,4.04 L18.92,3.31 L18.19,7.67 L10.94,10.57 L8.76,10.57 L8.03,12.75 Z';
const BACK_TORSO_D  = 'M24.99,1.5 L24.33,4.15 L17.71,4.15 L19.04,4.81 L19.04,8.12 L15.73,8.78 L14.4,11.43 L13.08,12.09 L9.77,11.43 L9.77,13.41 L7.13,18.04 L7.13,22.01 L5.8,25.32 L4.48,25.99 L5.14,36.57 L7.13,36.57 L8.45,38.56 L13.08,37.9 L13.74,43.19 L21.68,46.5 L26.32,46.5 L34.92,42.53 L33.6,41.87 L33.6,38.56 L37.57,37.9 L38.23,39.88 L40.21,39.22 L40.21,36.57 L42.86,34.59 L43.52,31.94 L42.86,31.28 L43.52,24.66 L40.88,24.0 L39.55,14.07 L38.23,14.07 L35.58,11.43 L32.93,11.43 L28.96,8.78 L29.62,5.47 L25.65,4.15 Z';
const ARM_D          = 'M1.5,4.77 L2.95,5.49 L3.68,43.96 L6.58,43.96 L7.31,45.41 L9.48,36.7 L9.48,28.72 L12.39,27.99 L13.11,26.54 L16.74,26.54 L21.1,30.9 L31.26,34.52 L30.53,38.15 L33.44,38.88 L34.16,45.41 L43.6,44.69 L44.32,40.33 L46.5,38.88 L44.32,36.7 L44.32,31.62 L34.16,30.9 L29.08,25.09 L28.35,22.19 L22.55,18.56 L20.37,14.2 L15.29,12.02 L11.66,2.59 L4.4,2.59 Z';
const HIP_D           = 'M12.4,1.5 L11.7,2.91 L12.4,10.64 L10.29,16.27 L8.88,16.97 L8.88,33.84 L9.59,34.55 L8.88,38.06 L10.29,40.17 L10.99,45.09 L11.7,45.8 L20.13,45.8 L22.24,40.88 L25.76,41.58 L25.76,45.8 L30.68,46.5 L36.3,45.09 L37.71,35.95 L39.12,35.25 L38.41,19.78 L37.71,19.08 L37.71,16.27 L39.12,13.45 L36.3,12.75 L34.9,1.5 Z';
const CALF_D          = 'M29.36,1.5 L27.21,10.79 L27.21,22.93 L29.36,27.93 L29.36,36.5 L27.93,41.5 L30.79,44.36 L30.79,46.5 L31.5,45.07 L39.36,44.36 L40.07,46.5 L43.64,45.79 L42.93,41.5 L35.79,37.21 L38.64,12.93 L40.79,12.21 L38.64,11.5 L37.93,3.64 L36.5,1.5 Z M19.36,1.5 L12.21,1.5 L10.07,3.64 L10.07,29.36 L12.21,30.79 L12.21,35.07 L10.07,36.5 L10.07,38.64 L7.21,39.36 L7.21,40.79 L4.36,42.93 L5.79,45.07 L19.36,43.64 L20.79,41.5 L19.36,29.36 L21.5,22.21 L22.21,12.21 L20.79,10.79 L20.79,5.07 Z';

const FRONT_TORSO = `<path ${BASE} d="${FRONT_TORSO_D}"/>`;
const BACK_TORSO  = `<path ${BASE} d="${BACK_TORSO_D}"/>`;
const ARM         = `<path ${BASE} d="${ARM_D}"/>`;
const HIP         = `<path ${BASE} d="${HIP_D}"/>`;
const CALF        = `<path ${BASE} d="${CALF_D}"/>`;

const MUSCLE_ICONS = {

  // Pectoraux — faisceau pectoral tracé depuis la référence
  'Pectoraux': `
    ${FRONT_TORSO}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M12.39,20.01 L12.39,22.91 L15.29,25.81 L19.65,25.81 L21.82,24.36 L28.35,24.36 L33.44,26.54 L38.52,22.91 L37.79,18.56 L32.71,14.2 L29.81,14.2 L26.18,16.38 L24.0,16.38 L21.1,14.2 L18.19,14.2 L14.56,16.38 Z"/>
    </g>
  `,

  // Épaules — les deux deltoïdes tracés depuis la référence
  'Épaules': `
    ${FRONT_TORSO}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M34.7,13.3 L34.7,14.78 L36.91,16.99 L40.6,23.63 L43.55,25.11 L44.29,24.37 L44.29,17.73 L43.55,16.25 L40.6,13.3 L39.12,13.3 L38.39,12.57 Z"/>
      <path ${HI} d="M16.25,13.3 L14.04,13.3 L12.57,12.57 L9.61,14.04 L7.4,16.25 L7.4,17.73 L6.66,18.47 L6.66,24.37 L9.61,24.37 L11.83,22.16 L11.83,20.68 L14.04,17.73 L14.04,16.99 L16.99,14.78 Z"/>
    </g>
  `,

  // Dos — silhouette dos + zone haute (trapèzes/lats) tracées depuis la référence
  'Dos': `
    ${BACK_TORSO}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M24.33,6.13 L19.04,11.43 L17.05,12.09 L15.73,14.74 L19.04,18.71 L19.7,25.32 L23.01,29.96 L26.32,30.62 L30.29,25.32 L30.95,18.71 L34.92,13.41 L29.62,10.76 L26.32,6.13 Z"/>
    </g>
  `,

  // Biceps — galbe tracé depuis la référence
  'Biceps': `
    ${ARM}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M18.19,26.54 L21.1,30.17 L24.73,32.35 L26.9,32.35 L28.35,33.8 L31.98,33.8 L33.44,32.35 L33.44,30.9 L31.98,29.44 L29.81,25.09 L25.45,20.73 L24.0,20.73 L23.27,21.46 L23.27,24.36 L22.55,25.09 L21.1,25.09 Z"/>
    </g>
  `,

  // Triceps — galbe tracé depuis la référence (variante bras arrière)
  'Triceps': `
    ${ARM}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M17.93,26.5 L17.93,28.64 L22.21,32.93 L25.79,34.36 L27.93,34.36 L31.5,36.5 L33.64,35.79 L33.64,33.64 L30.07,29.36 L28.64,25.79 L25.79,22.93 L23.64,22.21 L20.79,25.07 Z"/>
    </g>
  `,

  // Avant-bras — bas de l'avant-bras (la référence ne détaille pas cette
  // zone séparément : on surligne la partie basse du même bras tracé)
  'Avant-bras': `
    ${ARM}
    <g clip-path="url(#armClip)" filter="url(#muscleGlow)">
      <ellipse ${HI} cx="30" cy="41" rx="12" ry="8.5"/>
    </g>
  `,

  // Abdominaux — bloc abdominal tracé depuis la référence
  'Abdominaux': `
    ${FRONT_TORSO}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M22.39,15.64 L17.89,18.21 L19.18,23.36 L16.61,24.0 L16.61,37.5 L18.54,39.43 L21.11,39.43 L22.39,42.0 L26.25,43.29 L29.46,38.79 L31.39,38.79 L33.96,36.21 L33.96,25.29 L30.11,22.71 L32.04,18.86 L30.75,16.93 Z"/>
    </g>
  `,

  // Quadriceps — les deux cuisses tracées depuis la référence
  'Quadriceps': `
    ${HIP}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M15.91,14.86 L13.8,21.89 L10.99,25.41 L10.99,35.25 L12.4,40.88 L16.62,40.88 L17.32,43.69 L20.84,44.39 L22.95,37.36 L22.24,31.73 L20.84,31.03 L18.73,15.56 Z"/>
      <path ${HI} d="M33.49,14.16 L32.09,14.86 L30.68,18.38 L29.98,27.52 L27.87,31.73 L27.16,38.06 L28.57,43.69 L32.09,43.69 L34.9,40.88 L37.01,40.88 L39.12,34.55 L39.12,24.0 L37.01,23.3 L34.9,14.86 Z"/>
    </g>
  `,

  // Ischio-jambiers — variante tracée depuis la référence (arrière de cuisse)
  'Ischio-jambiers': `
    ${HIP}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M16.62,14.86 L15.21,19.78 L12.4,22.59 L11.7,25.41 L11.7,35.25 L13.1,40.17 L20.84,44.39 L22.95,42.98 L23.65,36.66 L22.95,31.73 L20.84,28.22 L20.13,21.19 L18.73,19.08 L18.73,14.86 Z"/>
      <path ${HI} d="M34.2,14.86 L32.79,15.56 L30.68,27.52 L27.87,33.14 L28.57,42.98 L30.68,44.39 L37.71,40.88 L39.82,33.14 L39.82,24.7 L37.71,23.3 L37.01,19.08 Z"/>
    </g>
  `,

  // Fessiers — ceinture haute (bassin) tracée depuis la référence
  'Fessiers': `
    ${HIP}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M15.0,9.12 L15.0,18.12 L17.08,22.96 L22.62,23.65 L26.08,22.27 L28.15,23.65 L31.62,23.65 L33.69,22.27 L35.77,14.65 L35.77,9.81 L34.38,8.42 L30.92,8.42 L26.08,11.19 L23.31,11.19 L21.23,9.12 L18.46,8.42 Z"/>
    </g>
  `,

  // Mollets — les deux mollets (gastrocnémiens) tracés depuis la référence
  'Mollets': `
    ${CALF}
    <g filter="url(#muscleGlow)">
      <path ${HI} d="M12.93,10.07 L12.93,12.21 L12.21,12.93 L12.21,22.93 L15.07,31.5 L16.5,32.21 L17.21,30.79 L17.21,24.36 L17.93,23.64 L20.79,23.64 L22.21,20.79 L22.21,13.64 L20.79,11.5 L18.64,12.21 L17.93,13.64 L16.5,13.64 L15.07,10.07 Z"/>
      <path ${HI} d="M37.93,9.36 L36.5,10.07 L34.36,14.36 L32.93,14.36 L32.21,12.21 L30.07,11.5 L28.64,16.5 L30.07,22.93 L31.5,24.36 L34.36,25.07 L34.36,32.21 L35.07,32.93 L36.5,31.5 L37.21,27.93 L38.64,25.79 L38.64,20.79 L39.36,20.07 L39.36,13.64 Z"/>
    </g>
  `,

  // Icône de repli pour tout groupe non listé (ex: Cou) — haltère plein
  'default': `
    <g filter="url(#muscleGlow)">
      <rect ${HI} x="3.4" y="20.4" width="7" height="7.2" rx="1.6"/>
      <rect ${HI} x="37.6" y="20.4" width="7" height="7.2" rx="1.6"/>
      <rect ${HI} x="12.2" y="22.2" width="23.6" height="3.6" rx="1.4"/>
    </g>
  `,
};

/**
 * Retourne le SVG complet (balise <svg> incluse) pour un groupe musculaire donné.
 * Nécessite que app.html définisse une fois #muscleIconGrad, #muscleGlow et
 * les clipPaths #frontTorsoClip / #backTorsoClip / #armClip / #hipClip /
 * #calfClip (voir le <svg> caché en tête de <body>).
 * @param {string} groupName - Nom du groupe musculaire (ex: 'Pectoraux')
 * @returns {string} Balisage SVG prêt à insérer via innerHTML
 */
function getMuscleIcon(groupName) {
  const inner = MUSCLE_ICONS[groupName] || MUSCLE_ICONS['default'];
  return `<svg ${MUSCLE_ICON_SVG_ATTRS}>${inner}</svg>`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MUSCLE_ICONS, getMuscleIcon };
}
