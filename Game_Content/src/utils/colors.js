// src/utils/colors.js

export const colorSchemes = {
  Normal: {
    primary: [85, 104, 175], // Blue
    accent: [205, 214, 41], // Green
  },
  Protanopia: {
    primary: [0, 70, 140], // Dark blue (appears dark to protanopes)
    accent: [255, 220, 0], // Yellow (visible to protanopes)
  },
  Deuteranopia: {
    primary: [0, 40, 120], // Navy blue (visible to deuteranopes)
    accent: [255, 180, 0], // Orange-yellow (visible to deuteranopes)
  },
  Tritanopia: {
    primary: [140, 0, 0], // Dark red (visible to tritanopes)
    accent: [200, 200, 0], // Yellow (visible to tritanopes)
  },
};

export function lerpColor(color1, color2, t) {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * t),
    Math.round(color1[1] + (color2[1] - color1[1]) * t),
    Math.round(color1[2] + (color2[2] - color1[2]) * t),
  ];
}