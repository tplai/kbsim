import { holypanda } from './holypanda.js';
import { blackink } from './blackink.js';
import { redink } from './redink.js';

export const keySounds = {
  holypanda: holypanda,
  blackink: blackink,
  redink: redink,
  // cream: cream,
  // mxblack: mxblack,
  // boxnavy: boxnavy,
  // topre: topre,
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
