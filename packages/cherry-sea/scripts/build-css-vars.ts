/* eslint-disable no-console */
import fs from 'node:fs/promises';
import { toCSSStyle, cherrySea } from '../dist/index.js';

const THEME_PREFIX = 'cs';

async function generateCSSFile(dist: string) {
  const content: string = toCSSStyle(cherrySea, THEME_PREFIX);
  await fs.writeFile(dist, content);
  console.log(`Le fichier CSS a été généré avec succès : ${dist}`);
}

async function main() {
  await generateCSSFile('dist/cherrySea.css');
}

await main();
