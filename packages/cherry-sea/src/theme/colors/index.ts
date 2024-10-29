/* eslint-disable @typescript-eslint/naming-convention */
import { aquaSerenity } from './aquaSerenity.js';
import { blueGrey } from './blueGrey.js';
import { pinkVivid } from './pinkVivid.js';
import { lightBlueVivid } from './lightBlueVivid.js';
import { limeGreen } from './limeGreen.js';
import { yellowVivid } from './yellowVivid.js';
import { redVivid } from './redVivid.js';
import { purple } from './purple.js';
import { goldenFizz } from './goldenFizz.js';

const white = '#fff';

const colors = {
  aquaSerenity,
  blueGrey,
  pinkVivid,
  lightBlueVivid,
  limeGreen,
  yellowVivid,
  redVivid,
  purple,
  goldenFizz,
  white,

  schemes: {
    'on-surface': blueGrey[900],
    primary: pinkVivid[500],
    white,
    'on-primary': white,
    'on-surface-variant': blueGrey[700],
    surface: blueGrey[50],
    'emphasis-on-blue': goldenFizz[400],
  },
};

export { colors };
