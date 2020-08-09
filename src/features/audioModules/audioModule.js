import { alpaca } from './alpaca';
import { alpsblue } from './alpsblue';
import { boxnavy } from './boxnavy';
import { buckling } from './buckling';
import { cream } from './cream';
import { holypanda } from './holypanda';
import { inkblack } from './inkblack';
import { inkred } from './inkred';
import { mxblack } from './mxblack';
import { mxblue } from './mxblue';
import { mxbrown } from './mxbrown';
import { topre } from './topre';
import { turquoise } from './turquoise';

export const keySounds = [
  cream,
  inkblack,
  inkred,
  alpaca,
  holypanda,
  turquoise,
  mxblack,
  mxbrown,
  mxblue,
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
