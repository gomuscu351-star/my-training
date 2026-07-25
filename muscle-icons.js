/**
 * muscle-icons.js
 * Bibliothèque d'icônes SVG pour les groupes musculaires de MyTraining.
 *
 * Style repris de la planche de référence fournie : silhouette du segment
 * corporel (torse, bras, hanches/cuisses, mollet) en ton violet discret,
 * avec le(s) muscle(s) ciblé(s) surligné(s) par-dessus dans le dégradé
 * violet → orange de l'app (#muscleIconGrad). Comme sur la référence, les
 * zones surlignées sont désormais détaillées (plusieurs faisceaux/lobes,
 * lignes de fibres, séparations) plutôt qu'un simple blob uni, pour un rendu
 * plus réaliste — tout en restant strictement contenues dans le contour du
 * corps grâce aux clip-paths partagés (#torsoClip / #armClip / #hipClip /
 * #calfClip, définis une seule fois dans app.html).
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
const HI = `fill="${HI_FILL}" stroke="rgba(20,10,40,.4)" stroke-width="0.6" stroke-linejoin="round"`;
// Traits fins clairs : fibres / séparations à l'intérieur d'une zone surlignée.
const FIBER = 'fill="none" stroke="rgba(255,255,255,.45)" stroke-width="0.7" stroke-linecap="round"';
// Traits fins sombres : lignes de construction sur la silhouette au repos (col, panneaux).
const LINE = 'fill="none" stroke="rgba(139,92,246,.4)" stroke-width="0.8" stroke-linecap="round"';

// ── Silhouettes de base (mêmes chemins que les clipPaths globaux) ──
const TORSO_D = 'M14,7 C18,4 30,4 34,7 C38,10 39,15 37,20 C36,28 36,36 34,44 L14,44 C12,36 12,28 11,20 C9,15 10,10 14,7 Z';
const ARM_D   = 'M18,3 C23,3 26,6 25,11 C24,15 22,17 22,20 C26,21 31,23 33,28 C35,33 34,39 30,43 C27,46 22,45 20,41 L15,28 C13,22 11,16 10,11 C9,6 13,3 18,3 Z';
const HIP_D   = 'M9,8 C9,5 39,5 39,8 C40,12 40,16 38,20 L36,44 L27,44 L25,24 L23,24 L21,44 L12,44 L10,20 C8,16 8,12 9,8 Z';
const CALF_D  = 'M15,4 L25,4 L26,14 C27,20 26,26 24,30 L25,38 L28,42 L27,45 L13,45 L12,42 L15,38 L16,30 C14,26 13,20 14,14 Z';

// Silhouette de torse avec un peu de "modelé" (col, ligne médiane, tailleur)
// visible même quand elle n'est pas surlignée — comme sur la planche de référence.
const TORSO = `
  <path ${BASE} d="${TORSO_D}"/>
  <circle ${BASE} cx="10" cy="10" r="4"/>
  <circle ${BASE} cx="38" cy="10" r="4"/>
  <path ${LINE} d="M21,6 L24,10 L27,6"/>
  <path ${LINE} d="M24,10 L24,44"/>
  <path ${LINE} d="M15,20 C18,26 18,34 16,42"/>
  <path ${LINE} d="M33,20 C30,26 30,34 32,42"/>
`;
const ARM  = `<path ${BASE} d="${ARM_D}"/>`;
const HIP  = `
  <path ${BASE} d="${HIP_D}"/>
  <path ${LINE} d="M24,6 L24,20"/>
`;
const CALF = `<path ${BASE} d="${CALF_D}"/>`;

const MUSCLE_ICONS = {

  // Pectoraux — deux faisceaux pectoraux détaillés (fibres en éventail) + sternum
  'Pectoraux': `
    ${TORSO}
    <g clip-path="url(#torsoClip)">
      <path ${HI} d="M16,8.5 C12,9 10.5,12.5 11,16 C11.5,19.5 15,21.5 19,20.5 C22,19.7 23,17 23,14 L23,8.5 C20.5,7.3 18,7.4 16,8.5 Z"/>
      <path ${HI} d="M32,8.5 C36,9 37.5,12.5 37,16 C36.5,19.5 33,21.5 29,20.5 C26,19.7 25,17 25,14 L25,8.5 C27.5,7.3 30,7.4 32,8.5 Z"/>
      <path ${FIBER} d="M13,12 C15.5,11 18,11.3 20.5,13"/>
      <path ${FIBER} d="M35,12 C32.5,11 30,11.3 27.5,13"/>
      <path ${FIBER} d="M24,7.5 L24,20.5"/>
    </g>
  `,

  // Épaules — deltoïdes en trois faisceaux (antérieur / latéral / postérieur)
  'Épaules': `
    ${TORSO}
    <circle ${HI} cx="10" cy="10" r="4.3"/>
    <circle ${HI} cx="38" cy="10" r="4.3"/>
    <path ${FIBER} d="M7.3,8.6 C9,7.6 11,7.6 12.7,8.6"/>
    <path ${FIBER} d="M7.3,11.6 C9,12.5 11,12.5 12.7,11.6"/>
    <path ${FIBER} d="M35.3,8.6 C37,7.6 39,7.6 40.7,8.6"/>
    <path ${FIBER} d="M35.3,11.6 C37,12.5 39,12.5 40.7,11.6"/>
  `,

  // Dos — trapèzes + grand dorsal (ailes) détaillés, colonne vertébrale
  'Dos': `
    <path ${HI} d="${TORSO_D}"/>
    <circle ${HI} cx="10" cy="10" r="4"/>
    <circle ${HI} cx="38" cy="10" r="4"/>
    <path ${FIBER} d="M24,8 L24,41"/>
    <path ${FIBER} d="M15,13 C18,15.5 21,17.5 23,19"/>
    <path ${FIBER} d="M33,13 C30,15.5 27,17.5 25,19"/>
    <path ${FIBER} d="M13,23 C17,26.5 20.5,29.5 23.5,31.5"/>
    <path ${FIBER} d="M35,23 C31,26.5 27.5,29.5 24.5,31.5"/>
    <path ${FIBER} d="M15,35 C18,37 21,38.5 23.5,39.5"/>
    <path ${FIBER} d="M33,35 C30,37 27,38.5 24.5,39.5"/>
  `,

  // Biceps — galbe piqué (pic du biceps) avec ligne de fibre centrale
  'Biceps': `
    ${ARM}
    <g clip-path="url(#armClip)">
      <path ${HI} d="M10,7 C10,4 13,2.5 16,3.5 C19.5,4.7 21.5,8.5 21,13 C20.6,17 18.3,20.3 15,21.5 C12,22.6 9.3,21 8.5,18 C7.2,13.3 8.3,10 10,7 Z"/>
      <path ${FIBER} d="M11,7.5 C13,10.5 13.7,14.5 12.5,19"/>
    </g>
  `,

  // Triceps — fer à cheval (deux lobes + creux central) sur l'arrière du bras
  'Triceps': `
    ${ARM}
    <g clip-path="url(#armClip)">
      <path ${HI} d="M22,15 C27,14.5 31.5,17.5 32.5,22.5 C33.4,27 31,31.3 26.6,32.6 C23.6,33.5 20.6,32.3 19,30 C21,29 22.3,26.8 22.3,24.3 C22.3,21.3 21,17.7 22,15 Z"/>
      <path ${FIBER} d="M24,18 C27,19.5 28.5,22.5 27.7,26"/>
    </g>
  `,

  // Avant-bras — faisceau + poing, avec lignes de tendons
  'Avant-bras': `
    ${ARM}
    <g clip-path="url(#armClip)">
      <ellipse ${HI} cx="24" cy="37.5" rx="10" ry="9"/>
      <path ${FIBER} d="M17,34 L19.5,41"/>
      <path ${FIBER} d="M21,32.5 L23,41.5"/>
    </g>
  `,

  // Abdominaux — grille façon "tablette de chocolat" + obliques légèrement visibles
  'Abdominaux': `
    ${TORSO}
    <g clip-path="url(#torsoClip)">
      <path ${HI} fill-opacity=".35" d="M13,19 C12.5,26 13,34 15,41 L18,41 L18,19 Z"/>
      <path ${HI} fill-opacity=".35" d="M35,19 C35.5,26 35,34 33,41 L30,41 L30,19 Z"/>
      <rect ${HI} x="18" y="19" width="12" height="22" rx="1.5"/>
    </g>
    <path ${FIBER} d="M24,19 L24,41"/>
    <path ${FIBER} d="M18.5,26 L29.5,26"/>
    <path ${FIBER} d="M18.7,33.5 L29.3,33.5"/>
  `,

  // Quadriceps — 3 faisceaux visibles par cuisse (droit fémoral + vastes)
  'Quadriceps': `
    ${HIP}
    <g clip-path="url(#hipClip)">
      <ellipse ${HI} cx="15.5" cy="32" rx="7.5" ry="14"/>
      <ellipse ${HI} cx="32.5" cy="32" rx="7.5" ry="14"/>
      <path ${FIBER} d="M12.3,20 C11,25 11,33 12.6,42"/>
      <path ${FIBER} d="M15.5,19.4 L15.5,43"/>
      <path ${FIBER} d="M18.7,20 C20,25 20,33 18.4,42"/>
      <path ${FIBER} d="M35.7,20 C37,25 37,33 35.4,42"/>
      <path ${FIBER} d="M32.5,19.4 L32.5,43"/>
      <path ${FIBER} d="M29.3,20 C28,25 28,33 29.6,42"/>
    </g>
  `,

  // Ischio-jambiers — bande médiane des cuisses (arrière), fibres horizontales
  'Ischio-jambiers': `
    ${HIP}
    <g clip-path="url(#hipClip)">
      <path ${HI} d="M10,26 C9.3,30 9.6,34.5 11,38.5 L20.5,38.5 C21.5,34.5 21.5,30 20.5,26 Z"/>
      <path ${HI} d="M27.5,26 C26.5,30 26.5,34.5 27.5,38.5 L37,38.5 C38.4,34.5 38.7,30 38,26 Z"/>
      <path ${FIBER} d="M11.5,29.5 L20,29.5"/>
      <path ${FIBER} d="M11.7,34 L19.8,34"/>
      <path ${FIBER} d="M28,29.5 L36.5,29.5"/>
      <path ${FIBER} d="M28.2,34 L36.3,34"/>
    </g>
  `,

  // Fessiers — deux lobes arrondis avec sillon central
  'Fessiers': `
    ${HIP}
    <g clip-path="url(#hipClip)">
      <path ${HI} d="M24,6 C18,6 12.5,8 10.5,12.5 C8.7,16.7 10,21 14,22.7 C18,24.4 22.5,22.8 24,18.5 C25.5,22.8 30,24.4 34,22.7 C38,21 39.3,16.7 37.5,12.5 C35.5,8 30,6 24,6 Z"/>
      <path ${FIBER} d="M24,7.5 L24,21"/>
    </g>
  `,

  // Mollets — deux chefs du gastrocnémien (médial + latéral) + tendon d'Achille
  'Mollets': `
    ${CALF}
    <g clip-path="url(#calfClip)">
      <path ${HI} d="M13.5,15 C12.3,20 12.8,25.5 15,30 C16,32 17.6,32 18.4,30 C19.6,26.5 19.6,20.5 18.6,15.3 C17.1,14.3 14.9,14.2 13.5,15 Z"/>
      <path ${HI} d="M25.4,15.3 C24.4,20.5 24.4,26.5 25.6,30 C26.4,32 28,32 29,30 C31.2,25.5 31.7,20 30.5,15 C29.1,14.2 26.9,14.3 25.4,15.3 Z"/>
      <path ${FIBER} d="M19,32.5 L19.6,37"/>
      <path ${FIBER} d="M25,32.5 L24.4,37"/>
    </g>
  `,

  // Icône de repli pour tout groupe non listé (ex: Cou) — haltère plein
  'default': `
    <rect ${HI} x="3.4" y="20.4" width="7" height="7.2" rx="1.6"/>
    <rect ${HI} x="37.6" y="20.4" width="7" height="7.2" rx="1.6"/>
    <rect ${HI} x="12.2" y="22.2" width="23.6" height="3.6" rx="1.4"/>
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MUSCLE_ICONS, getMuscleIcon };
}
