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
  holypanda,
  alpaca,
  turquoise,
  inkblack,
  inkred,
  mxblack,
  mxbrown,
  mxblue,
  boxnavy,
  buckling,
  alpsblue,
  topre,
]

// import { cream } from './cream';
//
// import('./alpaca').then(alpaca => {keySounds.push(alpaca)});
// import('./alpsblue').then(alpsblue => {keySounds.push(alpsblue)});
// import('./boxnavy').then(boxnavy => {keySounds.push(boxnavy)});
// import('./buckling').then(buckling => {keySounds.push(buckling)});
// // import('./cream').then(cream => {keySounds.push(cream)});
// import('./holypanda').then(holypanda => {keySounds.push(holypanda)});
// import('./inkblack').then(inkblack => {keySounds.push(inkblack)});
// import('./inkred').then(inkred => {keySounds.push(inkred)});
// import('./mxblack').then(mxblack => {keySounds.push(mxblack)});
// import('./mxblue').then(mxblue => {keySounds.push(mxblue)});
// import('./mxbrown').then(mxbrown => {keySounds.push(mxbrown)});
// import('./topre').then(topre => {keySounds.push(topre)});
// import('./turquoise').then(turquoise => {keySounds.push(turquoise)});
//
// export const keySounds = [
//   cream
// ]


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
