export const dexColors = [
  '#00a0e5',
  '#c55de8',
  '#8BAB43',
  '#948c52',
  '#1ca254',
];

export const areaSeriesBottomOpacity = 0.4;

export function hexToRgba(hex, opacity) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA color string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}