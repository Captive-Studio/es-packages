import type { ColorPalette } from '../type.js';
import { aquaSerenity } from './colorPalette/aquaSerenity.js';
import { blueGrey } from './colorPalette/blueGrey.js';
import { pinkVivid } from './colorPalette/pinkVivid.js';
import { lightBlueVivid } from './colorPalette/lightBlueVivid.js';
import { limeGreen } from './colorPalette/limeGreen.js';
import { yellowVivid } from './colorPalette/yellowVivid.js';
import { redVivid } from './colorPalette/redVivid.js';
import { purple } from './colorPalette/purple.js';
import { goldenFizz } from './colorPalette/goldenFizz.js';

export const colorPalette = {
  aquaSerenity,
  blueGrey,
  pinkVivid,
  lightBlueVivid,
  limeGreen,
  yellowVivid,
  redVivid,
  goldenFizz,
  purple,
} satisfies Record<string, ColorPalette>;
