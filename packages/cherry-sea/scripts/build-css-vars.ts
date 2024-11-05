/* eslint-disable no-console */
import fs from 'node:fs';
import { colors, fonts, spacing } from '../dist/index.js';

function toCSSVariables(obj: object, prefix = ''): string {
  let cssVars = '';

  // Utilise Object.entries pour itérer uniquement sur les propriétés propres de l'objet
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      // Appel récursif pour les objets imbriqués
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      cssVars += toCSSVariables(value, `${prefix}-${key}`);
    } else {
      // Formate le nom de la variable CSS
      const cssVarName = `${prefix}-${key}`.replaceAll('_', '-').toLowerCase();
      cssVars += `  --${cssVarName}: ${Array.isArray(value) ? value.join(',') : value};\n`;
    }
  });

  return cssVars;
}

function generateCSSFile(variables: object, dist: string) {
  const cssVariables = `:root {\n${toCSSVariables(variables, '')}}\n`;

  fs.writeFile(dist, cssVariables, (err) => {
    if (err != null) throw err;
    console.log(`Le fichier CSS a été généré avec succès : ${dist}`);
  });
}

generateCSSFile(colors, 'dist/colors.css');
generateCSSFile(fonts, 'dist/fonts.css');
generateCSSFile(spacing, 'dist/spacing.css');
