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
  'aqua-serenity': aquaSerenity,
  'blue-grey': blueGrey,
  'pink-vivid': pinkVivid,
  'light-blue-vivid': lightBlueVivid,
  'lime-green': limeGreen,
  'yellow-vivid': yellowVivid,
  'red-vivid': redVivid,
  'golden-fizz': goldenFizz,
  purple,
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
