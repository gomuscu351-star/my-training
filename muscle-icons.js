/**
 * muscle-icons.js
 * Bibliotheque d'icones SVG pour les groupes musculaires de MyTraining.
 *
 * Ces icones sont tracees directement depuis les 11 references fournies
 * par l'utilisateur (une image dediee par groupe musculaire, contours
 * vectorises a partir des pixels reels) : la silhouette au repos ET la
 * zone surlignee reproduisent fidelement chaque image source, panneau par
 * panneau, avec des traits de contour marques pour que le detail
 * musculaire reste lisible a la taille d'une icone. Seule la palette a ete
 * adaptee au theme de l'app (violet pour le corps, degrade violet ->
 * orange pour le muscle cible, leger glow) a la place des couleurs brutes
 * gris/rouge/orange des references.
 *
 * Chaque zone (corps + surlignage) est decoupee par le contour exact de
 * l'icone source (clip-path #<nom>Clip, defini une seule fois dans
 * app.html) donc rien ne peut deborder. Le conteneur (.vol-icon-slot) est
 * un rectangle vertical et le SVG le remplit entierement en "slice"
 * (preserveAspectRatio) pour ne laisser aucun vide.
 *
 * Usage :
 *   getMuscleIcon('Pectoraux')  -> SVG complet pret a inserer dans le DOM
 */

const MUSCLE_ICON_SVG_ATTRS = `viewBox="0 0 48 48" preserveAspectRatio="xMidYMid slice"`;

// Silhouette de dos "morcelée" — même vocabulaire visuel (fragments tracés
// au trait, remplissage violet clair translucide) que les 8 autres icônes,
// utilisée par Grand Dorsal / Trapèzes / Lombaires. Ces 16 panneaux sont
// tracés directement depuis l'image de référence dédiée fournie par
// l'utilisateur (silhouette dos, contours vectorisés à partir des pixels
// réels de l'illustration), au même titre que les autres groupes
// musculaires, plutôt que dessinés à la main ou générés géométriquement.
const DOS_BG_FRAGMENTS = `
  <path d="M25.07,2.5 L24.47,2.87 L24.51,7.18 L26.19,9.91 L24.47,12.57 L24.58,28.51 L29.9,21.14 L30.04,16.65 L31.09,13.46 L34.12,10.62 L28.55,7.18 Z"/>
  <path d="M23.05,2.5 L19.56,7.18 L13.95,10.62 L16.98,13.43 L17.99,16.53 L18.22,21.29 L23.38,28.55 L23.61,12.38 L21.89,9.91 L23.57,7.18 L23.61,2.83 Z"/>
  <path d="M17.09,21.81 L12.42,23.2 L11.97,23.76 L12.12,26.45 L12.68,28.55 L15.52,33.64 L16.46,36.11 L22.45,29.26 L17.84,22.26 Z"/>
  <path d="M30.76,21.85 L25.59,29.3 L31.58,36.11 L32.1,34.46 L35.43,28.32 L36.07,23.79 L35.62,23.2 Z"/>
  <path d="M23.05,30.04 L16.87,36.82 L16.61,37.72 L17.09,42.36 L19.94,43.11 L23.31,45.43 L23.61,45.09 L23.61,30.38 Z"/>
  <path d="M24.73,30.04 L24.47,30.31 L24.47,45.17 L24.95,45.43 L27.72,43.29 L30.94,42.36 L31.43,37.57 L31.17,36.82 L25.44,30.46 Z"/>
  <path d="M14.85,11.97 L13.09,11.03 L11.59,10.88 L9.83,11.78 L8.37,13.09 L7.36,14.7 L6.76,16.72 L6.69,19.15 L7.18,21.17 L7.89,21.14 L10.73,18.63 L11.52,16.38 L12.38,15.37 L15.97,13.69 L15.78,12.98 Z"/>
  <path d="M33.0,12.12 L32.07,13.65 L35.73,15.41 L36.71,16.72 L37.27,18.59 L40.19,21.17 L40.79,21.21 L41.31,19.41 L41.31,16.98 L40.71,14.77 L39.63,13.05 L37.98,11.63 L36.22,10.84 L34.95,11.03 Z"/>
  <path d="M16.57,14.59 L16.08,14.51 L13.46,15.52 L12.12,16.94 L11.67,18.89 L11.67,22.03 L11.89,22.52 L12.9,22.45 L17.06,20.87 L17.32,19.45 L17.32,17.66 L16.91,15.11 Z"/>
  <path d="M31.47,14.59 L31.17,15.04 L30.76,17.28 L30.72,19.3 L30.94,20.8 L31.39,21.17 L35.62,22.6 L36.11,22.52 L36.33,22.22 L36.33,18.4 L35.77,16.72 L34.95,15.78 L34.05,15.26 L31.99,14.51 Z"/>
  <path d="M10.99,19.9 L9.57,21.62 L8.52,24.06 L7.85,29.03 L6.91,31.69 L7.18,32.1 L7.96,31.73 L9.35,30.31 L11.14,27.2 L11.18,20.13 Z"/>
  <path d="M37.04,19.9 L36.86,20.05 L36.86,27.09 L38.62,30.23 L40.15,31.8 L40.86,32.1 L41.09,31.58 L40.15,28.96 L39.48,23.98 L38.43,21.59 Z"/>
  <path d="M8.41,21.47 L6.43,23.01 L4.63,25.7 L3.73,29.15 L3.73,31.06 L4.03,31.69 L4.48,31.65 L5.23,30.79 L6.2,28.51 L7.03,27.28 L7.7,24.32 L8.64,21.92 Z"/>
  <path d="M39.51,21.51 L39.4,21.96 L40.34,24.36 L41.05,27.39 L41.91,28.66 L42.85,30.87 L43.48,31.62 L43.97,31.69 L44.27,31.24 L44.27,29.0 L43.41,25.74 L41.76,23.2 L40.45,21.96 Z"/>
  <path d="M14.81,34.35 L14.06,38.69 L14.03,40.6 L14.36,42.47 L14.66,42.66 L15.41,42.66 L16.16,42.32 L16.2,41.83 L15.56,37.46 Z"/>
  <path d="M33.19,34.31 L32.48,37.38 L31.84,41.8 L31.88,42.32 L32.63,42.66 L33.38,42.66 L33.68,42.47 L34.01,40.52 L33.97,38.77 Z"/>
`;

const MUSCLE_ICONS = {
  // Pectoraux — tracé exactement depuis la référence fournie
  'Pectoraux': `
    <g clip-path="url(#pectorauxClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M33.37,36.79 L32.94,36.96 L31.06,38.87 L30.83,39.77 L30.83,41.54 L31.03,41.81 L31.43,41.71 L33.37,39.47 L33.61,38.46 L33.61,37.09 Z"/>
        <path d="M14.63,36.79 L14.42,37.09 L14.42,38.53 L14.59,39.3 L14.96,39.94 L16.77,41.81 L17.0,41.81 L17.2,41.61 L17.2,39.6 L17.0,38.93 L16.7,38.46 L14.99,36.86 Z"/>
        <path d="M24.97,33.84 L24.6,34.28 L24.64,39.74 L25.1,40.14 L27.95,40.04 L28.55,39.17 L28.49,34.45 L27.65,33.81 Z"/>
        <path d="M20.12,33.88 L19.48,34.71 L19.58,39.53 L20.42,40.14 L23.03,40.1 L23.43,39.64 L23.4,34.14 L22.96,33.81 Z"/>
        <path d="M33.58,30.96 L33.27,31.0 L31.73,32.74 L31.06,33.88 L30.83,35.05 L30.9,37.49 L31.16,37.46 L32.34,36.45 L33.37,35.05 L33.61,33.84 Z"/>
        <path d="M14.53,30.93 L14.42,33.94 L14.69,35.12 L15.53,36.29 L17.14,37.49 L17.2,34.81 L17.0,33.94 L16.13,32.54 Z"/>
        <path d="M24.8,28.39 L24.6,28.69 L24.67,32.67 L24.9,32.87 L28.55,32.87 L28.96,32.67 L29.69,31.13 L29.32,30.13 L26.95,28.69 L25.51,28.32 Z"/>
        <path d="M23.3,28.42 L22.86,28.29 L21.39,28.59 L20.08,29.16 L18.74,30.09 L18.38,30.8 L18.38,31.37 L18.94,32.5 L19.45,32.87 L23.3,32.77 Z"/>
        <path d="M37.66,27.82 L37.56,28.79 L37.86,30.06 L38.7,31.63 L39.64,32.57 L39.7,32.44 L38.66,30.26 L37.79,27.85 Z"/>
        <path d="M10.41,27.82 L10.24,27.88 L9.3,30.43 L8.36,32.4 L8.4,32.57 L8.53,32.57 L9.27,31.73 L10.14,30.16 L10.44,29.16 Z"/>
        <path d="M43.39,25.94 L43.32,26.21 L44.46,29.02 L44.56,33.54 L44.82,33.68 L45.73,31.77 L45.63,29.99 L44.86,27.55 L44.12,26.48 Z"/>
        <path d="M4.65,25.94 L3.88,26.51 L3.28,27.38 L2.44,29.86 L2.34,31.9 L3.24,33.68 L3.48,33.51 L3.54,29.19 L4.01,27.62 L4.75,26.14 Z"/>
        <path d="M24.84,22.93 L24.57,23.33 L24.67,27.11 L29.66,28.82 L30.09,28.65 L31.5,26.48 L31.53,25.04 L25.47,22.93 Z"/>
        <path d="M23.16,22.93 L22.53,22.93 L16.6,24.9 L16.37,25.44 L16.57,26.54 L17.94,28.69 L18.31,28.82 L23.3,27.15 L23.4,23.23 Z"/>
        <path d="M38.36,21.82 L37.79,22.59 L37.76,25.41 L38.7,28.85 L40.84,33.11 L42.31,34.65 L43.08,34.75 L43.55,34.21 L43.92,31.16 L43.75,28.82 L41.78,23.87 L38.83,21.72 Z"/>
        <path d="M9.6,21.79 L9.2,21.72 L6.26,23.87 L4.35,28.65 L4.15,31.43 L4.48,34.14 L4.95,34.75 L5.72,34.65 L7.13,33.21 L9.27,29.06 L10.24,25.67 L10.24,22.53 Z"/>
        <path d="M32.3,12.42 L33.91,13.12 L35.42,14.46 L38.23,19.65 L41.95,23.2 L42.25,17.37 L40.77,13.72 L39.13,12.38 L37.02,11.55 L34.65,11.65 Z"/>
        <path d="M15.76,12.42 L13.39,11.65 L10.98,11.55 L8.9,12.38 L7.26,13.72 L6.32,15.3 L5.75,17.67 L6.09,23.2 L9.67,19.85 L12.42,14.69 L13.76,13.39 Z"/>
        <path d="M27.21,11.65 L27.65,12.08 L34.08,11.01 L34.48,10.78 L34.51,10.41 L29.62,7.86 L28.85,7.76 L28.35,8.16 Z"/>
        <path d="M20.85,11.51 L19.71,8.23 L19.18,7.76 L18.41,7.86 L13.52,10.44 L13.55,10.78 L13.99,11.01 L20.42,12.08 Z"/>
        <path d="M27.55,5.49 L25.71,7.83 L24.2,12.38 L24.2,12.92 L24.54,13.19 L24.97,13.09 L27.08,9.34 L27.65,7.33 Z"/>
        <path d="M20.48,5.49 L20.35,7.06 L20.92,9.24 L23.06,13.09 L23.53,13.19 L23.9,12.62 L22.36,7.9 L21.52,6.56 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M25.07,14.76 L24.6,15.66 L24.6,20.38 L25.74,21.86 L32.17,23.83 L33.68,23.26 L35.79,21.29 L37.73,20.52 L35.42,15.83 L31.93,12.99 L29.49,12.72 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M22.96,14.76 L18.38,12.68 L15.96,13.05 L12.72,15.7 L10.34,20.55 L12.25,21.29 L14.53,23.36 L15.9,23.83 L22.46,21.79 L23.43,20.38 L23.43,15.7 Z"/>
      </g>
    </g>
  `,

  // Épaules — tracé exactement depuis la référence fournie
  'Épaules': `
    <g clip-path="url(#epaulesClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M33.38,36.78 L32.98,36.88 L31.64,38.12 L30.98,39.02 L30.81,39.66 L30.81,41.6 L31.01,41.8 L31.51,41.6 L33.38,39.39 L33.59,38.69 L33.59,36.98 Z"/>
        <path d="M14.65,36.78 L14.41,37.05 L14.41,38.65 L14.62,39.36 L15.08,40.09 L16.76,41.8 L17.02,41.8 L17.19,41.6 L17.19,39.62 L17.02,39.02 L16.29,38.05 L14.98,36.85 Z"/>
        <path d="M24.95,33.84 L24.59,34.24 L24.59,39.66 L25.09,40.13 L27.93,40.03 L28.53,39.19 L28.4,34.3 L27.63,33.8 Z"/>
        <path d="M20.1,33.87 L19.63,34.27 L19.47,34.84 L19.53,39.46 L19.9,39.92 L20.44,40.13 L23.01,40.09 L23.41,39.66 L23.41,34.24 L22.91,33.8 Z"/>
        <path d="M33.48,30.93 L31.98,32.43 L31.08,33.77 L30.81,34.87 L30.88,37.48 L31.11,37.48 L32.41,36.35 L33.38,34.97 L33.59,34.14 Z"/>
        <path d="M14.52,30.93 L14.41,34.04 L14.62,34.94 L15.28,36.04 L17.12,37.48 L17.19,34.84 L16.92,33.77 L16.12,32.53 Z"/>
        <path d="M24.79,28.38 L24.59,28.65 L24.69,32.7 L24.89,32.87 L28.57,32.87 L28.87,32.7 L29.64,31.39 L29.64,30.76 L29.27,30.09 L26.93,28.68 L25.49,28.32 Z"/>
        <path d="M23.31,28.45 L22.51,28.32 L21.07,28.68 L18.96,29.89 L18.36,30.79 L18.4,31.49 L18.93,32.5 L19.43,32.87 L23.21,32.8 L23.41,32.53 Z"/>
        <path d="M37.6,27.81 L37.57,29.19 L37.87,30.16 L38.6,31.53 L39.61,32.56 L39.61,32.26 L38.47,29.85 L37.8,27.91 Z"/>
        <path d="M10.4,27.81 L10.2,27.95 L9.63,29.62 L8.39,32.3 L8.39,32.56 L9.2,31.83 L10.23,29.92 L10.43,29.22 Z"/>
        <path d="M43.35,25.94 L43.32,26.27 L44.42,28.98 L44.53,33.53 L44.79,33.67 L45.63,32.06 L45.53,29.65 L44.66,27.25 Z"/>
        <path d="M4.68,25.94 L3.88,26.51 L3.24,27.45 L2.47,29.65 L2.37,32.03 L3.24,33.67 L3.47,33.57 L3.58,28.98 Z"/>
        <path d="M24.82,22.93 L24.59,23.2 L24.69,27.14 L27.73,27.98 L29.64,28.82 L30.01,28.72 L31.41,26.64 L31.51,25.04 L25.76,23.03 Z"/>
        <path d="M23.18,22.96 L22.51,22.93 L16.59,24.9 L16.39,25.24 L16.59,26.64 L17.89,28.65 L18.3,28.82 L23.31,27.08 L23.41,23.36 Z"/>
        <path d="M38.4,21.79 L37.77,22.53 L37.77,25.64 L38.7,28.95 L41.05,33.4 L42.28,34.64 L43.05,34.74 L43.55,34.04 L43.92,30.89 L43.72,28.82 L41.78,23.9 L38.8,21.73 Z"/>
        <path d="M9.6,21.79 L9.2,21.73 L6.25,23.87 L4.28,28.82 L4.08,30.89 L4.48,34.17 L4.95,34.74 L5.72,34.64 L7.32,32.93 L9.4,28.68 L10.23,25.67 L10.23,22.53 Z"/>
        <path d="M25.05,14.77 L24.59,15.6 L24.59,20.49 L25.72,21.86 L32.18,23.83 L37.7,20.49 L35.39,15.84 L31.85,12.96 L28.97,12.86 Z"/>
        <path d="M22.91,14.73 L18.66,12.76 L16.15,12.96 L12.74,15.67 L10.3,20.49 L15.82,23.83 L22.51,21.76 L23.41,20.52 L23.41,15.57 Z"/>
        <path d="M27.2,11.59 L27.43,11.99 L28.17,12.09 L34.05,11.02 L34.52,10.52 L34.22,10.15 L29.6,7.87 L28.83,7.77 L28.27,8.34 Z"/>
        <path d="M20.8,11.65 L19.67,8.18 L19.17,7.77 L18.4,7.87 L13.51,10.45 L13.71,10.95 L20.4,12.09 Z"/>
        <path d="M27.53,5.5 L26.66,6.37 L25.62,7.97 L24.12,12.66 L24.35,13.13 L24.75,13.19 L25.12,12.89 L26.99,9.55 L27.66,7.14 Z"/>
        <path d="M20.47,5.5 L20.34,7.07 L21.01,9.51 L22.91,12.93 L23.28,13.19 L23.65,13.13 L23.88,12.63 L22.38,7.97 L21.14,6.1 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M32.28,12.42 L35.12,14.16 L36.8,16.47 L38.47,20.02 L41.92,23.2 L42.25,17.58 L40.81,13.8 L38.94,12.29 L37.0,11.55 L34.66,11.65 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M15.72,12.42 L13.51,11.69 L11.04,11.55 L9.06,12.29 L7.29,13.7 L6.22,15.57 L5.75,17.68 L6.08,23.2 L9.83,19.62 L12.44,14.67 L13.98,13.23 Z"/>
      </g>
    </g>
  `,

  // Grand Dorsal — silhouette dos (dosClip + arrière-plan) tracée depuis la
  // nouvelle image de référence ; les 4 bandes latérales (lats, du creux de
  // l'aisselle jusqu'au bas du dos) sont surlignées exactement comme sur
  // l'image de référence dédiée à ce groupe.
  'Grand Dorsal': `
    <g clip-path="url(#dosClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">${DOS_BG_FRAGMENTS}</g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M16.49,14.56 L15.94,14.56 L14.1,15.2 L13.1,15.75 L12.27,16.67 L11.72,18.04 L11.72,22.35 L11.9,22.53 L12.82,22.44 L16.58,21.16 L17.04,20.79 L17.22,19.97 L17.22,17.22 L16.85,15.11 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M16.94,21.8 L12.45,23.18 L11.9,23.91 L12.09,26.38 L12.64,28.49 L15.29,33.16 L16.39,36.0 L22.35,29.41 L22.26,28.67 L17.49,21.98 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M30.96,21.8 L30.14,22.26 L25.74,28.67 L25.56,29.41 L31.33,36.0 L31.61,36.0 L32.06,34.26 L35.27,28.58 L35.91,25.92 L36.0,23.73 L35.55,23.18 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M31.33,14.65 L30.96,15.66 L30.69,17.49 L30.78,20.52 L30.96,20.88 L31.42,21.16 L35.45,22.53 L36.0,22.53 L36.28,22.17 L36.28,18.41 L35.73,16.76 L34.72,15.66 L34.08,15.29 L32.06,14.56 Z"/>
      </g>
    </g>
  `,

  // Trapèzes — silhouette dos tracée depuis la nouvelle image de
  // référence ; surlignage du kite central (trapèzes, de la nuque jusqu'au
  // milieu du dos), exactement comme sur l'image de référence dédiée.
  'Trapèzes': `
    <g clip-path="url(#dosClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">${DOS_BG_FRAGMENTS}</g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M23.08,2.47 L19.51,7.23 L14.2,9.98 L13.92,10.71 L15.57,11.72 L17.13,13.65 L18.04,16.49 L18.23,21.25 L23.45,28.49 L23.54,12.27 L22.99,10.99 L21.98,10.07 L23.54,7.32 L23.54,2.74 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M25.01,2.47 L24.46,2.83 L24.46,7.05 L26.02,10.07 L24.82,11.35 L24.46,12.45 L24.55,28.49 L29.77,21.34 L29.96,16.76 L30.96,13.55 L32.25,11.9 L34.17,10.53 L33.99,10.07 L28.58,7.23 Z"/>
      </g>
    </g>
  `,

  // Lombaires — silhouette dos tracée depuis la nouvelle image de
  // référence ; surlignage du triangle du bas du dos (érecteurs du rachis /
  // lombaires), exactement comme sur l'image de référence dédiée.
  'Lombaires': `
    <g clip-path="url(#dosClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">${DOS_BG_FRAGMENTS}</g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M22.95,30.05 L16.9,36.74 L16.62,37.29 L16.99,42.24 L17.45,42.6 L19.74,42.97 L20.93,43.61 L22.95,45.35 L23.4,45.35 L23.5,30.23 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M24.69,30.05 L24.41,30.32 L24.41,45.08 L24.6,45.35 L25.05,45.35 L27.8,43.15 L30.83,42.42 L31.19,41.23 L31.38,37.38 L31.19,36.92 L24.96,30.05 Z"/>
      </g>
    </g>
  `,

  // Biceps — tracé exactement depuis la référence fournie
  'Biceps': `
    <g clip-path="url(#bicepsClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M33.33,36.55 L33.0,36.62 L31.88,37.63 L30.96,38.78 L30.8,39.47 L30.8,41.21 L31.0,41.48 L31.36,41.41 L33.33,39.15 L33.53,38.52 L33.53,36.75 Z"/>
        <path d="M14.93,36.55 L14.7,36.85 L14.7,38.19 L14.9,39.08 L15.46,39.9 L17.0,41.48 L17.27,41.48 L17.46,41.18 L17.46,39.57 L17.27,38.72 L16.31,37.57 L15.26,36.62 Z"/>
        <path d="M25.05,33.66 L24.69,34.12 L24.72,39.41 L25.18,39.84 L27.98,39.74 L28.57,38.98 L28.53,34.32 L27.88,33.66 Z"/>
        <path d="M20.29,33.69 L19.7,34.41 L19.79,39.28 L20.65,39.84 L23.31,39.74 L23.54,39.44 L23.54,33.99 L23.08,33.63 Z"/>
        <path d="M33.43,30.8 L31.82,32.44 L31.06,33.63 L30.8,34.84 L30.9,37.24 L32.51,36.02 L33.33,34.81 L33.53,34.05 Z"/>
        <path d="M14.8,30.8 L14.7,33.66 L14.9,34.71 L15.66,35.93 L17.36,37.24 L17.46,34.94 L17.17,33.56 L16.44,32.44 Z"/>
        <path d="M24.89,28.3 L24.69,28.63 L24.79,32.54 L25.02,32.71 L28.6,32.71 L28.93,32.54 L29.65,31.29 L29.65,30.6 L29.36,30.04 L27.25,28.7 L25.97,28.3 Z"/>
        <path d="M23.38,28.3 L22.65,28.24 L21.24,28.6 L19.83,29.32 L18.87,30.08 L18.58,31.13 L19.33,32.54 L19.66,32.71 L23.44,32.57 L23.54,28.5 Z"/>
        <path d="M24.99,22.95 L24.72,23.34 L24.79,27.02 L29.72,28.73 L30.14,28.57 L31.49,26.5 L31.69,25.71 L31.52,24.99 L25.61,22.95 Z"/>
        <path d="M23.38,22.98 L22.72,22.95 L16.84,24.95 L16.84,26.43 L18.05,28.47 L18.58,28.73 L23.51,27.02 L23.57,23.34 Z"/>
        <path d="M25.28,14.83 L24.69,15.85 L24.69,20.39 L25.81,21.9 L32.18,23.84 L33.46,23.38 L35.79,21.27 L37.57,20.62 L35.37,16.05 L32.05,13.26 L29.65,12.9 Z"/>
        <path d="M22.98,14.83 L18.87,12.96 L16.44,13.16 L12.96,15.95 L10.66,20.52 L16.08,23.84 L22.46,21.9 L23.54,20.65 L23.54,15.66 Z"/>
        <path d="M32.25,12.63 L35.14,14.44 L36.58,16.41 L38.29,20.02 L41.74,23.21 L42.0,17.4 L41.58,15.66 L40.46,13.78 L39.15,12.7 L36.91,11.78 L34.55,11.88 Z"/>
        <path d="M16.02,12.63 L13.68,11.88 L11.35,11.78 L9.41,12.53 L7.77,13.82 L6.75,15.49 L6.23,17.66 L6.56,23.21 L10.17,19.76 L12.83,14.77 L14.34,13.39 Z"/>
        <path d="M27.25,11.78 L27.61,12.27 L28.21,12.3 L34.35,11.09 L34.45,10.73 L33.99,10.3 L30.04,8.36 L28.86,8.07 L28.3,8.66 Z"/>
        <path d="M21.01,11.75 L19.93,8.59 L19.4,8.07 L18.78,8.1 L13.82,10.73 L13.88,11.06 L14.28,11.25 L20.02,12.3 L20.65,12.27 Z"/>
        <path d="M27.58,5.83 L25.81,8.07 L24.26,12.8 L24.33,13.19 L24.62,13.39 L25.05,13.29 L27.15,9.58 L27.71,7.51 Z"/>
        <path d="M20.68,5.83 L20.55,7.51 L21.17,9.74 L23.01,13.06 L23.64,13.39 L24.0,13.06 L22.52,8.23 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M38.19,21.86 L37.63,22.69 L37.63,25.51 L38.55,28.8 L40.56,32.84 L42.04,34.41 L42.82,34.55 L43.32,33.95 L43.68,30.87 L43.42,28.5 L41.58,23.87 L38.78,21.83 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M10.07,21.86 L9.45,21.86 L6.65,23.93 L4.78,28.67 L4.55,30.54 L4.95,33.92 L5.44,34.55 L6.23,34.41 L7.41,33.23 L9.51,29.36 L10.63,25.51 L10.63,22.69 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M37.47,27.75 L37.44,29.03 L37.83,30.24 L38.75,31.79 L39.47,32.41 L39.51,32.25 L38.16,29.29 L37.67,27.81 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M10.76,27.75 L10.6,27.81 L8.79,32.41 L9.61,31.65 L10.53,30.01 L10.83,28.96 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M43.12,25.91 L44.17,28.86 L44.27,33.33 L44.57,33.49 L45.45,31.46 L45.26,29.45 L44.34,27.06 L43.61,26.17 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M5.14,25.91 L4.65,26.17 L3.83,27.22 L2.97,29.62 L2.88,31.85 L3.73,33.49 L3.96,33.4 L4.06,29.03 Z"/>
      </g>
    </g>
  `,

  // Triceps — tracé exactement depuis la référence fournie
  'Triceps': `
    <g clip-path="url(#tricepsClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M33.01,34.14 L32.3,37.49 L31.72,42.0 L32.2,42.42 L33.2,42.48 L33.68,41.97 L33.91,39.0 Z"/>
        <path d="M14.93,34.1 L14.09,40.1 L14.35,42.06 L14.67,42.45 L16.02,42.35 L16.31,41.74 L15.77,37.78 Z"/>
        <path d="M24.73,29.95 L24.4,30.33 L24.4,44.83 L24.89,45.22 L27.72,43.06 L30.91,42.09 L31.33,37.26 Z"/>
        <path d="M23.08,29.95 L16.99,36.58 L16.67,37.62 L17.18,42.19 L19.96,42.9 L23.24,45.22 L23.6,44.87 L23.6,30.27 Z"/>
        <path d="M30.78,21.82 L25.56,29.37 L31.49,35.97 L35.36,28.14 L35.97,23.95 L35.46,23.18 Z"/>
        <path d="M17.22,21.82 L12.58,23.18 L12.06,23.95 L12.8,28.53 L16.54,35.97 L22.47,29.27 L17.86,22.18 Z"/>
        <path d="M31.43,14.64 L31.04,15.12 L30.69,17.02 L30.78,20.76 L31.81,21.41 L35.59,22.66 L35.97,22.57 L36.2,22.21 L36.2,18.57 L35.81,17.09 L34.49,15.64 Z"/>
        <path d="M16.64,14.67 L16.06,14.64 L13.64,15.57 L12.19,17.12 L11.83,18.28 L11.8,22.15 L12.09,22.6 L16.51,21.31 L17.22,20.79 L17.38,17.54 L16.96,15.09 Z"/>
        <path d="M32.91,12.22 L31.94,13.8 L35.46,15.41 L36.39,16.48 L37.2,18.8 L40.03,21.24 L40.61,21.24 L41.06,19.83 L41.13,17.28 L40.61,15.12 L39.71,13.51 L38.07,11.93 L36.36,11.03 L34.94,11.13 Z"/>
        <path d="M14.99,12.12 L12.8,11.03 L11.67,11.03 L8.55,13.22 L7.58,14.7 L6.94,16.86 L6.94,19.73 L7.39,21.24 L8.03,21.21 L10.9,18.7 L11.61,16.6 L12.38,15.61 L16.06,13.83 Z"/>
        <path d="M24.98,2.68 L24.4,3.1 L24.44,7.39 L26.08,10.13 L24.4,12.77 L24.53,28.5 L29.82,21.18 L30.91,13.74 L34.07,10.71 L28.43,7.32 Z"/>
        <path d="M23.02,2.68 L19.54,7.36 L13.96,10.71 L17.15,13.83 L18.25,21.28 L23.47,28.5 L23.6,12.77 L21.95,10.16 L23.56,7.52 L23.6,3.07 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M39.32,21.53 L39.16,21.89 L40.1,24.27 L40.77,27.24 L42.61,30.82 L43.26,31.56 L43.71,31.62 L44.03,31.17 L44.03,28.91 L43.19,25.72 L41.26,22.89 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M8.71,21.53 L8.0,21.79 L6.52,23.15 L4.68,26.05 L3.94,29.53 L4.04,31.36 L4.29,31.62 L4.74,31.56 L5.55,30.62 L7.29,27.14 L8.0,23.98 L8.84,21.95 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M36.84,19.96 L36.68,27.05 L38.49,30.24 L40.13,31.88 L40.68,32.01 L40.9,31.59 L39.94,28.75 L39.32,24.02 L38.16,21.44 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M11.19,19.96 L10.03,21.15 L8.74,23.89 L8.1,28.72 L7.13,31.49 L7.42,32.04 L9.45,30.33 L11.29,27.21 Z"/>
      </g>
    </g>
  `,

  // Avant-bras — tracé exactement depuis la référence fournie
  'Avant-bras': `
    <g clip-path="url(#avantBrasClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M6.52,32.16 L6.24,32.27 L3.55,39.94 L3.79,40.74 L5.12,41.16 L5.86,40.81 L6.73,37.8 Z"/>
        <path d="M2.18,31.07 L2.25,39.59 L2.99,38.92 L4.53,33.6 L4.18,32.72 Z"/>
        <path d="M2.64,15.91 L2.15,16.12 L2.15,29.53 L5.09,32.16 L6.45,28.06 L8.91,24.32 L9.12,20.29 L8.13,17.07 Z"/>
        <path d="M11.36,11.95 L11.32,12.48 L13.28,14.65 L14.93,17.21 L18.5,20.5 L19.59,21.09 L20.08,20.99 L20.25,20.39 L19.66,18.64 L17.49,15.24 L14.54,12.97 Z"/>
        <path d="M7.99,11.32 L10.73,19.1 L13.56,21.48 L16.82,22.74 L17.0,22.11 L14.82,19.52 L12.06,14.47 L10.13,12.55 Z"/>
        <path d="M2.18,7.71 L2.18,15.17 L7.5,16.01 L7.78,15.24 L7.43,12.69 L6.66,9.96 L5.16,8.52 Z"/>
        <path d="M2.18,2.92 L2.18,7.08 L5.54,7.78 L7.4,9.85 L12.02,11.43 L12.55,11.22 L12.55,9.78 L11.67,7.05 L9.19,3.79 L7.08,2.6 L4.49,2.01 L3.2,2.18 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M16.29,23.58 L16.15,24.18 L16.75,25.61 L18.43,28.06 L22.11,30.41 L25.3,31.88 L25.75,31.74 L24.67,30.02 L18.64,24.42 L17.07,23.44 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M18.78,22.07 L18.61,22.42 L18.71,22.74 L20.85,25.12 L21.13,25.09 L21.16,24.74 L20.22,22.28 L19.8,22.0 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M21.3,19.62 L21.62,23.37 L23.61,27.29 L30.23,34.02 L32.09,33.98 L32.65,33.18 L32.55,32.02 L29.32,28.66 L26.1,23.33 L21.97,19.48 Z"/>
      </g>
    </g>
  `,

  // Abdominaux — tracé exactement depuis la référence fournie
  'Abdominaux': `
    <g clip-path="url(#abdominauxClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M37.16,18.61 L37.12,19.91 L37.48,21.01 L38.39,22.56 L39.1,23.21 L39.1,22.92 L38.0,20.59 L37.35,18.71 Z"/>
        <path d="M10.84,18.61 L10.65,18.71 L10.0,20.59 L8.9,22.95 L8.9,23.21 L9.61,22.56 L10.52,21.04 L10.88,20.0 Z"/>
        <path d="M42.75,16.77 L42.69,17.12 L43.76,19.74 L43.85,24.15 L44.11,24.28 L44.92,22.72 L44.83,20.36 L43.98,18.06 Z"/>
        <path d="M5.25,16.77 L3.98,18.13 L3.17,20.39 L3.08,22.69 L3.89,24.28 L4.15,24.18 L4.24,19.74 L5.34,17.06 Z"/>
        <path d="M37.93,12.79 L37.32,13.5 L37.32,16.51 L38.32,19.97 L40.33,23.82 L41.62,25.15 L42.43,25.31 L42.92,24.63 L43.27,21.59 L43.01,19.39 L41.2,14.82 L38.42,12.79 Z"/>
        <path d="M10.0,12.75 L6.83,14.79 L4.92,19.58 L4.73,21.59 L5.12,24.76 L5.57,25.31 L6.31,25.21 L7.67,23.82 L9.87,19.45 L10.68,16.54 L10.68,13.47 Z"/>
        <path d="M25.05,5.96 L24.57,6.8 L24.57,11.52 L25.57,12.82 L32.11,14.73 L37.29,11.46 L34.99,6.96 L31.75,4.31 L29.16,4.05 Z"/>
        <path d="M22.92,5.93 L18.84,4.05 L16.28,4.31 L13.21,6.73 L10.75,11.52 L12.79,12.4 L14.63,14.18 L15.89,14.73 L22.43,12.82 L23.43,11.56 L23.43,6.77 Z"/>
        <path d="M32.04,3.69 L34.86,5.5 L36.31,7.51 L37.84,10.84 L41.33,14.15 L41.65,8.74 L41.2,6.73 L40.26,5.05 L38.74,3.76 L36.41,2.85 Z"/>
        <path d="M15.96,3.69 L11.59,2.85 L9.55,3.59 L7.74,5.05 L6.73,6.93 L6.35,8.81 L6.67,14.15 L10.0,11.07 L12.98,5.7 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M27.35,31.2 L24.92,31.2 L24.57,31.56 L24.57,43.98 L24.92,44.31 L25.44,44.05 L26.7,41.52 L28.0,37.19 L28.22,32.14 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M20.65,31.2 L19.78,32.17 L20.1,37.71 L21.3,41.52 L22.59,44.08 L23.11,44.31 L23.43,43.98 L23.43,31.56 L23.08,31.2 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M24.95,24.4 L24.57,24.86 L24.6,30.13 L24.95,30.49 L27.71,30.46 L28.19,30.1 L28.39,29.62 L28.32,25.02 L27.61,24.4 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M20.23,24.47 L19.78,24.86 L19.61,25.47 L19.71,29.94 L20.39,30.49 L23.05,30.49 L23.43,30.07 L23.4,24.73 L23.05,24.4 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M24.7,19.19 L24.57,23.14 L24.79,23.47 L28.35,23.5 L28.9,23.14 L29.42,22.17 L29.45,21.46 L28.87,20.62 L26.77,19.42 L25.18,19.06 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M23.27,19.16 L22.33,19.13 L21.07,19.49 L19.81,20.13 L18.81,20.94 L18.55,21.49 L18.58,22.17 L19.29,23.34 L19.65,23.5 L23.08,23.5 L23.37,23.3 L23.43,19.39 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M24.73,13.92 L24.53,17.48 L24.76,18.03 L27.06,18.58 L29.45,19.55 L30.33,18.94 L31.36,16.86 L31.2,15.83 L25.15,13.79 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M23.17,13.89 L22.5,13.89 L16.73,15.89 L16.83,17.45 L18.0,19.32 L18.51,19.55 L23.34,17.9 L23.43,14.24 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M33.53,30.97 L33.14,31.07 L31.69,32.62 L30.2,35.02 L29.49,37.45 L29.55,39.94 L30.2,39.74 L33.53,35.63 L33.92,34.31 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M14.47,30.97 L14.08,33.4 L14.37,35.41 L17.83,39.78 L18.38,39.97 L18.64,39.62 L18.61,38.13 L17.9,35.21 L16.35,32.66 L14.82,31.04 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M33.14,27.32 L32.72,27.35 L30.88,29.19 L30.59,30.04 L30.68,32.07 L31.07,32.11 L32.98,30.0 L33.27,29.1 L33.27,27.48 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M15.02,27.25 L14.73,27.51 L14.73,29.03 L14.92,29.78 L15.21,30.29 L16.93,32.11 L17.19,32.14 L17.41,31.95 L17.41,30.04 L17.25,29.42 L16.48,28.45 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M33.18,21.62 L32.56,22.11 L30.94,24.15 L30.59,25.44 L30.68,27.96 L32.53,26.48 L33.08,25.5 L33.27,24.76 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M14.82,21.62 L14.73,24.73 L14.92,25.5 L15.54,26.54 L17.32,27.96 L17.41,25.41 L17.25,24.63 L16.7,23.56 Z"/>
      </g>
    </g>
  `,

  // Quadriceps — tracé exactement depuis la référence fournie
  'Quadriceps': `
    <g clip-path="url(#quadricepsClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M29.09,15.2 L25.42,20.48 L26.18,31.31 L28.46,24.45 Z"/>
        <path d="M18.88,15.2 L19.48,24.35 L21.79,31.31 L22.51,20.42 Z"/>
        <path d="M34.14,6.85 L32.75,8.79 L32.65,9.69 L37.31,20.42 L37.34,18.34 L34.47,10.41 Z"/>
        <path d="M14.09,6.85 L13.7,10.54 L10.92,18.11 L10.92,20.42 L15.55,9.69 L15.41,8.73 Z"/>
        <path d="M33.34,2.19 L32.65,2.22 L32.19,2.59 L30.24,5.56 L29.58,7.8 L29.61,10.45 L30.27,10.28 L33.74,5.99 L34.07,4.83 L33.91,2.65 Z"/>
        <path d="M14.39,2.29 L13.9,3.25 L13.86,4.67 L14.16,5.86 L17.73,10.35 L18.19,10.51 L18.49,10.28 L18.49,8.79 L17.66,5.43 L15.61,2.42 L14.95,2.16 Z"/>
        <path d="M27.5,2.03 L25.02,1.99 L24.56,2.29 L24.56,15.07 L24.86,15.37 L25.39,15.2 L26.58,12.89 L27.96,8.63 L28.29,3.08 Z"/>
        <path d="M20.47,2.03 L19.67,2.88 L20.0,8.7 L21.42,12.99 L22.55,15.17 L23.11,15.37 L23.41,15.04 L23.41,2.36 L22.98,1.99 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M32.22,12.79 L30.14,20.22 L29.65,27.09 L31.07,35.05 L32.78,36.23 L34.1,35.41 L35.69,30.42 L36.09,25.11 L35.03,18.87 L33.05,13.15 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M15.78,12.79 L14.99,13.22 L13.24,18.17 L11.95,25.8 L12.15,29.33 L13.83,35.14 L15.32,36.23 L16.5,35.8 L17.1,34.71 L18.42,26.89 L17.92,20.25 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M28.52,27.65 L26.97,33.89 L27.27,41.12 L28.23,43.23 L30.37,43.76 L31.96,42.64 L32.32,40.86 L31.69,38.45 L29.55,34.29 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M19.44,27.65 L18.42,34.25 L16.21,38.58 L15.65,40.79 L16.21,42.94 L17.89,43.8 L19.34,43.5 L20.33,42.51 L21.0,38.05 L20.83,32.63 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M37.67,21.44 L36.65,31.38 L33.94,38.31 L33.94,40.56 L34.5,41.25 L35.16,41.09 L36.51,38.84 L38.0,33.59 L38.36,27.29 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M10.83,21.31 L9.9,26.86 L10.0,33.46 L11.09,38.31 L12.48,40.99 L13.1,41.22 L13.73,40.66 L13.86,38.38 L11.35,30.82 Z"/>
      </g>
    </g>
  `,

  // Ischio-jambiers — tracé exactement depuis la référence fournie
  'Ischio-jambiers': `
    <g clip-path="url(#ischioClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M33.48,6.48 L28.3,7.31 L26.07,8.7 L24.32,10.79 L24.32,18.89 L25.61,20.61 L27.5,21.81 L31.19,21.54 L33.21,18.89 L34.24,12.65 L34.14,7.37 Z"/>
        <path d="M14.29,6.48 L13.66,7.31 L13.56,12.72 L14.69,19.15 L16.81,21.64 L20.3,21.81 L22.19,20.61 L23.45,18.96 L23.45,10.72 L21.73,8.7 L19.5,7.31 Z"/>
        <path d="M32.25,3.09 L32.05,4.55 L32.05,5.15 L32.35,5.48 L32.78,5.58 L33.84,5.61 L34.14,5.48 L34.37,5.02 L34.6,3.12 Z"/>
        <path d="M24.38,8.34 L25.11,8.47 L28.1,6.14 L31.15,5.41 L31.55,4.85 L31.65,3.12 L24.32,3.12 Z"/>
        <path d="M16.15,3.12 L16.22,4.68 L16.68,5.45 L19.54,6.08 L22.86,8.57 L23.35,8.43 L23.42,3.09 Z"/>
        <path d="M13.2,3.12 L13.4,4.88 L13.66,5.48 L13.93,5.61 L15.02,5.58 L15.69,5.28 L15.79,4.88 L15.52,3.09 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M30.62,23.04 L29.43,23.83 L27.0,37.34 L27.4,40.1 L29.82,45.44 L30.52,45.04 L31.72,32.63 L31.45,24.53 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M17.21,23.04 L16.38,24.17 L16.08,32.86 L17.21,44.71 L17.98,45.44 L20.43,40.0 L20.8,37.37 L18.37,23.9 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M32.61,22.21 L32.05,23.34 L32.98,38.77 L34.07,43.02 L35.3,44.68 L36.2,41.59 L36.89,34.45 L33.81,23.9 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M15.16,22.21 L14.03,23.8 L10.94,34.09 L11.44,40.53 L12.47,44.68 L13.53,43.51 L14.86,38.54 L15.79,23.0 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M25.28,21.98 L25.05,22.97 L26.07,34.22 L26.44,34.72 L28.33,23.9 L27.8,23.04 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M22.56,21.98 L20.0,23.04 L19.47,23.83 L21.26,34.69 L21.66,34.55 L22.79,22.47 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M35.53,15.27 L33.81,21.54 L37.42,31.2 L37.82,27.78 L37.52,21.88 L36.5,17.2 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M12.27,15.27 L11.24,17.4 L10.21,22.37 L9.98,27.78 L10.34,31.2 L13.99,21.58 Z"/>
      </g>
    </g>
  `,

  // Fessiers — tracé exactement depuis la référence fournie
  'Fessiers': `
    <g clip-path="url(#fessiersClip)">
      <g fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round">
        <path d="M30.57,23.04 L29.41,23.97 L26.99,37.57 L27.29,39.76 L29.77,45.44 L30.6,44.61 L31.7,33.09 L31.43,24.37 Z"/>
        <path d="M17.23,23.04 L16.37,24.33 L16.07,32.36 L17.36,45.24 L18.03,45.44 L20.42,40.06 L20.78,37.21 L18.36,23.8 Z"/>
        <path d="M32.46,22.24 L32.03,23.24 L32.96,38.74 L34.29,43.58 L35.32,44.68 L36.48,39.73 L36.84,34.06 L33.49,23.0 Z"/>
        <path d="M15.34,22.24 L14.31,23.0 L10.92,34.26 L11.49,40.86 L12.45,44.68 L13.61,43.32 L14.81,38.87 L15.77,23.07 Z"/>
        <path d="M25.26,21.98 L25.03,22.74 L26.06,34.09 L26.49,34.72 L28.31,23.8 L27.72,23.0 Z"/>
        <path d="M22.54,21.98 L19.95,23.07 L19.49,23.8 L21.34,34.72 L21.71,34.32 L22.74,23.0 Z"/>
        <path d="M35.52,15.27 L33.79,21.48 L37.41,31.2 L37.81,28.15 L37.61,22.54 L36.58,17.46 Z"/>
        <path d="M12.28,15.27 L11.12,17.76 L10.19,22.51 L9.99,28.61 L10.39,31.2 L13.98,21.64 L13.51,18.76 Z"/>
        <path d="M32.26,3.09 L32.03,4.68 L32.13,5.28 L32.36,5.48 L32.76,5.58 L34.06,5.55 L34.35,5.08 L34.59,3.09 Z"/>
        <path d="M24.37,8.34 L24.93,8.57 L28.35,6.05 L31.07,5.48 L31.53,4.85 L31.67,3.12 L24.37,3.09 Z"/>
        <path d="M16.13,3.12 L16.27,4.88 L16.73,5.48 L19.69,6.14 L22.81,8.53 L23.4,8.37 L23.44,3.09 Z"/>
        <path d="M13.18,3.12 L13.45,5.15 L13.71,5.51 L13.94,5.61 L15.01,5.58 L15.44,5.48 L15.67,5.28 L15.77,4.85 L15.54,3.09 Z"/>
      </g>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M33.49,6.48 L28.45,7.24 L25.89,8.87 L24.33,10.76 L24.33,18.92 L27.09,21.64 L28.65,22.04 L30.97,21.64 L32.99,19.42 L34.22,12.92 L34.16,7.51 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M14.31,6.48 L13.65,7.47 L13.55,12.15 L14.54,18.79 L16.37,21.41 L18.13,22.01 L20.22,21.84 L22.08,20.71 L23.44,19.02 L23.44,10.69 L19.98,7.54 L17.06,6.58 Z"/>
      </g>
    </g>
  `,

  // Mollets — tracé exactement depuis la référence fournie
  'Mollets': `
    <g clip-path="url(#molletsClip)">
      <path fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round" d="M0,0 H48 V48 H0 Z"/>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M15.59,2.32 L15.19,3.09 L14.81,9.18 L15.0,18.98 L15.96,24.33 L16.68,25.85 L17.87,26.44 L18.72,25.08 L19.3,22.08 L19.5,15.68 L17.62,6.7 L16.31,2.87 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M31.18,2.56 L29.72,6.39 L27.72,16.27 L28.12,22.89 L28.91,25.81 L29.5,26.44 L30.53,25.88 L31.21,24.6 L32.25,19.17 L32.24,4.83 L31.7,2.25 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M13.39,3.07 L10.88,9.98 L10.27,14.77 L10.7,19.73 L11.8,23.79 L12.8,25.51 L14.05,25.88 L14.62,24.46 L14.03,10.83 L14.26,3.27 L14.04,2.62 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M33.09,2.95 L33.19,15.05 L32.62,24.8 L33.19,25.88 L33.76,25.88 L34.79,25.0 L35.83,22.64 L36.99,14.68 L36.85,12.3 L35.53,6.98 L33.96,3.14 L33.55,2.62 Z"/>
      </g>
    </g>
  `,

  // Tibialis — tracé exactement depuis la référence fournie. Même famille
  // visuelle que Mollets (silhouette de jambes), seule la zone surlignée
  // change (tibial antérieur à l'avant du tibia plutôt que le mollet).
  'Tibialis': `
    <g clip-path="url(#tibialisClip)">
      <path fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round" d="M0,0 H48 V48 H0 Z"/>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M11.44,7.83 L10.74,13.08 L10.74,19.45 L11.62,24.61 L14.06,31.92 L14.53,32.16 L14.91,30.8 L14.24,17.48 L13.02,11.39 L11.89,7.92 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M35.74,7.85 L34.04,13.36 L33.21,18.61 L32.63,31.6 L33.21,32.17 L35.54,26.02 L36.65,20.86 L36.84,13.83 L36.28,8.11 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M17.69,10.08 L16.58,15.49 L17.25,22.92 L17.78,23.55 L18.87,21.06 L19.6,15.89 L18.73,10.95 L18.37,10.08 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M29.2,10.14 L28.11,14.02 L28.0,16.85 L28.69,20.98 L29.7,23.56 L30.37,22.73 L30.97,14.86 L30.01,10.21 Z"/>
      </g>
    </g>
  `,

  // Érecteurs du rachis — tracé exactement depuis la référence fournie
  // (silhouette de dos, bande centrale surlignée le long de la colonne).
  'Érecteurs du rachis': `
    <g clip-path="url(#erecteursDuRachisClip)">
      <path fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,.85)" stroke-width="1.1" stroke-linejoin="round" d="M0,0 H48 V48 H0 Z"/>
      <g filter="url(#muscleGlow)">
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M22.87,2.61 L19.51,7.62 L20.83,16.06 L20.74,24.82 L21.91,28.5 L21.44,34.51 L22.12,44.73 L22.91,45.86 L23.7,45.36 L23.77,43.81 L23.39,29.6 L23.77,28.81 L23.77,13.37 L23.64,2.71 Z"/>
        <path fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" stroke-linejoin="round" d="M24.66,2.59 L24.46,44.34 L25.11,45.86 L25.67,45.61 L25.99,44.15 L26.76,34.7 L26.22,28.61 L27.3,24.9 L27.29,16.71 L28.59,7.9 L25.51,2.86 Z"/>
      </g>
    </g>
  `,

  // Icone de repli pour tout groupe non liste (ex: Cou) — haltere plein
  'default': `
    <g filter="url(#muscleGlow)">
      <rect fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" x="3.4" y="20.4" width="7" height="7.2" rx="1.6"/>
      <rect fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" x="37.6" y="20.4" width="7" height="7.2" rx="1.6"/>
      <rect fill="url(#muscleIconGrad)" stroke="rgba(15,8,28,.6)" stroke-width="0.9" x="12.2" y="22.2" width="23.6" height="3.6" rx="1.4"/>
    </g>
  `,
};

/**
 * Retourne le SVG complet (balise <svg> incluse) pour un groupe musculaire donne.
 * Necessite que app.html definisse une fois #muscleIconGrad, #muscleGlow et
 * les clipPaths #pectorauxClip / #epaulesClip / #dosClip / #bicepsClip /
 * #tricepsClip / #avantBrasClip / #abdominauxClip / #quadricepsClip /
 * #ischioClip / #fessiersClip / #molletsClip / #tibialisClip /
 * #erecteursDuRachisClip (voir le <svg> cache en tete de <body>). Le
 * clipPath #dosClip (silhouette du dos) est desormais
 * partage par 3 groupes distincts : 'Grand Dorsal', 'Trapèzes'
 * et 'Lombaires' (chacun ne surlignant que sa propre zone). Pour ces 3,
 * l'arriere-plan est un simple rectangle plein (comme pour 'Mollets')
 * decoupe par #dosClip, plutot que les quelques fragments de l'ancienne
 * icone "Dos" : ceux-ci ne couvraient qu'une petite partie du contour et
 * laissaient de grands trous non dessines des que le surlignage se
 * limitait a une seule zone (lats / trapezes / lombaires).
 * @param {string} groupName - Nom du groupe musculaire (ex: 'Pectoraux')
 * @returns {string} Balisage SVG pret a inserer via innerHTML
 */
function getMuscleIcon(groupName) {
  const inner = MUSCLE_ICONS[groupName] || MUSCLE_ICONS['default'];
  return `<svg ${MUSCLE_ICON_SVG_ATTRS}>${inner}</svg>`;
}

// Brachial n'a pas d'icône dédiée : même illustration que Avant-bras
// (demande explicite), donc même clip-path #avantBrasClip réutilisé tel quel.
MUSCLE_ICONS['Brachial'] = MUSCLE_ICONS['Avant-bras'];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MUSCLE_ICONS, getMuscleIcon };
}
