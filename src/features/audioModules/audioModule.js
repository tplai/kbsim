import { alpsblue } from './alpsblue.js';
import { boxnavy } from './boxnavy.js';
import { buckling } from './buckling.js';
import { cream } from './cream.js';
import { holypanda } from './holypanda.js';
import { inkblack } from './inkblack.js';
import { inkred } from './inkred.js';
import { mxblack } from './mxblack'
import { topre } from './topre.js';

export const keySounds = [
  cream,
  mxblack,
  inkblack,
  inkred,
  holypanda,
  boxnavy,
  buckling,
  alpsblue,
  topre,
]

// sadly you can't import in the middle of a file
// let audiofolder = "./../../assets/audiofolder";
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
