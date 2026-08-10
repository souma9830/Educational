/**
 * PDF Styling and Theme Configurations
 *
 * Defines RGB color palettes, typography, and page margin constraints
 * for assessment report PDF rendering using jsPDF.
 */

export const pdfThemes = {
  default: {
    name: 'Default Minimal',
    primary: [15, 15, 15],
    accent: [99, 102, 241],
    text: [60, 60, 60],
    border: [230, 230, 230],
    background: [255, 255, 255],
    margin: { top: 20, left: 20, right: 20, bottom: 20 },
  },
  premium: {
    name: 'Corporate Premium',
    primary: [33, 37, 41],
    accent: [73, 80, 87],
    text: [33, 37, 41],
    border: [222, 226, 230],
    background: [250, 250, 252],
    margin: { top: 25, left: 25, right: 25, bottom: 25 },
  },
  dark: {
    name: 'Modern Dark',
    primary: [243, 244, 246],
    accent: [129, 140, 248],
    text: [209, 213, 219],
    border: [55, 65, 81],
    background: [17, 24, 39],
    margin: { top: 20, left: 20, right: 20, bottom: 20 },
  },
  executive: {
    name: 'Executive Slate',
    primary: [15, 23, 42],
    accent: [14, 165, 233],
    text: [51, 65, 85],
    border: [226, 232, 240],
    background: [255, 255, 255],
    margin: { top: 22, left: 22, right: 22, bottom: 22 },
  },
};

/**
 * Safely retrieves a PDF theme configuration by name with default fallback.
 *
 * @param {string} [themeName='default'] - Theme key ('default' | 'premium' | 'dark' | 'executive').
 * @returns {typeof pdfThemes.default}
 */
export function getPDFTheme(themeName = 'default') {
  return pdfThemes[themeName] || pdfThemes.default;
}

/**
 * Returns an array of available theme keys.
 *
 * @returns {string[]}
 */
export function getPdfThemeNames() {
  return Object.keys(pdfThemes);
}

export default pdfThemes;
