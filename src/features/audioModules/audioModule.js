import { blackink } from './blackink.js';
import { bluealps } from './bluealps.js';
import { boxnavy } from './boxnavy.js';
import { buckling } from './buckling.js';
import { cream } from './cream.js';
import { holypanda } from './holypanda.js';
import { mxblack } from './mxblack'
import { redink } from './redink.js';
import { topre } from './topre.js';

export const keySounds = {
  blackink: blackink,
  bluealps: bluealps,
  boxnavy: boxnavy,
  buckling: buckling,
  cream: cream,
  holypanda: holypanda,
  mxblack: mxblack,
  redink: redink,
  topre: topre,
}

// sadly you can't import in the middle of a file
// let audiofolder = "./../../audiofolder";
// let switchfolders = ["holypanda"];
// let switches = ["SPACE", "CTRL", "GENERIC"];
// let keySounds = {};
//
// for (let type in switchfolders) {
//   keySounds[switchfolders[type]] = {
//     press: {},
//     release: {},
//   };
//   for (let item in switches) {
//     import pressSound from `${audiofolder}/${switchfolder}/press/${switches[item]}.mp3`;
//     keySounds[switchfolders[type]].press[switches[item]] = pressSound;
//
//     import releaseSound from `${audiofolder}/${switchfolder}/release/${switches[item]}.mp3`;
//     keySounds.release[switches[item]] = pressSound;
//   }
// }
